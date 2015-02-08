/*
 * Copyright (c) 2015, Alexei KLENIN
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *   1. Redistributions of source code must retain the above copyright notice,
 *		this list of conditions and the following disclaimer.
 *
 *   2. Redistributions in binary form must reproduce the above copyright
 *		notice, this list of conditions and the following disclaimer in the
 *		documentation and/or other materials provided with the distribution.
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
 * Smooth bouncing for Leaflet markers.
 *
 * @author Alexei KLENIN <alexey_klenin@hotmail.fr>
 */
;(function(L) {

	"use strict";

	var regStyle = /([\w-]+): ([^;]+);/g;

	/**
	 * Parse cssText attribute and transform it into Javascript object with
	 * style definitions as the keys.
	 *
	 * @param cssText - cssText string.
	 * 
	 * @return object with style definitions as the keys.
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
	 * Renders the object with style definitions as string ready to put in
	 * cssText attribute.
	 *
	 * @param styleDefinitions - object with style definitions.
	 *
	 * @return cssText string.
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
	 * Helper function to create an array of transformation definitions of the
	 * animation of movement. Function defines one transform for every pixel of
	 * shift of marker from it's original y position.
	 *
	 * @param x - numeric value of x coordinate of original position of marker;
	 * @param y - numeric value of y coordinate of original position of marker;
	 * @param z - numeric value of z coordinate of original position of marker;
	 * @param bounceHeight - height of bouncing (px).
	 *
	 * @return array of transformation definitions.
	 */
	function createMoveTransforms(x, y, z, bounceHeight) {
		var t = [],						// array of transformations
			dY = bounceHeight + 1;		// delta Y

		/* Use fast inverse while loop to fill the array */
		while (dY--) {

			/* Use matrix3d for hardware acceleration */
			t[dY] = ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,' + x + ',' + (y - dY)
				+ ',0,1) ';
		}

		return t;
	}

	/**
	 * This function do the same thing that createMoveTransforms() but
	 * constructs an array of points instead of transformation definitions. Used
	 * to animate marker on the browsers that doesn't support 'transform'
	 * attribute.
	 *
	 * @param x - numeric value of x coordinate of original position of marker;
	 * @param y - numeric value of y coordinate of original position of marker;
	 * @param z - numeric value of z coordinate of original position of marker;
	 * @param bounceHeight - height of bouncing (px).
	 *
	 * @return array of points [x, y].
	 */
	function createMovePoints(x, y, z, bounceHeight) {
		var p = [],						// array of points
			dY = bounceHeight + 1;		// delta of height

		/* Use fast inverse while loop to fill the array */
		while (dH--) {
			p[dY] = [x, y - dY];
		}

		return p;
	}

	/**
	 * Helper function to create an array of transformation definitions of the
	 * animation of contraction. Function defines one transform for every pixel
	 * of resizing of marker from it's original height.
	 *
	 * @param x - numeric value of x coordinate of original position of marker;
	 * @param y - numeric value of y coordinate of original position of marker;
	 * @param z - numeric value of z coordinate of original position of marker;
	 * @param height - original marker's height;
	 * @param contractHeight - height of contraction (px).
	 *
	 * @return array of transformation definitions.
	 */
	function createResizeTransforms(x, y, z, height, contractHeight) {
		var t = [],						// array of transformations
			dH = contractHeight + 1;	// delta of height

		/* Use fast inverse while loop to fill the array */
		while (dH--) {

			/* Use matrix3d for hardware acceleration */
			t[dH] = ' matrix3d(1,0,0,0,0,' + ((height - dH) / height)
				+ ',0,0,0,0,1,0,' + x + ',' + (y + dH) + ',0,1) ';
		}

		return t;
	}

	/**
	 * Calculates the points to draw the continous line on the screen. Returns
	 * the array of ordered point coordinates. Uses Bresenham algorithm.
	 *
	 * @param xO - x coordinate of origin;
	 * @param yO - y coordinate of origin;
	 * @param angle - angle in radians;
	 * @param length - length of line.
	 *
	 * @return array of ordered point coordinates.
	 *
	 * @see
	 *		http://rosettacode.org/wiki/Bitmap/Bresenham's_line_algorithm#JavaScript
	 */
	function calculateLine(xO, yO, angle, length) {
		// TODO: use something else than multiply length by 2 to calculate the
		// line with defined length
		var xD = Math.round(xO + Math.cos(angle) * (length * 2)),
			yD = Math.round(yO + Math.sin(angle) * (length * 2)),

			dx = Math.abs(xD - xO),
			sx = xO < xD ? 1 : -1,

			dy = Math.abs(yD - yO),
			sy = yO < yD ? 1 : -1,

			err = (dx > dy ? dx : -dy) / 2,
			e2,

			p = [],
			i = 0;

		while (true) {
			p.push([xO, yO]);
			i++;
			if (i === length)
				break;
			e2 = err;
			if (e2 > -dx) {
				err -= dy;
				xO += sx;
			}
			if (e2 < dy) {
				err += dx;
				yO += sy;
			}
		}

		return p;
	}

	/**
	 * Helper function to create an array of transformation definitions of the
	 * animation of movement of shadow. Function defines one transform for every
	 * pixel of shift of shadow from it's original position.
	 *
	 * @param x - numeric value of x coordinate of original position of marker;
	 * @param y - numeric value of y coordinate of original position of marker;
	 * @param z - numeric value of z coordinate of original position of marker;
	 * @param bounceHeight - height of bouncing (px);
	 * @param angle - shadow inclination angle (radians).
	 *
	 * @return array of transformation definitions.
	 */
	function createShadowMoveTransforms(x, y, z, bounceHeight, angle) {
		// TODO: check this method to know if bounceHeight + 1 is normal
		var t = [],					// array of transformation definitions
			p = calculateLine(x, y, angle, bounceHeight + 1),
			dY = bounceHeight + 1;	// delta Y

		/* Use fast inverse while loop to fill the array */
		while (dY--) {

			/* Use matrix3d for hardware acceleration */
			t[dY] = ' matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,' + p[dY][0] + ','
				+ p[dY][1] + ',0,1) ';
		}

		return t;
	}

	/**
	 * This function do the same thing thn function createShadowMoveTransforms()
	 * but instead of transformation definition calculates the points for the
	 * animation of the movement.
	 *
	 * @param x - numeric value of x coordinate of original position of marker;
	 * @param y - numeric value of y coordinate of original position of marker;
	 * @param z - numeric value of z coordinate of original position of marker;
	 * @param bounceHeight - height of bouncing (px);
	 * @param angle - shadow inclination angle (radians).
	 *
	 * @return array of the points [x, y].
	 */
	function createShadowMovePoints(x, y, z, bounceHeight, angle) {
		return calculateLine(x, y, angle, bounceHeight);
	}

	/**
	 * Helper function to create an array of transformation definitions of the
	 * animation of contraction of the shadow. Function defines one transform
	 * for every pixel of resizing of shadow.
	 *
	 * @param x - numeric value of x coordinate of original position of marker;
	 * @param y - numeric value of y coordinate of original position of marker;
	 * @param z - numeric value of z coordinate of original position of marker;
 	 * @param width - original shadow's width;
	 * @param height - original shadow's height;
	 * @param contractHeight - height of contraction (px);
	 * @param angle - shadow inclination angle (radians).
	 *
	 * @return array of transformation definitions.
	 */
	function createShadowResizeTransforms(x, y, z, width, height,
			contractHeight, angle) {
		var t = [],						// array of transformation definitions
			p = calculateLine(width, height, angle + Math.PI, contractHeight),
			dH = contractHeight + 1;	// delta height

		/* Use fast inverse while loop to fill the array */
		while (dH--) {

			/* Use matrix3d for hardware acceleration */
			t[dH] = ' matrix3d(' + (width / p[dH][0]) +  ',0,0,0,0,'
				+ (p[dH][1] / height) + ',0,0,0,0,1,0,' + x + ','
				+ (y + height - p[dH][1]) + ',0,1) ';
		}

		return t;
	}

	/* Default bouncing animation properties */
	L.Marker.prototype._defaultBouncingOptions = {
		bounceHeight 	 : 15,	// how high marker can bounce (px)
		contractHeight	 : 12,	// how much marker can contract (px)
		bounceSpeed		 : 52,	// bouncing speed coefficient
		contractSpeed	 : 52,	// contracting speed coefficient
		shadowAngle		 : - Math.PI / 4, // shadow inclination angle (radians)
		elastic	 		 : true,	// activate contract animation
		exclusif 		 : false,	// many markers can bounce in the same time 
	};

	L.Marker._bouncingMarkers = [];	// array of bouncing markers

	/**
	 * Sets default options of bouncing animation.
	 *
	 * @param options - object with options.
	 */
	// TODO: find more elegant way to extend the marker class in Leaflet
	L.Marker.setBouncingOptions = function(options) {
		// TODO: find more elegant way to merge the options
		for (var option in options) {
			L.Marker.prototype._defaultBouncingOptions[option] =
				options[option];
		}
	};

	/**
	 * Adds the marker to the list of bouncing markers. If flag 'exclusif' is
	 * set to true, stops all bouncing markers before.
	 *
	 * @param marker - L.Marker object;
	 * @param exclusif - flag of exclusif bouncing. If set to true, stops the
	 *		bouncing of all other markers.
	 */
	L.Marker._addBouncingMarker = function(marker, exclusif) {
		if (exclusif || marker._bouncingOptions.exclusif) {
			L.Marker._stopAllBouncing();
		} else {
			L.Marker._stopEclusifMarkerBouncing();
		}
		L.Marker._bouncingMarkers.push(marker);
	};

	/**
	 * Removes the marker from the list of bouncing markers.
	 *
	 * @param marker - L.Marker object;
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
	 * Stops the bouncing of all currently bouncing markers. Purge the array of
	 * bouncing markers.
	 */
	L.Marker._stopAllBouncing = function() {
		var marker;
		while (marker = L.Marker._bouncingMarkers.shift()) {
			marker._bouncingMotion.isBouncing = false;	// stop bouncing
		}
	};

	/**
	 * Stops the bouncing of exclusif marker.
	 */
	L.Marker._stopEclusifMarkerBouncing = function() {
		var i = L.Marker._bouncingMarkers.length;

		if (i) {
			while (i--) {
				if (L.Marker._bouncingMarkers[i]._bouncingOptions.exclusif) {
					L.Marker._bouncingMarkers[i]._bouncingMotion.isBouncing =
						false;	// stop bouncing
					L.Marker._bouncingMarkers.splice(i, 1);
				}
			}
		}
	};

	// TODO: decide to redeclare ether only public or only private methods
	var oldInitialize = L.Marker.prototype.initialize;
	var oldSetPos = L.Marker.prototype._setPos;
	var oldOnAdd = L.Marker.prototype.onAdd;

	/**
	 * Cache for moveSteps, moveDelays, resizeSteps & resizeDelays. 
	 */
	L.Marker.prototype._bouncingMotions = {};

	/**
	 * Helper function to calculate moveSteps, moveDelays, resizeSteps &
	 * resizeDelays of marker.
	 */
	L.Marker.prototype._calculateTimeline = function() {

		/*
		 * Animation is defined by shifts of the marker from it's original
		 * position. Each step of the animation is a shift of 1px.
		 *
		 * We define function f(x) - time of waiting between shift of x px and
		 * shift of x+1 px.
		 *
		 * We use for this the inverse function f(x) = a / x; where a is the
		 * animation speed and x is the shift from original position in px.
		 */

		var motion = {
				moveSteps: [],
				moveDelays: [],

				resizeSteps: [],
				resizeDelays: [],

				baseCssText: ''
			},

			bounceHeight = this._bouncingOptions.bounceHeight,
			bounceSpeed = this._bouncingOptions.bounceSpeed,

			contractHeight = this._bouncingOptions.contractHeight,
			contractSpeed = this._bouncingOptions.contractSpeed,

			moveDeltas = [],
			resizeDeltas = [],

			totalDelay,				// cumulated delta time

			cache = L.Marker.prototype._bouncingMotions,

			/* Iteration counters */
			s,						// steps
			dY = bounceHeight,		// delta Y
			dH = contractHeight,	// delta height
			i = 0,
			l = 0;

		/**
		 * Check the cache for moveSteps
		 */
		if (cache[ 'moveSteps_' + bounceHeight ]) {
			motion.moveSteps = cache[ 'moveSteps_' + bounceHeight ];
		} else {

			/* Calculate the sequence of step of movement animation:
			 * steps = [1 .. bounceHeight] || [bounceHeight-1 .. 0]
			 */
			s = 1;
			while (s <= bounceHeight) {
				motion.moveSteps.push(s++);
			}

			s = bounceHeight;
			while (s--) {
				motion.moveSteps.push(s);
			}

			/* Save move steps to cache */
			cache[ 'moveSteps_' + bounceHeight ] = motion.moveSteps;
		}

		/* Calculate delta time for bouncing animation */

		/* Delta time to movement in one direction */
		moveDeltas[bounceHeight] = bounceSpeed;
		moveDeltas[0] = 0;
		while (--dY) {
			moveDeltas[dY] = Math.round(
				bounceSpeed / (bounceHeight - dY));
		}

		/* Delta time for movement in two directions */
		dY = bounceHeight;
		while (dY--) {
			moveDeltas.push(moveDeltas[dY]);
		}

		/* Check cache for moveDelays */
		if (cache[ 'moveDelays_' + bounceHeight + '_' + bounceSpeed ]) {
			motion.moveDelays = cache[ 'moveDelays_' + bounceHeight + '_'
				+ bounceSpeed ];
		} else {

			/* Calculate move delays (cumulated deltas) */
			totalDelay = 0;
			for (i = 0, l = moveDeltas.length; i < l; i++) {
				totalDelay += moveDeltas[i];
				motion.moveDelays.push(totalDelay);
			}

			/* Save move delays to cache */
			cache[ 'moveDelays_' + bounceHeight + '_'
				+ bounceSpeed ] = motion.moveDelays;
		}

		/* Check cache for resize steps */
		if (cache[ 'resizeSteps_' + contractHeight ]) {
			motion.resizeSteps = cache[ 'resizeSteps_' + contractHeight ];
		} else {

			/* Calculate the sequence of step of contracting animation:
			 * steps = [1 .. contractHeight] || [contractHeight-1 .. 0]
			 */
			s = 1;
			while (s <= contractHeight) {
				motion.resizeSteps.push(s++);
			}

			s = contractHeight;
			while (s--) {
				motion.resizeSteps.push(s);
			}

			/* Save resize steps to cache */
			cache[ 'resizeSteps_' + contractHeight ] = motion.resizeSteps;
		}

		/* Calculate delta time for contracting animation */

		/* Delta time to resizing in one direction */
		resizeDeltas[contractHeight] = contractSpeed;
		resizeDeltas[0] = 0;
		while (--dH) {
			resizeDeltas[dH] = Math.round(
				contractSpeed / (contractHeight - dH));
		}

		/* Delta time for resizing in two directions */
		dH = contractHeight;
		while (dH--) {
			resizeDeltas.push(resizeDeltas[dH]);
		}

		/* Check cache for resize delays */
		if (cache[ 'resizeDelays_' + contractHeight + '_' + contractSpeed ]) {
			motion.resizeDelays = cache[ 'resizeDelays_' + contractHeight + '_'
				+ contractSpeed ];
		} else {

			/* Calculate move delays (cumulated deltas) */
			totalDelay = 0;
			for (i = 0, l = resizeDeltas.length; i < l; i++) {
				totalDelay += resizeDeltas[i];
				motion.resizeDelays.push(totalDelay);
			}

			/* Save resize delays to cache */
			cache[ 'resizeDelays_' + contractHeight + '_' + contractSpeed ] =
				motion.resizeDelays;
		}

		this._bouncingMotion = motion;

	};

	/**
	 * Redeclaration of initialize() function.
	 */
	L.Marker.prototype.initialize = function(latlng, options) {
		oldInitialize.call(this, latlng, options);

		/* Copy default bouncing animation options */
		this._bouncingOptions = {};

		for (var option in L.Marker.prototype._defaultBouncingOptions) {
			this._bouncingOptions[option] =
				L.Marker.prototype._defaultBouncingOptions[option];
		}
		
		this._calculateTimeline();
	};

	/**
	 * Redeclaration of onAdd() function.
	 *
	 * @param map - map object.
	 */
	L.Marker.prototype.onAdd = function(map) {
		oldOnAdd.call(this, map);

		/* Create base cssText */
		var styles = parseCssText(this._icon.style.cssText);
		delete styles.transform;	// delete old trasform style definition
		delete styles['z-index'];	// delete old z-index
		this._bouncingMotion.baseCssText = renderCssText(styles);

		/* Create base cssText for shadow */
		styles = parseCssText(this._shadow.style.cssText);
		delete styles.transform;	// delete old trasform style definition
		this._bouncingMotion.baseShadowCssText = renderCssText(styles);
	};

	/**
	 * Helper function to calculate the trasformations of marker.
	 */
	L.Marker.prototype._calculateTransforms = function() {
		if (L.Browser.any3d) {

			/* Calculate transforms for 3D browsers */

			/* Recalculate move transforms */
			this._bouncingMotion.moveTransforms = createMoveTransforms(
				this._bouncingMotion.x,
				this._bouncingMotion.y,
				0,
				this._bouncingOptions.bounceHeight
			);

			/* Recalculate resize transforms */
			this._bouncingMotion.resizeTransforms = createResizeTransforms(
				this._bouncingMotion.x,
				this._bouncingMotion.y,
				0,
				this.options.icon.options.iconSize[1],
				this._bouncingOptions.contractHeight
			);

			/* Shadow transformations */
			this._bouncingMotion.shadowMoveTransforms = createShadowMoveTransforms(
				this._bouncingMotion.x,
				this._bouncingMotion.y,
				0,
				this._bouncingOptions.bounceHeight,
				this._bouncingOptions.shadowAngle
			);

			this._bouncingMotion.shadowResizeTransforms = createResizeTransforms(
				this._bouncingMotion.x,
				this._bouncingMotion.y,
				0,
				this.options.icon.options.iconSize[1],
				this._bouncingOptions.contractHeight
			);

		} else {

			/* Calculate move points */

			/* For the marker */
			this._bouncingMotion.movePoints = createMovePoints(
				this._bouncingMotion.x,
				this._bouncingMotion.y,
				0,
				this._bouncingOptions.bounceHeight
			);

			/* And for the shadow */
			this._bouncingMotion.shadowMovePoints = createShadowMovePoints(
				this._bouncingMotion.x,
				this._bouncingMotion.y,
				0,
				this._bouncingOptions.bounceHeight,
				this._bouncingOptions.shadowAngle
			);

		}
	};

	/**
	 * Redeclaration of _setPos() function.
	 */
	L.Marker.prototype._setPos = function(pos) {
		oldSetPos.call(this, pos);
		this._bouncingMotion.x = pos.x;
		this._bouncingMotion.y = pos.y;
		this._calculateTransforms();
	};

	L.Marker.include({

		/**
		 * Sets bouncing options of this marker.
		 *
		 * @param options - options of bouncing animation.
		 */
		setBouncingOptions: function(options) {
			// console.log("la vie est belle!")
			// console.log(options);
			for (var option in options) {
				this._bouncingOptions[option] = options[option];
			}

			this._calculateTimeline();		// reinitialize timeline
			this._calculateTransforms();	// reinialize trasformations

			return this;
		},

		/**
		 * Let's bounce now!
		 *
		 * @param options - options of bouncing animation (optional).
		 */
		bounce: function(options) {
			var self = this,
			
				icon = this._icon,
				shadow = this._shadow,

				bounceHeight = self._bouncingOptions.bounceHeight,
				contractHeight = self._bouncingOptions.contractHeight,
				bouncingElastic = self._bouncingOptions.elastic,

				motion = self._bouncingMotion,

				dY = 0,
				dH = 0,

				up = true,

				is3d = L.Browser.any3d,
				transform = L.DomUtil.TRANSFORM,

				moveStepsLength = motion.moveSteps.length,
				resizeStepsLength = motion.resizeSteps.length,

				baseCssText = motion.baseCssText,
				baseShadowCssText = motion.baseShadowCssText,

				moveSteps = motion.moveSteps,
				moveDelays = motion.moveDelays,
				//moveTransforms = motion.moveTransforms,
				//shadowMoveTransforms = motion.shadowMoveTransforms,
				//movePoints = motion.movePoints,
				//shadowMovePoints = motion.shadowMovePoints,

				resizeSteps = motion.resizeSteps,
				resizeDelays = motion.resizeDelays;
				//resizeTransforms = motion.resizeTransforms,
				//shadowResizeTransforms = motion.shadowResizeTransforms;

				// TODO: check, it look like only transformations are enabled,
				// and not simple coordinate change

			/**
			 * Makes the step of bouncing animation.
			 *
			 * @param step - step number.
			 */
			function makeMoveStep(step) {

				/* Reset icon's cssText */
				icon.style.cssText = baseCssText
					+ 'z-index: ' + self._zIndex + ';'
					+ transform + ': ' + motion.moveTransforms[step];

				/* Reset shadow's cssText */
				shadow.style.cssText = baseShadowCssText
					+ transform + ': '
					+ motion.shadowMoveTransforms[step];
			}

			/**
			 * Makes the step of the boucing animation in no 3D web browser.
			 *
			 * @param step - step number.
			 */
			function makeMoveStepNo3D(step) {

				/* Reset icon's cssText */
				icon.style.cssText = baseCssText
					+ 'z-index: ' + self._zIndex + ';';
				icon.style.left =  motion.movePoints[step][0] + 'px';

				/* Reset shadow's cssText */
				shadow.style.cssText = baseShadowCssText;
				icon.style.top =  motion.movePoints[step][1] + 'px';
			}

			/**
			 * Makes the step of resizing animation.
			 *
			 * @param step - step number.
			 */
			function makeResizeStep(step) {

				/* Reset icon's cssText */
				icon.style.cssText = baseCssText
					+ 'z-index: ' + self._zIndex + ';'
					+ transform + ': ' + motion.resizeTransforms[step];

				/* Reset shadow's cssText */
				shadow.style.cssText = baseShadowCssText
					+ transform + ': '
					+ motion.shadowResizeTransforms[step];
			}

			/**
			 * Moves the marker up & down.
			 */
			function move() {
				var i = moveStepsLength;

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
					if (motion.isBouncing) {
						if (bouncingElastic && is3d) {

							/* Resize possible only in 3d browser */
							//up = false;
							resize();
						} else {
							move();
						}
					}
				}, moveDelays[moveStepsLength - 1]);
			}

			/**
			 * Contracts & expands the marker.
			 */
			function resize() {
				var i = resizeStepsLength;

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
				}, resizeDelays[resizeStepsLength - 1]);
			}

			motion.isBouncing = true;
			L.Marker._addBouncingMarker(self, self._bouncingOptions.exclusif);
			move();		// start animation
		},

		/**
		 * Stops the bouncing of the marker. Note: the bouncing not stops
		 * immediatly after the call of this method. Instead, the animation
		 * executed until the marker returns to it's original position and takes
		 * it's full size.
		 */
		stopBouncing: function() {
			this._bouncingMotion.isBouncing = false;
			L.Marker._removeBouncingMarker(this);
		},

		/**
		 * Toogle the bouncing on the marker.
		 */
		toogleBouncing: function() {
			if (this._bouncingMotion && this._bouncingMotion.isBouncing) {
				this.stopBouncing();
			} else {
				this.bounce();
			}
		},

		/**
		 * Returns true if this marker is currently bouncing, false if not.
		 *
		 * @return true - marker is bouncing, false - marker not bouncing.
		 */
		isBouncing: function() {
			return this._bouncingMotion.isBouncing;
		}

	});

})(L);
