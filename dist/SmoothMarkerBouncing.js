"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _leaflet = _interopRequireWildcard(require("leaflet"));
var _BouncingOptions = _interopRequireDefault(require("./BouncingOptions"));
var _MarkerPrototypeExt = _interopRequireDefault(require("./MarkerPrototypeExt"));
var _BouncingMotionCss = _interopRequireDefault(require("./BouncingMotionCss3"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
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
 *
 * @param immediate {boolean} if true, markers stop to bounce immediately, without waiting
 *      animation to end
 */
_leaflet["default"].Marker.stopAllBouncingMarkers = function () {
  var immediate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  _leaflet.Marker.prototype._orchestration.stopAllBouncingMarkers(immediate);
};
_leaflet["default"].Marker.addInitHook(function () {
  if (this.isRealMarker()) {
    var bouncingOptions = new _BouncingOptions["default"](_leaflet.Marker.prototype._bouncingOptions);
    this._bouncingMotion = new _BouncingMotionCss["default"](this, new _leaflet.Point(0, 0), bouncingOptions);
  }
});