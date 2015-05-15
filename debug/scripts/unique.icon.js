/**
 * Unique icon for leaflet marker.
 *
 * @author Alexei KLENIN - alexei.klenin@g2mobility.com
 */
(function(L) {

    UniqueIcon = L.Icon.extend({
        options: {
            iconUrl: 'images/unique.png',
            shadowUrl: 'images/unique-shadow.png',

            iconSize:     [33, 44],  // size of the icon
            shadowSize:   [38, 25],  // size of the shadow
            iconAnchor:   [17, 44],  // point of the icon which will correspond to marker's location
            shadowAnchor: [6, 25],   // the same for the shadow
            popupAnchor:  [0, -46],  // point from which the popup should open relative to the iconAnchor
        }
    });

})(L);
