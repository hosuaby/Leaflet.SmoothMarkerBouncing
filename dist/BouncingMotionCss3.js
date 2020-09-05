"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _leaflet = require("leaflet");

var _BouncingMotion2 = _interopRequireDefault(require("./BouncingMotion"));

var _line = require("./line");

require("./bouncing.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

var animationNamePrefix = 'l-smooth-marker-bouncing-';
var moveAnimationName = animationNamePrefix + 'move';
var contractAnimationName = animationNamePrefix + 'contract';
/*
 * CSS3 animation runs faster than transform-based animation. We need to reduce speed in order
 * to be compatible with old API.
 */

var speedCoefficient = 0.8;
/**
 * Removes and then resets required classes on the HTML element.
 * Used as hack to restart CSS3 animation.
 *
 * @param element {HTMLElement}  HTML element
 * @param classes {string[]}  names of classes
 */

function resetClasses(element, classes) {
  classes.forEach(function (className) {
    return _leaflet.DomUtil.removeClass(element, className);
  });
  void element.offsetWidth;
  classes.forEach(function (className) {
    return _leaflet.DomUtil.addClass(element, className);
  });
}

var _lastAnimationName = new WeakMap();

var _classes = new WeakMap();

var _eventCounter = new WeakMap();

var _times = new WeakMap();

var BouncingMotionCss3 = /*#__PURE__*/function (_BouncingMotion) {
  _inherits(BouncingMotionCss3, _BouncingMotion);

  var _super = _createSuper(BouncingMotionCss3);

  function BouncingMotionCss3() {
    var _this;

    _classCallCheck(this, BouncingMotionCss3);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _lastAnimationName.set(_assertThisInitialized(_this), {
      writable: true,
      value: contractAnimationName
    });

    _classes.set(_assertThisInitialized(_this), {
      writable: true,
      value: ['bouncing']
    });

    _eventCounter.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    _times.set(_assertThisInitialized(_this), {
      writable: true,
      value: void 0
    });

    return _this;
  }

  _createClass(BouncingMotionCss3, [{
    key: "updateBouncingOptions",
    value: function updateBouncingOptions(options) {
      _get(_getPrototypeOf(BouncingMotionCss3.prototype), "updateBouncingOptions", this).call(this, options);

      if (!this.bouncingOptions.elastic) {
        _classPrivateFieldSet(this, _lastAnimationName, moveAnimationName);

        _classPrivateFieldGet(this, _classes).push('simple');
      }
    }
  }, {
    key: "onAnimationEnd",
    value: function onAnimationEnd(event) {
      var _this2 = this;

      if (event.animationName === _classPrivateFieldGet(this, _lastAnimationName)) {
        var _this$eventCounter;

        _classPrivateFieldSet(this, _eventCounter, (_this$eventCounter = +_classPrivateFieldGet(this, _eventCounter)) + 1), _this$eventCounter;

        _classPrivateFieldSet(this, _eventCounter, _classPrivateFieldGet(this, _eventCounter) % 2);

        if (!_classPrivateFieldGet(this, _eventCounter)) {
          if (this.isBouncing && (_classPrivateFieldGet(this, _times) === null || _classPrivateFieldSet(this, _times, +_classPrivateFieldGet(this, _times) - 1))) {
            resetClasses(this.marker._icon, _classPrivateFieldGet(this, _classes));
            resetClasses(this.marker._shadow, _classPrivateFieldGet(this, _classes));
          } else {
            _classPrivateFieldGet(this, _classes).forEach(function (className) {
              _leaflet.DomUtil.removeClass(_this2.marker._icon, className);

              _leaflet.DomUtil.removeClass(_this2.marker._shadow, className);
            });

            this.bouncingAnimationPlaying = false;
          }
        }
      }
    }
  }, {
    key: "resetStyles",
    value: function resetStyles(marker) {
      var _this$marker$getIcon, _this$marker$getIcon$, _this$marker, _this$marker$_iconObj, _this$marker$_iconObj2;

      _get(_getPrototypeOf(BouncingMotionCss3.prototype), "resetStyles", this).call(this, marker);

      var iconHeight = ((_this$marker$getIcon = this.marker.getIcon()) === null || _this$marker$getIcon === void 0 ? void 0 : (_this$marker$getIcon$ = _this$marker$getIcon.options) === null || _this$marker$getIcon$ === void 0 ? void 0 : _this$marker$getIcon$.iconSize[1]) || ((_this$marker = this.marker) === null || _this$marker === void 0 ? void 0 : (_this$marker$_iconObj = _this$marker._iconObj) === null || _this$marker$_iconObj === void 0 ? void 0 : (_this$marker$_iconObj2 = _this$marker$_iconObj.options) === null || _this$marker$_iconObj2 === void 0 ? void 0 : _this$marker$_iconObj2.iconSize[1]);
      var iconAnimationParams = BouncingMotionCss3.animationParams(this.position, this.bouncingOptions, iconHeight);
      this.iconStyles = this.iconStyles.withStyles(iconAnimationParams);
      this.marker._icon.style.cssText = this.iconStyles.toString();
      var _this$position = this.position,
          x = _this$position.x,
          y = _this$position.y;
      var _this$bouncingOptions = this.bouncingOptions,
          bounceHeight = _this$bouncingOptions.bounceHeight,
          shadowAngle = _this$bouncingOptions.shadowAngle;

      if (this.marker._shadow && shadowAngle) {
        var points = (0, _line.calculateLine)(x, y, shadowAngle, bounceHeight + 1);

        var _points$bounceHeight = _slicedToArray(points[bounceHeight], 2),
            posXJump = _points$bounceHeight[0],
            posYJump = _points$bounceHeight[1];

        this.shadowStyles = this.shadowStyles.withStyles(iconAnimationParams).withStyles({
          '--pos-x-jump': "".concat(posXJump, "px"),
          '--pos-y-jump': "".concat(posYJump, "px")
        });
        this.marker._shadow.style.cssText = this.shadowStyles.toString();
      }
    }
  }, {
    key: "bounce",
    value: function bounce() {
      var _this3 = this;

      var times = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      _classPrivateFieldSet(this, _times, times);

      _classPrivateFieldSet(this, _eventCounter, 0);

      this.isBouncing = true;

      if (this.bouncingAnimationPlaying) {
        return;
      }

      this.bouncingAnimationPlaying = true;
      resetClasses(this.marker._icon, _classPrivateFieldGet(this, _classes));
      resetClasses(this.marker._shadow, _classPrivateFieldGet(this, _classes));

      this.marker._icon.addEventListener('animationend', function (event) {
        return _this3.onAnimationEnd(event);
      });
    }
    /**
     * Calculates parameters of CSS3 animation of bouncing.
     *
     * @param position {Point}  marker current position on the map canvas
     * @param bouncingOptions {BouncingOptions}  options of bouncing animation
     * @param height {number}  icons height
     * @return {object} CSS3 animation parameters
     */

  }], [{
    key: "animationParams",
    value: function animationParams(position, bouncingOptions, height) {
      var x = position.x,
          y = position.y;
      var bounceHeight = bouncingOptions.bounceHeight,
          contractHeight = bouncingOptions.contractHeight,
          bounceSpeed = bouncingOptions.bounceSpeed,
          contractSpeed = bouncingOptions.contractSpeed;
      var scaleContract = BouncingMotionCss3.contractScale(height, contractHeight);
      var durationJump = BouncingMotionCss3.calculateDuration(bounceHeight, bounceSpeed);
      var durationContract = BouncingMotionCss3.calculateDuration(contractHeight, contractSpeed);
      var delays = [0, durationJump, durationJump * 2, durationJump * 2 + durationContract];
      return {
        '--pos-x': "".concat(x, "px"),
        '--pos-y': "".concat(y, "px"),
        '--pos-y-jump': "".concat(y - bounceHeight, "px"),
        '--pos-y-contract': "".concat(y + contractHeight, "px"),
        '--scale-contract': scaleContract,
        '--duration-jump': "".concat(durationJump, "ms"),
        '--duration-contract': "".concat(durationContract, "ms"),
        '--delays': "0ms, ".concat(delays[1], "ms, ").concat(delays[2], "ms, ").concat(delays[3], "ms")
      };
    }
    /**
     * Calculates scale of contracting.
     *
     * @param {number} height  original height
     * @param {number} contractHeight  how much it must contract
     * @return {number}  contracting scale between 0 and 1
     */

  }, {
    key: "contractScale",
    value: function contractScale(height, contractHeight) {
      return (height - contractHeight) / height;
    }
    /**
     * Calculates duration of animation.
     *
     * @param height {number}  height of movement or resizing (px)
     * @param speed {number}  speed coefficient
     *
     * @return {number} duration of animation (ms)
     */

  }, {
    key: "calculateDuration",
    value: function calculateDuration(height, speed) {
      var duration = Math.round(speed * speedCoefficient);
      var i = height;

      while (--i) {
        duration += Math.round(speed / (height - i));
      }

      return duration;
    }
  }]);

  return BouncingMotionCss3;
}(_BouncingMotion2["default"]);

exports["default"] = BouncingMotionCss3;