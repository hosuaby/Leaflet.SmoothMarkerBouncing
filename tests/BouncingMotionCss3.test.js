import test from 'ava';
import BouncingMotionCss3 from '../src/BouncingMotionCss3';
import {Point} from 'leaflet';
import BouncingOptions from '../src/BouncingOptions';

test('Test calculate contract scale', t => {

    // When
    const contractScale = BouncingMotionCss3.contractScale(41, 12);

    // Then
    t.is(contractScale, 0.7073170731707317);
});

test('Test calculate duration of CSS3 animation', t => {

    // When
    const duration1 = BouncingMotionCss3.calculateDuration(15, 52);
    const duration2 = BouncingMotionCss3.calculateDuration(12, 52);
    const duration3 = BouncingMotionCss3.calculateDuration(20, 30);

    // Then
    t.is(duration1, 211);
    t.is(duration2, 199);
    t.is(duration3, 132);
});

test('Test calculate icon animation params', t => {

    // Given
    const position = new Point(100, 100);
    const bouncingOptions = new BouncingOptions();

    const height = 41;

    // When
    const animationParams = BouncingMotionCss3.animationParams(position, bouncingOptions, height);

    // Then
    t.deepEqual(animationParams, {
        '--pos-x': '100px',
        '--pos-y': '100px',
        '--pos-y-jump': '85px',
        '--pos-y-contract': '112px',
        '--scale-contract': 0.7073170731707317,
        '--duration-jump': '211ms',
        '--duration-contract': '199ms',
        '--delays': '0ms, 211ms, 422ms, 621ms'
    });
});
