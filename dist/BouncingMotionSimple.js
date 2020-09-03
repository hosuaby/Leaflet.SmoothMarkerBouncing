"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _BouncingMotion2 = _interopRequireDefault(require("./BouncingMotion"));

var _line = require("./line");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BouncingMotionSimple = /*#__PURE__*/function (_BouncingMotion) {
  _inherits(BouncingMotionSimple, _BouncingMotion);

  var _super = _createSuper(BouncingMotionSimple);

  /**
   * Constructor.
   *
   * @param marker {Marker}  marker
   * @param position {Point}  marker current position on the map canvas
   * @param bouncingOptions {BouncingOptions}  options of bouncing animation
   */
  function BouncingMotionSimple(marker, position, bouncingOptions) {
    var _this;

    _classCallCheck(this, BouncingMotionSimple);

    _this = _super.call(this, marker, position, bouncingOptions);

    _defineProperty(_assertThisInitialized(_this), "iconMovePoints", void 0);

    _defineProperty(_assertThisInitialized(_this), "shadowMovePoints", void 0);

    _this.recalculateMotion(position);

    return _this;
  }

  _createClass(BouncingMotionSimple, [{
    key: "recalculateMotion",
    value: function recalculateMotion(position) {
      _get(_getPrototypeOf(BouncingMotionSimple.prototype), "recalculateMotion", this).call(this, position);

      var x = position.x,
          y = position.y;
      var _this$bouncingOptions = this.bouncingOptions,
          bounceHeight = _this$bouncingOptions.bounceHeight,
          shadowAngle = _this$bouncingOptions.shadowAngle;
      this.iconMovePoints = BouncingMotionSimple.calculateIconMovePoints(x, y, bounceHeight);
      this.shadowMovePoints = BouncingMotionSimple.calculateShadowMovePoints(x, y, bounceHeight, shadowAngle);
    }
  }, {
    key: "makeMoveStep",
    value: function makeMoveStep(step) {
      _get(_getPrototypeOf(BouncingMotionSimple.prototype), "makeMoveStep", this).call(this, step);

      this.marker._icon.style.left = this.iconMovePoints[step][0] + 'px';
      this.marker._icon.style.top = this.iconMovePoints[step][1] + 'px';

      if (this.marker._shadow) {
        this.marker._shadow.style.left = this.shadowMovePoints[step][0] + 'px';
        this.marker._shadow.style.top = this.shadowMovePoints[step][1] + 'px';
      }
    }
    /**
     * Returns calculated array of points for icon movement. Used to animate markers in browsers
     * that doesn't support 'transform' attribute.
     *
     * @param x {number}  x coordinate of original position of the marker
     * @param y {number}  y coordinate of original position of the marker
     * @param bounceHeight {number}  height of bouncing (px)
     *
     * @return {[number, number][]} array of points
     */

  }], [{
    key: "calculateIconMovePoints",
    value: function calculateIconMovePoints(x, y, bounceHeight) {
      var deltaHeight = bounceHeight + 1;
      var points = []; // Use fast inverse while loop to fill the array

      while (deltaHeight--) {
        points[deltaHeight] = [x, y - deltaHeight];
      }

      return points;
    }
    /**
     * Returns calculated array of points for shadow movement. Used to animate markers in browsers
     * that doesn't support 'transform' attribute.
     *
     * @param x {number}  x coordinate of original position of the marker
     * @param y {number}  y coordinate of original position of the marker
     * @param bounceHeight {number}  height of bouncing (px)
     * @param angle {number}  shadow inclination angle, if null shadow don't moves from it's initial
     *      position (radians)
     *
     * @return {[number, number][]} array of points
     */

  }, {
    key: "calculateShadowMovePoints",
    value: function calculateShadowMovePoints(x, y, bounceHeight, angle) {
      if (angle != null) {
        // important: 0 is not null
        return (0, _line.calculateLine)(x, y, angle, bounceHeight + 1);
      } else {
        var points = [];

        for (var i = 0; i <= bounceHeight; i++) {
          points[i] = [x, y];
        }

        return points;
      }
    }
  }]);

  return BouncingMotionSimple;
}(_BouncingMotion2["default"]);

exports["default"] = BouncingMotionSimple;