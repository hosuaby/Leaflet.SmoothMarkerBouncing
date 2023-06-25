"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _leaflet = require("leaflet");

var _line = require("./line");

require("./bouncing.css");

var _BouncingOptions = _interopRequireDefault(require("./BouncingOptions"));

var _Styles = _interopRequireDefault(require("./Styles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

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

var _lastAnimationName = /*#__PURE__*/new WeakMap();

var _classes = /*#__PURE__*/new WeakMap();

var _eventCounter = /*#__PURE__*/new WeakMap();

var _times = /*#__PURE__*/new WeakMap();

var _listener = /*#__PURE__*/new WeakMap();

var BouncingMotionCss3 = /*#__PURE__*/function () {
  /**
   * Constructor.
   *
   * @param marker {Marker}  marker
   * @param position {Point}  marker current position on the map canvas
   * @param bouncingOptions {BouncingOptions}  options of bouncing animation
   */
  function BouncingMotionCss3(marker, position, bouncingOptions) {
    var _this = this;

    _classCallCheck(this, BouncingMotionCss3);

    _defineProperty(this, "marker", void 0);

    _defineProperty(this, "position", void 0);

    _defineProperty(this, "bouncingOptions", void 0);

    _defineProperty(this, "isBouncing", false);

    _defineProperty(this, "iconStyles", void 0);

    _defineProperty(this, "shadowStyles", void 0);

    _defineProperty(this, "bouncingAnimationPlaying", false);

    _defineProperty(this, "onMotionEnd", void 0);

    _classPrivateFieldInitSpec(this, _lastAnimationName, {
      writable: true,
      value: contractAnimationName
    });

    _classPrivateFieldInitSpec(this, _classes, {
      writable: true,
      value: ['bouncing']
    });

    _classPrivateFieldInitSpec(this, _eventCounter, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _times, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _listener, {
      writable: true,
      value: function value(event) {
        return _this.onAnimationEnd(event);
      }
    });

    this.marker = marker;
    this.position = position;
    this.updateBouncingOptions(bouncingOptions);
  }

  _createClass(BouncingMotionCss3, [{
    key: "updateBouncingOptions",
    value: function updateBouncingOptions(options) {
      this.bouncingOptions = options instanceof _BouncingOptions["default"] ? options : this.bouncingOptions.override(options);

      if (this.bouncingOptions.elastic && this.bouncingOptions.contractHeight) {
        _classPrivateFieldSet(this, _lastAnimationName, contractAnimationName);

        var index = _classPrivateFieldGet(this, _classes).indexOf('simple');

        if (index > -1) {
          _classPrivateFieldGet(this, _classes).splice(index, 1);
        }

        if (this.marker._icon) {
          _leaflet.DomUtil.removeClass(this.marker._icon, 'simple');
        }
      } else {
        _classPrivateFieldSet(this, _lastAnimationName, moveAnimationName);

        _classPrivateFieldGet(this, _classes).push('simple');
      }

      if (this.marker._icon) {
        this.resetStyles(this.marker);
      }
    }
  }, {
    key: "onAnimationEnd",
    value: function onAnimationEnd(event) {
      var _this2 = this;

      if (event.animationName === _classPrivateFieldGet(this, _lastAnimationName)) {
        var _this$eventCounter, _this$eventCounter2;

        _classPrivateFieldSet(this, _eventCounter, (_this$eventCounter = _classPrivateFieldGet(this, _eventCounter), _this$eventCounter2 = _this$eventCounter++, _this$eventCounter)), _this$eventCounter2;

        _classPrivateFieldSet(this, _eventCounter, _classPrivateFieldGet(this, _eventCounter) % 2);

        if (!_classPrivateFieldGet(this, _eventCounter)) {
          var _this$times;

          if (this.isBouncing && (_classPrivateFieldGet(this, _times) === null || _classPrivateFieldSet(this, _times, (_this$times = _classPrivateFieldGet(this, _times), --_this$times)))) {
            resetClasses(this.marker._icon, _classPrivateFieldGet(this, _classes));

            if (this.marker._shadow && this.bouncingOptions.shadowAngle) {
              resetClasses(this.marker._shadow, _classPrivateFieldGet(this, _classes));
            }
          } else {
            _classPrivateFieldGet(this, _classes).forEach(function (className) {
              _leaflet.DomUtil.removeClass(_this2.marker._icon, className);

              if (_this2.marker._shadow) {
                _leaflet.DomUtil.removeClass(_this2.marker._shadow, className);
              }
            });

            this.bouncingAnimationPlaying = false;

            if (this.onMotionEnd) {
              this.onMotionEnd();
              this.onMotionEnd = null;
            }

            this.marker.fire('bounceend');
          }
        }
      }
    }
  }, {
    key: "resetStyles",
    value: function resetStyles(marker) {
      var _this$marker$getIcon,
          _this$marker$getIcon$,
          _this$marker,
          _this$marker$_iconObj,
          _this$marker$_iconObj2,
          _this3 = this;

      this.marker = marker;
      this.iconStyles = _Styles["default"].ofMarker(marker);

      if (marker._shadow) {
        this.shadowStyles = _Styles["default"].parse(marker._shadow.style.cssText);
      }

      var iconHeight = ((_this$marker$getIcon = this.marker.getIcon()) === null || _this$marker$getIcon === void 0 ? void 0 : (_this$marker$getIcon$ = _this$marker$getIcon.options) === null || _this$marker$getIcon$ === void 0 ? void 0 : _this$marker$getIcon$.iconSize[1]) || ((_this$marker = this.marker) === null || _this$marker === void 0 ? void 0 : (_this$marker$_iconObj = _this$marker._iconObj) === null || _this$marker$_iconObj === void 0 ? void 0 : (_this$marker$_iconObj2 = _this$marker$_iconObj.options) === null || _this$marker$_iconObj2 === void 0 ? void 0 : _this$marker$_iconObj2.iconSize[1]);
      var iconAnimationParams = BouncingMotionCss3.animationParams(this.position, this.bouncingOptions, iconHeight);
      this.iconStyles = this.iconStyles.withStyles(iconAnimationParams);
      this.marker._icon.style.cssText = this.iconStyles.toString();

      if (this.bouncingAnimationPlaying) {
        resetClasses(this.marker._icon, _classPrivateFieldGet(this, _classes));

        this.marker._icon.addEventListener('animationend', _classPrivateFieldGet(this, _listener));
      }

      var _this$bouncingOptions = this.bouncingOptions,
          bounceHeight = _this$bouncingOptions.bounceHeight,
          contractHeight = _this$bouncingOptions.contractHeight,
          shadowAngle = _this$bouncingOptions.shadowAngle;

      if (this.marker._shadow) {
        if (shadowAngle) {
          var _this$marker$getIcon2, _this$marker$getIcon3;

          var _this$position = this.position,
              x = _this$position.x,
              y = _this$position.y;
          var points = (0, _line.calculateLine)(x, y, shadowAngle, bounceHeight + 1);

          var _points$bounceHeight = _slicedToArray(points[bounceHeight], 2),
              posXJump = _points$bounceHeight[0],
              posYJump = _points$bounceHeight[1];

          var shadowHeight = (_this$marker$getIcon2 = this.marker.getIcon()) === null || _this$marker$getIcon2 === void 0 ? void 0 : (_this$marker$getIcon3 = _this$marker$getIcon2.options) === null || _this$marker$getIcon3 === void 0 ? void 0 : _this$marker$getIcon3.shadowSize[1];
          var shadowScaleContract = BouncingMotionCss3.contractScale(shadowHeight, contractHeight);
          this.shadowStyles = this.shadowStyles.withStyles(iconAnimationParams).withStyles({
            '--pos-x-jump': "".concat(posXJump, "px"),
            '--pos-y-jump': "".concat(posYJump, "px"),
            '--scale-contract': shadowScaleContract
          });
          this.marker._shadow.style.cssText = this.shadowStyles.toString();

          if (this.bouncingAnimationPlaying) {
            resetClasses(this.marker._shadow, _classPrivateFieldGet(this, _classes));
          }
        } else {
          _classPrivateFieldGet(this, _classes).forEach(function (className) {
            _leaflet.DomUtil.removeClass(_this3.marker._shadow, className);
          });
        }
      }
    }
  }, {
    key: "bounce",
    value: function bounce() {
      var times = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      _classPrivateFieldSet(this, _times, times);

      this.isBouncing = true;

      if (this.bouncingAnimationPlaying) {
        return;
      }

      _classPrivateFieldSet(this, _eventCounter, 0);

      this.bouncingAnimationPlaying = true;
      resetClasses(this.marker._icon, _classPrivateFieldGet(this, _classes));

      if (this.marker._shadow && this.bouncingOptions.shadowAngle) {
        resetClasses(this.marker._shadow, _classPrivateFieldGet(this, _classes));
      }

      this.marker._icon.addEventListener('animationend', _classPrivateFieldGet(this, _listener));
    }
  }, {
    key: "stopBouncing",
    value: function stopBouncing() {
      this.isBouncing = false;
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
      if (height === 0) {
        return 0;
      }

      var duration = Math.round(speed * speedCoefficient);
      var i = height;

      while (--i) {
        duration += Math.round(speed / (height - i));
      }

      return duration;
    }
  }]);

  return BouncingMotionCss3;
}();

exports["default"] = BouncingMotionCss3;