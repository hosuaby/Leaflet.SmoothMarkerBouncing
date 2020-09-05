const parisArea = [[48.824384, 2.284298], [48.872054, 2.409782]];

function randLatLng() {
    const lat = _.random(parisArea[0][0], parisArea[1][0]);
    const lng = _.random(parisArea[0][1], parisArea[1][1]);
    return [lat, lng];
}

const UniqueIcon = L.Icon.extend({
    options: {
        iconUrl: 'resources/images/unique.png',
        shadowUrl: 'resources/images/unique-shadow.png',

        iconSize: [33, 44],
        shadowSize: [38, 25],
        iconAnchor: [17, 44],
        shadowAnchor: [6, 25],
        popupAnchor: [0, -46],
    }
});

const BallIcon = L.Icon.extend({
    options: {
        iconUrl: 'resources/images/ball.png',
        shadowUrl: 'resources/images/ball-shadow.png',

        iconSize: [35, 36],
        shadowSize: [34, 10],
        iconAnchor: [18, 36],
        shadowAnchor: [18, 5],
        popupAnchor: [0, -46],
    }
});

const PanbittIcon = L.Icon.extend({
    options: {
        iconUrl: 'resources/images/panbitt.png',

        iconSize: [49, 58],
        iconAnchor: [25, 53],
        popupAnchor: [0, -46],
    }
});

let panbittMarker = L.marker(randLatLng(), {
    icon: new PanbittIcon()
}).setBouncingOptions({
    bounceHeight: 10,
    contractHeight: 15
}).on('click', function() {
    this.toggleBouncing();
});

const PanbittControl = L.Control.extend({
    options: {
        position: 'bottomright'
    },

    onAdd: function(map) {
        const controlDiv = L.DomUtil.create('div', 'panbitt-control');
        controlDiv.innerHTML = 'п';

        controlDiv.addEventListener('click', (event) => {
            if (!panbittMarker) {
                panbittMarker.addTo(map).bounce();
            }
            event.stopPropagation();
        });

        return controlDiv;
    }
});

window.onload = () => {
    const map = L.map('map')
        .setView([48.847547, 2.351074], 14)
        .on('click', () => L.Marker.stopAllBouncingMarkers());

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        zoomControl: true,
        maxZoom: 18
    }).addTo(map);

    map.zoomControl.setPosition('topright');

    L.control.sidebar('sidebar', {
        position: 'left'
    }).addTo(map);

    new PanbittControl().addTo(map);

    L.Marker.setBouncingOptions({
        bounceHeight: 40,
        bounceSpeed: 60
    });

    /* 20 normal markers */
    _.times(20, () => {
        L.marker(randLatLng())
            .setBouncingOptions({
                bounceHeight: 20
            })
            .on('click', function() {
                this.toggleBouncing();
            }).addTo(map);
    });

    /* 5 unique markers */
    _.times(5, () => {
        L.marker(randLatLng(), {
            icon: new UniqueIcon(),
        }).setBouncingOptions({
            exclusive: true,
            elastic: false
        }).on('click', function() {
            this.toggleBouncing();
        }).addTo(map);
    });

    /* 7 ball markers */
    _.times(7, () => {
        L.marker(randLatLng(), {
            icon: new BallIcon()
        }).setBouncingOptions({
            bounceHeight: 40,
            contractHeight: 20,
            bounceSpeed: 60,
            contractSpeed: 30,
            shadowAngle: null
        }).on('click', function() {
            this.bounce(3);
        }).addTo(map);
    });
}
