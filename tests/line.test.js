import test from 'ava';
import {calculateLine} from '../src/line';

test('Test calculate line', t => {

    // Given
    const x = 100,
        y = 100,
        angle = - Math.PI / 4,
        length = 15;

    // When
    const line = calculateLine(x, y, angle, length);

    // Then
    t.deepEqual(line, [
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
        [ 114, 86 ]
    ]);
});
