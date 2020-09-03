"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _leaflet = _interopRequireWildcard(require("leaflet"));

var _BouncingOptions = _interopRequireDefault(require("./BouncingOptions"));

var _BouncingMotion3D = _interopRequireDefault(require("./BouncingMotion3D"));

var _BouncingMotionSimple = _interopRequireDefault(require("./BouncingMotionSimple"));

var _MarkerPrototypeExt = _interopRequireDefault(require("./MarkerPrototypeExt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function createBouncingMotion(marker, position, bouncingOptions) {
  return _leaflet.Browser.any3d ? new _BouncingMotion3D["default"](marker, position, bouncingOptions) : new _BouncingMotionSimple["default"](marker, position, bouncingOptions);
}

_leaflet["default"].Marker.include(_MarkerPrototypeExt["default"]);
/**
 * Registers default options of bouncing animation.
 * @param options {BouncingOptions|object}  object with options
 */


_leaflet["default"].Marker.setBouncingOptions = function (options) {
  _leaflet.Marker.prototype._bouncingOptions = options instanceof _BouncingOptions["default"] ? options : new _BouncingOptions["default"](options);
};
/**
 * Returns array of currently bouncing markers.
 * @return {Marker[]} array of bouncing markers
 */


_leaflet["default"].Marker.getBouncingMarkers = function () {
  _leaflet.Marker.prototype._orchestration.getBouncingMarkers();
};
/**
 * Stops the bouncing of all currently bouncing markers. Purge the array of bouncing markers.
 */


_leaflet["default"].Marker.stopAllBouncingMarkers = function () {
  _leaflet.Marker.prototype._orchestration.stopAllBouncingMarkers();
};

_leaflet["default"].Marker.addInitHook(function () {
  if (this.isRealMarker()) {
    var bouncingOptions = new _BouncingOptions["default"](_leaflet.Marker.prototype._bouncingOptions);
    this._bouncingMotion = createBouncingMotion(this, new _leaflet.Point(0, 0), bouncingOptions);
  }
});