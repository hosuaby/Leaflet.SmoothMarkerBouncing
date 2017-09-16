'use strict';

var _leaflet = require('leaflet');

var _leaflet2 = _interopRequireDefault(_leaflet);

var _animations = require('./animations');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Default bouncing animation properties. */
var defaultBouncingOptions = {
    bounceHeight: 15, // how high marker can bounce (px)
    contractHeight: 12, // how much marker can contract (px)
    bounceSpeed: 52, // bouncing speed coefficient
    contractSpeed: 52, // contracting speed coefficient
    shadowAngle: -Math.PI / 4, // shadow inclination angle(radians); null to cancel shadow movement
    elastic: true, // activate contract animation
    exclusive: false // many markers can bounce in the same time
};

/** Array of bouncing markers. */
_leaflet.Marker._bouncingMarkers = [];

/** Bouncing options shared by all markers. */
_leaflet.Marker.prototype._bouncingOptions = defaultBouncingOptions;

/**
 * Registers default options of bouncing animation.
 * @param options {object}  object with options
 */
_leaflet.Marker.setBouncingOptions = function (options) {
    _leaflet2.default.extend(_leaflet.Marker.prototype._bouncingOptions, options);
};

/**
 * Returns array of currently bouncing markers.
 * @return {Marker[]} array of bouncing markers
 */
_leaflet.Marker.getBouncingMarkers = function () {
    return _leaflet.Marker._bouncingMarkers;
};

/**
 * Stops the bouncing of all currently bouncing markers. Purge the array of bouncing markers.
 */
_leaflet.Marker.stopAllBouncingMarkers = function () {
    var marker;

    while (marker = _leaflet.Marker._bouncingMarkers.shift()) {
        marker._bouncingMotion.isBouncing = false; // stop bouncing
    }
};

/**
 * Registers options of bouncing animation for this marker. After registration of options for
 * this marker, it will ignore changes of default options. Function automatically recalculates
 * animation steps and delays.
 *
 * @param options {object}  options object
 * @return {Marker} this marker
 */
_leaflet.Marker.prototype.setBouncingOptions = function (options) {
    if (!this.hasOwnProperty('_bouncingOptions')) {
        this._bouncingOptions = _leaflet2.default.extend({}, defaultBouncingOptions);
    }

    _leaflet2.default.extend(this._bouncingOptions, options);

    // Recalculate steps & delays of movement & resize animations
    (0, _animations.calculateTimeline)(this);

    // Recalculate transformations
    if (_leaflet2.default.Browser.any3d) {
        (0, _animations.calculateTransforms3D)(this);
    } else {
        (0, _animations.calculateTransformsNo3D)(this);
    }

    return this;
};

/**
 * Returns true if this marker is bouncing. If this marker is not bouncing returns false.
 * @return {boolean} true if marker is bouncing, false if not
 */
_leaflet.Marker.prototype.isBouncing = function () {
    return this._bouncingMotion.isBouncing;
};

/**
 * Adds the marker to the list of bouncing markers. If flag 'exclusive' is set to true, stops all
 * bouncing markers before.
 *
 * @param marker {Marker}  marker object
 * @param exclusive {boolean}  flag of exclusive bouncing. If set to true, stops the bouncing of all
 *      other markers.
 */
function addBouncingMarker(marker, exclusive) {
    if (exclusive || marker._bouncingOptions.exclusive) {
        _leaflet.Marker.stopAllBouncingMarkers();
    } else {
        _leaflet.Marker._stopEclusiveMarkerBouncing();
    }

    _leaflet.Marker._bouncingMarkers.push(marker);
}

/**
 * Removes the marker from the list of bouncing markers.
 * @param marker {Marker}  marker object
 */
function removeBouncingMarker(marker) {
    var i = void 0;

    if (i = _leaflet.Marker._bouncingMarkers.length) {
        while (i--) {
            if (_leaflet.Marker._bouncingMarkers[i] == marker) {
                _leaflet.Marker._bouncingMarkers.splice(i, 1);
                break;
            }
        }
    }
}

/**
 * Stops the bouncing of exclusive marker.
 */
function stopEclusiveMarkerBouncing() {
    var i = void 0;

    if (i = _leaflet.Marker._bouncingMarkers.length) {
        while (i--) {
            if (_leaflet.Marker._bouncingMarkers[i]._bouncingOptions.exclusive) {
                _leaflet.Marker._bouncingMarkers[i]._bouncingMotion.isBouncing = false; // stop bouncing
                _leaflet.Marker._bouncingMarkers.splice(i, 1);
                break;
            }
        }
    }
}