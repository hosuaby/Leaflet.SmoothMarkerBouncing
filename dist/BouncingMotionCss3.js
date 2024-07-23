"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _leaflet = require("leaflet");
var _line = require("./line");
require("./bouncing.css");
var _BouncingOptions = _interopRequireDefault(require("./BouncingOptions"));
var _Styles = _interopRequireDefault(require("./Styles"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
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
var BouncingMotionCss3 = exports["default"] = /*#__PURE__*/function () {
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
    _classPrivateFieldInitSpec(this, _lastAnimationName, contractAnimationName);
    _classPrivateFieldInitSpec(this, _classes, ['bouncing']);
    _classPrivateFieldInitSpec(this, _eventCounter, void 0);
    _classPrivateFieldInitSpec(this, _times, void 0);
    _classPrivateFieldInitSpec(this, _listener, function (event) {
      return _this.onAnimationEnd(event);
    });
    this.marker = marker;
    this.position = position;
    this.updateBouncingOptions(bouncingOptions);
  }
  return _createClass(BouncingMotionCss3, [{
    key: "updateBouncingOptions",
    value: function updateBouncingOptions(options) {
      this.bouncingOptions = options instanceof _BouncingOptions["default"] ? options : this.bouncingOptions.override(options);
      if (this.bouncingOptions.elastic && this.bouncingOptions.contractHeight) {
        _classPrivateFieldSet(_lastAnimationName, this, contractAnimationName);
        var index = _classPrivateFieldGet(_classes, this).indexOf('simple');
        if (index > -1) {
          _classPrivateFieldGet(_classes, this).splice(index, 1);
        }
        if (this.marker._icon) {
          _leaflet.DomUtil.removeClass(this.marker._icon, 'simple');
        }
      } else {
        _classPrivateFieldSet(_lastAnimationName, this, moveAnimationName);
        _classPrivateFieldGet(_classes, this).push('simple');
      }
      if (this.marker._icon) {
        this.resetStyles(this.marker);
      }
    }
  }, {
    key: "onAnimationEnd",
    value: function onAnimationEnd(event) {
      if (event.animationName === _classPrivateFieldGet(_lastAnimationName, this)) {
        var _this$eventCounter, _this$eventCounter2;
        _classPrivateFieldSet(_eventCounter, this, (_this$eventCounter = _classPrivateFieldGet(_eventCounter, this), _this$eventCounter2 = _this$eventCounter++, _this$eventCounter)), _this$eventCounter2;
        _classPrivateFieldSet(_eventCounter, this, _classPrivateFieldGet(_eventCounter, this) % 2);
        if (!_classPrivateFieldGet(_eventCounter, this)) {
          var _this$times;
          if (this.isBouncing && (_classPrivateFieldGet(_times, this) === null || _classPrivateFieldSet(_times, this, (_this$times = _classPrivateFieldGet(_times, this), --_this$times)))) {
            resetClasses(this.marker._icon, _classPrivateFieldGet(_classes, this));
            if (this.marker._shadow && this.bouncingOptions.shadowAngle) {
              resetClasses(this.marker._shadow, _classPrivateFieldGet(_classes, this));
            }
          } else {
            this._stopBouncingAnimation();
          }
        }
      }
    }
  }, {
    key: "resetStyles",
    value: function resetStyles(marker) {
      var _this$marker$getIcon,
        _this$marker,
        _this2 = this;
      this.marker = marker;
      this.iconStyles = _Styles["default"].ofMarker(marker);
      if (marker._shadow) {
        this.shadowStyles = _Styles["default"].parse(marker._shadow.style.cssText);
      }
      var iconHeight = ((_this$marker$getIcon = this.marker.getIcon()) === null || _this$marker$getIcon === void 0 || (_this$marker$getIcon = _this$marker$getIcon.options) === null || _this$marker$getIcon === void 0 ? void 0 : _this$marker$getIcon.iconSize[1]) || ((_this$marker = this.marker) === null || _this$marker === void 0 || (_this$marker = _this$marker._iconObj) === null || _this$marker === void 0 || (_this$marker = _this$marker.options) === null || _this$marker === void 0 ? void 0 : _this$marker.iconSize[1]);
      var iconAnimationParams = BouncingMotionCss3.animationParams(this.position, this.bouncingOptions, iconHeight);
      this.iconStyles = this.iconStyles.withStyles(iconAnimationParams);
      this.marker._icon.style.cssText = this.iconStyles.toString();
      if (this.bouncingAnimationPlaying) {
        resetClasses(this.marker._icon, _classPrivateFieldGet(_classes, this));
        this.marker._icon.addEventListener('animationend', _classPrivateFieldGet(_listener, this));
      }
      var _this$bouncingOptions = this.bouncingOptions,
        bounceHeight = _this$bouncingOptions.bounceHeight,
        contractHeight = _this$bouncingOptions.contractHeight,
        shadowAngle = _this$bouncingOptions.shadowAngle;
      if (this.marker._shadow) {
        if (shadowAngle) {
          var _this$marker$getIcon2;
          var _this$position = this.position,
            x = _this$position.x,
            y = _this$position.y;
          var points = (0, _line.calculateLine)(x, y, shadowAngle, bounceHeight + 1);
          var _points$bounceHeight = _slicedToArray(points[bounceHeight], 2),
            posXJump = _points$bounceHeight[0],
            posYJump = _points$bounceHeight[1];
          var shadowHeight = (_this$marker$getIcon2 = this.marker.getIcon()) === null || _this$marker$getIcon2 === void 0 || (_this$marker$getIcon2 = _this$marker$getIcon2.options) === null || _this$marker$getIcon2 === void 0 ? void 0 : _this$marker$getIcon2.shadowSize[1];
          var shadowScaleContract = BouncingMotionCss3.contractScale(shadowHeight, contractHeight);
          this.shadowStyles = this.shadowStyles.withStyles(iconAnimationParams).withStyles({
            '--pos-x-jump': "".concat(posXJump, "px"),
            '--pos-y-jump': "".concat(posYJump, "px"),
            '--scale-contract': shadowScaleContract
          });
          this.marker._shadow.style.cssText = this.shadowStyles.toString();
          if (this.bouncingAnimationPlaying) {
            resetClasses(this.marker._shadow, _classPrivateFieldGet(_classes, this));
          }
        } else {
          _classPrivateFieldGet(_classes, this).forEach(function (className) {
            _leaflet.DomUtil.removeClass(_this2.marker._shadow, className);
          });
        }
      }
    }
  }, {
    key: "bounce",
    value: function bounce() {
      var times = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      _classPrivateFieldSet(_times, this, times);
      this.isBouncing = true;
      if (this.bouncingAnimationPlaying) {
        return;
      }
      _classPrivateFieldSet(_eventCounter, this, 0);
      this.bouncingAnimationPlaying = true;
      resetClasses(this.marker._icon, _classPrivateFieldGet(_classes, this));
      if (this.marker._shadow && this.bouncingOptions.shadowAngle) {
        resetClasses(this.marker._shadow, _classPrivateFieldGet(_classes, this));
      }
      this.marker._icon.addEventListener('animationend', _classPrivateFieldGet(_listener, this));
    }
  }, {
    key: "stopBouncing",
    value: function stopBouncing() {
      var immediate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.isBouncing = false;
      immediate || (immediate = this.bouncingOptions.immediateStop);
      if (immediate) {
        this._stopBouncingAnimation();
      }
    }
  }, {
    key: "_stopBouncingAnimation",
    value: function _stopBouncingAnimation() {
      var _this3 = this;
      _classPrivateFieldGet(_classes, this).forEach(function (className) {
        _leaflet.DomUtil.removeClass(_this3.marker._icon, className);
        if (_this3.marker._shadow) {
          _leaflet.DomUtil.removeClass(_this3.marker._shadow, className);
        }
      });
      this.bouncingAnimationPlaying = false;
      if (this.onMotionEnd) {
        this.onMotionEnd();
        this.onMotionEnd = null;
      }
      this.marker.fire('bounceend');
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
}();