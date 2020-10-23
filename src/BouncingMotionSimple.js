import BouncingMotion from './BouncingMotion';
import {calculateLine} from './line';

export default class BouncingMotionSimple extends BouncingMotion {
    iconMovePoints;
    shadowMovePoints;

    /**
     * Constructor.
     *
     * @param marker {Marker}  marker
     * @param position {Point}  marker current position on the map canvas
     * @param bouncingOptions {BouncingOptions}  options of bouncing animation
     */
    constructor(marker, position, bouncingOptions) {
        super(marker, position, bouncingOptions);
        this.recalculateMotion(position);
    }

    recalculateMotion(position) {
        super.recalculateMotion(position);

        const {x, y} = position;
        const {bounceHeight, shadowAngle} = this.bouncingOptions;

        this.iconMovePoints = BouncingMotionSimple.calculateIconMovePoints(x, y, bounceHeight);
        this.shadowMovePoints = BouncingMotionSimple.calculateShadowMovePoints(
                x, y, bounceHeight, shadowAngle);
    }

    makeMoveStep(step) {
        super.makeMoveStep(step);

        if (!this.marker.isInCluster()) {
            this.marker._icon.style.left = this.iconMovePoints[step][0] + 'px';
            this.marker._icon.style.top = this.iconMovePoints[step][1] + 'px';

            if (this.marker._shadow) {
                this.marker._shadow.style.left = this.shadowMovePoints[step][0] + 'px';
                this.marker._shadow.style.top  = this.shadowMovePoints[step][1] + 'px';
            }
        }
    }

    /**
     * Returns calculated array of points for icon movement. Used to animate markers in browsers
     * that doesn't support 'transform' attribute.
     *
     * @param x {number}  x coordinate of original position of the marker
     * @param y {number}  y coordinate of original position of the marker
     * @param bounceHeight {number}  height of bouncing (px)
     *
     * @return {[number, number][]} array of points
     */
    static calculateIconMovePoints(x, y, bounceHeight) {
        let deltaHeight = bounceHeight + 1;
        let points = [];

        // Use fast inverse while loop to fill the array
        while (deltaHeight--) {
            points[deltaHeight] = [x, y - deltaHeight];
        }

        return points;
    }

    /**
     * Returns calculated array of points for shadow movement. Used to animate markers in browsers
     * that doesn't support 'transform' attribute.
     *
     * @param x {number}  x coordinate of original position of the marker
     * @param y {number}  y coordinate of original position of the marker
     * @param bounceHeight {number}  height of bouncing (px)
     * @param angle {number}  shadow inclination angle, if null shadow don't moves from it's initial
     *      position (radians)
     *
     * @return {[number, number][]} array of points
     */
    static calculateShadowMovePoints(x, y, bounceHeight, angle) {
        if (angle != null) {  // important: 0 is not null
            return calculateLine(x, y, angle, bounceHeight + 1);
        } else {
            const points = [];

            for (let i = 0; i <= bounceHeight; i++) {
                points[i] = [x, y];
            }

            return points;
        }
    }
}
