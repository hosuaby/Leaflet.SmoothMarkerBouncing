import test from 'ava';
import L, {Point} from 'leaflet';
import BouncingOptions from '../src/BouncingOptions';
import BouncingMotion from '../src/BouncingMotion';

test('Test calculate steps', t => {

    // Given
    const height = 5;
    const prefix = 'moveSteps_';

    // When
    const steps = BouncingMotion.calculateSteps(height, prefix);

    // Then
    t.deepEqual(steps, [1, 2, 3, 4, 5, 4, 3, 2, 1, 0]);
});

test('Test calculate delays', t => {

    // Given
    const height = 10;
    const speed = 52;
    const prefix = 'moveSteps_';

    // When
    const delays = BouncingMotion.calculateDelays(height, speed, prefix);

    // Then
    t.deepEqual(delays, [
        0,
        6,
        13,
        20,
        29,
        39,
        52,
        69,
        95,
        147,
        199,
        251,
        277,
        294,
        307,
        317,
        326,
        333,
        340,
        346,
        346
    ]);
});

test('Test new bouncing motion', t => {

    // Given
    const div = document.createElement('div');
    const map = L.map(div).setView([48.847547, 2.351074], 14);
    const marker = L.marker([48.847547, 2.351074]).addTo(map);
    const position = new Point(100, 100);
    const options = new BouncingOptions({
        bounceHeight: 10,
        bounceSpeed: 52,
        contractHeight: 5,
        contractSpeed: 52,
        elastic: true
    });

    // When
    const motion = new BouncingMotion(marker, position, options);

    // Then
    t.deepEqual(motion.moveSteps, [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0
    ]);

    t.deepEqual(motion.moveDelays, [
        0, 6, 13, 20, 29, 39, 52, 69, 95, 147, 199, 251, 277, 294, 307, 317, 326, 333, 340, 346, 346
    ]);

    t.deepEqual(motion.resizeSteps, [
        1, 2, 3, 4, 5, 4, 3, 2, 1, 0
    ]);

    t.deepEqual(motion.resizeDelays, [
        0, 13, 30, 56, 108, 160, 212, 238, 255, 268, 268
    ]);
});
