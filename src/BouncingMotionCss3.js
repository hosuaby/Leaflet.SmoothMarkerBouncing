import {DomUtil} from 'leaflet';
import {calculateLine} from './line';
import './bouncing.css';
import BouncingOptions from './BouncingOptions';
import Styles from './Styles';

const animationNamePrefix = 'l-smooth-marker-bouncing-';
const moveAnimationName = animationNamePrefix + 'move';
const contractAnimationName = animationNamePrefix + 'contract';

/*
 * CSS3 animation runs faster than transform-based animation. We need to reduce speed in order
 * to be compatible with old API.
 */
const speedCoefficient = 0.8;

/**
 * Removes and then resets required classes on the HTML element.
 * Used as hack to restart CSS3 animation.
 *
 * @param element {HTMLElement}  HTML element
 * @param classes {string[]}  names of classes
 */
function resetClasses(element, classes) {
    classes.forEach((className) => DomUtil.removeClass(element, className));
    void element.offsetWidth;
    classes.forEach((className) => DomUtil.addClass(element, className));
}

export default class BouncingMotionCss3 {
    marker;
    position;
    bouncingOptions;
    isBouncing = false;
    iconStyles;
    shadowStyles;
    bouncingAnimationPlaying = false;
    #lastAnimationName = contractAnimationName;
    #classes = ['bouncing'];
    #eventCounter;
    #times;
    #listener = (event) => this.onAnimationEnd(event);

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

        if (this.bouncingOptions.elastic) {
            this.#lastAnimationName = contractAnimationName;
            const index = this.#classes.indexOf('simple');
            if (index > -1) {
                this.#classes.splice(index, 1);
            }

            if (this.marker._icon) {
                DomUtil.removeClass(this.marker._icon, 'simple');
            }
        } else {
            this.#lastAnimationName = moveAnimationName;
            this.#classes.push('simple');
        }

        if (this.marker._icon) {
            this.resetStyles(this.marker);
        }
    }

    onAnimationEnd(event) {
        if (event.animationName === this.#lastAnimationName) {
            this.#eventCounter++;
            this.#eventCounter %= 2;

            if (!this.#eventCounter) {
                if (this.isBouncing && (this.#times === null || --this.#times)) {
                    resetClasses(this.marker._icon, this.#classes);
                    if (this.marker._shadow && this.bouncingOptions.shadowAngle) {
                        resetClasses(this.marker._shadow, this.#classes);
                    }
                } else {
                    this.#classes.forEach((className) => {
                        DomUtil.removeClass(this.marker._icon, className);
                        if (this.marker._shadow) {
                            DomUtil.removeClass(this.marker._shadow, className);
                        }
                    });
                    this.bouncingAnimationPlaying = false;
                    this.marker.fire('bounceend');
                }
            }
        }
    }

    resetStyles(marker) {
        this.marker = marker;
        this.iconStyles = Styles.ofMarker(marker);

        if (marker._shadow) {
            this.shadowStyles = Styles.parse(marker._shadow.style.cssText);
        }

        const iconHeight = this.marker.getIcon()?.options?.iconSize[1]
                || this.marker?._iconObj?.options?.iconSize[1];

        const iconAnimationParams = BouncingMotionCss3.animationParams(
                this.position, this.bouncingOptions, iconHeight);

        this.iconStyles = this.iconStyles.withStyles(iconAnimationParams);
        this.marker._icon.style.cssText = this.iconStyles.toString();

        if (this.bouncingAnimationPlaying) {
            resetClasses(this.marker._icon, this.#classes);
            this.marker._icon.addEventListener('animationend', this.#listener);
        }

        const {bounceHeight, contractHeight, shadowAngle} = this.bouncingOptions;

        if (this.marker._shadow) {
            if (shadowAngle) {
                const {x, y} = this.position;
                const points = calculateLine(x, y, shadowAngle, bounceHeight + 1);
                const [posXJump, posYJump] = points[bounceHeight];

                const shadowHeight = this.marker.getIcon()?.options?.shadowSize[1];
                const shadowScaleContract = BouncingMotionCss3.contractScale(
                        shadowHeight, contractHeight);

                this.shadowStyles = this.shadowStyles
                        .withStyles(iconAnimationParams)
                        .withStyles({
                            '--pos-x-jump': `${posXJump}px`,
                            '--pos-y-jump': `${posYJump}px`,
                            '--scale-contract': shadowScaleContract,
                        });
                this.marker._shadow.style.cssText = this.shadowStyles.toString();

                if (this.bouncingAnimationPlaying) {
                    resetClasses(this.marker._shadow, this.#classes);
                }
            } else {
                this.#classes.forEach(className => {
                    DomUtil.removeClass(this.marker._shadow, className);
                });
            }
        }
    }

    bounce(times = null) {
        this.#times = times;
        this.isBouncing = true;

        if (this.bouncingAnimationPlaying) {
            return;
        }

        this.#eventCounter = 0;
        this.bouncingAnimationPlaying = true;

        resetClasses(this.marker._icon, this.#classes);
        if (this.marker._shadow && this.bouncingOptions.shadowAngle) {
            resetClasses(this.marker._shadow, this.#classes);
        }

        this.marker._icon.addEventListener('animationend', this.#listener);
    }

    stopBouncing() {
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
    static animationParams(position, bouncingOptions, height) {
        const {x, y} = position;
        const {bounceHeight, contractHeight, bounceSpeed, contractSpeed} = bouncingOptions;

        const scaleContract = BouncingMotionCss3.contractScale(height, contractHeight);
        const durationJump = BouncingMotionCss3.calculateDuration(bounceHeight, bounceSpeed);
        const durationContract = BouncingMotionCss3.calculateDuration(contractHeight, contractSpeed);

        const delays = [
            0,
            durationJump,
            durationJump * 2,
            durationJump * 2 + durationContract
        ];

        return {
            '--pos-x': `${x}px`,
            '--pos-y': `${y}px`,
            '--pos-y-jump': `${y - bounceHeight}px`,
            '--pos-y-contract': `${y + contractHeight}px`,
            '--scale-contract': scaleContract,
            '--duration-jump': `${durationJump}ms`,
            '--duration-contract': `${durationContract}ms`,
            '--delays': `0ms, ${delays[1]}ms, ${delays[2]}ms, ${delays[3]}ms`
        };
    }

    /**
     * Calculates scale of contracting.
     *
     * @param {number} height  original height
     * @param {number} contractHeight  how much it must contract
     * @return {number}  contracting scale between 0 and 1
     */
    static contractScale(height, contractHeight) {
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
    static calculateDuration(height, speed) {
        let duration = Math.round(speed * speedCoefficient);
        let i = height;

        while (--i) {
            duration += Math.round(speed / (height - i));
        }

        return duration;
    }
}
