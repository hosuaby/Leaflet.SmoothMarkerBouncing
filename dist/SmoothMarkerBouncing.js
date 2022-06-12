"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var _leaflet = _interopRequireWildcard(require("leaflet"));

var _BouncingOptions = _interopRequireDefault(require("./BouncingOptions"));

var _MarkerPrototypeExt = _interopRequireDefault(require("./MarkerPrototypeExt"));

var _BouncingMotionCss = _interopRequireDefault(require("./BouncingMotionCss3"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
    this._bouncingMotion = new _BouncingMotionCss["default"](this, new _leaflet.Point(0, 0), bouncingOptions);
  }
});