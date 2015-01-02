/**
 * Icon of charging station for leaflet marker.
 * 
 * @author Alexei KLENIN
 */
;(function(L) {
	
	L.icons = {energy: {}};
	
	L.icons.energy.ChargingStation = L.Icon.extend({
		options: {
			className: 'charging-station',

			/* Full station */
			iconSize_full:		[58, 67],
			iconAnchor_full:	[31, 63],
			shadowSize_full:	[72, 46],
			shadowAnchor_full:	[20, 38],

			iconUrl_full_free:			'resources/images/station-full-free.png',
			iconUrl_full_occupied:		'resources/images/station-full-occupied.png',
			iconUrl_full_reserved:		'resources/images/station-full-reserved.png',
			iconUrl_full_unavailable:	'resources/images/station-full-unavailable.png',

			iconUrl_full_free_inoperational:		'resources/images/station-full-free-inoperational.png',
			iconUrl_full_occupied_inoperational:	'resources/images/station-full-occupied-inoperational.png',
			iconUrl_full_reserved_inoperational:	'resources/images/station-full-reserved-inoperational.png',
			iconUrl_full_unavailable_inoperational:	'resources/images/station-full-unavailable-inoperational.png',

			shadowUrl_full: 'resources/images/station-shadow-full.png',

			popupAnchor_full: [0, 0],

			/* Simple stations */
			iconSize_simple:		[32, 51],
			iconAnchor_simple: 		[16, 47],
			shadowSize_simple:		[40, 31],
			shadowAnchor_simple:	[1, 27],

			iconUrl_simple_free:			'resources/images/station-simple-free.png',
			iconUrl_simple_occupied:		'resources/images/station-simple-occupied.png',
			iconUrl_simple_reserved:		'resources/images/station-simple-reserved.png',
			iconUrl_simple_unavailable:		'resources/images/station-simple-unavailable.png',
			iconUrl_simple_inoperational: 	'resources/images/station-simple-inoperational.png',

			shadowUrl_simple: 'resources/images/station-shadow-simple.png',

			popupAnchor: [0, 0],

			/* Default station icon settings */
			full: false,		// simple icon by default
			operational: true,	// station is operational by default
			states: {
				nbFree: 0,
				nbOccupied: 0,
				nbReserved: 0,
				nbUnavailable: 0
			},
			primary: 'free'		// primary status: ['free', 'occupied', 'reserved', 'unavailable']
		},
		
		/**
		 * Override default createIcon function.
		 */
		createIcon: function() {

			/* Retrive params */
			var type = this.options.full ? 'full' : 'simple'; // full or simple
			var operational = this.options.operational;
			//if (!operational) type = 'simple';
			var primary = this.options.primary;

			/* Create main div with image */
			var divIcon = document.createElement('div');
			
			/* Icon's options defined by it's type */
			this.options.iconSize = this.options['iconSize_' + type];
			this.options.iconAnchor = this.options['iconAnchor_' + type];

			this._setIconStyles(divIcon, 'icon');
			divIcon.className += ' ' + type + ' ' + primary
				+ (operational ? '' : ' inoperational');

			/* Replace numbers >= 100 by roman number C or C+ */
			for (var state in this.options.states) {
				if (this.options.states[state] == 100) {
					this.options.states[state] = 'C';
				} else if (this.options.states[state] > 100) {
					this.options.states[state] = 'C+';
				}
			}

			/* Create labels */
			var lblNbFree = document.createElement('div');
			lblNbFree.className = 'label';
			lblNbFree.innerHTML = this.options.states.nbFree;

			var lblNbOccupied = document.createElement('div');
			lblNbOccupied.className = 'label';
			lblNbOccupied.innerHTML = this.options.states.nbOccupied;

			var lblNbReserved = document.createElement('div');
			lblNbReserved.className = 'label';
			lblNbReserved.innerHTML = this.options.states.nbReserved;

			var lblNbUnavailable = document.createElement('div');
			lblNbUnavailable.className = 'label';
			lblNbUnavailable.innerHTML = this.options.states.nbUnavailable;

			if (type === 'simple') {
				var imgIcon = this._createImg(this.options['iconUrl_' + type
					+ '_' + (operational ? primary : 'inoperational')]);
			} else {
				var imgIcon = this._createImg(this.options['iconUrl_' + type
					+ '_' + primary
					+ (operational ? '' : '_inoperational')]);
			}

			switch (primary) {
			case 'free':
				lblNbFree.className += ' primary';
				lblNbOccupied.className += ' secondary left';
				lblNbReserved.className += ' secondary top';
				lblNbUnavailable.className += ' secondary right';
				break;
			case 'occupied':
				lblNbOccupied.className += ' primary';
				lblNbFree.className += ' secondary left';
				lblNbReserved.className += ' secondary top';
				lblNbUnavailable.className += ' secondary right';
				break;
			case 'reserved':
				lblNbReserved.className += ' primary';
				lblNbFree.className += ' secondary left';
				lblNbOccupied.className += ' secondary top';
				lblNbUnavailable.className += ' secondary right';
				break;
			case 'unavailable':
				lblNbUnavailable.className += ' primary';
				lblNbFree.className += ' secondary left';
				lblNbOccupied.className += ' secondary top';
				lblNbReserved.className += ' secondary right';
				break;
			}

			divIcon.appendChild(imgIcon);
			divIcon.appendChild(lblNbFree);
			divIcon.appendChild(lblNbOccupied);
			divIcon.appendChild(lblNbReserved);
			divIcon.appendChild(lblNbUnavailable);

			return divIcon;
		},

		/**
		 * Override default createShadow function.
		 */
		createShadow: function() {
			var type = this.options.full ? 'full' : 'simple'; // full or simple

			/* Set options defined by type */
			this.options.shadowSize = this.options['shadowSize_' + type];
			this.options.shadowAnchor = this.options['shadowAnchor_' + type];

			var imgShadow = this._createImg(this.options['shadowUrl_'
				+ type]);

			this._setIconStyles(imgShadow, 'shadow');
			return imgShadow;
		}
	});
	
})(L);
