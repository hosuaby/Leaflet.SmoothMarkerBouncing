"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _leaflet = require("leaflet");

var _BouncingOptions = _interopRequireDefault(require("./BouncingOptions"));

var _Cache = _interopRequireDefault(require("./Cache"));

var _Styles = _interopRequireDefault(require("./Styles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var bonceEndEvent = 'bounceend';

var BouncingMotion = /*#__PURE__*/function () {
  // TODO: check if this cache working right (keys don't need prefix)

  /**
   * Constructor.
   *
   * @param marker {Marker}  marker
   * @param position {Point}  marker current position on the map canvas
   * @param bouncingOptions {BouncingOptions}  options of bouncing animation
   */
  function BouncingMotion(marker, position, bouncingOptions) {
    _classCallCheck(this, BouncingMotion);

    _defineProperty(this, "marker", void 0);

    _defineProperty(this, "position", void 0);

    _defineProperty(this, "bouncingOptions", void 0);

    _defineProperty(this, "moveSteps", void 0);

    _defineProperty(this, "moveDelays", void 0);

    _defineProperty(this, "resizeSteps", void 0);

    _defineProperty(this, "resizeDelays", void 0);

    _defineProperty(this, "isBouncing", false);

    _defineProperty(this, "iconStyles", void 0);

    _defineProperty(this, "shadowStyles", void 0);

    _defineProperty(this, "bouncingAnimationPlaying", false);

    this.marker = marker;
    this.position = position;
    this.updateBouncingOptions(bouncingOptions);
  }

  _createClass(BouncingMotion, [{
    key: "updateBouncingOptions",
    value: function updateBouncingOptions(options) {
      this.bouncingOptions = options instanceof _BouncingOptions["default"] ? options : this.bouncingOptions.override(options);
      var _this$bouncingOptions = this.bouncingOptions,
          bounceHeight = _this$bouncingOptions.bounceHeight,
          bounceSpeed = _this$bouncingOptions.bounceSpeed,
          elastic = _this$bouncingOptions.elastic;
      this.moveSteps = BouncingMotion.cache.get("moveSteps_".concat(bounceHeight), function () {
        return BouncingMotion.calculateSteps(bounceHeight);
      });
      this.moveDelays = BouncingMotion.cache.get("moveDelays_".concat(bounceHeight, "_").concat(bounceSpeed), function () {
        return BouncingMotion.calculateDelays(bounceHeight, bounceSpeed);
      });

      if (elastic) {
        var _this$bouncingOptions2 = this.bouncingOptions,
            contractHeight = _this$bouncingOptions2.contractHeight,
            contractSpeed = _this$bouncingOptions2.contractSpeed;
        this.resizeSteps = BouncingMotion.cache.get("resizeSteps_".concat(contractHeight), function () {
          return BouncingMotion.calculateSteps(contractHeight);
        });
        this.resizeDelays = BouncingMotion.cache.get("resizeDelays_".concat(contractHeight, "_").concat(contractSpeed), function () {
          return BouncingMotion.calculateDelays(contractHeight, contractSpeed);
        });
      }

      this.recalculateMotion(this.position);
    }
  }, {
    key: "resetStyles",
    value: function resetStyles(marker) {
      this.iconStyles = _Styles["default"].ofMarker(marker);

      if (marker._shadow) {
        this.shadowStyles = _Styles["default"].parse(marker._shadow.style.cssText);
      }
    }
    /**
     * Recalculates bouncing motion for new marker position.
     * @param position {Point} new marker position
     */

  }, {
    key: "recalculateMotion",
    value: function recalculateMotion(position) {
      this.position = position;
    }
    /**
     * @param times {number|null}
     */

  }, {
    key: "bounce",
    value: function bounce() {
      var times = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (this.bouncingAnimationPlaying) {
        this.isBouncing = true;
        return;
      }

      this.isBouncing = true;
      this.bouncingAnimationPlaying = true;
      this.move(times);
    }
  }, {
    key: "stopBouncing",
    value: function stopBouncing() {
      this.isBouncing = false;
    }
    /**
     * @param times {number|null}
     */

  }, {
    key: "move",
    value: function move() {
      var _this = this;

      var times = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (times !== null) {
        if (! --times) {
          this.isBouncing = false; // this is the last bouncing

          this.bouncingAnimationPlaying = false;
        }
      }
      /* Launch timeouts for every step of the movement animation */


      var i = this.moveSteps.length;

      while (i--) {
        setTimeout(function (step) {
          return _this.makeMoveStep(step);
        }, this.moveDelays[i], this.moveSteps[i]);
      }

      setTimeout(function () {
        return _this.afterMove(times);
      }, this.moveDelays[this.moveSteps.length - 1]);
    }
  }, {
    key: "afterMove",
    value: function afterMove(times) {
      var _this2 = this;

      if (this.isBouncing) {
        setTimeout(function () {
          return _this2.move(times);
        }, this.bouncingOptions.bounceSpeed);
      } else {
        this.bouncingAnimationPlaying = false;
        this.marker.fire(bonceEndEvent);
      }
    }
    /**
     * @param step {number}
     */

  }, {
    key: "makeMoveStep",
    value: function makeMoveStep(step) {
      this.marker._icon.style.cssText = this.iconStyles.toString();

      if (this.marker._shadow) {
        this.marker._shadow.style.cssText = this.shadowStyles.toString();
      }
    }
    /**
     * Returns calculated array of animation steps. This function used to calculate both movement
     * and resizing animations.
     *
     * @param height {number}  height of movement or resizing (px)
     *
     * @return {number[]} array of animation steps
     */

  }], [{
    key: "calculateSteps",
    value: function calculateSteps(height) {
      /* Calculate the sequence of animation steps:
       * steps = [1 .. height] concat [height-1 .. 0]
       */
      var i = 1;
      var steps = [];

      while (i <= height) {
        steps.push(i++);
      }

      i = height;

      while (i--) {
        steps.push(i);
      }

      return steps;
    }
    /**
     * Returns calculated array of delays between animation start and the steps of animation. This
     * function used to calculate both movement and resizing animations. Element with index i of
     * this array contains the delay in milliseconds between animation start and the step number i.
     *
     * @param height {number}  height of movement or resizing (px)
     * @param speed {number}  speed coefficient
     *
     * @return {number[]} array of delays before steps of animation
     */

  }, {
    key: "calculateDelays",
    value: function calculateDelays(height, speed) {
      // Calculate delta time for bouncing animation
      // Delta time to movement in one direction
      var deltas = []; // time between steps of animation

      deltas[height] = speed;
      deltas[0] = 0;
      var i = height;

      while (--i) {
        deltas[i] = Math.round(speed / (height - i));
      } // Delta time for movement in two directions


      i = height;

      while (i--) {
        deltas.push(deltas[i]);
      } // Calculate move delays (cumulated deltas)
      // TODO: instead of deltas.lenght write bounceHeight * 2 - 1


      var delays = []; // delays before steps from beginning of animation

      var totalDelay = 0;

      for (i = 0; i < deltas.length; i++) {
        totalDelay += deltas[i];
        delays.push(totalDelay);
      }

      return delays;
    }
  }]);

  return BouncingMotion;
}();

exports["default"] = BouncingMotion;

_defineProperty(BouncingMotion, "cache", new _Cache["default"]());