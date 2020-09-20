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
    Marker.prototype._orchestration.getBouncingMarkers();
};

/**
 * Stops the bouncing of all currently bouncing markers. Purge the array of bouncing markers.
 */
L.Marker.stopAllBouncingMarkers = function() {
    Marker.prototype._orchestration.stopAllBouncingMarkers();
};

L.Marker.addInitHook(function() {
    if (this.isRealMarker()) {
        const bouncingOptions = new BouncingOptions(Marker.prototype._bouncingOptions);
        this._bouncingMotion = new BouncingMotionCss3(this, new Point(0, 0), bouncingOptions);
    }
});
