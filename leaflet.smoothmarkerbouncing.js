/*
 * Copyright (c) 2015, Alexei KLENIN
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *   1. Redistributions of source code must retain the above copyright notice,
 *        this list of conditions and the following disclaimer.
 *
 *   2. Redistributions in binary form must reproduce the above copyright
 *        notice, this list of conditions and the following disclaimer in the
 *        documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * Plugin for smooth bouncing of Leaflet markers.
 *
 * @author Alexei KLENIN <alexey_klenin@hotmail.fr>
 */
;(function (factory, window) {

    /* Define an AMD module that relies on 'leaflet' */
    if (typeof define === 'function' && define.amd) {
        define(['leaflet'], factory);

        /* Define a Common JS module that relies on 'leaflet'*/
    } else if (typeof exports === 'object') {
        module.exports = factory(require('leaflet'));
    }

    if (typeof window !== 'undefined' && window.L) {
        factory(L);
    }
}(function (L) {

    'use strict';

    var regStyle = /([\w-]+): ([^;]+);/g,    // regex to parse style definitions

        /**
         * CSS3 transform properties for different browsers
         */
        css3_transforms = {
            transform       : 'transform',
            WebkitTransform : '-webkit-transform',
            OTransform      : '-o-transform',
            MozTransform    : '-moz-transform',
            msTransform     : '-ms-transform'
        },

        /**
         * CSS3 transform property for this browser
         */
        transform = css3_transforms[L.DomUtil.TRANSFORM],

        /* Cache for motion data that not depends on x & y of the marker:
         *    - moveSteps
         *    - moveDelays
         *    - resizeSteps
         *    - resizeDelays
         */
        _bouncingMotionsCache = {};

    /* -------------------------------------------------------------------------
     *         In-closure helper functions
     * -------------------------------------------------------------------------
     */

    /**
     * Parses cssText attribute into object. Style definitions becomes the keys
     * of the object.
     *
     * @param cssText   cssText string
     *
     * @return object with style definitions as keys
     */
    function parseCssText(cssText) {
        var styleDefinitions = {},
            match = regStyle.exec(cssText);

        while (match) {
            styleDefinitions[match[1]] = match[2];
            match = regStyle.exec(cssText);
        }

        return styleDefinitions;
    }

    /**
     * Renders object with style definitions as string. Created string is ready
     * to put in cssText attribute.
     *
     * @param styleDefinitions    object with style definitions
     *
     * @return cssText string
     */
    function renderCssText(styleDefinitions) {
        var cssText = '',
            key;

        for (key in styleDefinitions) {
            cssText += key + ': ' + styleDefinitions[key] + '; '
        }

        return cssText;
    }

    /**
     * Calculates the points to draw the continous line on the screen. Returns
     * the array of ordered point coordinates. Uses Bresenham algorithm.
     *
     * @param x         x coordinate of origin
     * @param y         y coordinate of origin
     * @param angle     angle (radians)
     * @param length    length of line (px)
     *
     * @return array of ordered point coordinates
     *
     * @see
     * http://rosettacode.org/wiki/Bitmap/Bresenham's_line_algorithm#JavaScript
     */
    function calculateLine(x, y, angle, length) {
        // TODO: use something else than multiply length by 2 to calculate the
        // line with defined length
        var xD = Math.round(x + Math.cos(angle) * (length * 2)),
            yD = Math.round(y + Math.sin(angle) * (length * 2)),

            dx = Math.abs(xD - x),
            sx = x < xD ? 1 : -1,

            dy = Math.abs(yD - y),
            sy = y < yD ? 1 : -1,

            err = (dx > dy ? dx : -dy) / 2,
            e2,

            p = [],
            i = 0;

        while (true) {
            p.push([x, y]);
            i++;
            if (i === length)
                break;
            e2 = err;
            if (e2 > -dx) {
                err -= dy;
                x += sx;
            }
            if (e2 < dy) {
                err += dx;
                y += sy;
            }
        }

        return p;
    }

    /**
     * Returns calculated array of points for icon movement. Used to animate
     * markers in browsers that doesn't support 'transform' attribute.
     *
     * @param x               x coordinate of original position of the marker
     * @param y               y coordinate of original position of the marker
     * @param bounceHeight    height of bouncing (px)
     *
     * @return array of points [x, y]
     */
    function calculateIconMovePoints(x, y, bounceHeight) {
        var p = [],                   // array of points
            dH = bounceHeight + 1;    // delta of height

        /* Use fast inverse while loop to fill the array */
        while (dH--) {
            p[dH] = [x, y - dH];
        }

        return p;
    }

    /**
     * Returns calculated array of points for shadow movement. Used to animate
     * markers in browsers that doesn't support 'transform' attribute.
     *
     * @param x               x coordinate of original position of the marker
     * @param y               y coordinate of original position of the marker
     * @param bounceHeight    height of bouncing (px)
     * @param angle           shadow inclination angle, if null shadow don't
     *                        moves from it's initial position (radians)
     *
     * @return array of the points [x, y]
     */
    function calculateShadowMovePoints(x, y, bounceHeight, angle) {
        if (angle != null) {  // important: 0 is not null
            return calculateLine(x, y, angle, bounceHeight + 1);
        } else {
            for (var p = [], i = 0; i <= bounceHeight; i++) {
                p[i] = [x, y];
            }
            return p;
        }
    }

    /**
     * Returns calculated array of transformation definitions for the animation
     * of icon movement. Function defines one transform for every pixel of shift
     * of the icon from it's original y position.
     *
     * @param x               x coordinate of original position of the marker
     * @param y               y coordinate of original position of the marker
     * @param bounceHeight    height of bouncing (px)
     *
     * @return array of transformation definitions
     */
    function calculateIconMoveTransforms(x, y, bounceHeight) {
        var t = [],                 // array of transformations
            dY = bounceHeight + 1;  // delta Y

        /* Use fast inverse while loop to fill the array */
        while (dY--) {

            /* Use matrix3d for hardware acceleration */
            t[dY] = ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,' + x + ',' + (y - dY)
                + ',0,1) ';
        }

        return t;
    }

    /**
     * Returns calculated array of transformation definitions for the animation
     * of shadow movement. Function defines one transform for every pixel of
     * shift of the shadow from it's original position.
     *
     * @param x               x coordinate of original position of marker
     * @param y               y coordinate of original position of marker
     * @param bounceHeight    height of bouncing (px)
     * @param angle           shadow inclination angle, if null shadow don't
     *                        moves from it's initial position (radians)
     *
     * @return array of transformation definitions
     */
    function calculateShadowMoveTransforms(x, y, bounceHeight, angle) {
        // TODO: check this method to know if bounceHeight + 1 is normal
        var t = [],                   // array of transformation definitions
            dY = bounceHeight + 1;    // delta Y

        if (angle != null) {  // important: 0 is not null
            var p = calculateLine(x, y, angle, bounceHeight + 1);
        } else {
            for (var p = [], i = 0; i <= bounceHeight; i++) {
                p[i] = [x, y];
            }
        }

        /* Use fast inverse while loop to fill the array */
        while (dY--) {

            /* Use matrix3d for hardware acceleration */
            t[dY] = ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,' + p[dY][0] + ','
                + p[dY][1] + ',0,1) ';
        }

        return t;
    }

    /**
     * Returns calculated array of transformation definitions for the animation
     * of icon resizing. Function defines one transform for every pixel of
     * resizing of marker from it's original height.
     *
     * @param x                 x coordinate of original position of marker
     * @param y                 y coordinate of original position of marker
     * @param height            original marker height (px)
     * @param contractHeight    height of marker contraction (px)
     *
     * @return array of transformation definitions
     */
    function calculateIconResizeTransforms(x, y, height, contractHeight) {
        var t = [],                     // array of transformations
            dH = contractHeight + 1;    // delta of height

        /* Use fast inverse while loop to fill the array */
        while (dH--) {

            /* Use matrix3d for hardware acceleration */
            t[dH] = ' matrix3d(1,0,0,0,0,' + ((height - dH) / height)
                + ',0,0,0,0,1,0,' + x + ',' + (y + dH) + ',0,1) ';
        }

        return t;
    }

    /**
     * Returns calculated array of transformation definitions for the animation
     * of shadow resizing. Function defines one transform for every pixel of
     * shadow resizing.
     *
     * @param x                 x coordinate of original position of marker
     * @param y                 y coordinate of original position of marker
     * @param width             original marker width (px)
     * @param height            original marker height (px)
     * @param contractHeight    height of marker contraction (px)
     * @param angle             shadow inclination angle (radians)
     *
     * @return array of transformation definitions
     */
    // TODO: fix & deploy this function
    function calculateShadowResizeTransforms(x, y, width, height,
                                             contractHeight, angle) {
        var t = [],                     // array of transformation definitions
            p = calculateLine(width, height, angle + Math.PI, contractHeight),
            dH = contractHeight + 1;    // delta height

        /* Use fast inverse while loop to fill the array */
        while (dH--) {

            /* Use matrix3d for hardware acceleration */
            t[dH] = ' matrix3d(' + (width / p[dH][0]) +  ',0,0,0,0,'
                + (p[dH][1] / height) + ',0,0,0,0,1,0,' + x + ','
                + (y + height - p[dH][1]) + ',0,1) ';
        }

        return t;
    }

    /**
     * Returns calculated array of anination steps. This function used to
     * calculate both movement and resizing animations. Arrays of steps are then
     * cached in _bouncingMotionsCache. Function checks this cache before make
     * any calculations.
     *
     * @param height    height of movement or resizing (px)
     * @param prefix    prefix of the key in the cache. Must be any string with
     *                  trailing "_" caracter.
     *
     * @return array of animation steps
     */
    function calculateSteps(height, prefix) {
        var key = prefix + height,
            steps = [],
            i;

        /* Check the cache */
        if (_bouncingMotionsCache[key]) {
            return _bouncingMotionsCache[key];
        }

        /* Calculate the sequence of animation steps:
         * steps = [1 .. height] concat [height-1 .. 0]
         */
        i = 1;
        while (i <= height) {
            steps.push(i++);
        }

        i = height;
        while (i--) {
            steps.push(i);
        }

        /* Save steps to the cache */
        _bouncingMotionsCache[key] = steps;

        return steps;
    }

    /**
     * Returns calculated array of delays between animation start and the steps
     * of animation. This function used to calculate both movement and resizing
     * animations. Element with index i of this array contains the delay in
     * milliseconds between animation start and the step number i. Those delays
     * are cached in _bouncingMotionsCache. Function checks this cache before
     * make any calculations.
     *
     * @param height    height of movement or resizing (px)
     * @param speed     speed coefficient
     * @param prefix    prefix of the key in the cache. Must be any string with
     *                  trailing "_" caracter.
     *
     * @return array of delays before steps of animation
     */
    function calculateDelays(height, speed, prefix) {
        var key = prefix + height + '_' + speed,
            deltas = [],    // time between steps of animation
            delays = [],    // delays before steps from beginning of animation
            totalDelay = 0,
            l,
            i;

        /* Check the cache */
        if (_bouncingMotionsCache[key]) {
            return _bouncingMotionsCache[key];
        }

        /* Calculate delta time for bouncing animation */

        /* Delta time to movement in one direction */
        deltas[height] = speed;
        deltas[0] = 0;
        i = height;
        while (--i) {
            deltas[i] = Math.round(speed / (height - i));
        }

        /* Delta time for movement in two directions */
        i = height;
        while (i--) {
            deltas.push(deltas[i]);
        }

        /* Calculate move delays (cumulated deltas) */
        // TODO: instead of deltas.lenght write bounceHeight * 2 - 1
        for (i = 0, l = deltas.length; i < l; i++) {
            totalDelay += deltas[i];
            delays.push(totalDelay);
        }

        /* Save move delays to cache */
        _bouncingMotionsCache[key] = delays;

        return delays;
    }

    /* -------------------------------------------------------------------------
     *         Class "static" methods
     * -------------------------------------------------------------------------
     */

    L.Marker._bouncingMarkers = [];     // array of bouncing markers

    /**
     * Registers default options of bouncing animation.
     *
     * @param options    object with options
     */
    L.Marker.setBouncingOptions = function(options) {
        L.extend(L.Marker.prototype._bouncingOptions, options);
    };

    /**
     * Returns array of currently bouncing markers.
     *
     * @return array of bouncing markers
     */
    L.Marker.getBouncingMarkers = function() {
        return L.Marker._bouncingMarkers;
    };

    /**
     * Stops the bouncing of all currently bouncing markers. Purge the array of
     * bouncing markers.
     */
    L.Marker.stopAllBouncingMarkers = function() {
        var marker;
        while (marker = L.Marker._bouncingMarkers.shift()) {
            marker._bouncingMotion.isBouncing = false;    // stop bouncing
        }
    };

    /**
     * Adds the marker to the list of bouncing markers. If flag 'exclusive' is
     * set to true, stops all bouncing markers before.
     *
     * @param marker      marker object
     * @param exclusive   flag of exclusive bouncing. If set to true, stops the
     *                    bouncing of all other markers.
     */
    L.Marker._addBouncingMarker = function(marker, exclusive) {
        if (exclusive || marker._bouncingOptions.exclusive) {
            L.Marker.stopAllBouncingMarkers();
        } else {
            L.Marker._stopEclusiveMarkerBouncing();
        }
        L.Marker._bouncingMarkers.push(marker);
    };

    /**
     * Removes the marker from the list of bouncing markers.
     *
     * @param marker    marker object
     */
    L.Marker._removeBouncingMarker = function(marker) {
        var i = L.Marker._bouncingMarkers.length;

        if (i) {
            while (i--) {
                if (L.Marker._bouncingMarkers[i] == marker) {
                    L.Marker._bouncingMarkers.splice(i, 1);
                    break;
                }
            }
        }
    };

    /**
     * Stops the bouncing of exclusive marker.
     */
    L.Marker._stopEclusiveMarkerBouncing = function() {
        var i = L.Marker._bouncingMarkers.length;

        if (i) {
            while (i--) {
                if (L.Marker._bouncingMarkers[i]._bouncingOptions.exclusive) {
                    L.Marker._bouncingMarkers[i]._bouncingMotion.isBouncing =
                        false;    // stop bouncing
                    L.Marker._bouncingMarkers.splice(i, 1);
                }
            }
        }
    };

    /* -------------------------------------------------------------------------
     *         L.Marker.prototype methods (shared by all instances)
     * -------------------------------------------------------------------------
     */

    L.Marker.include({

        /* Default bouncing animation properties */
        _bouncingOptions: {
            bounceHeight   : 15,    // how high marker can bounce (px)
            contractHeight : 12,    // how much marker can contract (px)
            bounceSpeed    : 52,    // bouncing speed coefficient
            contractSpeed  : 52,    // contracting speed coefficient
            shadowAngle    : - Math.PI / 4, // shadow inclination angle
                                            // (radians); null value annulates
                                            // shadow movement
            elastic        : true,  // activate contract animation
            exclusive      : false, // many markers can bounce in the same time
        },

        /**
         * Registers options of bouncing animation for this marker. After
         * registration of options for concreet marker, it will ignore the
         * changes of default options. Function automatically recalculates
         * animation steps and delays.
         *
         * @param options    options object
         *
         * @return this marker
         */
        setBouncingOptions: function(options) {

            /* If _bouncingOptions was not redefined yet for this marker create
             * own property and clone _bouncingOptions of prototype.
             */
            if (!this.hasOwnProperty('_bouncingOptions')) {
                this._bouncingOptions = L.extend(
                    {},
                    L.Marker.prototype._bouncingOptions
                );
            }

            /* Copy options passed as param */
            L.extend(this._bouncingOptions, options);

            /* Recalculate steps & delays of movement & resize animations */
            this._calculateTimeline();

            /* Recalculate transformations */
            this._calculateTransforms();

            return this;    // fluent API
        },

        /**
         * Returns true if this marker is bouncing. If this marker is not
         * bouncing returns false.
         *
         * @return true if marker is bouncing, false if not
         */
        isBouncing: function() {
            return this._bouncingMotion.isBouncing;
        },

        /**
         * Let's bounce now!
         *
         * @param times    number of animation repeations (optional)
         *
         * @return this marker
         */
        bounce: function() {
            var marker = this,
                icon   = this._icon,
                shadow = this._shadow,

                bouncingOptions = marker._bouncingOptions,
                motion          = marker._bouncingMotion,

                bounceHeight   = bouncingOptions.bounceHeight,
                contractHeight = bouncingOptions.contractHeight,
                bounceSpeed    = bouncingOptions.bounceSpeed,
                contractSpeed  = bouncingOptions.contractSpeed,
                shadowAngle    = bouncingOptions.shadowAngle,
                elastic        = bouncingOptions.elastic,
                exclusive      = bouncingOptions.exclusive,

                moveSteps    = motion.moveSteps,
                moveDelays   = motion.moveDelays,
                resizeSteps  = motion.resizeSteps,
                resizeDelays = motion.resizeDelays,

                nbMoveSteps   = moveSteps.length,
                nbResizeSteps = resizeSteps.length,

                baseIconCssText   = motion.baseIconCssText,
                baseShadowCssText = motion.baseShadowCssText,

                is3d = L.Browser.any3d,

                times = null;    // null for infinite bouncing

            if (motion.bouncingAnimationPlaying) {
                motion.isBouncing = true;
                return;
            }

            if (arguments.length == 1) {
                times = arguments[0];
            }

            /**
             * Makes the step of the movement animation.
             *
             * @param step    step number
             */
            function makeMoveStep(step) {

                /* Reset icon's cssText */
                icon.style.cssText = baseIconCssText
                    + 'z-index: ' + marker._zIndex + ';'
                    + transform + ': ' + motion.iconMoveTransforms[step];

                /* Reset shadow's cssText */
                if (shadow) {
                    shadow.style.cssText = baseShadowCssText
                        + transform + ': '
                        + motion.shadowMoveTransforms[step];
                }
            }

            /**
             * Makes the step of the movement animation in no 3D able web
             * browser.
             *
             * @param step    step number
             */
            function makeMoveStepNo3D(step) {

                /* Reset icon's cssText */
                icon.style.cssText = baseIconCssText
                    + 'z-index: ' + marker._zIndex + ';';
                icon.style.left = motion.iconMovePoints[step][0] + 'px';
                icon.style.top  = motion.iconMovePoints[step][1] + 'px';

                /* Reset shadow's cssText */
                if (shadow) {
                    shadow.style.cssText = baseShadowCssText;
                    shadow.style.left = motion.shadowMovePoints[step][0] + 'px';
                    shadow.style.top  = motion.shadowMovePoints[step][1] + 'px';
                }
            }

            /**
             * Makes the step of resizing animation.
             *
             * @param step    step number
             */
            function makeResizeStep(step) {

                /* Reset icon's cssText */
                icon.style.cssText = baseIconCssText
                    + 'z-index: ' + marker._zIndex + ';'
                    + transform + ': ' + motion.iconResizeTransforms[step];

                /* Reset shadow's cssText */
                if (shadow && shadowAngle != null) {
                    shadow.style.cssText = baseShadowCssText
                        + transform + ': '
                        + motion.shadowResizeTransforms[step];
                }
            }

            /**
             * Moves the marker up & down.
             */
            function move() {
                if (times !== null) {
                    if (!--times) {
                        motion.isBouncing = false;  // this is the last bouncing
                        motion.bouncingAnimationPlaying = false;
                    }
                }

                var i = nbMoveSteps;

                /* Lauch timeouts for every step of the movement animation */
                if (is3d) {
                    while (i--) {
                        setTimeout(
                            makeMoveStep,
                            moveDelays[i],
                            moveSteps[i]);
                    }
                } else {
                    while (i--) {
                        setTimeout(
                            makeMoveStepNo3D,
                            moveDelays[i],
                            moveSteps[i]);
                    }
                }

                /* At the end of movement animation check if continue the
                 * bouncing with rezise animation, move animation or stop it.
                 */
                // TODO: longer timeout if there is not resize part of animation
                setTimeout(function() {
                    if (elastic && is3d) {
                        resize();    // possible only in 3D able browsers
                    } else if (motion.isBouncing) {
                        setTimeout(move, bounceSpeed);
                    } else {
                        motion.bouncingAnimationPlaying = false;
                    }
                }, moveDelays[nbMoveSteps - 1]);
            }

            /**
             * Contracts & expands the marker.
             */
            function resize() {
                var i = nbResizeSteps;

                /* Stop animation at the end if necessary */
                setTimeout(function () {
                    if (!motion.isBouncing) {
                        motion.bouncingAnimationPlaying = false;
                    }
                }, resizeDelays[i]);

                /* Lauch timeouts for every step of the contraction animation */
                while (i--) {
                    setTimeout(
                        makeResizeStep,
                        resizeDelays[i],
                        resizeSteps[i]);
                }

                /* At the end of contraction animation check if continue the
                 * bouncing with move animation or stop it.
                 */
                setTimeout(function() {
                    if (motion.isBouncing) {
                        move();
                    }
                }, resizeDelays[nbResizeSteps - 1]);
            }

            L.Marker._addBouncingMarker(marker, exclusive);
            motion.isBouncing = true;
            motion.bouncingAnimationPlaying = true;
            move();        // start animation

            return marker;    // fluent API
        },

        /**
         * Stops bouncing of this marker. Note: the bouncing not stops
         * immediatly after the call of this method. Instead, the animation is
         * executed until marker returns to it's original position and takes
         * it's full size.
         *
         * @return this marker
         */
        stopBouncing: function() {
            this._bouncingMotion.isBouncing = false;
            L.Marker._removeBouncingMarker(this);

            return this;    // fluent API
        },

        /**
         * Starts/stops bouncing of this marker.
         *
         * @return this marker
         */
        toggleBouncing: function() {
            if (this._bouncingMotion.isBouncing) {
                this.stopBouncing();
            } else {
                this.bounce();
            }

            return this;    // fluent API
        },

        /**
         * Calculates moveSteps, moveDelays, resizeSteps & resizeDelays for
         * animation of this marker.
         */
        _calculateTimeline: function() {

            /*
             * Animation is defined by shifts of the marker from it's original
             * position. Each step of the animation is a shift of 1px.
             *
             * We define function f(x) - time of waiting between shift of x px
             * and shift of x+1 px.
             *
             * We use for this the inverse function f(x) = a / x; where a is the
             * animation speed and x is the shift from original position in px.
             */

            /* recalculate steps & delays of movement & resize animations */
            this._bouncingMotion.moveSteps = calculateSteps(
                this._bouncingOptions.bounceHeight,
                'moveSteps_'
            );

            this._bouncingMotion.moveDelays = calculateDelays(
                this._bouncingOptions.bounceHeight,
                this._bouncingOptions.bounceSpeed,
                'moveDelays_'
            );

            /* Calculate resize steps & delays only if elastic animation is
             * enabled */
            if (this._bouncingOptions.elastic) {
                this._bouncingMotion.resizeSteps = calculateSteps(
                    this._bouncingOptions.contractHeight,
                    'resizeSteps_'
                );

                this._bouncingMotion.resizeDelays = calculateDelays(
                    this._bouncingOptions.contractHeight,
                    this._bouncingOptions.contractSpeed,
                    'resizeDelays_'
                );
            }
        },

        /**
         * Calculated the transformations of this marker.
         */
        _calculateTransforms: function() {
            if (L.Browser.any3d) {

                /* Calculate transforms for 3D browsers */

                if (this.options.icon.options.iconSize) {
                    var iconHeight = this.options.icon.options.iconSize[1];
                } else {

                    /* To fix the case when icon is in _iconObj */
                    var iconHeight = this._iconObj.options.iconSize[1];
                }

                /* Calculate move transforms of icon */
                this._bouncingMotion.iconMoveTransforms =
                    calculateIconMoveTransforms(
                        this._bouncingMotion.x,
                        this._bouncingMotion.y,
                        this._bouncingOptions.bounceHeight
                    );

                /* Calculate resize transforms of icon */
                this._bouncingMotion.iconResizeTransforms =
                    calculateIconResizeTransforms(
                        this._bouncingMotion.x,
                        this._bouncingMotion.y,
                        iconHeight,
                        this._bouncingOptions.contractHeight
                    );

                if (this._shadow) {

                    /* Calculate move transformations of shadow */
                    this._bouncingMotion.shadowMoveTransforms =
                        calculateShadowMoveTransforms(
                            this._bouncingMotion.x,
                            this._bouncingMotion.y,
                            this._bouncingOptions.bounceHeight,
                            this._bouncingOptions.shadowAngle
                        );

                    /* Calculate resize transforms of shadow */
                    // TODO: use function calculateShadowResizeTransforms
                    this._bouncingMotion.shadowResizeTransforms =
                        calculateIconResizeTransforms(
                            this._bouncingMotion.x,
                            this._bouncingMotion.y,
                            this.options.icon.options.shadowSize[1],
                            this._bouncingOptions.contractHeight
                        );
                }

            } else {

                /* Calculate move points */

                /* For the icon */
                this._bouncingMotion.iconMovePoints =
                    calculateIconMovePoints(
                        this._bouncingMotion.x,
                        this._bouncingMotion.y,
                        this._bouncingOptions.bounceHeight
                    );

                /* And for the shadow */
                this._bouncingMotion.shadowMovePoints =
                    calculateShadowMovePoints(
                        this._bouncingMotion.x,
                        this._bouncingMotion.y,
                        this._bouncingOptions.bounceHeight,
                        this._bouncingOptions.shadowAngle
                    );

            }
        }

    });

    /**
     * Add init hook to calculate animation timeline.
     */
    L.Marker.addInitHook(function() {
        this._bouncingMotion = {
            isBouncing: false,
            bouncingAnimationPlaying: false
        };
        this._calculateTimeline();
    });

    // TODO: decide to redeclare ether only public or only private methods
    var oldSetPos = L.Marker.prototype._setPos;
    var oldOnAdd = L.Marker.prototype.onAdd;
    var oldSetIcon = L.Marker.prototype.setIcon;
    var oldOn = L.Marker.prototype._on;

    /**
     * Redeclaration of _setPos function.
     *
     * @param pos    position object
     */
    L.Marker.prototype._setPos = function(pos) {
        oldSetPos.call(this, pos);
        this._bouncingMotion.x = pos.x;
        this._bouncingMotion.y = pos.y;
        this._calculateTransforms();
    };

    /**
     * Redeclaration of onAdd function.
     *
     * @param map    map object
     */
    L.Marker.prototype.onAdd = function(map) {
        oldOnAdd.call(this, map);

        /* Create base cssText */
        var styles = parseCssText(this._icon.style.cssText);
        delete styles[transform];    // delete old trasform style definition
        delete styles['z-index'];    // delete old z-index

        /* Restores opacity when marker (re)added :
         * 1) checks opacityWhenUnclustered option used by cluster plugin
         * 2) checks opacity option
         * 3) assumes opacity is 1 */
        styles.opacity = this.options.opacityWhenUnclustered
            || this.options.opacity
            || 1;

        this._bouncingMotion.baseIconCssText = renderCssText(styles);

        /* Create base cssText for shadow */
        if (this._shadow) {
            styles = parseCssText(this._shadow.style.cssText);
            delete styles[transform];    // delete old trasform style definition
            delete styles['opacity'];
            this._bouncingMotion.baseShadowCssText = renderCssText(styles);
        }

        this._bouncingMotion.bouncingAnimationPlaying = false;
        if (this._bouncingMotion.isBouncing) {
            this.bounce();
        }
    };

    L.Marker.prototype.setIcon = function(icon) {
        oldSetIcon.call(this, icon);

        var styles = {};

        if (this._icon) {

            /* Create base cssText */
            styles = parseCssText(this._icon.style.cssText);
            delete styles[transform];    // delete old trasform style definition
            delete styles['z-index'];    // delete old z-index

            /* Restores opacity when marker (re)added :
             * 1) checks opacityWhenUnclustered option used by cluster plugin
             * 2) checks opacity option
             * 3) assumes opacity is 1 */
            styles.opacity = this.options.opacityWhenUnclustered
                || this.options.opacity
                || 1;
        }

        this._bouncingMotion.baseIconCssText = renderCssText(styles);

        if (this._shadow) {
            styles = parseCssText(this._shadow.style.cssText);
            delete styles[transform];    // delete old trasform style definition
            delete styles['opacity'];
            this._bouncingMotion.baseShadowCssText = renderCssText(styles);
        }
    };

    L.Marker.prototype._on = function (type, fn, context) {
        var newFn = function (event) {
            if (type === 'click') {
                document.activeElement.blur();
            }

            fn.call(this, event);
        };

        oldOn.call(this, type, newFn, context);
    };

}, window));
