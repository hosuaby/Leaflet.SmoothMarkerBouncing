"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/** Regex to parse style definitions. */
var regStyle = /([\w-]+): ([^;]+);/g;

var Styles = /*#__PURE__*/function () {
  function Styles(styles) {
    _classCallCheck(this, Styles);

    styles && Object.assign(this, styles);
  }

  _createClass(Styles, [{
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

  return Styles;
}();

exports["default"] = Styles;