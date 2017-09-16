export default class Cache {
    cache = {};

    /**
     * If item with supplied {@code key} is present in cache, returns it, otherwise executes
     * {@code supplier} function and caches the result.
     *
     * @param key {String}  key of the cache
     * @param supplier {function}  item supplier
     * @return {Object}  item
     */
    get(key, supplier) {
        return this.cache[key] || (this.cache[key] = supplier.apply());
    }
}
