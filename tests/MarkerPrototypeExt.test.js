import test from 'ava';
import L from 'leaflet';
import randLatLng from './helpers/random-pos';
import MarkerPrototypeExt from '../src/MarkerPrototypeExt';
import '../src/SmoothMarkerBouncing';

const MarkerCluster= L.Marker.extend({});

L.Marker.include(MarkerPrototypeExt);

test('Test isRealMarker', t => {

    // Given
    const div = document.createElement('div');
    const map = L.map(div).setView([48.847547, 2.351074], 14);
    const marker = L.marker(randLatLng()).addTo(map);
    const cluster = new MarkerCluster({});

    // Then
    t.true(marker.isRealMarker());
    t.false(cluster.isRealMarker());
});
