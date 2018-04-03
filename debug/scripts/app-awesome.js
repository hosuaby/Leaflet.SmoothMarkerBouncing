/**
 * Main application script.
 */
;window.onload = function() {

    var map = L.map('map').setView([48.847547, 2.351074], 14);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        zoomControl: true,
        maxZoom: 18
    }).addTo(map);

    /* Limit to Paris area */
    var bounds = [[48.824384, 2.284298], [48.872054, 2.409782]];

    L.Marker.setBouncingOptions({
        bounceHeight: 40,
        bounceSpeed: 60
    });

    var redMarker = L.AwesomeMarkers.icon({
        prefix: 'glyphicon',
        icon: 'leaf',
        markerColor: 'green'
    });

    var sidebar = $('#sidebar');

    /* 20 normal markers */
    _.times(20, function() {
        var lat = _.random(bounds[0][0], bounds[1][0]);
        var lng = _.random(bounds[0][1], bounds[1][1]);

        var marker = L.marker([lat, lng], { icon: redMarker })
            .setBouncingOptions({
                bounceHeight: 20
            })
            .on('click', function() {
                this.toggleBouncing();
            }).addTo(map);

        var button = $('<button>toto</button>');
        button.mouseenter(function () {
            marker.bounce();
        });
        button.mouseleave(function () {
            marker.stopBouncing();
        });

        sidebar.append(button);
    });

    /* Stop all bouncing markers on click on the map */
    map.on('click', function() {
        L.Marker.stopAllBouncingMarkers();
    });

}
