"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _leaflet = require("leaflet");

var _BouncingOptions = _interopRequireDefault(require("./BouncingOptions"));

var _Orchestration = _interopRequireDefault(require("./Orchestration"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var oldSetPos = _leaflet.Marker.prototype._setPos;
var oldOnAdd = _leaflet.Marker.prototype.onAdd;
var oldSetIcon = _leaflet.Marker.prototype.setIcon;
var _default = {
  /** Bouncing options shared by all markers. */
  _bouncingOptions: new _BouncingOptions["default"](),
  _orchestration: new _Orchestration["default"](),

  /**
   * Registers options of bouncing animation for this marker. After registration of options for
   * this marker, it will ignore changes of default options. Function automatically recalculates
   * animation steps and delays.
   *
   * @param options {BouncingOptions|object}  options object
   * @return {Marker} this marker
   */
  setBouncingOptions: function setBouncingOptions(options) {
    this._bouncingMotion.updateBouncingOptions(options);

    return this;
  },

  /**
   * Returns true if this marker is bouncing. If this marker is not bouncing returns false.
   * @return {boolean} true if marker is bouncing, false if not
   */
  isBouncing: function isBouncing() {
    return this._bouncingMotion.isBouncing;
  },

  /**
   * Starts bouncing of this marker.
   * @param times {number|null} number of times the marker must to bounce
   * @return {Marker} this marker
   */
  bounce: function bounce() {
    var _this = this;

    var times = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    if (times) {
      this._bouncingMotion.onMotionEnd = function () {
        _leaflet.Marker.prototype._orchestration.removeBouncingMarker(_this);
      };
    }

    this._bouncingMotion.bounce(times);

    var exclusive = this._bouncingMotion.bouncingOptions.exclusive;

    _leaflet.Marker.prototype._orchestration.addBouncingMarker(this, exclusive);

    return this;
  },

  /**
   * Stops bouncing of this marker.
   * Note: the bouncing not stops immediately after the call of this method.
   * Instead, the animation is executed until marker returns to it's original position and takes
   * it's full size.
   *
   * @return {Marker} this marker
   */
  stopBouncing: function stopBouncing() {
    this._bouncingMotion.stopBouncing();

    _leaflet.Marker.prototype._orchestration.removeBouncingMarker(this);

    return this;
  },

  /**
   * Starts/stops bouncing of this marker.
   * @return {Marker} marker
   */
  toggleBouncing: function toggleBouncing() {
    if (this._bouncingMotion.isBouncing) {
      this.stopBouncing();
    } else {
      this.bounce();
    }

    return this;
  },
  isRealMarker: function isRealMarker() {
    return this.__proto__ === _leaflet.Marker.prototype;
  },
  _setPos: function _setPos(position) {
    oldSetPos.call(this, position);

    if (this.isRealMarker()) {
      this._bouncingMotion.position = position;

      this._bouncingMotion.resetStyles(this);
    }
  },
  onAdd: function onAdd(map) {
    oldOnAdd.call(this, map);

    if (this.isRealMarker()) {
      this._bouncingMotion.resetStyles(this);
    }
  },
  setIcon: function setIcon(icon) {
    oldSetIcon.call(this, icon);

    if (this.isRealMarker() && this._icon) {
      this._bouncingMotion.resetStyles(this);
    }
  }
};
exports["default"] = _default;