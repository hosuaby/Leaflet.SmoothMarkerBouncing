/**
 * Ball icon for leaflet marker.
 *
 * @author Alexei KLENIN - alexei.klenin@g2mobility.com
 */
(function(L) {

    BallIcon = L.Icon.extend({
        options: {
            iconUrl: 'images/ball.png',
            shadowUrl: 'images/ball-shadow.png',

            iconSize:     [35, 36],  // size of the icon
            shadowSize:   [34, 10],  // size of the shadow
            iconAnchor:   [18, 36],  // point of the icon which will correspond to marker's location
            shadowAnchor: [18, 5],   // the same for the shadow
            popupAnchor:  [0, -46],  // point from which the popup should open relative to the iconAnchor
        }
    });

})(L);
