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
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
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

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
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

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _classPrivateFieldGet(receiver, privateMap) {
    var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get");

    return _classApplyDescriptorGet(receiver, descriptor);
  }

  function _classPrivateFieldSet(receiver, privateMap, value) {
    var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");

    _classApplyDescriptorSet(receiver, descriptor, value);

    return value;
  }

  function _classExtractFieldDescriptor(receiver, privateMap, action) {
    if (!privateMap.has(receiver)) {
      throw new TypeError("attempted to " + action + " private field on non-instance");
    }

    return privateMap.get(receiver);
  }

  function _classApplyDescriptorGet(receiver, descriptor) {
    if (descriptor.get) {
      return descriptor.get.call(receiver);
    }

    return descriptor.value;
  }

  function _classApplyDescriptorSet(receiver, descriptor, value) {
    if (descriptor.set) {
      descriptor.set.call(receiver, value);
    } else {
      if (!descriptor.writable) {
        throw new TypeError("attempted to set read only private field");
      }

      descriptor.value = value;
    }
  }

  function _checkPrivateRedeclaration(obj, privateCollection) {
    if (privateCollection.has(obj)) {
      throw new TypeError("Cannot initialize the same private elements twice on an object");
    }
  }

  function _classPrivateFieldInitSpec(obj, privateMap, value) {
    _checkPrivateRedeclaration(obj, privateMap);

    privateMap.set(obj, value);
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

  var _bouncingMarkers = /*#__PURE__*/new WeakMap();

  var Orchestration = /*#__PURE__*/function () {
    function Orchestration() {
      _classCallCheck(this, Orchestration);

      _classPrivateFieldInitSpec(this, _bouncingMarkers, {
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
      var _this = this;

      var times = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (times) {
        this._bouncingMotion.onMotionEnd = function () {
          L.Marker.prototype._orchestration.removeBouncingMarker(_this);
        };
      }

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
        this._bouncingMotion.position = position;

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

      if (this.isRealMarker() && this._icon) {
        this._bouncingMotion.resetStyles(this);
      }
    }
  };

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

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z = "@keyframes l-smooth-marker-bouncing-move {\n    from {\n        transform: translate(var(--pos-x), var(--pos-y))\n    }\n    to {\n        transform: translate(var(--pos-x-jump, var(--pos-x)), var(--pos-y-jump))\n    }\n}\n\n@keyframes l-smooth-marker-bouncing-contract {\n    from {\n        transform: translate(var(--pos-x), var(--pos-y))\n    }\n    to {\n        transform: translate(var(--pos-x), var(--pos-y-contract)) scaleY(var(--scale-contract))\n    }\n}\n\n.bouncing {\n    animation-name: l-smooth-marker-bouncing-move, l-smooth-marker-bouncing-move, l-smooth-marker-bouncing-contract, l-smooth-marker-bouncing-contract;\n    animation-direction: normal, reverse, normal, reverse;\n    animation-duration: var(--duration-jump), var(--duration-jump), var(--duration-contract), var(--duration-contract);\n    animation-delay: var(--delays)\n}\n\n.bouncing.simple {\n    animation-name: l-smooth-marker-bouncing-move, l-smooth-marker-bouncing-move;\n    animation-direction: normal, reverse;\n    animation-duration: var(--duration-jump), var(--duration-jump);\n    animation-delay: var(--delays)\n}\n";
  styleInject(css_248z);

  /** Regex to parse style definitions. */
  var regStyle = /([\w-]+): ([^;]+);/g;

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
       * Creates a copy of styles merged with provided 'styles'.
       * @param {Object} styles  object with styles to merge
       * @return {Styles} copy of styles
       */

    }, {
      key: "withStyles",
      value: function withStyles(styles) {
        var copy = new Styles(this);
        copy && Object.assign(copy, styles);
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

  var animationNamePrefix = 'l-smooth-marker-bouncing-';
  var moveAnimationName = animationNamePrefix + 'move';
  var contractAnimationName = animationNamePrefix + 'contract';
  /*
   * CSS3 animation runs faster than transform-based animation. We need to reduce speed in order
   * to be compatible with old API.
   */

  var speedCoefficient = 0.8;
  /**
   * Removes and then resets required classes on the HTML element.
   * Used as hack to restart CSS3 animation.
   *
   * @param element {HTMLElement}  HTML element
   * @param classes {string[]}  names of classes
   */

  function resetClasses(element, classes) {
    classes.forEach(function (className) {
      return L.DomUtil.removeClass(element, className);
    });
    void element.offsetWidth;
    classes.forEach(function (className) {
      return L.DomUtil.addClass(element, className);
    });
  }

  var _lastAnimationName = /*#__PURE__*/new WeakMap();

  var _classes = /*#__PURE__*/new WeakMap();

  var _eventCounter = /*#__PURE__*/new WeakMap();

  var _times = /*#__PURE__*/new WeakMap();

  var _listener = /*#__PURE__*/new WeakMap();

  var BouncingMotionCss3 = /*#__PURE__*/function () {
    /**
     * Constructor.
     *
     * @param marker {Marker}  marker
     * @param position {Point}  marker current position on the map canvas
     * @param bouncingOptions {BouncingOptions}  options of bouncing animation
     */
    function BouncingMotionCss3(marker, position, bouncingOptions) {
      var _this = this;

      _classCallCheck(this, BouncingMotionCss3);

      _defineProperty(this, "marker", void 0);

      _defineProperty(this, "position", void 0);

      _defineProperty(this, "bouncingOptions", void 0);

      _defineProperty(this, "isBouncing", false);

      _defineProperty(this, "iconStyles", void 0);

      _defineProperty(this, "shadowStyles", void 0);

      _defineProperty(this, "bouncingAnimationPlaying", false);

      _defineProperty(this, "onMotionEnd", void 0);

      _classPrivateFieldInitSpec(this, _lastAnimationName, {
        writable: true,
        value: contractAnimationName
      });

      _classPrivateFieldInitSpec(this, _classes, {
        writable: true,
        value: ['bouncing']
      });

      _classPrivateFieldInitSpec(this, _eventCounter, {
        writable: true,
        value: void 0
      });

      _classPrivateFieldInitSpec(this, _times, {
        writable: true,
        value: void 0
      });

      _classPrivateFieldInitSpec(this, _listener, {
        writable: true,
        value: function value(event) {
          return _this.onAnimationEnd(event);
        }
      });

      this.marker = marker;
      this.position = position;
      this.updateBouncingOptions(bouncingOptions);
    }

    _createClass(BouncingMotionCss3, [{
      key: "updateBouncingOptions",
      value: function updateBouncingOptions(options) {
        this.bouncingOptions = options instanceof BouncingOptions ? options : this.bouncingOptions.override(options);

        if (this.bouncingOptions.elastic && this.bouncingOptions.contractHeight) {
          _classPrivateFieldSet(this, _lastAnimationName, contractAnimationName);

          var index = _classPrivateFieldGet(this, _classes).indexOf('simple');

          if (index > -1) {
            _classPrivateFieldGet(this, _classes).splice(index, 1);
          }

          if (this.marker._icon) {
            L.DomUtil.removeClass(this.marker._icon, 'simple');
          }
        } else {
          _classPrivateFieldSet(this, _lastAnimationName, moveAnimationName);

          _classPrivateFieldGet(this, _classes).push('simple');
        }

        if (this.marker._icon) {
          this.resetStyles(this.marker);
        }
      }
    }, {
      key: "onAnimationEnd",
      value: function onAnimationEnd(event) {
        var _this2 = this;

        if (event.animationName === _classPrivateFieldGet(this, _lastAnimationName)) {
          var _this$eventCounter;

          _classPrivateFieldSet(this, _eventCounter, (_this$eventCounter = _classPrivateFieldGet(this, _eventCounter), _this$eventCounter++, _this$eventCounter));

          _classPrivateFieldSet(this, _eventCounter, _classPrivateFieldGet(this, _eventCounter) % 2);

          if (!_classPrivateFieldGet(this, _eventCounter)) {
            var _this$times;

            if (this.isBouncing && (_classPrivateFieldGet(this, _times) === null || _classPrivateFieldSet(this, _times, (_this$times = _classPrivateFieldGet(this, _times), --_this$times)))) {
              resetClasses(this.marker._icon, _classPrivateFieldGet(this, _classes));

              if (this.marker._shadow && this.bouncingOptions.shadowAngle) {
                resetClasses(this.marker._shadow, _classPrivateFieldGet(this, _classes));
              }
            } else {
              _classPrivateFieldGet(this, _classes).forEach(function (className) {
                L.DomUtil.removeClass(_this2.marker._icon, className);

                if (_this2.marker._shadow) {
                  L.DomUtil.removeClass(_this2.marker._shadow, className);
                }
              });

              this.bouncingAnimationPlaying = false;

              if (this.onMotionEnd) {
                this.onMotionEnd();
                this.onMotionEnd = null;
              }

              this.marker.fire('bounceend');
            }
          }
        }
      }
    }, {
      key: "resetStyles",
      value: function resetStyles(marker) {
        var _this$marker$getIcon,
            _this$marker$getIcon$,
            _this$marker,
            _this$marker$_iconObj,
            _this$marker$_iconObj2,
            _this3 = this;

        this.marker = marker;
        this.iconStyles = Styles.ofMarker(marker);

        if (marker._shadow) {
          this.shadowStyles = Styles.parse(marker._shadow.style.cssText);
        }

        var iconHeight = ((_this$marker$getIcon = this.marker.getIcon()) === null || _this$marker$getIcon === void 0 ? void 0 : (_this$marker$getIcon$ = _this$marker$getIcon.options) === null || _this$marker$getIcon$ === void 0 ? void 0 : _this$marker$getIcon$.iconSize[1]) || ((_this$marker = this.marker) === null || _this$marker === void 0 ? void 0 : (_this$marker$_iconObj = _this$marker._iconObj) === null || _this$marker$_iconObj === void 0 ? void 0 : (_this$marker$_iconObj2 = _this$marker$_iconObj.options) === null || _this$marker$_iconObj2 === void 0 ? void 0 : _this$marker$_iconObj2.iconSize[1]);
        var iconAnimationParams = BouncingMotionCss3.animationParams(this.position, this.bouncingOptions, iconHeight);
        this.iconStyles = this.iconStyles.withStyles(iconAnimationParams);
        this.marker._icon.style.cssText = this.iconStyles.toString();

        if (this.bouncingAnimationPlaying) {
          resetClasses(this.marker._icon, _classPrivateFieldGet(this, _classes));

          this.marker._icon.addEventListener('animationend', _classPrivateFieldGet(this, _listener));
        }

        var _this$bouncingOptions = this.bouncingOptions,
            bounceHeight = _this$bouncingOptions.bounceHeight,
            contractHeight = _this$bouncingOptions.contractHeight,
            shadowAngle = _this$bouncingOptions.shadowAngle;

        if (this.marker._shadow) {
          if (shadowAngle) {
            var _this$marker$getIcon2, _this$marker$getIcon3;

            var _this$position = this.position,
                x = _this$position.x,
                y = _this$position.y;
            var points = calculateLine(x, y, shadowAngle, bounceHeight + 1);

            var _points$bounceHeight = _slicedToArray(points[bounceHeight], 2),
                posXJump = _points$bounceHeight[0],
                posYJump = _points$bounceHeight[1];

            var shadowHeight = (_this$marker$getIcon2 = this.marker.getIcon()) === null || _this$marker$getIcon2 === void 0 ? void 0 : (_this$marker$getIcon3 = _this$marker$getIcon2.options) === null || _this$marker$getIcon3 === void 0 ? void 0 : _this$marker$getIcon3.shadowSize[1];
            var shadowScaleContract = BouncingMotionCss3.contractScale(shadowHeight, contractHeight);
            this.shadowStyles = this.shadowStyles.withStyles(iconAnimationParams).withStyles({
              '--pos-x-jump': "".concat(posXJump, "px"),
              '--pos-y-jump': "".concat(posYJump, "px"),
              '--scale-contract': shadowScaleContract
            });
            this.marker._shadow.style.cssText = this.shadowStyles.toString();

            if (this.bouncingAnimationPlaying) {
              resetClasses(this.marker._shadow, _classPrivateFieldGet(this, _classes));
            }
          } else {
            _classPrivateFieldGet(this, _classes).forEach(function (className) {
              L.DomUtil.removeClass(_this3.marker._shadow, className);
            });
          }
        }
      }
    }, {
      key: "bounce",
      value: function bounce() {
        var times = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

        _classPrivateFieldSet(this, _times, times);

        this.isBouncing = true;

        if (this.bouncingAnimationPlaying) {
          return;
        }

        _classPrivateFieldSet(this, _eventCounter, 0);

        this.bouncingAnimationPlaying = true;
        resetClasses(this.marker._icon, _classPrivateFieldGet(this, _classes));

        if (this.marker._shadow && this.bouncingOptions.shadowAngle) {
          resetClasses(this.marker._shadow, _classPrivateFieldGet(this, _classes));
        }

        this.marker._icon.addEventListener('animationend', _classPrivateFieldGet(this, _listener));
      }
    }, {
      key: "stopBouncing",
      value: function stopBouncing() {
        this.isBouncing = false;
      }
      /**
       * Calculates parameters of CSS3 animation of bouncing.
       *
       * @param position {Point}  marker current position on the map canvas
       * @param bouncingOptions {BouncingOptions}  options of bouncing animation
       * @param height {number}  icons height
       * @return {object} CSS3 animation parameters
       */

    }], [{
      key: "animationParams",
      value: function animationParams(position, bouncingOptions, height) {
        var x = position.x,
            y = position.y;
        var bounceHeight = bouncingOptions.bounceHeight,
            contractHeight = bouncingOptions.contractHeight,
            bounceSpeed = bouncingOptions.bounceSpeed,
            contractSpeed = bouncingOptions.contractSpeed;
        var scaleContract = BouncingMotionCss3.contractScale(height, contractHeight);
        var durationJump = BouncingMotionCss3.calculateDuration(bounceHeight, bounceSpeed);
        var durationContract = BouncingMotionCss3.calculateDuration(contractHeight, contractSpeed);
        var delays = [0, durationJump, durationJump * 2, durationJump * 2 + durationContract];
        return {
          '--pos-x': "".concat(x, "px"),
          '--pos-y': "".concat(y, "px"),
          '--pos-y-jump': "".concat(y - bounceHeight, "px"),
          '--pos-y-contract': "".concat(y + contractHeight, "px"),
          '--scale-contract': scaleContract,
          '--duration-jump': "".concat(durationJump, "ms"),
          '--duration-contract': "".concat(durationContract, "ms"),
          '--delays': "0ms, ".concat(delays[1], "ms, ").concat(delays[2], "ms, ").concat(delays[3], "ms")
        };
      }
      /**
       * Calculates scale of contracting.
       *
       * @param {number} height  original height
       * @param {number} contractHeight  how much it must contract
       * @return {number}  contracting scale between 0 and 1
       */

    }, {
      key: "contractScale",
      value: function contractScale(height, contractHeight) {
        return (height - contractHeight) / height;
      }
      /**
       * Calculates duration of animation.
       *
       * @param height {number}  height of movement or resizing (px)
       * @param speed {number}  speed coefficient
       *
       * @return {number} duration of animation (ms)
       */

    }, {
      key: "calculateDuration",
      value: function calculateDuration(height, speed) {
        if (height === 0) {
          return 0;
        }

        var duration = Math.round(speed * speedCoefficient);
        var i = height;

        while (--i) {
          duration += Math.round(speed / (height - i));
        }

        return duration;
      }
    }]);

    return BouncingMotionCss3;
  }();

  L__default["default"].Marker.include(MarkerPrototypeExt);
  /**
   * Registers default options of bouncing animation.
   * @param options {BouncingOptions|object}  object with options
   */

  L__default["default"].Marker.setBouncingOptions = function (options) {
    L.Marker.prototype._bouncingOptions = options instanceof BouncingOptions ? options : new BouncingOptions(options);
  };
  /**
   * Returns array of currently bouncing markers.
   * @return {Marker[]} array of bouncing markers
   */


  L__default["default"].Marker.getBouncingMarkers = function () {
    L.Marker.prototype._orchestration.getBouncingMarkers();
  };
  /**
   * Stops the bouncing of all currently bouncing markers. Purge the array of bouncing markers.
   */


  L__default["default"].Marker.stopAllBouncingMarkers = function () {
    L.Marker.prototype._orchestration.stopAllBouncingMarkers();
  };

  L__default["default"].Marker.addInitHook(function () {
    if (this.isRealMarker()) {
      var bouncingOptions = new BouncingOptions(L.Marker.prototype._bouncingOptions);
      this._bouncingMotion = new BouncingMotionCss3(this, new L.Point(0, 0), bouncingOptions);
    }
  });

})(L);
