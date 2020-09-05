"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _leaflet = require("leaflet");

var _BouncingMotion2 = _interopRequireDefault(require("./BouncingMotion"));

var _Matrix3D = _interopRequireDefault(require("./Matrix3D"));

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

var moveMatrixFormat = _Matrix3D["default"].identity().toFormat('d1', 'd2');

var resizeMatrixFormat = _Matrix3D["default"].identity().toFormat('b2', 'd1', 'd2');

var BouncingMotion3D = /*#__PURE__*/function (_BouncingMotion) {
  _inherits(BouncingMotion3D, _BouncingMotion);

  var _super = _createSuper(BouncingMotion3D);

  /**
   * Constructor.
   *
   * @param marker {Marker}  marker
   * @param position {Point}  marker current position on the map canvas
   * @param bouncingOptions {BouncingOptions}  options of bouncing animation
   */
  function BouncingMotion3D(marker, position, bouncingOptions) {
    var _this;

    _classCallCheck(this, BouncingMotion3D);

    _this = _super.call(this, marker, position, bouncingOptions);

    _defineProperty(_assertThisInitialized(_this), "iconMoveTransforms", void 0);

    _defineProperty(_assertThisInitialized(_this), "iconResizeTransforms", void 0);

    _defineProperty(_assertThisInitialized(_this), "shadowMoveTransforms", void 0);

    _defineProperty(_assertThisInitialized(_this), "shadowResizeTransforms", void 0);

    _this.recalculateMotion(position);

    return _this;
  }

  _createClass(BouncingMotion3D, [{
    key: "recalculateMotion",
    value: function recalculateMotion(position) {
      var _this$marker$getIcon, _this$marker$getIcon$, _this$marker, _this$marker$_iconObj, _this$marker$_iconObj2;

      _get(_getPrototypeOf(BouncingMotion3D.prototype), "recalculateMotion", this).call(this, position);

      var iconHeight = ((_this$marker$getIcon = this.marker.getIcon()) === null || _this$marker$getIcon === void 0 ? void 0 : (_this$marker$getIcon$ = _this$marker$getIcon.options) === null || _this$marker$getIcon$ === void 0 ? void 0 : _this$marker$getIcon$.iconSize[1]) || ((_this$marker = this.marker) === null || _this$marker === void 0 ? void 0 : (_this$marker$_iconObj = _this$marker._iconObj) === null || _this$marker$_iconObj === void 0 ? void 0 : (_this$marker$_iconObj2 = _this$marker$_iconObj.options) === null || _this$marker$_iconObj2 === void 0 ? void 0 : _this$marker$_iconObj2.iconSize[1]);
      var x = position.x,
          y = position.y;
      var _this$bouncingOptions = this.bouncingOptions,
          bounceHeight = _this$bouncingOptions.bounceHeight,
          contractHeight = _this$bouncingOptions.contractHeight,
          shadowAngle = _this$bouncingOptions.shadowAngle;
      this.iconMoveTransforms = BouncingMotion3D.calculateIconMoveTransforms(x, y, bounceHeight);
      this.iconResizeTransforms = BouncingMotion3D.calculateResizeTransforms(x, y, iconHeight, contractHeight);

      if (this.marker._shadow) {
        var _this$marker$getIcon2, _this$marker$getIcon3;

        this.shadowMoveTransforms = BouncingMotion3D.calculateShadowMoveTransforms(x, y, bounceHeight, shadowAngle);
        var shadowHeight = (_this$marker$getIcon2 = this.marker.getIcon()) === null || _this$marker$getIcon2 === void 0 ? void 0 : (_this$marker$getIcon3 = _this$marker$getIcon2.options) === null || _this$marker$getIcon3 === void 0 ? void 0 : _this$marker$getIcon3.shadowSize[1];
        this.shadowResizeTransforms = BouncingMotion3D.calculateResizeTransforms(x, y, shadowHeight, contractHeight);
      }
    }
  }, {
    key: "afterMove",
    value: function afterMove(times) {
      if (this.bouncingOptions.elastic) {
        this.resize(times);
      } else {
        _get(_getPrototypeOf(BouncingMotion3D.prototype), "afterMove", this).call(this, times);
      }
    }
  }, {
    key: "resize",
    value: function resize(times) {
      var _this2 = this;

      var nbResizeSteps = this.resizeSteps.length;
      var i = nbResizeSteps;

      while (i--) {
        setTimeout(function (step) {
          return _this2.makeResizeStep(step);
        }, this.resizeDelays[i], this.resizeSteps[i]);
      }

      setTimeout(function () {
        if (!_this2.isBouncing) {
          _this2.bouncingAnimationPlaying = false;
        }
      }, this.resizeDelays[this.resizeSteps.length]);
      setTimeout(function () {
        if (_this2.isBouncing) {
          _this2.move(times);
        } else {
          _this2.marker.fire('bounceend');
        }
      }, this.resizeDelays[nbResizeSteps - 1]);
    }
  }, {
    key: "makeMoveStep",
    value: function makeMoveStep(step) {
      this.marker._icon.style.cssText = this.iconStyles.withTransform(this.iconMoveTransforms[step]).toString();

      if (this.marker._shadow) {
        this.marker._shadow.style.cssText = this.shadowStyles.withTransform(this.shadowMoveTransforms[step]).toString();
      }
    }
    /**
     * @param step {number}
     */

  }, {
    key: "makeResizeStep",
    value: function makeResizeStep(step) {
      this.marker._icon.style.cssText = this.iconStyles.withTransform(this.iconResizeTransforms[step]).toString();

      if (this.marker._shadow && this.bouncingOptions.shadowAngle) {
        this.marker._shadow.style.cssText = this.shadowStyles.withTransform(this.shadowResizeTransforms[step]).toString();
      }
    }
    /**
     * Returns calculated array of transformation definitions for the animation of icon movement.
     * Function defines one transform for every pixel of shift of the icon from it's original y
     * position.
     *
     * @param x {number}  x coordinate of original position of the marker
     * @param y {number}  y coordinate of original position of the marker
     * @param bounceHeight {number}  height of bouncing (px)
     *
     * @return {string[]} array of transformation definitions
     */

  }], [{
    key: "calculateIconMoveTransforms",
    value: function calculateIconMoveTransforms(x, y, bounceHeight) {
      var transforms = [];
      var deltaY = bounceHeight + 1; // Use fast inverse while loop to fill the array

      while (deltaY--) {
        transforms[deltaY] = moveMatrixFormat(x, y - deltaY);
      }

      return transforms;
    }
    /**
     * Returns calculated array of transformation definitions for the animation of icon resizing.
     * Function defines one transform for every pixel of resizing of marker from it's original
     * height.
     *
     * @param x {number}  x coordinate of original position of marker
     * @param y {number}  y coordinate of original position of marker
     * @param height {number}  original marker height (px)
     * @param contractHeight {number}  height of marker contraction (px)
     *
     * @return {string[]} array of transformation definitions
     */

  }, {
    key: "calculateResizeTransforms",
    value: function calculateResizeTransforms(x, y, height, contractHeight) {
      var transforms = [];
      var deltaHeight = contractHeight + 1; // Use fast inverse while loop to fill the array

      while (deltaHeight--) {
        transforms[deltaHeight] = resizeMatrixFormat((height - deltaHeight) / height, x, y + deltaHeight);
      }

      return transforms;
    }
    /**
     * Returns calculated array of transformation definitions for the animation of shadow movement.
     * Function defines one transform for every pixel of shift of the shadow from it's original
     * position.
     *
     * @param x {number}  x coordinate of original position of marker
     * @param y {number}  y coordinate of original position of marker
     * @param bounceHeight {number}  height of bouncing (px)
     * @param angle {number|null}  shadow inclination angle, if null shadow don't moves from it's
     *      initial position (radians)
     *
     * @return {string[]} array of transformation definitions
     */

  }, {
    key: "calculateShadowMoveTransforms",
    value: function calculateShadowMoveTransforms(x, y, bounceHeight) {
      var angle = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      // TODO: check this method to know if bounceHeight + 1 is normal
      var transforms = [];
      var deltaY = bounceHeight + 1;
      var points = [];

      if (angle != null) {
        // important: 0 is not null
        points = (0, _line.calculateLine)(x, y, angle, bounceHeight + 1);
      } else {
        for (var i = 0; i <= bounceHeight; i++) {
          points[i] = [x, y];
        }
      } // Use fast inverse while loop to fill the array


      while (deltaY--) {
        transforms[deltaY] = moveMatrixFormat(points[deltaY][0], points[deltaY][1]);
      }

      return transforms;
    }
  }]);

  return BouncingMotion3D;
}(_BouncingMotion2["default"]);

exports["default"] = BouncingMotion3D;