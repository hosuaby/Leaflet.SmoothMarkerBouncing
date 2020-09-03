"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

var rowMap = {
  'a': 0,
  'b': 1,
  'c': 2,
  'd': 3
};
var zeros = Array(16).fill(0);
var _identity = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
/**
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix3d
 */

var _matrix = new WeakMap();

var Matrix3D = /*#__PURE__*/function () {
  function Matrix3D() {
    var matrix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : zeros;

    _classCallCheck(this, Matrix3D);

    _matrix.set(this, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _matrix, _toConsumableArray(matrix));
  }

  _createClass(Matrix3D, [{
    key: "toFormat",
    value: function toFormat() {
      for (var _len = arguments.length, placeholders = new Array(_len), _key = 0; _key < _len; _key++) {
        placeholders[_key] = arguments[_key];
      }

      placeholders = placeholders.map(Matrix3D.valueNameToIndex);
      var nextPlaceholderIndex = 0;

      var fnBody = _classPrivateFieldGet(this, _matrix).map(function (value, index) {
        return index === placeholders[nextPlaceholderIndex] ? "'+arguments[".concat(nextPlaceholderIndex++, "]+'") : value;
      }).join(',');

      fnBody = "return ' matrix3d(".concat(fnBody, ") ';");

      function formatFn() {
        return Function.apply(this, [fnBody]);
      }

      formatFn.prototype = Function.prototype;
      return new formatFn();
    }
  }, {
    key: "toString",
    value: function toString() {
      return " matrix3d(".concat(_classPrivateFieldGet(this, _matrix).join(','), ") ");
    }
  }], [{
    key: "zeros",
    value: function zeros() {
      return new Matrix3D();
    }
  }, {
    key: "identity",
    value: function identity() {
      return new Matrix3D(_identity);
    }
  }, {
    key: "valueNameToIndex",
    value: function valueNameToIndex(valueName) {
      return rowMap[valueName[0]] * 4 + parseInt(valueName[1]) - 1;
    }
  }]);

  return Matrix3D;
}();

exports["default"] = Matrix3D;