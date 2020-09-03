"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Cache = /*#__PURE__*/function () {
  function Cache() {
    _classCallCheck(this, Cache);

    _defineProperty(this, "cache", {});
  }

  _createClass(Cache, [{
    key: "get",

    /**
     * If item with supplied {@code key} is present in cache, returns it, otherwise executes
     * {@code supplier} function and caches the result.
     *
     * @param key {String}  key of the cache
     * @param supplier {function}  item supplier
     * @return {Object}  item
     */
    value: function get(key, supplier) {
      return this.cache[key] || (this.cache[key] = supplier.apply());
    }
  }]);

  return Cache;
}();

exports["default"] = Cache;