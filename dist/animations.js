'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.calculateTimeline = calculateTimeline;
exports.calculateTransforms3D = calculateTransforms3D;
exports.calculateTransformsNo3D = calculateTransformsNo3D;

var _helpers = require('./helpers');

/**
 * Initializes object _bouncingMotion of supplied marker.
 * @param marker {Marker}  marker object
 */
function initBouncingMotion(marker) {
    if (!marker.hasOwnProperty("_bouncingMotion")) {
        marker._bouncingMotion = {
            isBouncing: false
        };
    }
}

/**
 * Calculates moveSteps, moveDelays, resizeSteps & resizeDelays for animation of supplied marker.
 *
 * Animation is defined by shifts of the marker from it's original position. Each step of the
 * animation is a shift of 1px.
 *
 * We define function f(x) - time of waiting between shift of x px and shift of x+1 px.
 *
 * We use for this the inverse function f(x) = a / x; where a is the animation speed and x is the
 * shift from original position in px.
 *
 * @param marker {Marker}  marker object
 * @return {Marker} the same updated marker
 */
function calculateTimeline(marker) {
    var bouncingOptions = marker._bouncingOptions,
        bounceHeight = bouncingOptions.bounceHeight,
        bounceSpeed = bouncingOptions.bounceSpeed,
        elastic = bouncingOptions.elastic;


    initBouncingMotion(marker);

    // Recalculate steps & delays of movement & resize animations
    marker._bouncingMotion.moveSteps = (0, _helpers.calculateSteps)(bounceHeight, 'moveSteps_');
    marker._bouncingMotion.moveDelays = (0, _helpers.calculateDelays)(bounceHeight, bounceSpeed, 'moveDelays_');

    // Calculate resize steps & delays only if elastic animation is enabled
    if (elastic) {
        var contractHeight = bouncingOptions.contractHeight,
            contractSpeed = bouncingOptions.contractSpeed;


        marker._bouncingMotion.resizeSteps = (0, _helpers.calculateSteps)(contractHeight, 'resizeSteps_');
        marker._bouncingMotion.resizeDelays = (0, _helpers.calculateDelays)(contractHeight, contractSpeed, 'resizeDelays_');
    }

    return marker;
}

/**
 * Calculates the transformations of supplied marker in 3D able browser.
 * @param marker {Marker}  marker object
 * @return {Marker} the same updated marker
 */
function calculateTransforms3D(marker) {
    var iconHeight = marker.options.icon.options.iconSize ? marker.options.icon.options.iconSize[1] : marker._iconObj.options.iconSize[1],
        _marker$_bouncingMoti = marker._bouncingMotion,
        x = _marker$_bouncingMoti.x,
        y = _marker$_bouncingMoti.y,
        _marker$_bouncingOpti = marker._bouncingOptions,
        bounceHeight = _marker$_bouncingOpti.bounceHeight,
        contractHeight = _marker$_bouncingOpti.contractHeight,
        shadowAngle = _marker$_bouncingOpti.shadowAngle;

    // Calculate move transforms of icon
    marker._bouncingMotion.iconMoveTransforms = (0, _helpers.calculateIconMoveTransforms)(x, y, bounceHeight);

    // Calculate resize transforms of icon
    marker._bouncingMotion.iconResizeTransforms = (0, _helpers.calculateIconResizeTransforms)(x, y, iconHeight, contractHeight);

    if (marker._shadow) {

        // Calculate move transformations of shadow
        marker._bouncingMotion.shadowMoveTransforms = (0, _helpers.calculateShadowMoveTransforms)(x, y, bounceHeight, shadowAngle);

        // Calculate resize transforms of shadow
        // TODO: use function calculateShadowResizeTransforms
        var height = marker.options.icon.options.shadowSize[1];
        marker._bouncingMotion.shadowResizeTransforms = (0, _helpers.calculateIconResizeTransforms)(x, y, height, contractHeight);
    }
}

/**
 * Calculates the transformations of supplied marker in old (without 3D support) browsers.
 * @param marker {Marker}  marker object
 * @return {Marker} the same updated marker
 */
function calculateTransformsNo3D(marker) {
    var _marker$_bouncingMoti2 = marker._bouncingMotion,
        x = _marker$_bouncingMoti2.x,
        y = _marker$_bouncingMoti2.y,
        _marker$_bouncingOpti2 = marker._bouncingOptions,
        bounceHeight = _marker$_bouncingOpti2.bounceHeight,
        shadowAngle = _marker$_bouncingOpti2.shadowAngle;

    // Calculate move points for the icon

    marker._bouncingMotion.iconMovePoints = (0, _helpers.calculateIconMovePoints)(x, y, bounceHeight);

    // Calculate move points for the shadow
    marker._bouncingMotion.shadowMovePoints = (0, _helpers.calculateShadowMovePoints)(x, y, bounceHeight, shadowAngle);
}