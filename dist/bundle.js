(function (L) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var L__default = /*#__PURE__*/_interopDefaultLegacy(L);

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
      object = _getPrototypeOf(object);
      if (object === null) break;
    }

    return object;
  }

  function _get(target, property, receiver) {
    if (typeof Reflect !== "undefined" && Reflect.get) {
      _get = Reflect.get;
    } else {
      _get = function _get(target, property, receiver) {
        var base = _superPropBase(target, property);

        if (!base) return;
        var desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.get) {
          return desc.get.call(receiver);
        }

        return desc.value;
      };
    }

    return _get(target, property, receiver || target);
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _classPrivateFieldGet(receiver, privateMap) {
    var descriptor = privateMap.get(receiver);

    if (!descriptor) {
      throw new TypeError("attempted to get private field on non-instance");
    }

    if (descriptor.get) {
      return descriptor.get.call(receiver);
    }

    return descriptor.value;
  }

  function _classPrivateFieldSet(receiver, privateMap, value) {
    var descriptor = privateMap.get(receiver);

    if (!descriptor) {
      throw new TypeError("attempted to set private field on non-instance");
    }

    if (descriptor.set) {
      descriptor.set.call(receiver, value);
    } else {
      if (!descriptor.writable) {
        throw new TypeError("attempted to set read only private field");
      }

      descriptor.value = value;
    }

    return value;
  }

  var BouncingOptions = /*#__PURE__*/function () {
    /**
     * How high marker can bounce (px)
     * @type {number}
     */

    /**
     * How much marker can contract (px)
     * @type {number}
     */

    /**
     * Bouncing speed coefficient
     * @type {number}
     */

    /**
     * Contracting speed coefficient
     * @type {number}
     */

    /**
     * Shadow inclination angle(radians); null to cancel shadow movement
     * @type {number}
     */

    /**
     * Activate contract animation
     * @type {boolean}
     */

    /**
     * Many markers can bounce in the same time
     * @type {boolean}
     */
    function BouncingOptions(options) {
      _classCallCheck(this, BouncingOptions);

      _defineProperty(this, "bounceHeight", 15);

      _defineProperty(this, "contractHeight", 12);

      _defineProperty(this, "bounceSpeed", 52);

      _defineProperty(this, "contractSpeed", 52);

      _defineProperty(this, "shadowAngle", -Math.PI / 4);

      _defineProperty(this, "elastic", true);

      _defineProperty(this, "exclusive", false);

      options && Object.assign(this, options);
    }

    _createClass(BouncingOptions, [{
      key: "override",
      value: function override(options) {
        return Object.assign(new BouncingOptions(this), options);
      }
    }]);

    return BouncingOptions;
  }();

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

  /** Regex to parse style definitions. */

  var regStyle = /([\w-]+): ([^;]+);/g;
  /** CSS3 transform properties for different browsers. */

  var css3Transforms = {
    transform: 'transform',
    WebkitTransform: '-webkit-transform',
    OTransform: '-o-transform',
    MozTransform: '-moz-transform',
    msTransform: '-ms-transform'
  };
  /** CSS3 transform property for this browser. */

  var transformProperty = css3Transforms[L.DomUtil.TRANSFORM];

  var Styles = /*#__PURE__*/function () {
    function Styles(styles) {
      _classCallCheck(this, Styles);

      styles && Object.assign(this, styles);
    }

    _createClass(Styles, [{
      key: "findOpacity",
      value: function findOpacity(options) {
        this.opacity = (options === null || options === void 0 ? void 0 : options.opacityWhenUnclustered // used by cluster plugin
        ) || (options === null || options === void 0 ? void 0 : options.opacity) || 1;
      }
      /**
       * Creates a copy of styles with provided 'transform' property.
       * @param transform {String}
       * @return {Styles} copy of styles with defined 'transform'.
       */

    }, {
      key: "withTransform",
      value: function withTransform(transform) {
        var copy = new Styles(this);
        copy[transformProperty] = transform;
        return copy;
      }
    }, {
      key: "toString",
      value: function toString() {
        return Object.entries(this).map(function (entry) {
          return "".concat(entry[0], ": ").concat(entry[1], ";");
        }).join(' ');
      }
      /**
       * Parses cssText attribute into Styles object.
       * @param cssText {string}  cssText string
       * @return {Styles} Styles object
       */

    }], [{
      key: "parse",
      value: function parse(cssText) {
        var styles = {};
        var match = regStyle.exec(cssText);

        while (match) {
          styles[match[1]] = match[2];
          match = regStyle.exec(cssText);
        }

        delete styles[transformProperty];
        delete styles['z-index'];
        delete styles['opacity'];
        styles['outline'] = 'none';
        return new Styles(styles);
      }
      /**
       * @param marker {Marker}
       */

    }, {
      key: "ofMarker",
      value: function ofMarker(marker) {
        var styles = Styles.parse(marker._icon.style.cssText);
        styles.findOpacity(marker.options);
        styles['z-index'] = marker._zIndex;
        return styles;
      }
    }]);

    return Styles;
  }();

  var bonceEndEvent = 'bounceend';

  var BouncingMotion = /*#__PURE__*/function () {
    // TODO: check if this cache working right (keys don't need prefix)

    /**
     * Constructor.
     *
     * @param marker {Marker}  marker
     * @param position {Point}  marker current position on the map canvas
     * @param bouncingOptions {BouncingOptions}  options of bouncing animation
     */
    function BouncingMotion(marker, position, bouncingOptions) {
      _classCallCheck(this, BouncingMotion);

      _defineProperty(this, "marker", void 0);

      _defineProperty(this, "position", void 0);

      _defineProperty(this, "bouncingOptions", void 0);

      _defineProperty(this, "moveSteps", void 0);

      _defineProperty(this, "moveDelays", void 0);

      _defineProperty(this, "resizeSteps", void 0);

      _defineProperty(this, "resizeDelays", void 0);

      _defineProperty(this, "isBouncing", false);

      _defineProperty(this, "iconStyles", void 0);

      _defineProperty(this, "shadowStyles", void 0);

      _defineProperty(this, "bouncingAnimationPlaying", false);

      this.marker = marker;
      this.position = position;
      this.updateBouncingOptions(bouncingOptions);
    }

    _createClass(BouncingMotion, [{
      key: "updateBouncingOptions",
      value: function updateBouncingOptions(options) {
        this.bouncingOptions = options instanceof BouncingOptions ? options : this.bouncingOptions.override(options);
        var _this$bouncingOptions = this.bouncingOptions,
            bounceHeight = _this$bouncingOptions.bounceHeight,
            bounceSpeed = _this$bouncingOptions.bounceSpeed,
            elastic = _this$bouncingOptions.elastic;
        this.moveSteps = BouncingMotion.cache.get("moveSteps_".concat(bounceHeight), function () {
          return BouncingMotion.calculateSteps(bounceHeight);
        });
        this.moveDelays = BouncingMotion.cache.get("moveDelays_".concat(bounceHeight, "_").concat(bounceSpeed), function () {
          return BouncingMotion.calculateDelays(bounceHeight, bounceSpeed);
        });

        if (elastic) {
          var _this$bouncingOptions2 = this.bouncingOptions,
              contractHeight = _this$bouncingOptions2.contractHeight,
              contractSpeed = _this$bouncingOptions2.contractSpeed;
          this.resizeSteps = BouncingMotion.cache.get("resizeSteps_".concat(contractHeight), function () {
            return BouncingMotion.calculateSteps(contractHeight);
          });
          this.resizeDelays = BouncingMotion.cache.get("resizeDelays_".concat(contractHeight, "_").concat(contractSpeed), function () {
            return BouncingMotion.calculateDelays(contractHeight, contractSpeed);
          });
        }

        this.recalculateMotion(this.position);
      }
    }, {
      key: "resetStyles",
      value: function resetStyles(marker) {
        this.iconStyles = Styles.ofMarker(marker);

        if (marker._shadow) {
          this.shadowStyles = Styles.parse(marker._shadow.style.cssText);
        }
      }
      /**
       * Recalculates bouncing motion for new marker position.
       * @param position {Point} new marker position
       */

    }, {
      key: "recalculateMotion",
      value: function recalculateMotion(position) {
        this.position = position;
      }
      /**
       * @param times {number|null}
       */

    }, {
      key: "bounce",
      value: function bounce() {
        var times = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        if (this.bouncingAnimationPlaying) {
          this.isBouncing = true;
          return;
        }

        this.isBouncing = true;
        this.bouncingAnimationPlaying = true;
        this.move(times);
      }
    }, {
      key: "stopBouncing",
      value: function stopBouncing() {
        this.isBouncing = false;
      }
      /**
       * @param times {number|null}
       */

    }, {
      key: "move",
      value: function move() {
        var _this = this;

        var times = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        if (times !== null) {
          if (! --times) {
            this.isBouncing = false; // this is the last bouncing

            this.bouncingAnimationPlaying = false;
          }
        }
        /* Launch timeouts for every step of the movement animation */


        var i = this.moveSteps.length;

        while (i--) {
          setTimeout(function (step) {
            return _this.makeMoveStep(step);
          }, this.moveDelays[i], this.moveSteps[i]);
        }

        setTimeout(function () {
          return _this.afterMove(times);
        }, this.moveDelays[this.moveSteps.length - 1]);
      }
    }, {
      key: "afterMove",
      value: function afterMove(times) {
        var _this2 = this;

        if (this.isBouncing) {
          setTimeout(function () {
            return _this2.move(times);
          }, this.bouncingOptions.bounceSpeed);
        } else {
          this.bouncingAnimationPlaying = false;
          this.marker.fire(bonceEndEvent);
        }
      }
      /**
       * @param step {number}
       */

    }, {
      key: "makeMoveStep",
      value: function makeMoveStep(step) {
        this.marker._icon.style.cssText = this.iconStyles.toString();

        if (this.marker._shadow) {
          this.marker._shadow.style.cssText = this.shadowStyles.toString();
        }
      }
      /**
       * Returns calculated array of animation steps. This function used to calculate both movement
       * and resizing animations.
       *
       * @param height {number}  height of movement or resizing (px)
       *
       * @return {number[]} array of animation steps
       */

    }], [{
      key: "calculateSteps",
      value: function calculateSteps(height) {
        /* Calculate the sequence of animation steps:
         * steps = [1 .. height] concat [height-1 .. 0]
         */
        var i = 1;
        var steps = [];

        while (i <= height) {
          steps.push(i++);
        }

        i = height;

        while (i--) {
          steps.push(i);
        }

        return steps;
      }
      /**
       * Returns calculated array of delays between animation start and the steps of animation. This
       * function used to calculate both movement and resizing animations. Element with index i of
       * this array contains the delay in milliseconds between animation start and the step number i.
       *
       * @param height {number}  height of movement or resizing (px)
       * @param speed {number}  speed coefficient
       *
       * @return {number[]} array of delays before steps of animation
       */

    }, {
      key: "calculateDelays",
      value: function calculateDelays(height, speed) {
        // Calculate delta time for bouncing animation
        // Delta time to movement in one direction
        var deltas = []; // time between steps of animation

        deltas[height] = speed;
        deltas[0] = 0;
        var i = height;

        while (--i) {
          deltas[i] = Math.round(speed / (height - i));
        } // Delta time for movement in two directions


        i = height;

        while (i--) {
          deltas.push(deltas[i]);
        } // Calculate move delays (cumulated deltas)
        // TODO: instead of deltas.lenght write bounceHeight * 2 - 1


        var delays = []; // delays before steps from beginning of animation

        var totalDelay = 0;

        for (i = 0; i < deltas.length; i++) {
          totalDelay += deltas[i];
          delays.push(totalDelay);
        }

        return delays;
      }
    }]);

    return BouncingMotion;
  }();

  _defineProperty(BouncingMotion, "cache", new Cache());

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

  /**
   * Calculates the points to draw the continous line on the screen. Returns the array of ordered
   * point coordinates. Uses Bresenham algorithm.
   *
   * @param x {number}  x coordinate of origin
   * @param y {number}  y coordinate of origin
   * @param angle {number}  angle (radians)
   * @param length {number}  length of line (px)
   *
   * @return {[number, number][]} array of ordered point coordinates
   *
   * @see http://rosettacode.org/wiki/Bitmap/Bresenham's_line_algorithm#JavaScript
   */
  function calculateLine(x, y, angle, length) {
    // TODO: use something else than multiply length by 2 to calculate the line with defined
    // length
    var xD = Math.round(x + Math.cos(angle) * (length * 2)),
        yD = Math.round(y + Math.sin(angle) * (length * 2)),
        dx = Math.abs(xD - x),
        sx = x < xD ? 1 : -1,
        dy = Math.abs(yD - y),
        sy = y < yD ? 1 : -1,
        err = (dx > dy ? dx : -dy) / 2,
        e2,
        p = [],
        i = 0;

    while (true) {
      p.push([x, y]);
      i++;
      if (i === length) break;
      e2 = err;

      if (e2 > -dx) {
        err -= dy;
        x += sx;
      }

      if (e2 < dy) {
        err += dx;
        y += sy;
      }
    }

    return p;
  }

  var moveMatrixFormat = Matrix3D.identity().toFormat('d1', 'd2');
  var resizeMatrixFormat = Matrix3D.identity().toFormat('b2', 'd1', 'd2');

  var BouncingMotion3D = /*#__PURE__*/function (_BouncingMotion) {
    _inherits(BouncingMotion3D, _BouncingMotion);

    var _super = _createSuper(BouncingMotion3D);

    /**
     * Constructor.
     *
     * @param marker {Marker}  marker
     * @param position {Point}  marker current position on the map canvas
     * @param bouncingOptions {BouncingOptions}  options of bouncing animation
     */
    function BouncingMotion3D(marker, position, bouncingOptions) {
      var _this;

      _classCallCheck(this, BouncingMotion3D);

      _this = _super.call(this, marker, position, bouncingOptions);

      _defineProperty(_assertThisInitialized(_this), "iconMoveTransforms", void 0);

      _defineProperty(_assertThisInitialized(_this), "iconResizeTransforms", void 0);

      _defineProperty(_assertThisInitialized(_this), "shadowMoveTransforms", void 0);

      _defineProperty(_assertThisInitialized(_this), "shadowResizeTransforms", void 0);

      _this.recalculateMotion(position);

      return _this;
    }

    _createClass(BouncingMotion3D, [{
      key: "recalculateMotion",
      value: function recalculateMotion(position) {
        var _this$marker$getIcon, _this$marker$getIcon$, _this$marker, _this$marker$_iconObj, _this$marker$_iconObj2;

        _get(_getPrototypeOf(BouncingMotion3D.prototype), "recalculateMotion", this).call(this, position);

        var iconHeight = ((_this$marker$getIcon = this.marker.getIcon()) === null || _this$marker$getIcon === void 0 ? void 0 : (_this$marker$getIcon$ = _this$marker$getIcon.options) === null || _this$marker$getIcon$ === void 0 ? void 0 : _this$marker$getIcon$.iconSize[1]) || ((_this$marker = this.marker) === null || _this$marker === void 0 ? void 0 : (_this$marker$_iconObj = _this$marker._iconObj) === null || _this$marker$_iconObj === void 0 ? void 0 : (_this$marker$_iconObj2 = _this$marker$_iconObj.options) === null || _this$marker$_iconObj2 === void 0 ? void 0 : _this$marker$_iconObj2.iconSize[1]);
        var x = position.x,
            y = position.y;
        var _this$bouncingOptions = this.bouncingOptions,
            bounceHeight = _this$bouncingOptions.bounceHeight,
            contractHeight = _this$bouncingOptions.contractHeight,
            shadowAngle = _this$bouncingOptions.shadowAngle;
        this.iconMoveTransforms = BouncingMotion3D.calculateIconMoveTransforms(x, y, bounceHeight);
        this.iconResizeTransforms = BouncingMotion3D.calculateIconResizeTransforms(x, y, iconHeight, contractHeight);

        if (this.marker._shadow) {
          var _this$marker$getIcon2, _this$marker$getIcon3;

          this.shadowMoveTransforms = BouncingMotion3D.calculateShadowMoveTransforms(x, y, bounceHeight, shadowAngle); // TODO: use function calculateShadowResizeTransforms

          var shadowHeight = (_this$marker$getIcon2 = this.marker.getIcon()) === null || _this$marker$getIcon2 === void 0 ? void 0 : (_this$marker$getIcon3 = _this$marker$getIcon2.options) === null || _this$marker$getIcon3 === void 0 ? void 0 : _this$marker$getIcon3.shadowSize[1];
          this.shadowResizeTransforms = BouncingMotion3D.calculateIconResizeTransforms(x, y, shadowHeight, contractHeight);
        }
      }
    }, {
      key: "afterMove",
      value: function afterMove(times) {
        if (this.bouncingOptions.elastic) {
          this.resize(times);
        } else {
          _get(_getPrototypeOf(BouncingMotion3D.prototype), "afterMove", this).call(this, times);
        }
      }
    }, {
      key: "resize",
      value: function resize(times) {
        var _this2 = this;

        var nbResizeSteps = this.resizeSteps.length;
        var i = nbResizeSteps;

        while (i--) {
          setTimeout(function (step) {
            return _this2.makeResizeStep(step);
          }, this.resizeDelays[i], this.resizeSteps[i]);
        }

        setTimeout(function () {
          if (!_this2.isBouncing) {
            _this2.bouncingAnimationPlaying = false;
          }
        }, this.resizeDelays[this.resizeSteps.length]);
        setTimeout(function () {
          if (_this2.isBouncing) {
            _this2.move(times);
          } else {
            _this2.marker.fire('bounceend');
          }
        }, this.resizeDelays[nbResizeSteps - 1]);
      }
    }, {
      key: "makeMoveStep",
      value: function makeMoveStep(step) {
        this.marker._icon.style.cssText = this.iconStyles.withTransform(this.iconMoveTransforms[step]).toString();

        if (this.marker._shadow) {
          this.marker._shadow.style.cssText = this.shadowStyles.withTransform(this.shadowMoveTransforms[step]).toString();
        }
      }
      /**
       * @param step {number}
       */

    }, {
      key: "makeResizeStep",
      value: function makeResizeStep(step) {
        this.marker._icon.style.cssText = this.iconStyles.withTransform(this.iconResizeTransforms[step]).toString();

        if (this.marker._shadow && this.bouncingOptions.shadowAngle) {
          this.marker._shadow.style.cssText = this.shadowStyles.withTransform(this.shadowResizeTransforms[step]).toString();
        }
      }
      /**
       * Returns calculated array of transformation definitions for the animation of icon movement.
       * Function defines one transform for every pixel of shift of the icon from it's original y
       * position.
       *
       * @param x {number}  x coordinate of original position of the marker
       * @param y {number}  y coordinate of original position of the marker
       * @param bounceHeight {number}  height of bouncing (px)
       *
       * @return {string[]} array of transformation definitions
       */

    }], [{
      key: "calculateIconMoveTransforms",
      value: function calculateIconMoveTransforms(x, y, bounceHeight) {
        var transforms = [];
        var deltaY = bounceHeight + 1; // Use fast inverse while loop to fill the array

        while (deltaY--) {
          transforms[deltaY] = moveMatrixFormat(x, y - deltaY);
        }

        return transforms;
      }
      /**
       * Returns calculated array of transformation definitions for the animation of icon resizing.
       * Function defines one transform for every pixel of resizing of marker from it's original
       * height.
       *
       * @param x {number}  x coordinate of original position of marker
       * @param y {number}  y coordinate of original position of marker
       * @param height {number}  original marker height (px)
       * @param contractHeight {number}  height of marker contraction (px)
       *
       * @return {string[]} array of transformation definitions
       */

    }, {
      key: "calculateIconResizeTransforms",
      value: function calculateIconResizeTransforms(x, y, height, contractHeight) {
        var transforms = [];
        var deltaHeight = contractHeight + 1; // Use fast inverse while loop to fill the array

        while (deltaHeight--) {
          transforms[deltaHeight] = resizeMatrixFormat((height - deltaHeight) / height, x, y + deltaHeight);
        }

        return transforms;
      }
      /**
       * Returns calculated array of transformation definitions for the animation of shadow movement.
       * Function defines one transform for every pixel of shift of the shadow from it's original
       * position.
       *
       * @param x {number}  x coordinate of original position of marker
       * @param y {number}  y coordinate of original position of marker
       * @param bounceHeight {number}  height of bouncing (px)
       * @param angle {number|null}  shadow inclination angle, if null shadow don't moves from it's
       *      initial position (radians)
       *
       * @return {string[]} array of transformation definitions
       */

    }, {
      key: "calculateShadowMoveTransforms",
      value: function calculateShadowMoveTransforms(x, y, bounceHeight) {
        var angle = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
        // TODO: check this method to know if bounceHeight + 1 is normal
        var transforms = [];
        var deltaY = bounceHeight + 1;
        var points = [];

        if (angle != null) {
          // important: 0 is not null
          points = calculateLine(x, y, angle, bounceHeight + 1);
        } else {
          for (var i = 0; i <= bounceHeight; i++) {
            points[i] = [x, y];
          }
        } // Use fast inverse while loop to fill the array


        while (deltaY--) {
          transforms[deltaY] = moveMatrixFormat(points[deltaY][0], points[deltaY][1]);
        }

        return transforms;
      }
      /**
       * Returns calculated array of transformation definitions for the animation of shadow resizing.
       * Function defines one transform for every pixel of shadow resizing.
       *
       * @param x {number}  x coordinate of original position of marker
       * @param y {number}  y coordinate of original position of marker
       * @param width {number}  original marker width (px)
       * @param height {number}  original marker height (px)
       * @param contractHeight {number}  height of marker contraction (px)
       * @param angle {number|null}  shadow inclination angle (radians)
       *
       * @return {string[]} array of transformation definitions
       */
      // TODO: fix & deploy this function

    }, {
      key: "calculateShadowResizeTransforms",
      value: function calculateShadowResizeTransforms(x, y, width, height, contractHeight) {
        var angle = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
        var transforms = [];
        var points = calculateLine(width, height, angle + Math.PI, contractHeight);
        var deltaHeight = contractHeight + 1;
        /* Use fast inverse while loop to fill the array */

        while (deltaHeight--) {
          transforms[deltaHeight] = ' matrix3d(' + width / points[deltaHeight][0] + ',0,0,0,0,' + points[deltaHeight][1] / height + ',0,0,0,0,1,0,' + x + ',' + (y + height - points[deltaHeight][1]) + ',0,1) ';
        }

        return transforms;
      }
    }]);

    return BouncingMotion3D;
  }(BouncingMotion);

  var BouncingMotionSimple = /*#__PURE__*/function (_BouncingMotion) {
    _inherits(BouncingMotionSimple, _BouncingMotion);

    var _super = _createSuper(BouncingMotionSimple);

    /**
     * Constructor.
     *
     * @param marker {Marker}  marker
     * @param position {Point}  marker current position on the map canvas
     * @param bouncingOptions {BouncingOptions}  options of bouncing animation
     */
    function BouncingMotionSimple(marker, position, bouncingOptions) {
      var _this;

      _classCallCheck(this, BouncingMotionSimple);

      _this = _super.call(this, marker, position, bouncingOptions);

      _defineProperty(_assertThisInitialized(_this), "iconMovePoints", void 0);

      _defineProperty(_assertThisInitialized(_this), "shadowMovePoints", void 0);

      _this.recalculateMotion(position);

      return _this;
    }

    _createClass(BouncingMotionSimple, [{
      key: "recalculateMotion",
      value: function recalculateMotion(position) {
        _get(_getPrototypeOf(BouncingMotionSimple.prototype), "recalculateMotion", this).call(this, position);

        var x = position.x,
            y = position.y;
        var _this$bouncingOptions = this.bouncingOptions,
            bounceHeight = _this$bouncingOptions.bounceHeight,
            shadowAngle = _this$bouncingOptions.shadowAngle;
        this.iconMovePoints = BouncingMotionSimple.calculateIconMovePoints(x, y, bounceHeight);
        this.shadowMovePoints = BouncingMotionSimple.calculateShadowMovePoints(x, y, bounceHeight, shadowAngle);
      }
    }, {
      key: "makeMoveStep",
      value: function makeMoveStep(step) {
        _get(_getPrototypeOf(BouncingMotionSimple.prototype), "makeMoveStep", this).call(this, step);

        this.marker._icon.style.left = this.iconMovePoints[step][0] + 'px';
        this.marker._icon.style.top = this.iconMovePoints[step][1] + 'px';

        if (this.marker._shadow) {
          this.marker._shadow.style.left = this.shadowMovePoints[step][0] + 'px';
          this.marker._shadow.style.top = this.shadowMovePoints[step][1] + 'px';
        }
      }
      /**
       * Returns calculated array of points for icon movement. Used to animate markers in browsers
       * that doesn't support 'transform' attribute.
       *
       * @param x {number}  x coordinate of original position of the marker
       * @param y {number}  y coordinate of original position of the marker
       * @param bounceHeight {number}  height of bouncing (px)
       *
       * @return {[number, number][]} array of points
       */

    }], [{
      key: "calculateIconMovePoints",
      value: function calculateIconMovePoints(x, y, bounceHeight) {
        var deltaHeight = bounceHeight + 1;
        var points = []; // Use fast inverse while loop to fill the array

        while (deltaHeight--) {
          points[deltaHeight] = [x, y - deltaHeight];
        }

        return points;
      }
      /**
       * Returns calculated array of points for shadow movement. Used to animate markers in browsers
       * that doesn't support 'transform' attribute.
       *
       * @param x {number}  x coordinate of original position of the marker
       * @param y {number}  y coordinate of original position of the marker
       * @param bounceHeight {number}  height of bouncing (px)
       * @param angle {number}  shadow inclination angle, if null shadow don't moves from it's initial
       *      position (radians)
       *
       * @return {[number, number][]} array of points
       */

    }, {
      key: "calculateShadowMovePoints",
      value: function calculateShadowMovePoints(x, y, bounceHeight, angle) {
        if (angle != null) {
          // important: 0 is not null
          return calculateLine(x, y, angle, bounceHeight + 1);
        } else {
          var points = [];

          for (var i = 0; i <= bounceHeight; i++) {
            points[i] = [x, y];
          }

          return points;
        }
      }
    }]);

    return BouncingMotionSimple;
  }(BouncingMotion);

  var _bouncingMarkers = new WeakMap();

  var Orchestration = /*#__PURE__*/function () {
    function Orchestration() {
      _classCallCheck(this, Orchestration);

      _bouncingMarkers.set(this, {
        writable: true,
        value: []
      });
    }

    _createClass(Orchestration, [{
      key: "getBouncingMarkers",
      value: function getBouncingMarkers() {
        return _classPrivateFieldGet(this, _bouncingMarkers);
      }
      /**
       * Adds the marker to the list of bouncing markers.
       * If flag 'exclusive' is set to true, stops all bouncing markers before.
       *
       * @param marker {Marker}  marker object
       * @param exclusive {boolean}  flag of exclusive bouncing. If set to true, stops the bouncing
       *      of all other markers.
       */

    }, {
      key: "addBouncingMarker",
      value: function addBouncingMarker(marker, exclusive) {
        if (exclusive || marker._bouncingMotion.bouncingOptions.exclusive) {
          this.stopAllBouncingMarkers();
        } else {
          this.stopExclusiveMarkerBouncing();
        }

        _classPrivateFieldGet(this, _bouncingMarkers).push(marker);
      }
      /**
       * Stops the bouncing of exclusive marker.
       */

    }, {
      key: "stopExclusiveMarkerBouncing",
      value: function stopExclusiveMarkerBouncing() {
        var exclusiveMarker = _classPrivateFieldGet(this, _bouncingMarkers).find(function (marker) {
          return marker._bouncingMotion.bouncingOptions.exclusive;
        });

        if (exclusiveMarker) {
          exclusiveMarker.stopBouncing();
        }
      }
      /**
       * Removes the marker from the list of bouncing markers.
       * @param marker {Marker}  marker
       */

    }, {
      key: "removeBouncingMarker",
      value: function removeBouncingMarker(marker) {
        var i = _classPrivateFieldGet(this, _bouncingMarkers).indexOf(marker);

        if (~i) {
          _classPrivateFieldGet(this, _bouncingMarkers).splice(i, 1);
        }
      }
      /**
       * Stops the bouncing of all currently bouncing markers. Purge the array of bouncing markers.
       */

    }, {
      key: "stopAllBouncingMarkers",
      value: function stopAllBouncingMarkers() {
        var marker;

        while (marker = _classPrivateFieldGet(this, _bouncingMarkers).shift()) {
          marker.stopBouncing();
        }
      }
    }]);

    return Orchestration;
  }();

  var oldSetPos = L.Marker.prototype._setPos;
  var oldOnAdd = L.Marker.prototype.onAdd;
  var oldSetIcon = L.Marker.prototype.setIcon;
  var MarkerPrototypeExt = {
    /** Bouncing options shared by all markers. */
    _bouncingOptions: new BouncingOptions(),
    _orchestration: new Orchestration(),

    /**
     * Registers options of bouncing animation for this marker. After registration of options for
     * this marker, it will ignore changes of default options. Function automatically recalculates
     * animation steps and delays.
     *
     * @param options {BouncingOptions|object}  options object
     * @return {Marker} this marker
     */
    setBouncingOptions: function setBouncingOptions(options) {
      this._bouncingMotion.updateBouncingOptions(options);

      return this;
    },

    /**
     * Returns true if this marker is bouncing. If this marker is not bouncing returns false.
     * @return {boolean} true if marker is bouncing, false if not
     */
    isBouncing: function isBouncing() {
      return this._bouncingMotion.isBouncing;
    },

    /**
     * Starts bouncing of this marker.
     * @param times {number|null} number of times the marker must to bounce
     * @return {Marker} this marker
     */
    bounce: function bounce() {
      var times = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      this._bouncingMotion.bounce(times);

      var exclusive = this._bouncingMotion.bouncingOptions.exclusive;

      L.Marker.prototype._orchestration.addBouncingMarker(this, exclusive);

      return this;
    },

    /**
     * Stops bouncing of this marker.
     * Note: the bouncing not stops immediately after the call of this method.
     * Instead, the animation is executed until marker returns to it's original position and takes
     * it's full size.
     *
     * @return {Marker} this marker
     */
    stopBouncing: function stopBouncing() {
      this._bouncingMotion.stopBouncing();

      L.Marker.prototype._orchestration.removeBouncingMarker(this);

      return this;
    },

    /**
     * Starts/stops bouncing of this marker.
     * @return {Marker} marker
     */
    toggleBouncing: function toggleBouncing() {
      if (this._bouncingMotion.isBouncing) {
        this.stopBouncing();
      } else {
        this.bounce();
      }

      return this;
    },
    isRealMarker: function isRealMarker() {
      return this.__proto__ === L.Marker.prototype;
    },
    _setPos: function _setPos(position) {
      oldSetPos.call(this, position);

      if (this.isRealMarker()) {
        this._bouncingMotion.recalculateMotion(position);

        this._bouncingMotion.resetStyles(this);
      }
    },
    onAdd: function onAdd(map) {
      oldOnAdd.call(this, map);

      if (this.isRealMarker()) {
        this._bouncingMotion.resetStyles(this);
      }
    },
    setIcon: function setIcon(icon) {
      oldSetIcon.call(this, icon);

      if (this.isRealMarker()) {
        this._bouncingMotion.resetStyles(this);
      }
    }
  };

  function createBouncingMotion(marker, position, bouncingOptions) {
    return L.Browser.any3d ? new BouncingMotion3D(marker, position, bouncingOptions) : new BouncingMotionSimple(marker, position, bouncingOptions);
  }

  L__default['default'].Marker.include(MarkerPrototypeExt);
  /**
   * Registers default options of bouncing animation.
   * @param options {BouncingOptions|object}  object with options
   */

  L__default['default'].Marker.setBouncingOptions = function (options) {
    L.Marker.prototype._bouncingOptions = options instanceof BouncingOptions ? options : new BouncingOptions(options);
  };
  /**
   * Returns array of currently bouncing markers.
   * @return {Marker[]} array of bouncing markers
   */


  L__default['default'].Marker.getBouncingMarkers = function () {
    L.Marker.prototype._orchestration.getBouncingMarkers();
  };
  /**
   * Stops the bouncing of all currently bouncing markers. Purge the array of bouncing markers.
   */


  L__default['default'].Marker.stopAllBouncingMarkers = function () {
    L.Marker.prototype._orchestration.stopAllBouncingMarkers();
  };

  L__default['default'].Marker.addInitHook(function () {
    if (this.isRealMarker()) {
      var bouncingOptions = new BouncingOptions(L.Marker.prototype._bouncingOptions);
      this._bouncingMotion = createBouncingMotion(this, new L.Point(0, 0), bouncingOptions);
    }
  });

}(L));
