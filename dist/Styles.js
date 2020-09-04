"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _leaflet = require("leaflet");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/** Regex to parse style definitions. */
var regStyle = /([\w-]+): ([^;]+);/g;
/** CSS3 transform properties for different browsers. */

var css3Transforms = {
  transform: 'transform',
  WebkitTransform: '-webkit-transform',
  OTransform: '-o-transform',
  MozTransform: '-moz-transform',
  msTransform: '-ms-transform'
};
/** CSS3 transform property for this browser. */

var transformProperty = css3Transforms[_leaflet.DomUtil.TRANSFORM];

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
     * Creates a copy of styles with provided 'transform' property.
     * @param transform {String}
     * @return {Styles} copy of styles with defined 'transform'.
     */

  }, {
    key: "withTransform",
    value: function withTransform(transform) {
      var copy = new Styles(this);
      copy[transformProperty] = transform;
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

      delete styles[transformProperty];
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