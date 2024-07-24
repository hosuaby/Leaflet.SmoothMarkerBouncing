import BouncingOptions from './BouncingOptions';
import Orchestration from './Orchestration';

export default function MarkerPrototypeExt(Leaflet) {
    const oldSetPos = Leaflet.Marker.prototype._setPos;
    const oldOnAdd = Leaflet.Marker.prototype.onAdd;
    const oldSetIcon = Leaflet.Marker.prototype.setIcon;

    return {

        /** Bouncing options shared by all markers. */
        _bouncingOptions: new BouncingOptions(),

        _orchestration: new Orchestration(),

        _realMarker: true,

        /**
         * Registers options of bouncing animation for this marker. After registration of options for
         * this marker, it will ignore changes of default options. Function automatically recalculates
         * animation steps and delays.
         *
         * @param options {BouncingOptions}  options object
         * @return {Marker} this marker
         */
        setBouncingOptions: function(options) {
            this._bouncingMotion.updateBouncingOptions(options);
            return this;
        },

        /**
         * Returns true if this marker is bouncing. If this marker is not bouncing returns false.
         * @return {boolean} true if marker is bouncing, false if not
         */
        isBouncing: function() {
            return this._bouncingMotion.isBouncing;
        },

        /**
         * Starts bouncing of this marker.
         * @param times {number|null}  number of times the marker must to bounce
         * @return {Marker} this marker
         */
        bounce: function(times = null) {
            if (times) {
                this._bouncingMotion.onMotionEnd = () => {
                    Leaflet.Marker.prototype._orchestration.removeBouncingMarker(this);
                };
            }

            this._bouncingMotion.bounce(times);
            const exclusive = this._bouncingMotion.bouncingOptions.exclusive;
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
        stopBouncing: function(immediate = false) {
            this._bouncingMotion.stopBouncing(immediate);
            Leaflet.Marker.prototype._orchestration.removeBouncingMarker(this);
            return this;
        },

        /**
         * Starts/stops bouncing of this marker.
         * @return {Marker} marker
         */
        toggleBouncing: function() {
            if (this._bouncingMotion.isBouncing) {
                this.stopBouncing();
            } else {
                this.bounce();
            }
            return this;
        },

        isRealMarker: function() {
            return Object.hasOwn(this.__proto__, '_realMarker');
        },

        _setPos: function(position) {
            oldSetPos.call(this, position);
            if (this.isRealMarker()) {
                this._bouncingMotion.position = position;
                this._bouncingMotion.resetStyles(this);
            }
        },

        onAdd: function(map) {
            oldOnAdd.call(this, map);
            if (this.isRealMarker()) {
                this._bouncingMotion.resetStyles(this);
            }
        },

        setIcon: function(icon) {
            oldSetIcon.call(this, icon);
            if (this.isRealMarker() && this._icon) {
                this._bouncingMotion.resetStyles(this);
            }
        },
    };
}
