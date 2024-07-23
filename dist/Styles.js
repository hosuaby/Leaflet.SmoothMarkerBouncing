"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/** Regex to parse style definitions. */
var regStyle = /([\w-]+): ([^;]+);/g;
var Styles = exports["default"] = /*#__PURE__*/function () {
  function Styles(styles) {
    _classCallCheck(this, Styles);
    styles && Object.assign(this, styles);
  }
  return _createClass(Styles, [{
    key: "findOpacity",
    value: function findOpacity(options) {
      this.opacity = (options === null || options === void 0 ? void 0 : options.opacityWhenUnclustered // used by cluster plugin
      ) || (options === null || options === void 0 ? void 0 : options.opacity) || 1;
    }

    /**
     * Creates a copy of styles merged with provided 'styles'.
     * @param {Object} styles  object with styles to merge
     * @return {Styles} copy of styles
     */
  }, {
    key: "withStyles",
    value: function withStyles(styles) {
      var copy = new Styles(this);
      copy && Object.assign(copy, styles);
      return copy;
    }
  }, {
    key: "toString",
    value: function toString() {
      return Object.entries(this).map(function (entry) {
        return "".concat(entry[0], ": ").concat(entry[1], ";");
      }).join(' ');
    }

    /**
     * Parses cssText attribute into Styles object.
     * @param cssText {string}  cssText string
     * @return {Styles} Styles object
     */
  }], [{
    key: "parse",
    value: function parse(cssText) {
      var styles = {};
      var match = regStyle.exec(cssText);
      while (match) {
        styles[match[1]] = match[2];
        match = regStyle.exec(cssText);
      }
      delete styles['z-index'];
      delete styles['opacity'];
      styles['outline'] = 'none';
      return new Styles(styles);
    }

    /**
     * @param marker {Marker}
     */
  }, {
    key: "ofMarker",
    value: function ofMarker(marker) {
      var styles = Styles.parse(marker._icon.style.cssText);
      styles.findOpacity(marker.options);
      styles['z-index'] = marker._zIndex;
      return styles;
    }
  }]);
}();