;window.onload = () => {
    const parisCenter = [48.847547, 2.351074];
    const map = L.map('map').setView(parisCenter, 14);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        zoomControl: true,
        maxZoom: 18
    }).addTo(map);

    L.Marker.setBouncingOptions({
        bounceHeight: 40,
        bounceSpeed: 60,
    });

    const normalIcon = new L.Icon.Default();
    const uniqueIcon = new UniqueIcon();
    const ballIcon = new BallIcon();

    const normalMarkerOptions = {
        bounceHeight: 20,
        shadowAngle: - Math.PI / 4,
        elastic: true
    };

    const uniqueMarkerOptions = {
        bounceHeight: 60,
        shadowAngle: - Math.PI / 4,
        elastic: false
    };

    const ballMarkerOptions = {
        bounceHeight: 40,
        contractHeight: 20,
        bounceSpeed: 60,
        contractSpeed: 30,
        shadowAngle: null,
        elastic: true
    };

    const icons = [ normalIcon, uniqueIcon, ballIcon ];
    const options = [ normalMarkerOptions, uniqueMarkerOptions, ballMarkerOptions ];

    const marker = L.marker(parisCenter, {
        icon: normalIcon
    })
    .setBouncingOptions(normalMarkerOptions)
    .bounce()
    .addTo(map);

    let i = 0;

    setInterval(() => {
        i += 1;
        i %= 3;

        marker.setIcon(icons[i]);
        marker.setBouncingOptions(options[i]);
    }, 3000);
}
