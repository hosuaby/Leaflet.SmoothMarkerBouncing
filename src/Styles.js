import {DomUtil} from 'leaflet';

/** Regex to parse style definitions. */
const regStyle = /([\w-]+): ([^;]+);/g;

/** CSS3 transform properties for different browsers. */
const css3Transforms = {
    transform: 'transform',
    WebkitTransform: '-webkit-transform',
    OTransform: '-o-transform',
    MozTransform: '-moz-transform',
    msTransform: '-ms-transform'
};

/** CSS3 transform property for this browser. */
const transformProperty = css3Transforms[DomUtil.TRANSFORM];

export default class Styles {
    constructor(styles) {
        styles && Object.assign(this, styles);
    }

    findOpacity(options) {
        this.opacity = options?.opacityWhenUnclustered  // used by cluster plugin
                || options?.opacity
                || 1;
    }

    /**
     * Creates a copy of styles with provided 'transform' property.
     * @param transform {String}
     * @return {Styles} copy of styles with defined 'transform'.
     */
    withTransform(transform) {
        const copy = new Styles(this);
        copy[transformProperty] = transform;
        return copy;
    }

    toString() {
        return Object
                .entries(this)
                .map((entry) => `${entry[0]}: ${entry[1]};`)
                .join(' ');
    }

    /**
     * Parses cssText attribute into Styles object.
     * @param cssText {string}  cssText string
     * @return {Styles} Styles object
     */
    static parse(cssText) {
        const styles = {};

        let match = regStyle.exec(cssText);
        while (match) {
            styles[match[1]] = match[2];
            match = regStyle.exec(cssText);
        }

        delete styles[transformProperty];
        delete styles['z-index'];
        delete styles['opacity'];

        styles['outline'] = 'none';

        return new Styles(styles);
    }

    /**
     * @param marker {Marker}
     */
    static ofMarker(marker) {
        const styles = Styles.parse(marker._icon.style.cssText);
        styles.findOpacity(marker.options);
        styles['z-index'] = marker._zIndex;

        return styles;
    }
}
