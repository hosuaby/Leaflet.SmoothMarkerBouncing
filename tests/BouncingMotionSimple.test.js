import test from 'ava';
import L, {Point} from 'leaflet';
import BouncingOptions from '../src/BouncingOptions';
import BouncingMotionSimple from '../src/BouncingMotionSimple';

test('Test calculate icon move points', t => {

    // Given
    const x = 100;
    const y = 100;
    const length = 15;

    // When
    const points = BouncingMotionSimple.calculateIconMovePoints(x, y, length);

    // Then
    t.deepEqual(points, [
        [ 100, 100 ],
        [ 100, 99 ],
        [ 100, 98 ],
        [ 100, 97 ],
        [ 100, 96 ],
        [ 100, 95 ],
        [ 100, 94 ],
        [ 100, 93 ],
        [ 100, 92 ],
        [ 100, 91 ],
        [ 100, 90 ],
        [ 100, 89 ],
        [ 100, 88 ],
        [ 100, 87 ],
        [ 100, 86 ],
        [ 100, 85 ]
    ]);
});

test('Test calculate shadow move points with angle', t => {

    // Given
    const x = 100;
    const y = 100;
    const bounceHeight = 15;
    const angle = - Math.PI / 4;

    // When
    const points = BouncingMotionSimple.calculateShadowMovePoints(x, y, bounceHeight, angle);

    // Then
    t.deepEqual(points, [
        [ 100, 100 ],
        [ 101, 99 ],
        [ 102, 98 ],
        [ 103, 97 ],
        [ 104, 96 ],
        [ 105, 95 ],
        [ 106, 94 ],
        [ 107, 93 ],
        [ 108, 92 ],
        [ 109, 91 ],
        [ 110, 90 ],
        [ 111, 89 ],
        [ 112, 88 ],
        [ 113, 87 ],
        [ 114, 86 ],
        [ 115, 85 ]
    ]);
});

test('Test calculate shadow move points without angle', t => {

    // Given
    const x = 100;
    const y = 100;
    const bounceHeight = 5;

    // When
    const points = BouncingMotionSimple.calculateShadowMovePoints(x, y, bounceHeight);

    // Then
    t.deepEqual(points, [
        [ 100, 100 ],
        [ 100, 100 ],
        [ 100, 100 ],
        [ 100, 100 ],
        [ 100, 100 ],
        [ 100, 100 ]
    ]);
});

test('Test new simple bouncing motion', t => {

    // Given
    const div = document.createElement('div');
    const map = L.map(div).setView([48.847547, 2.351074], 14);
    const marker = L.marker([48.847547, 2.351074]).addTo(map);
    const position = new Point(100, 100);
    const options = new BouncingOptions();

    // When
    const motion = new BouncingMotionSimple(marker, position, options);

    // Then
    t.deepEqual(motion.iconMovePoints, [
        [ 100, 100 ],
        [ 100, 99 ],
        [ 100, 98 ],
        [ 100, 97 ],
        [ 100, 96 ],
        [ 100, 95 ],
        [ 100, 94 ],
        [ 100, 93 ],
        [ 100, 92 ],
        [ 100, 91 ],
        [ 100, 90 ],
        [ 100, 89 ],
        [ 100, 88 ],
        [ 100, 87 ],
        [ 100, 86 ],
        [ 100, 85 ]
    ]);

    t.deepEqual(motion.shadowMovePoints, [
        [ 100, 100 ],
        [ 101, 99 ],
        [ 102, 98 ],
        [ 103, 97 ],
        [ 104, 96 ],
        [ 105, 95 ],
        [ 106, 94 ],
        [ 107, 93 ],
        [ 108, 92 ],
        [ 109, 91 ],
        [ 110, 90 ],
        [ 111, 89 ],
        [ 112, 88 ],
        [ 113, 87 ],
        [ 114, 86 ],
        [ 115, 85 ]
    ]);
});
