import {Marker} from 'leaflet';
import BouncingMotion from './BouncingMotion';
import Matrix3D from './Matrix3D';
import {calculateLine} from './line';

const moveMatrixFormat = Matrix3D.identity().toFormat('d1', 'd2');
const resizeMatrixFormat = Matrix3D.identity().toFormat('b2', 'd1', 'd2');

export default class BouncingMotion3D extends BouncingMotion {
    iconMoveTransforms;
    iconResizeTransforms;
    shadowMoveTransforms;
    shadowResizeTransforms;

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

        const iconHeight = this.marker.getIcon()?.options?.iconSize[1]
                || this.marker?._iconObj?.options?.iconSize[1];

        const {x, y} = position;
        const {bounceHeight, contractHeight, shadowAngle} = this.bouncingOptions;

        this.iconMoveTransforms = BouncingMotion3D.calculateIconMoveTransforms(x, y, bounceHeight);
        this.iconResizeTransforms = BouncingMotion3D.calculateIconResizeTransforms(
                x, y, iconHeight, contractHeight);

        if (this.marker._shadow) {
            this.shadowMoveTransforms = BouncingMotion3D.calculateShadowMoveTransforms(
                    x, y, bounceHeight, shadowAngle);

            // TODO: use function calculateShadowResizeTransforms
            const shadowHeight = this.marker.getIcon()?.options?.shadowSize[1];
            this.shadowResizeTransforms = BouncingMotion3D.calculateIconResizeTransforms(
                    x, y, shadowHeight, contractHeight);
        }
    }

    afterMove(times) {
        if (this.bouncingOptions.elastic) {
            this.resize(times);
        } else {
            super.afterMove(times);
        }
    }

    resize(times) {
        const nbResizeSteps = this.resizeSteps.length;
        let i = nbResizeSteps;
        while (i--) {
            setTimeout((step) => this.makeResizeStep(step),
                    this.resizeDelays[i], this.resizeSteps[i]);
        }

        setTimeout(() => {
            if (!this.isBouncing) {
                this.bouncingAnimationPlaying = false;
            }
        }, this.resizeDelays[this.resizeSteps.length]);

        setTimeout(() => {
            if (this.isBouncing) {
                this.move(times);
            } else {
                this.marker.fire('bounceend');
            }
        }, this.resizeDelays[nbResizeSteps-1]);
    }

    makeMoveStep(step) {
        if (!this.marker.isInCluster()) {
            this.marker._icon.style.cssText = this.iconStyles
                    .withTransform(this.iconMoveTransforms[step])
                    .toString();

            if (this.marker._shadow) {
                this.marker._shadow.style.cssText = this.shadowStyles
                        .withTransform(this.shadowMoveTransforms[step])
                        .toString();
            }
        }
    }

    /**
     * @param step {number}
     */
    makeResizeStep(step) {
        if (!this.marker.isInCluster()) {
            this.marker._icon.style.cssText = this.iconStyles
                    .withTransform(this.iconResizeTransforms[step])
                    .toString();

            if (this.marker._shadow && this.bouncingOptions.shadowAngle) {
                this.marker._shadow.style.cssText = this.shadowStyles
                        .withTransform(this.shadowResizeTransforms[step])
                        .toString();
            }
        }
    }

    /**
     * Returns calculated array of transformation definitions for the animation of icon movement.
     * Function defines one transform for every pixel of shift of the icon from it's original y
     * position.
     *
     * @param x {number}  x coordinate of original position of the marker
     * @param y {number}  y coordinate of original position of the marker
     * @param bounceHeight {number}  height of bouncing (px)
     *
     * @return {string[]} array of transformation definitions
     */
    static calculateIconMoveTransforms(x, y, bounceHeight) {
        let transforms = [];
        let deltaY = bounceHeight + 1;

        // Use fast inverse while loop to fill the array
        while (deltaY--) {
            transforms[deltaY] = moveMatrixFormat(x, y - deltaY);
        }

        return transforms;
    }

    /**
     * Returns calculated array of transformation definitions for the animation of icon resizing.
     * Function defines one transform for every pixel of resizing of marker from it's original
     * height.
     *
     * @param x {number}  x coordinate of original position of marker
     * @param y {number}  y coordinate of original position of marker
     * @param height {number}  original marker height (px)
     * @param contractHeight {number}  height of marker contraction (px)
     *
     * @return {string[]} array of transformation definitions
     */
    static calculateIconResizeTransforms(x, y, height, contractHeight) {
        let transforms = [];
        let deltaHeight = contractHeight + 1;

        // Use fast inverse while loop to fill the array
        while (deltaHeight--) {
            transforms[deltaHeight] = resizeMatrixFormat(
                    (height - deltaHeight) / height, x, y + deltaHeight);
        }

        return transforms;
    }

    /**
     * Returns calculated array of transformation definitions for the animation of shadow movement.
     * Function defines one transform for every pixel of shift of the shadow from it's original
     * position.
     *
     * @param x {number}  x coordinate of original position of marker
     * @param y {number}  y coordinate of original position of marker
     * @param bounceHeight {number}  height of bouncing (px)
     * @param angle {number|null}  shadow inclination angle, if null shadow don't moves from it's
     *      initial position (radians)
     *
     * @return {string[]} array of transformation definitions
     */
    static calculateShadowMoveTransforms(x, y, bounceHeight, angle= null) {
        // TODO: check this method to know if bounceHeight + 1 is normal
        let transforms = [];
        let deltaY = bounceHeight + 1;
        let points = [];

        if (angle != null) {  // important: 0 is not null
            points = calculateLine(x, y, angle, bounceHeight + 1);
        } else {
            for (let i = 0; i <= bounceHeight; i++) {
                points[i] = [x, y];
            }
        }

        // Use fast inverse while loop to fill the array
        while (deltaY--) {
            transforms[deltaY] = moveMatrixFormat(points[deltaY][0], points[deltaY][1]);
        }

        return transforms;
    }

    /**
     * Returns calculated array of transformation definitions for the animation of shadow resizing.
     * Function defines one transform for every pixel of shadow resizing.
     *
     * @param x {number}  x coordinate of original position of marker
     * @param y {number}  y coordinate of original position of marker
     * @param width {number}  original marker width (px)
     * @param height {number}  original marker height (px)
     * @param contractHeight {number}  height of marker contraction (px)
     * @param angle {number|null}  shadow inclination angle (radians)
     *
     * @return {string[]} array of transformation definitions
     */
    // TODO: fix & deploy this function
    static calculateShadowResizeTransforms(x, y, width, height, contractHeight, angle= null) {
        let transforms = [];
        let points = calculateLine(width, height, angle + Math.PI, contractHeight);
        let deltaHeight = contractHeight + 1;

        /* Use fast inverse while loop to fill the array */
        while (deltaHeight--) {
            transforms[deltaHeight] = ' matrix3d(' + (width / points[deltaHeight][0]) +  ',0,0,0,0,'
                    + (points[deltaHeight][1] / height) + ',0,0,0,0,1,0,' + x + ','
                    + (y + height - points[deltaHeight][1]) + ',0,1) ';
        }

        return transforms;
    }
}
