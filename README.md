Description
===========
Plugin for [Leaflet](http://leafletjs.com/) that will make you markers bounce!

It provides the smooth, performante and customisable animation of bouncing for
the markers.  
Allows the bouncing of multiple markers on the map, without lose of performance.  
Plugins shows it's best performances on the 3D able modern browsers, using hardware acceleration.  
On old browsers plugin provide simplified animation, with animation of collapse when the marker touch the floor.

Demo
----
Check the [demo](http://hosuaby.github.io/Leaflet.SmoothMarkerBouncing/).

Usage
-----
Add plugin to your page:
```html
<script type="text/javascript"
    src="https://rawgit.com/hosuaby/Leaflet.SmoothMarkerBouncing/master/leaflet.smoothmarkerbouncing.js">
</script>
```
Plugin adds methods to your markers:
```javascript
/* Methods of L.Marker */
L.Marker.setBouncingOptions({..}); // to define the options of bouncing for all markers
L.Marker.getBouncingMarkers();  // get all bouncing markers
L.Marker.stopAllBouncingMarkers();  // asks all bouncing markers to stop

/* Methods of marker instances */
var marker = L.marker([lat, lng]);
marker.setBouncingOptions({..});    // defines bouncing options of this marker
marker.isBouncing();    // tells if this marker actually bouncing or not
marker.bounce();    // makes marker bouncing
marker.bounce(n);   // makes marke bounce "n" times
marker.stopBouncing();  // stops the bouncing of this marker
marker.toogleBouncing();    // starts/stops bouncing of this marker
```
Plugin defines fluent API. All marker instance methods (except `isBouncing`) return the marker object.
Some usage exemples:
```javascript
/* Creates the marker that starts to bounce immediatelly after
 * it's creation.
 */
var marker = L.marker([lat, lng]).bounce();

/* Create marker and set bouncing options.
 * Bouncing can be started/stoped by click on the marker.
 */
var marker = L.marker([lat, lng])
    .setBouncingOptions({
        bounceHeight: 60,   // height of bouncing
        bounceSpeed: 54,    // bouncing speed coeficient
        exclusif: true,     // if this marker is bouncing all others stop
    }).on('click', function() {
        this.toogleBouncing();
    });

/* Define options of bouncing for all markers */
L.Marker.setBouncingOptions({
        bounceHeight: 60,   // height of bouncing
        bounceSpeed: 54,    // bouncing speed coeficient
});

/* Create 10 marker and each of them will bounce 3 times when
 * it will be clicked.
 */
for (var i = 0; i < 10; i++) {
    var marker = L.marker([lat, lng])
        .on('click', function() {
            this.bounce(3); // bounce 3 times
        })
}
```

Options of bouncing
----------------
You can easy customize bouncing supplying options in method `setBouncingOptions`. This method available on the marker constructor and on each of marker instances.  
It's highly recommended to define options of all markers via `L.Marker.setBouncingOptions` instead of define options of each marker individually. The
performance of animation is highly icrease when all markers have the same animation of bouncing.
Method `setBouncingOptions` accept an object as it's parameter which properties are options for the animation. Animation can be configured with next
properties:
- **bounceHeight** - how high marker will bounce (px), *default: 15*
- **contractHeight** - how much marker will contract when it touch the ground (px), *default: 12*
- **bounceSpeed** - bouncing speed coefficient, value used to calculate the speed of bounce animation, more it becomes high, more animation bocomes slow, *default: 52*
- **contractSpeed** - contracting speed coefficient, *default: 52*
- **shadowAngle** - shadow inclination angle (radians), *default: - Math.PI / 4*,
- **elastic** - activate contract animation when markzer touch the ground, *default: true*
- **exclusif** - when it true, not allows another markers to bounce during the bouncing of this marker, *default: false*