"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _leaflet = require("leaflet");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }

function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

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

exports["default"] = Orchestration;