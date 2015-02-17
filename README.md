Description
===========
Smooth animation of bouncing for markers in [Leaflet](http://leafletjs.com/).

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