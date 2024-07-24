import L, {Marker, Point} from 'leaflet';
import BouncingOptions from './BouncingOptions';
import MarkerPrototypeExt from './MarkerPrototypeExt';
import BouncingMotionCss3 from './BouncingMotionCss3';

L.Marker.include(MarkerPrototypeExt);

/**
 * Registers default options of bouncing animation.
 * @param options {BouncingOptions|object}  object with options
 */
L.Marker.setBouncingOptions = function(options) {
    Marker.prototype._bouncingOptions = options instanceof BouncingOptions
            ? options
            : new BouncingOptions(options);
};

/**
 * Returns array of currently bouncing markers.
 * @return {Marker[]} array of bouncing markers
 */
L.Marker.getBouncingMarkers = function() {
    return Marker.prototype._orchestration.getBouncingMarkers();
};

/**
 * Stops the bouncing of all currently bouncing markers. Purge the array of bouncing markers.
 *
 * @param immediate {boolean} if true, markers stop to bounce immediately, without waiting
 *      animation to end
 */
L.Marker.stopAllBouncingMarkers = function(immediate = false) {
    Marker.prototype._orchestration.stopAllBouncingMarkers(immediate);
};

L.Marker.addInitHook(function() {
    if (this.isRealMarker()) {
        const bouncingOptions = new BouncingOptions(Marker.prototype._bouncingOptions);
        this._bouncingMotion = new BouncingMotionCss3(this, new Point(0, 0), bouncingOptions);
    }
});
