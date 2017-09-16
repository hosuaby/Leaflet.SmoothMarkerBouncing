export default class BouncingOptions {

    /**
     * How high marker can bounce (px)
     * @type {number}
     */
    bounceHeight = 15;

    /**
     * How much marker can contract (px)
     * @type {number}
     */
    contractHeight = 12;

    /**
     * Bouncing speed coefficient
     * @type {number}
     */
    bounceSpeed = 52;

    /**
     * Contracting speed coefficient
     * @type {number}
     */
    contractSpeed = 52;

    /**
     * Shadow inclination angle(radians); null to cancel shadow movement
     * @type {number}
     */
    shadowAngle = - Math.PI / 4;

    /**
     * Activate contract animation
     * @type {boolean}
     */
    elastic = true;

    /**
     * Many markers can bounce in the same time
     * @type {boolean}
     */
    exclusive = false;

    constructor(options) {
        options && Object.assign(this, options);
    }

    override(options) {
        return Object.assign(new BouncingOptions(this), options);
    }
}
