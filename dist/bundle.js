(function (L) {
  'use strict';

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
  }
  function _assertClassBrand(e, t, n) {
    if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
    throw new TypeError("Private element is not present on this object");
  }
  function _checkPrivateRedeclaration(e, t) {
    if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object");
  }
  function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
  }
  function _classPrivateFieldGet2(s, a) {
    return s.get(_assertClassBrand(s, a));
  }
  function _classPrivateFieldInitSpec(e, t, a) {
    _checkPrivateRedeclaration(e, t), t.set(e, a);
  }
  function _classPrivateFieldSet2(s, a, r) {
    return s.set(_assertClassBrand(s, a), r), r;
  }
  function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
  }
  function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
      writable: !1
    }), e;
  }
  function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[r] = t, e;
  }
  function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = !0,
        o = !1;
      try {
        if (i = (t = t.call(r)).next, 0 === l) ; else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
      } catch (r) {
        o = !0, n = r;
      } finally {
        try {
          if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r);
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (String )(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }

  var BouncingOptions = /*#__PURE__*/function () {
    function BouncingOptions(options) {
      _classCallCheck(this, BouncingOptions);
      /**
       * How high marker can bounce (px)
       * @type {number}
       */
      _defineProperty(this, "bounceHeight", 15);
      /**
       * How much marker can contract (px)
       * @type {number}
       */
      _defineProperty(this, "contractHeight", 12);
      /**
       * Bouncing speed coefficient
       * @type {number}
       */
      _defineProperty(this, "bounceSpeed", 52);
      /**
       * Contracting speed coefficient
       * @type {number}
       */
      _defineProperty(this, "contractSpeed", 52);
      /**
       * Shadow inclination angle(radians); null to cancel shadow movement
       * @type {number}
       */
      _defineProperty(this, "shadowAngle", -Math.PI / 4);
      /**
       * Activate contract animation
       * @type {boolean}
       */
      _defineProperty(this, "elastic", true);
      /**
       * Many markers can bounce in the same time
       * @type {boolean}
       */
      _defineProperty(this, "exclusive", false);
      /**
       * If true, when marker stops, it does not execute animation until its end, but instead stops
       * abruptly.
       * @type {boolean}
       */
      _defineProperty(this, "immediateStop", false);
      options && Object.assign(this, options);
    }
    return _createClass(BouncingOptions, [{
      key: "override",
      value: function override(options) {
        return Object.assign(new BouncingOptions(this), options);
      }
    }]);
  }();

  var _bouncingMarkers = /*#__PURE__*/new WeakMap();
  var Orchestration = /*#__PURE__*/function () {
    function Orchestration() {
      _classCallCheck(this, Orchestration);
      _classPrivateFieldInitSpec(this, _bouncingMarkers, []);
    }
    return _createClass(Orchestration, [{
      key: "getBouncingMarkers",
      value: function getBouncingMarkers() {
        return _classPrivateFieldGet2(_bouncingMarkers, this);
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
        _classPrivateFieldGet2(_bouncingMarkers, this).push(marker);
      }

      /**
       * Stops the bouncing of exclusive marker.
       */
    }, {
      key: "stopExclusiveMarkerBouncing",
      value: function stopExclusiveMarkerBouncing() {
        var exclusiveMarker = _classPrivateFieldGet2(_bouncingMarkers, this).find(function (marker) {
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
        var i = _classPrivateFieldGet2(_bouncingMarkers, this).indexOf(marker);
        if (~i) {
          _classPrivateFieldGet2(_bouncingMarkers, this).splice(i, 1);
        }
      }

      /**
       * Stops the bouncing of all currently bouncing markers. Purge the array of bouncing markers.
       *
       * @param immediate {boolean} if true, markers stop to bounce immediately, without waiting
       *      animation to end
       */
    }, {
      key: "stopAllBouncingMarkers",
      value: function stopAllBouncingMarkers() {
        var immediate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var marker;
        while (marker = _classPrivateFieldGet2(_bouncingMarkers, this).shift()) {
          marker.stopBouncing(immediate);
        }
      }
    }]);
  }();

  function MarkerPrototypeExt(Leaflet) {
    var oldSetPos = Leaflet.Marker.prototype._setPos;
    var oldOnAdd = Leaflet.Marker.prototype.onAdd;
    var oldSetIcon = Leaflet.Marker.prototype.setIcon;
    return {
      /** Bouncing options shared by all markers. */
      _bouncingOptions: new BouncingOptions(),
      _orchestration: new Orchestration(),
      _realMarker: true,
      /**
       * Registers options of bouncing animation for this marker. After registration of options for
       * this marker, it will ignore changes of default options. Function automatically recalculates
       * animation steps and delays.
       *
       * @param options {BouncingOptions}  options object
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
       * @param times {number|null}  number of times the marker must to bounce
       * @return {Marker} this marker
       */
      bounce: function bounce() {
        var _this = this;
        var times = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        if (times) {
          this._bouncingMotion.onMotionEnd = function () {
            Leaflet.Marker.prototype._orchestration.removeBouncingMarker(_this);
          };
        }
        this._bouncingMotion.bounce(times);
        var exclusive = this._bouncingMotion.bouncingOptions.exclusive;
        Leaflet.Marker.prototype._orchestration.addBouncingMarker(this, exclusive);
        return this;
      },
      /**
       * Stops bouncing of this marker.
       * Note: unless 'immediate' flag is set to true, by the call to this method or in marker options,
       * the bouncing will not stop immediately after the call of this method. Instead, the animation
       * is executed until marker returns to its original position and takes its full size.
       *
       * @param immediate {boolean}  if true, marker stop to bounce immediately, without waiting
       *      animation to end
       * @return {Marker} this marker
       */
      stopBouncing: function stopBouncing() {
        var immediate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        this._bouncingMotion.stopBouncing(immediate);
        Leaflet.Marker.prototype._orchestration.removeBouncingMarker(this);
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
        return Object.hasOwn(this.__proto__, '_realMarker');
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
  }

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

  function styleInject(css, options) {

      if (typeof document === 'undefined') {
          return;
      }

      var head = document.head || document.getElementsByTagName('head')[0];
      var style = document.createElement('style');
      style.setAttribute('type', 'text/css');
      style.appendChild(document.createTextNode(css));

      {
          head.appendChild(style);
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
    return _createClass(Styles, [{
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
      _classPrivateFieldInitSpec(this, _lastAnimationName, contractAnimationName);
      _classPrivateFieldInitSpec(this, _classes, ['bouncing']);
      _classPrivateFieldInitSpec(this, _eventCounter, void 0);
      _classPrivateFieldInitSpec(this, _times, void 0);
      _classPrivateFieldInitSpec(this, _listener, function (event) {
        return _this.onAnimationEnd(event);
      });
      this.marker = marker;
      this.position = position;
      this.updateBouncingOptions(bouncingOptions);
    }
    return _createClass(BouncingMotionCss3, [{
      key: "updateBouncingOptions",
      value: function updateBouncingOptions(options) {
        this.bouncingOptions = options instanceof BouncingOptions ? options : this.bouncingOptions.override(options);
        if (this.bouncingOptions.elastic && this.bouncingOptions.contractHeight) {
          _classPrivateFieldSet2(_lastAnimationName, this, contractAnimationName);
          var index = _classPrivateFieldGet2(_classes, this).indexOf('simple');
          if (index > -1) {
            _classPrivateFieldGet2(_classes, this).splice(index, 1);
          }
          if (this.marker._icon) {
            L.DomUtil.removeClass(this.marker._icon, 'simple');
          }
        } else {
          _classPrivateFieldSet2(_lastAnimationName, this, moveAnimationName);
          _classPrivateFieldGet2(_classes, this).push('simple');
        }
        if (this.marker._icon) {
          this.resetStyles(this.marker);
        }
      }
    }, {
      key: "onAnimationEnd",
      value: function onAnimationEnd(event) {
        if (event.animationName === _classPrivateFieldGet2(_lastAnimationName, this)) {
          var _this$eventCounter;
          _classPrivateFieldSet2(_eventCounter, this, (_this$eventCounter = _classPrivateFieldGet2(_eventCounter, this), _this$eventCounter++, _this$eventCounter));
          _classPrivateFieldSet2(_eventCounter, this, _classPrivateFieldGet2(_eventCounter, this) % 2);
          if (!_classPrivateFieldGet2(_eventCounter, this)) {
            var _this$times;
            if (this.isBouncing && (_classPrivateFieldGet2(_times, this) === null || _classPrivateFieldSet2(_times, this, (_this$times = _classPrivateFieldGet2(_times, this), --_this$times)))) {
              resetClasses(this.marker._icon, _classPrivateFieldGet2(_classes, this));
              if (this.marker._shadow && this.bouncingOptions.shadowAngle) {
                resetClasses(this.marker._shadow, _classPrivateFieldGet2(_classes, this));
              }
            } else {
              this._stopBouncingAnimation();
            }
          }
        }
      }
    }, {
      key: "resetStyles",
      value: function resetStyles(marker) {
        var _this$marker$getIcon,
          _this$marker,
          _this2 = this;
        this.marker = marker;
        this.iconStyles = Styles.ofMarker(marker);
        if (marker._shadow) {
          this.shadowStyles = Styles.parse(marker._shadow.style.cssText);
        }
        var iconHeight = ((_this$marker$getIcon = this.marker.getIcon()) === null || _this$marker$getIcon === void 0 || (_this$marker$getIcon = _this$marker$getIcon.options) === null || _this$marker$getIcon === void 0 ? void 0 : _this$marker$getIcon.iconSize[1]) || ((_this$marker = this.marker) === null || _this$marker === void 0 || (_this$marker = _this$marker._iconObj) === null || _this$marker === void 0 || (_this$marker = _this$marker.options) === null || _this$marker === void 0 ? void 0 : _this$marker.iconSize[1]);
        var iconAnimationParams = BouncingMotionCss3.animationParams(this.position, this.bouncingOptions, iconHeight);
        this.iconStyles = this.iconStyles.withStyles(iconAnimationParams);
        this.marker._icon.style.cssText = this.iconStyles.toString();
        if (this.bouncingAnimationPlaying) {
          resetClasses(this.marker._icon, _classPrivateFieldGet2(_classes, this));
          this.marker._icon.addEventListener('animationend', _classPrivateFieldGet2(_listener, this));
        }
        var _this$bouncingOptions = this.bouncingOptions,
          bounceHeight = _this$bouncingOptions.bounceHeight,
          contractHeight = _this$bouncingOptions.contractHeight,
          shadowAngle = _this$bouncingOptions.shadowAngle;
        if (this.marker._shadow) {
          if (shadowAngle) {
            var _this$marker$getIcon2;
            var _this$position = this.position,
              x = _this$position.x,
              y = _this$position.y;
            var points = calculateLine(x, y, shadowAngle, bounceHeight + 1);
            var _points$bounceHeight = _slicedToArray(points[bounceHeight], 2),
              posXJump = _points$bounceHeight[0],
              posYJump = _points$bounceHeight[1];
            var shadowHeight = (_this$marker$getIcon2 = this.marker.getIcon()) === null || _this$marker$getIcon2 === void 0 || (_this$marker$getIcon2 = _this$marker$getIcon2.options) === null || _this$marker$getIcon2 === void 0 ? void 0 : _this$marker$getIcon2.shadowSize[1];
            var shadowScaleContract = BouncingMotionCss3.contractScale(shadowHeight, contractHeight);
            this.shadowStyles = this.shadowStyles.withStyles(iconAnimationParams).withStyles({
              '--pos-x-jump': "".concat(posXJump, "px"),
              '--pos-y-jump': "".concat(posYJump, "px"),
              '--scale-contract': shadowScaleContract
            });
            this.marker._shadow.style.cssText = this.shadowStyles.toString();
            if (this.bouncingAnimationPlaying) {
              resetClasses(this.marker._shadow, _classPrivateFieldGet2(_classes, this));
            }
          } else {
            _classPrivateFieldGet2(_classes, this).forEach(function (className) {
              L.DomUtil.removeClass(_this2.marker._shadow, className);
            });
          }
        }
      }
    }, {
      key: "bounce",
      value: function bounce() {
        var times = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        _classPrivateFieldSet2(_times, this, times);
        this.isBouncing = true;
        if (this.bouncingAnimationPlaying) {
          return;
        }
        _classPrivateFieldSet2(_eventCounter, this, 0);
        this.bouncingAnimationPlaying = true;
        if (this.marker._icon) {
          resetClasses(this.marker._icon, _classPrivateFieldGet2(_classes, this));
          this.marker._icon.addEventListener('animationend', _classPrivateFieldGet2(_listener, this));
        }
        if (this.marker._shadow && this.bouncingOptions.shadowAngle) {
          resetClasses(this.marker._shadow, _classPrivateFieldGet2(_classes, this));
        }
      }
    }, {
      key: "stopBouncing",
      value: function stopBouncing() {
        var immediate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        this.isBouncing = false;
        immediate || (immediate = this.bouncingOptions.immediateStop);
        if (immediate) {
          this._stopBouncingAnimation();
        }
      }
    }, {
      key: "_stopBouncingAnimation",
      value: function _stopBouncingAnimation() {
        var _this3 = this;
        _classPrivateFieldGet2(_classes, this).forEach(function (className) {
          L.DomUtil.removeClass(_this3.marker._icon, className);
          if (_this3.marker._shadow) {
            L.DomUtil.removeClass(_this3.marker._shadow, className);
          }
        });
        this.bouncingAnimationPlaying = false;
        if (this.onMotionEnd) {
          this.onMotionEnd();
          this.onMotionEnd = null;
        }
        this.marker.fire('bounceend');
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
  }();

  function SmoothMarkerBouncing(Leaflet) {
    Leaflet.Marker.include(MarkerPrototypeExt(Leaflet));

    /**
     * Registers default options of bouncing animation.
     * @param options {BouncingOptions|object}  object with options
     */
    Leaflet.Marker.setBouncingOptions = function (options) {
      Leaflet.Marker.prototype._bouncingOptions = options instanceof BouncingOptions ? options : new BouncingOptions(options);
    };

    /**
     * Returns array of currently bouncing markers.
     * @return {Marker[]} array of bouncing markers
     */
    Leaflet.Marker.getBouncingMarkers = function () {
      return Leaflet.Marker.prototype._orchestration.getBouncingMarkers();
    };

    /**
     * Stops the bouncing of all currently bouncing markers. Purge the array of bouncing markers.
     *
     * @param immediate {boolean}  if true, markers stop to bounce immediately, without waiting
     *      animation to end
     */
    Leaflet.Marker.stopAllBouncingMarkers = function () {
      var immediate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      Leaflet.Marker.prototype._orchestration.stopAllBouncingMarkers(immediate);
    };
    Leaflet.Marker.addInitHook(function () {
      if (this.isRealMarker()) {
        var bouncingOptions = new BouncingOptions(Leaflet.Marker.prototype._bouncingOptions);
        this._bouncingMotion = new BouncingMotionCss3(this, new Leaflet.Point(0, 0), bouncingOptions);
      }
    });
    return Leaflet;
  }

  SmoothMarkerBouncing(L);

})(L);
