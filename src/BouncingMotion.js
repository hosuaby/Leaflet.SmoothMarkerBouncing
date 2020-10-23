import {Marker, Point} from 'leaflet';
import BouncingOptions from './BouncingOptions';
import Cache from './Cache';
import Styles from './Styles';

const bonceEndEvent = 'bounceend';

export default class BouncingMotion {
    // TODO: check if this cache working right (keys don't need prefix)
    static cache = new Cache();

    marker;
    position;
    bouncingOptions;
    moveSteps;
    moveDelays;
    resizeSteps;
    resizeDelays;
    isBouncing = false;
    iconStyles;
    shadowStyles;
    bouncingAnimationPlaying = false;

    /**
     * Constructor.
     *
     * @param marker {Marker}  marker
     * @param position {Point}  marker current position on the map canvas
     * @param bouncingOptions {BouncingOptions}  options of bouncing animation
     */
    constructor(marker, position, bouncingOptions) {
        this.marker = marker;
        this.position = position;
        this.updateBouncingOptions(bouncingOptions);
    }

    updateBouncingOptions(options) {
        this.bouncingOptions = options instanceof BouncingOptions
                ? options
                : this.bouncingOptions.override(options);

        const {bounceHeight, bounceSpeed, elastic} = this.bouncingOptions;

        this.moveSteps = BouncingMotion.cache.get(
                `moveSteps_${bounceHeight}`,
                () => BouncingMotion.calculateSteps(bounceHeight));

        this.moveDelays = BouncingMotion.cache.get(
                `moveDelays_${bounceHeight}_${bounceSpeed}`,
                () => BouncingMotion.calculateDelays(bounceHeight, bounceSpeed));

        if (elastic) {
            const {contractHeight, contractSpeed} = this.bouncingOptions;

            this.resizeSteps = BouncingMotion.cache.get(
                    `resizeSteps_${contractHeight}`,
                    () => BouncingMotion.calculateSteps(contractHeight));

            this.resizeDelays = BouncingMotion.cache.get(
                    `resizeDelays_${contractHeight}_${contractSpeed}`,
                    () => BouncingMotion.calculateDelays(contractHeight, contractSpeed));
        }

        this.recalculateMotion(this.position);
    }

    resetStyles(marker) {
        this.iconStyles = Styles.ofMarker(marker);

        if (marker._shadow) {
            this.shadowStyles = Styles.parse(marker._shadow.style.cssText);
        }
    }

    /**
     * Recalculates bouncing motion for new marker position.
     * @param position {Point} new marker position
     */
    recalculateMotion(position) {
        this.position = position;
    }

    /**
     * @param times {number|null}
     */
    bounce(times = null) {
        if (this.bouncingAnimationPlaying) {
            this.isBouncing = true;
            return;
        }

        this.isBouncing = true;
        this.bouncingAnimationPlaying = true;
        this.move(times);
    }

    stopBouncing() {
        this.isBouncing = false;
    }

    /**
     * @param times {number|null}
     */
    move(times = null) {
        if (times !== null) {
            if (!--times) {
                this.isBouncing = false;  // this is the last bouncing
                this.bouncingAnimationPlaying = false;
            }
        }

        /* Launch timeouts for every step of the movement animation */
        let i = this.moveSteps.length;
        while (i--) {
            setTimeout((step) => this.makeMoveStep(step), this.moveDelays[i], this.moveSteps[i]);
        }

        setTimeout(() => this.afterMove(times), this.moveDelays[this.moveSteps.length-1]);
    }

    afterMove(times) {
        if (this.isBouncing) {
            setTimeout(() => this.move(times), this.bouncingOptions.bounceSpeed);
        } else {
            this.bouncingAnimationPlaying = false;
            this.marker.fire(bonceEndEvent);
        }
    }

    /**
     * @param step {number}
     */
    makeMoveStep(step) {
        if (!this.marker.isInCluster()) {
            this.marker._icon.style.cssText = this.iconStyles.toString();

            if (this.marker._shadow) {
                this.marker._shadow.style.cssText = this.shadowStyles.toString();
            }
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
    static calculateSteps(height) {

        /* Calculate the sequence of animation steps:
         * steps = [1 .. height] concat [height-1 .. 0]
         */
        let i = 1;
        let steps = [];
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
    static calculateDelays(height, speed) {

        // Calculate delta time for bouncing animation

        // Delta time to movement in one direction
        let deltas = [];    // time between steps of animation
        deltas[height] = speed;
        deltas[0] = 0;
        let i = height;
        while (--i) {
            deltas[i] = Math.round(speed / (height - i));
        }

        // Delta time for movement in two directions
        i = height;
        while (i--) {
            deltas.push(deltas[i]);
        }

        // Calculate move delays (cumulated deltas)
        // TODO: instead of deltas.lenght write bounceHeight * 2 - 1
        let delays = [];    // delays before steps from beginning of animation
        let totalDelay = 0;
        for (i = 0; i < deltas.length; i++) {
            totalDelay += deltas[i];
            delays.push(totalDelay);
        }

        return delays;
    }
}
