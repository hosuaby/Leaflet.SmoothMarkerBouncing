import Leaflet, {Marker} from 'leaflet';

export interface BouncingOptions {

    /**
     * How high marker can bounce (px)
     */
    bounceHeight?: number;

    /**
     * How much marker can contract (px)
     */
    contractHeight?: number;

    /**
     * Bouncing speed coefficient
     */
    bounceSpeed?: number;

    /**
     * Contracting speed coefficient
     */
    contractSpeed?: number;

    /**
     * Shadow inclination angle(radians); null to cancel shadow movement
     */
    shadowAngle?: number;

    /**
     * Activate contract animation
     */
    elastic?: boolean;

    /**
     * Many markers can bounce in the same time
     */
    exclusive?: boolean;

    /**
     * If true, when marker stops, it does not execute animation until its end, but instead stops
     * abruptly.
     */
    immediateStop?: boolean;
}

export class BouncingMarker extends Marker {

    /**
     * Registers options of bouncing animation for this marker. After registration of options for
     * this marker, it will ignore changes of default options. Function automatically recalculates
     * animation steps and delays.
     *
     * @param options {BouncingOptions}  options object
     * @return {Marker} this marker
     */
    setBouncingOptions(options: BouncingOptions);

    /**
     * Returns true if this marker is bouncing. If this marker is not bouncing returns false.
     * @return {boolean} true if marker is bouncing, false if not
     */
    isBouncing(): boolean;

    /**
     * Starts bouncing of this marker.
     * @param times {number|null}  number of times the marker must to bounce
     * @return {Marker} this marker
     */
    bounce(times?: number);

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
    stopBouncing(immediate?: boolean);

    /**
     * Starts/stops bouncing of this marker.
     * @return {Marker} marker
     */
    toggleBouncing();
}

export type MarkerExt = (typeof Marker) & {

    /**
     * Registers default options of bouncing animation.
     * @param options {BouncingOptions|object}  object with options
     */
    setBouncingOptions(options: BouncingOptions);

    /**
     * Returns array of currently bouncing markers.
     * @return {Marker[]} array of bouncing markers
     */
    getBouncingMarkers(): BouncingMarker[];

    /**
     * Stops the bouncing of all currently bouncing markers. Purge the array of bouncing markers.
     *
     * @param immediate {boolean}  if true, markers stop to bounce immediately, without waiting
     *      animation to end
     */
    stopAllBouncingMarkers(immediate?: boolean);
}

export default function SmoothMarkerBouncing(L: Leaflet): Leaflet;
