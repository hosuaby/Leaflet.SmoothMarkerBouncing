/** Regex to parse style definitions. */
const regStyle = /([\w-]+): ([^;]+);/g;

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
     * Creates a copy of styles merged with provided 'styles'.
     * @param {Object} styles  object with styles to merge
     * @return {Styles} copy of styles
     */
    withStyles(styles) {
        const copy = new Styles(this);
        copy && Object.assign(copy, styles);
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
