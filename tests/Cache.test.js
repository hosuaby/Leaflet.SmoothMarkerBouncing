import test from 'ava';
import Cache from '../src/Cache';

test('Test get with cache', t => {

    // Given
    let counter = 12;
    const inc = function () {
        return counter++;
    }
    const cache = new Cache();

    // When
    const first = cache.get('inc', inc);
    const second = cache.get('inc', inc);

    // Then
    t.is(first, 12);
    t.is(second, 12);
    t.is(counter, 13);
    t.like(cache.cache, {
        'inc': 12
    });
});
