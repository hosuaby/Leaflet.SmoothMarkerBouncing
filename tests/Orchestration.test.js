import test from 'ava';
import L from 'leaflet';
import randLatLng from './helpers/random-pos';
import Marker from '../src/MarkerPrototypeExt';
import '../src/SmoothMarkerBouncing';

test('Test start/stop bouncing of individual markers', t => {

    // Given
    const div = document.createElement('div');
    const map = L.map(div).setView([48.847547, 2.351074], 14);

    const marker1 = L.marker(randLatLng()).addTo(map);
    const marker2 = L.marker(randLatLng()).addTo(map);
    const marker3 = L.marker(randLatLng()).addTo(map);

    // When
    let bouncingMarkers = Marker._orchestration.getBouncingMarkers();

    // Then
    t.deepEqual(bouncingMarkers, []);

    // When
    marker2.bounce();
    bouncingMarkers = Marker._orchestration.getBouncingMarkers();

    // Then
    t.deepEqual(bouncingMarkers, [ marker2 ]);

    // When
    marker2.stopBouncing();
    bouncingMarkers = Marker._orchestration.getBouncingMarkers();

    // Then
    t.deepEqual(bouncingMarkers, []);
});

test('Test start/stop bouncing of exclusive marker', t => {

    // Given
    const div = document.createElement('div');
    const map = L.map(div).setView([48.847547, 2.351074], 14);

    const marker1 = L.marker(randLatLng()).addTo(map);
    const marker2 = L.marker(randLatLng()).addTo(map);
    const marker3 = L.marker(randLatLng()).setBouncingOptions({ exclusive: true }).addTo(map);

    // When
    let bouncingMarkers = Marker._orchestration.getBouncingMarkers();

    // Then
    t.deepEqual(bouncingMarkers, []);

    // When
    marker1.bounce();
    marker2.bounce();
    bouncingMarkers = Marker._orchestration.getBouncingMarkers();

    // Then
    t.deepEqual(bouncingMarkers, [ marker1, marker2 ]);

    // When
    marker3.bounce();
    bouncingMarkers = Marker._orchestration.getBouncingMarkers();

    // Then
    t.deepEqual(bouncingMarkers, [ marker3 ]);

    // When
    marker2.bounce();
    bouncingMarkers = Marker._orchestration.getBouncingMarkers();

    // Then
    t.deepEqual(bouncingMarkers, [ marker2 ]);
});
