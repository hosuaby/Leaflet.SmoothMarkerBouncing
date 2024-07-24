"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
var _bouncingMarkers = /*#__PURE__*/new WeakMap();
var Orchestration = exports["default"] = /*#__PURE__*/function () {
  function Orchestration() {
    _classCallCheck(this, Orchestration);
    _classPrivateFieldInitSpec(this, _bouncingMarkers, []);
  }
  return _createClass(Orchestration, [{
    key: "getBouncingMarkers",
    value: function getBouncingMarkers() {
      return _classPrivateFieldGet(_bouncingMarkers, this);
    }

    /**
     * Adds the marker to the list of bouncing markers.
     * If flag 'exclusive' is set to true, stops all bouncing markers before.
     *
     * @param marker {Marker}  marker object
     * @param exclusive {boolean}  flag of exclusive bouncing. If set to true, stops the bouncing
     *      of all other markers.
     */
  }, {
    key: "addBouncingMarker",
    value: function addBouncingMarker(marker, exclusive) {
      if (exclusive || marker._bouncingMotion.bouncingOptions.exclusive) {
        this.stopAllBouncingMarkers();
      } else {
        this.stopExclusiveMarkerBouncing();
      }
      _classPrivateFieldGet(_bouncingMarkers, this).push(marker);
    }

    /**
     * Stops the bouncing of exclusive marker.
     */
  }, {
    key: "stopExclusiveMarkerBouncing",
    value: function stopExclusiveMarkerBouncing() {
      var exclusiveMarker = _classPrivateFieldGet(_bouncingMarkers, this).find(function (marker) {
        return marker._bouncingMotion.bouncingOptions.exclusive;
      });
      if (exclusiveMarker) {
        exclusiveMarker.stopBouncing();
      }
    }

    /**
     * Removes the marker from the list of bouncing markers.
     * @param marker {Marker}  marker
     */
  }, {
    key: "removeBouncingMarker",
    value: function removeBouncingMarker(marker) {
      var i = _classPrivateFieldGet(_bouncingMarkers, this).indexOf(marker);
      if (~i) {
        _classPrivateFieldGet(_bouncingMarkers, this).splice(i, 1);
      }
    }

    /**
     * Stops the bouncing of all currently bouncing markers. Purge the array of bouncing markers.
     *
     * @param immediate {boolean} if true, markers stop to bounce immediately, without waiting
     *      animation to end
     */
  }, {
    key: "stopAllBouncingMarkers",
    value: function stopAllBouncingMarkers() {
      var immediate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var marker;
      while (marker = _classPrivateFieldGet(_bouncingMarkers, this).shift()) {
        marker.stopBouncing(immediate);
      }
    }
  }]);
}();