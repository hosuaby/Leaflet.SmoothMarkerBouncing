/**
 * Control that makes appear the Panbitt!
 *
 * @author Alexei KLENIN - alexei.klenin@g2mobility.com
 */
(function(L) {

    /* Limit to Paris area */
    var bounds = [[48.824384, 2.284298], [48.872054, 2.409782]];

    var panbitt;    // Panbitt marker

    /**
     * Panbitt icon.
     */
    PanbittIcon = L.Icon.extend({
        options: {
            iconUrl: 'resources/images/panbitt.png',

            iconSize:     [49, 58],  // size of the icon
            iconAnchor:   [25, 53],  // point of the icon which will correspond to marker's location
            popupAnchor:  [0, -46],  // point from which the popup should open relative to the iconAnchor
        }
    });

    PanbittControl = L.Control.extend({
        options: {
            position: 'bottomright'
        },

        onAdd: function(map) {
            var controlDiv = L.DomUtil.create('div', 'panbitt-control');
            controlDiv.innerHTML = 'п';

            controlDiv.addEventListener('click', function(event) {

                if (!panbitt) {

                    /* Create panbitt */
                    var lat = _.random(bounds[0][0], bounds[1][0]);
                    var lng = _.random(bounds[0][1], bounds[1][1]);

                    panbitt = L.marker([lat, lng], {
                        icon: new PanbittIcon()
                    }).setBouncingOptions({
                        bounceHeight: 10,
                        contractHeight: 15
                    }).on('click', function() {
                        this.toggleBouncing();
                    }).addTo(map);

                    panbitt.bounce();
                }

                event.stopPropagation();
            });

            return controlDiv;
        }
    });

})(L);
