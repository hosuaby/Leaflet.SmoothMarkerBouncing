"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var BouncingOptions = exports["default"] = /*#__PURE__*/function () {
  function BouncingOptions(options) {
    _classCallCheck(this, BouncingOptions);
    /**
     * How high marker can bounce (px)
     * @type {number}
     */
    _defineProperty(this, "bounceHeight", 15);
    /**
     * How much marker can contract (px)
     * @type {number}
     */
    _defineProperty(this, "contractHeight", 12);
    /**
     * Bouncing speed coefficient
     * @type {number}
     */
    _defineProperty(this, "bounceSpeed", 52);
    /**
     * Contracting speed coefficient
     * @type {number}
     */
    _defineProperty(this, "contractSpeed", 52);
    /**
     * Shadow inclination angle(radians); null to cancel shadow movement
     * @type {number}
     */
    _defineProperty(this, "shadowAngle", -Math.PI / 4);
    /**
     * Activate contract animation
     * @type {boolean}
     */
    _defineProperty(this, "elastic", true);
    /**
     * Many markers can bounce in the same time
     * @type {boolean}
     */
    _defineProperty(this, "exclusive", false);
    /**
     * If true, when marker stops, it does not execute animation until its end, but instead stops
     * abruptly.
     * @type {boolean}
     */
    _defineProperty(this, "immediateStop", false);
    options && Object.assign(this, options);
  }
  return _createClass(BouncingOptions, [{
    key: "override",
    value: function override(options) {
      return Object.assign(new BouncingOptions(this), options);
    }
  }]);
}();