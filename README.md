Leaflet.SmoothMarkerBouncing [![npm](https://img.shields.io/npm/v/leaflet.smooth_marker_bouncing.svg)](http://npm.im/leaflet.smooth_marker_bouncing) 
============================
Plugin for [Leaflet](http://leafletjs.com/) that will make you markers bounce!

It provides smooth, lightweight and customisable animation of marker bouncing.
Allows the bouncing of multiple markers on the map, without lose of performance.
Plugin shows it's best performances on the 3D-able modern browsers, using hardware acceleration.  
On old browsers plugin provides simplified animation.

Demo
----
Check out the [demo](http://hosuaby.github.io/Leaflet.SmoothMarkerBouncing/).

Usage
-----
Add Javascript file on your page:
```html
<script type="text/javascript" src="js/leaflet.smoothmarkerbouncing.js" />
```
Plugin provides additional methods:
```javascript
/* Methods of L.Marker class */
L.Marker.setBouncingOptions({..}); // sets options of bouncing of all markers
L.Marker.getBouncingMarkers();     // gets all bouncing markers
L.Marker.stopAllBouncingMarkers(); // asks all bouncing markers to stop

/* Methods of marker instances */
var marker = L.marker([lat, lng]);
marker.setBouncingOptions({..});   // sets options of bouncing of this marker
marker.isBouncing();               // checks if marker is bouncing
marker.bounce();                   // starts the bouncing
marker.bounce(n);                  // makes marker bounce "n" times
marker.stopBouncing();             // stops bouncing marker
marker.toggleBouncing();           // starts/stops bouncing of this marker
```
Plugin respects fluent API. All marker instance methods (except `isBouncing`) return the marker object.  
Some usage examples:
```javascript
/* Create a marker and make it bounce immediately */
var marker = L.marker([lat, lng]).bounce();

/* Create a marker and make it bounce 2 times when clicked.
 * Do something when the bouncing is stoped, such as opening popup.
 */
var marker = L.marker([lat, lng])
    .on('click', function() {
        this.bounce(2) // bounce 2 times
        .on('bounceend',function() {
            console.log('bounce end');
        }); 
    });

/* Create a marker and define it's bouncing options.
 * Bouncing can be started/stoped by the click on the marker.
 */
var marker = L.marker([lat, lng])
    .setBouncingOptions({
        bounceHeight : 60,    // height of the bouncing
        bounceSpeed  : 54,    // bouncing speed coefficient
        exclusive    : true,  // if this marker bouncing all others must stop
    }).on('click', function() {
        this.toggleBouncing();
    });

/* Define options of bouncing for all markers */
L.Marker.setBouncingOptions({
        bounceHeight : 60,   // height of the bouncing
        bounceSpeed  : 54,   // bouncing speed coefficient
});

/* Create 10 markers and each of them will bounce 3 times when clicked */
for (var i = 0; i < 10; i++) {
    var marker = L.marker([lat, lng])
        .on('click', function() {
            this.bounce(3); // bounce 3 times
        });
}
```

Options of bouncing
----------------
You can easily customize bouncing animation supplying options in method `setBouncingOptions`. This method available on the marker class `L.Marker` and on each of marker instances.  
It's highly recommended to define options for all markers via `L.Marker.setBouncingOptions` instead of define them on each marker individually. The animation performance highly increases when all markers have the same options.  
Method `setBouncingOptions` accepts an object with options as parameter. Animation can be customized with following properties:
- **bounceHeight** - how high marker will bounce (px), *default: 15*
- **contractHeight** - how much marker will contract when it touch the ground (px), *default: 12*
- **bounceSpeed** - bouncing speed coefficient, value used to calculate the speed of bounce animation, more it becomes high, more animation becomes slow, *default: 52*
- **contractSpeed** - contracting speed coefficient, *default: 52*
- **shadowAngle** - shadow inclination angle, if set to `null` shadow animation is disabled (radians), *default: - Math.PI / 4*
- **elastic** - activate contract animation when marker touch the ground, *default: true*
- **exclusive** - when it's true, stops the bouncing of other markers when this one starts to bounce. If another marker start to bounce after, this marker stops. *default: false*

Events
----------------
|Event|Description|
|---|---|
|bounceend|Fired when the animation is done|

Tested on
---------
:white_check_mark: Chrome 40.0  
:white_check_mark: Firefox 35.0  
:white_check_mark: IE 11  
:white_check_mark: Android 4.4/5.0  
:white_check_mark: Safari

License
-------
Plugin distributed under BSD license.
