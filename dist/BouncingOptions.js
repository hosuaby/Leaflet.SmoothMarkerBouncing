"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BouncingOptions = /*#__PURE__*/function () {
  /**
   * How high marker can bounce (px)
   * @type {number}
   */

  /**
   * How much marker can contract (px)
   * @type {number}
   */

  /**
   * Bouncing speed coefficient
   * @type {number}
   */

  /**
   * Contracting speed coefficient
   * @type {number}
   */

  /**
   * Shadow inclination angle(radians); null to cancel shadow movement
   * @type {number}
   */

  /**
   * Activate contract animation
   * @type {boolean}
   */

  /**
   * Many markers can bounce in the same time
   * @type {boolean}
   */
  function BouncingOptions(options) {
    _classCallCheck(this, BouncingOptions);

    _defineProperty(this, "bounceHeight", 15);

    _defineProperty(this, "contractHeight", 12);

    _defineProperty(this, "bounceSpeed", 52);

    _defineProperty(this, "contractSpeed", 52);

    _defineProperty(this, "shadowAngle", -Math.PI / 4);

    _defineProperty(this, "elastic", true);

    _defineProperty(this, "exclusive", false);

    options && Object.assign(this, options);
  }

  _createClass(BouncingOptions, [{
    key: "override",
    value: function override(options) {
      return Object.assign(new BouncingOptions(this), options);
    }
  }]);

  return BouncingOptions;
}();

exports["default"] = BouncingOptions;