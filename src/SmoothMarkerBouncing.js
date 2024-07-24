import BouncingOptions from './BouncingOptions';
import MarkerPrototypeExt from './MarkerPrototypeExt';
import BouncingMotionCss3 from './BouncingMotionCss3';

export default function SmoothMarkerBouncing(Leaflet) {

    Leaflet.Marker.include(MarkerPrototypeExt(Leaflet));

    /**
     * Registers default options of bouncing animation.
     * @param options {BouncingOptions|object}  object with options
     */
    Leaflet.Marker.setBouncingOptions = function (options) {
        Leaflet.Marker.prototype._bouncingOptions = options instanceof BouncingOptions
                ? options
                : new BouncingOptions(options);
    };

    /**
     * Returns array of currently bouncing markers.
     * @return {Marker[]} array of bouncing markers
     */
    Leaflet.Marker.getBouncingMarkers = function () {
        return Leaflet.Marker.prototype._orchestration.getBouncingMarkers();
    };

    /**
     * Stops the bouncing of all currently bouncing markers. Purge the array of bouncing markers.
     *
     * @param immediate {boolean}  if true, markers stop to bounce immediately, without waiting
     *      animation to end
     */
    Leaflet.Marker.stopAllBouncingMarkers = function (immediate = false) {
        Leaflet.Marker.prototype._orchestration.stopAllBouncingMarkers(immediate);
    };

    Leaflet.Marker.addInitHook(function () {
        if (this.isRealMarker()) {
            const bouncingOptions = new BouncingOptions(
                    Leaflet.Marker.prototype._bouncingOptions);
            this._bouncingMotion = new BouncingMotionCss3(
                    this, new Leaflet.Point(0, 0), bouncingOptions);
        }
    });

    return Leaflet;

}
