"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = MarkerPrototypeExt;
var _BouncingOptions = _interopRequireDefault(require("./BouncingOptions"));
var _Orchestration = _interopRequireDefault(require("./Orchestration"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function MarkerPrototypeExt(Leaflet) {
  var oldSetPos = Leaflet.Marker.prototype._setPos;
  var oldOnAdd = Leaflet.Marker.prototype.onAdd;
  var oldSetIcon = Leaflet.Marker.prototype.setIcon;
  return {
    /** Bouncing options shared by all markers. */
    _bouncingOptions: new _BouncingOptions["default"](),
    _orchestration: new _Orchestration["default"](),
    _realMarker: true,
    /**
     * Registers options of bouncing animation for this marker. After registration of options for
     * this marker, it will ignore changes of default options. Function automatically recalculates
     * animation steps and delays.
     *
     * @param options {BouncingOptions}  options object
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
     * @param times {number|null}  number of times the marker must to bounce
     * @return {Marker} this marker
     */
    bounce: function bounce() {
      var _this = this;
      var times = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      if (times) {
        this._bouncingMotion.onMotionEnd = function () {
          Leaflet.Marker.prototype._orchestration.removeBouncingMarker(_this);
        };
      }
      this._bouncingMotion.bounce(times);
      var exclusive = this._bouncingMotion.bouncingOptions.exclusive;
      Leaflet.Marker.prototype._orchestration.addBouncingMarker(this, exclusive);
      return this;
    },
    /**
     * Stops bouncing of this marker.
     * Note: unless 'immediate' flag is set to true, by the call to this method or in marker options,
     * the bouncing will not stop immediately after the call of this method. Instead, the animation
     * is executed until marker returns to its original position and takes its full size.
     *
     * @param immediate {boolean}  if true, marker stop to bounce immediately, without waiting
     *      animation to end
     * @return {Marker} this marker
     */
    stopBouncing: function stopBouncing() {
      var immediate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this._bouncingMotion.stopBouncing(immediate);
      Leaflet.Marker.prototype._orchestration.removeBouncingMarker(this);
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
      return Object.hasOwn(this.__proto__, '_realMarker');
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
}