import {Marker} from 'leaflet';

export default class Orchestration {
    #bouncingMarkers = [];

    getBouncingMarkers() {
        return this.#bouncingMarkers;
    }

    /**
     * Adds the marker to the list of bouncing markers.
     * If flag 'exclusive' is set to true, stops all bouncing markers before.
     *
     * @param marker {Marker}  marker object
     * @param exclusive {boolean}  flag of exclusive bouncing. If set to true, stops the bouncing
     *      of all other markers.
     */
    addBouncingMarker(marker, exclusive) {
        if (exclusive || marker._bouncingMotion.bouncingOptions.exclusive) {
            this.stopAllBouncingMarkers();
        } else {
            this.stopExclusiveMarkerBouncing();
        }

        this.#bouncingMarkers.push(marker);
    }

    /**
     * Stops the bouncing of exclusive marker.
     */
    stopExclusiveMarkerBouncing() {
        const exclusiveMarker = this.#bouncingMarkers.find(
                marker => marker._bouncingMotion.bouncingOptions.exclusive);
        if (exclusiveMarker) {
            exclusiveMarker.stopBouncing();
        }
    }

    /**
     * Removes the marker from the list of bouncing markers.
     * @param marker {Marker}  marker
     */
    removeBouncingMarker(marker) {
        const i = this.#bouncingMarkers.indexOf(marker);
        if (~i) {
            this.#bouncingMarkers.splice(i, 1);
        }
    }

    /**
     * Stops the bouncing of all currently bouncing markers. Purge the array of bouncing markers.
     */
    stopAllBouncingMarkers() {
        let marker;
        while (marker = this.#bouncingMarkers.shift()) {
            marker.stopBouncing();
        }
    };
}
