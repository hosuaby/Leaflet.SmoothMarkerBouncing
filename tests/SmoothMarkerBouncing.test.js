import test from 'ava';
import L, {Marker} from 'leaflet';
import '../src/SmoothMarkerBouncing';

test('Test both setBouncingOptions', t => {

    // Given
    Marker.setBouncingOptions({
        contractSpeed: 32
    });

    const div = document.createElement('div');
    const map = L.map(div).setView([48.847547, 2.351074], 14);

    // When
    const marker = L
            .marker([48.847547, 2.351074])
            .setBouncingOptions({
                bounceHeight: 100,
                exclusive: true
            })
            .addTo(map);

    // Then
    t.like(marker._bouncingMotion.bouncingOptions, {
        bounceHeight: 100,
        contractHeight: 12,
        bounceSpeed: 52,
        contractSpeed: 32,
        shadowAngle: - Math.PI / 4,
        elastic: true,
        exclusive: true
    });
});
