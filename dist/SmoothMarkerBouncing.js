"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = SmoothMarkerBouncing;
var _BouncingOptions = _interopRequireDefault(require("./BouncingOptions"));
var _MarkerPrototypeExt = _interopRequireDefault(require("./MarkerPrototypeExt"));
var _BouncingMotionCss = _interopRequireDefault(require("./BouncingMotionCss3"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function SmoothMarkerBouncing(Leaflet) {
  Leaflet.Marker.include((0, _MarkerPrototypeExt["default"])(Leaflet));

  /**
   * Registers default options of bouncing animation.
   * @param options {BouncingOptions|object}  object with options
   */
  Leaflet.Marker.setBouncingOptions = function (options) {
    Leaflet.Marker.prototype._bouncingOptions = options instanceof _BouncingOptions["default"] ? options : new _BouncingOptions["default"](options);
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
  Leaflet.Marker.stopAllBouncingMarkers = function () {
    var immediate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    Leaflet.Marker.prototype._orchestration.stopAllBouncingMarkers(immediate);
  };
  Leaflet.Marker.addInitHook(function () {
    if (this.isRealMarker()) {
      var bouncingOptions = new _BouncingOptions["default"](Leaflet.Marker.prototype._bouncingOptions);
      this._bouncingMotion = new _BouncingMotionCss["default"](this, new Leaflet.Point(0, 0), bouncingOptions);
    }
  });
  return Leaflet;
}