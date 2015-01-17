/*
 * Copyright (c) 2015, Alexei KLENIN
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *   1. Redistributions of source code must retain the above copyright notice,
 *		this list of conditions and the following disclaimer.
 *
 *   2. Redistributions in binary form must reproduce the above copyright
 *		notice, this list of conditions and the following disclaimer in the
 *		documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * Smooth bouncing for Leaflet markers.
 *
 * @author Alexei KLENIN <alexey_klenin@hotmail.fr>
 */
;(function(L) {

	"use strict";

	// TODO: check for regexp optimization
	var regStyle = /(\w+): ([^;]+);/g;

	/**
	 * Parse cssText attribute and transform it into Javascript object with
	 * style definitions as the keys.
	 *
	 * @param cssText - cssText string.
	 * 
	 * @return object with style definitions as the keys.
	 */
	function parseCssText(cssText) {
		var styleDefinitions = {};

		var match = regStyle.exec(cssText);
		while (match) {
			styleDefinitions[match[1]] = match[2];
			match = regStyle.exec(cssText);
		}

		return styleDefinitions;
	}

	/**
	 * Renders the object with style definitions as string ready to put in
	 * cssText attribute.
	 *
	 * @param styleDefinitions - object with style definitions.
	 *
	 * @return cssText string.
	 */
	function renderCssText(styleDefinitions) {
		var cssText = '';

		for (var key in styleDefinitions) {
			cssText += key + ': ' + styleDefinitions[key] + '; '
		}

		return cssText;
	}

	/**
	 * Renders translate3d from z, y & z. Returns string of translate3d
	 * definition.
	 *
	 * @param x - numeric value of x coordinate;
	 * @param y - numeric value of y coordinate;
	 * @param z - numeric value of z coordinate.
	 *
	 * @return translate3d definition.
	 */
	function renderTranslate3d(x, y, z) {
		return ' translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px) ';
	}

	/**
	 * Renders scale from horizontal & vertical scale.
	 *
	 * @param sH - horizontal scale as relative value;
	 * @param sV - vertical scale as relative value.
	 *
	 * @return scale definition.
	 */
	function renderScale(sH, sV) {
		return ' scale(' + sH + ', ' + sV + ') ';
	}

	/**
	 * Renders matrix transformation.
	 *
	 * @param a - element [1, 1] of the matrix;
	 * @param b - element [1, 2] of the matrix;
	 * @param c - element [2, 1] of the matrix;
	 * @param d - element [2, 2] of the matrix;
	 * @param tX - translation by x;
	 * @param tY - translation by y.
	 */
	function renderMatrix(a, b, c, d, tX, tY) {
		return ' matrix(' + a + ', ' + b + ', ' + c + ', ' + d + ', ' + tX
			+ ', ' + tY + ') ';
	}

	/**
	 * Helper function to create an array of transformation definitions of the
	 * animation of movement. Function defines one transform for every pixel of
	 * shift of marker from it's original y position.
	 *
	 * @param x - numeric value of x coordinate of original position of marker;
	 * @param y - numeric value of y coordinate of original position of marker;
	 * @param z - numeric value of z coordinate of original position of marker;
	 * @param bounceHeight - height of bouncing (px).
	 *
	 * @return array of transformation definitions.
	 */
	function createMoveTransforms(x, y, z, bounceHeight) {

		/* For each step of the animation calculate translation */
		for (var t = [], dY = 0; dY <= bounceHeight; dY++) {
			t[dY] = renderMatrix(1, 0, 0, 1, x, y - dY);
		}

		return t;
	}

	/**
	 * This function do the same thing that createMoveTransforms() but
	 * constructs an array of points instead of transformation definitions. Used
	 * to animate marker on the browsers that doesn't support 'transform'
	 * attribute.
	 *
	 * @param x - numeric value of x coordinate of original position of marker;
	 * @param y - numeric value of y coordinate of original position of marker;
	 * @param z - numeric value of z coordinate of original position of marker;
	 * @param bounceHeight - height of bouncing (px).
	 *
	 * @return array of points [x, y].
	 */
	function createMovePoints(x, y, z, bounceHeight) {

		/* For each step of animation calculate the point */
		for (var p = [], dY = 0; dY <= bounceHeight; dY++) {
			p[dY] = [x, y - dY];
		}

		return p;
	}

	/**
	 * Helper function to create an array of transformation definitions of the
	 * animation of contraction. Function defines one transform for every pixel
	 * of resizing of marker from it's original height.
	 *
	 * @param x - numeric value of x coordinate of original position of marker;
	 * @param y - numeric value of y coordinate of original position of marker;
	 * @param z - numeric value of z coordinate of original position of marker;
	 * @param height - original marker's height;
	 * @param contractHeight - height of contraction (px).
	 *
	 * @return array of transformation definitions.
	 */
	function createResizeTransforms(x, y, z, height, contractHeight) {
		var t = [];		// array of transformation definitions

		/* For each step of the animation calculate translation */
		for (var dH = 0; dH <= contractHeight; dH++) {
			t[dH] = renderMatrix(1, 0, 0, (height - dH) / height, x, y + dH);
		}

		return t;
	}

	/**
	 * Calculates the points to draw the continous line on the screen. Returns
	 * the array of ordered point coordinates. Uses Bresenham algorithm.
	 *
	 * @param xO - x coordinate of origin;
	 * @param yO - y coordinate of origin;
	 * @param angle - angle in radians;
	 * @param length - length of line.
	 *
	 * @return array of ordered point coordinates.
	 */
	function calculateLine(xO, yO, angle, length) {
		// TODO: find better way to calculate those values
		var xD = xO + Math.abs(Math.cos(angle) * 100),
			yD = yO + Math.abs(Math.sin(angle) * 100);

		var w = xD - xO,	// width
			h = yD - yO,	// height

			dxO = 0,
			dyO = 0,
			dxD = 0,
			dyD = 0,

			p = [];			// result points

		if (w < 0) {
			dxO = -1;
			dxD = -1;
		} else if (w > 0) {
			dxO = 1;
			dxD = 1;
		};

		if (h < 0) {
			dyO = -1;
		} else if (h > 0) {
			dyO = 1;
		}

		var longest = w,
			shortest = h;

		if (longest <= shortest) {
			longest = h;
			shortest = w;

			if (h < 0) {
				dyD = -1;
			} else if (h > 0) {
				dyD = 1;
			}
		}

		var numerator = longest >> 1;

		// TODO: ensure that point 0 is trasformation without translation
		for (var i = 0; i <= length; i++) {
			p.push([xO, yO]);
			numerator += shortest;
			if (numerator >= longest) {
				numerator -= longest;
				xO += dxO;
				yO -= dyO;
			} else {
				xO += dxD;
				yO -= dxD;
			}
		}

		return p;
	}

	/**
	 * Helper function to create an array of transformation definitions of the
	 * animation of movement of shadow. Function defines one transform for every
	 * pixel of shift of shadow from it's original position.
	 *
	 * @param x - numeric value of x coordinate of original position of marker;
	 * @param y - numeric value of y coordinate of original position of marker;
	 * @param z - numeric value of z coordinate of original position of marker;
	 * @param bounceHeight - height of bouncing (px);
	 * @param angle - shadow inclination angle (radians).
	 *
	 * @return array of transformation definitions.
	 */
	function createShadowMoveTransforms(x, y, z, bounceHeight, angle) {
		var t = [],		// array of transformation definitions
			p = calculateLine(x, y, angle, bounceHeight),
			dY = 0;

		/* For each step of the animation calculate translation */
		for (; dY <= bounceHeight; dY++) {
			t[dY] = renderMatrix(1, 0, 0, 1, p[dY][0], p[dY][1]);
		}

		return t;
	}

	/**
	 * This function do the same thing thn function createShadowMoveTransforms()
	 * but instead of transformation definition calculates the points for the
	 * animation of the movement.
	 *
	 * @param x - numeric value of x coordinate of original position of marker;
	 * @param y - numeric value of y coordinate of original position of marker;
	 * @param z - numeric value of z coordinate of original position of marker;
	 * @param bounceHeight - height of bouncing (px);
	 * @param angle - shadow inclination angle (radians).
	 *
	 * @return array of the points [x, y].
	 */
	function createShadowMovePoints(x, y, z, bounceHeight, angle) {
		return calculateLine(x, y, angle, bounceHeight);
	}

	/**
	 * Helper function to create an array of transformation definitions of the
	 * animation of contraction of the shadow. Function defines one transform
	 * for every pixel of resizing of shadow.
	 *
	 * @param x - numeric value of x coordinate of original position of marker;
	 * @param y - numeric value of y coordinate of original position of marker;
	 * @param z - numeric value of z coordinate of original position of marker;
 	 * @param width - original shadow's width;
	 * @param height - original shadow's height;
	 * @param contractHeight - height of contraction (px);
	 * @param angle - shadow inclination angle (radians).
	 *
	 * @return array of transformation definitions.
	 */
	function createShadowResizeTransforms(x, y, z, width, height,
			contractHeight, angle) {
		var t = [];		// array of transformation definitions

		var p = calculateLine(width, height, angle + Math.PI, contractHeight);

		/* For each step of the animation calculate translation */
		for (var dH = 0; dH <= contractHeight; dH++) {
			t[dH] = renderMatrix(width / p[dH][0], 0, 0, p[dH][1] / height, x, y + height - p[dH][1]);
		}

		return t;
	}

	/* Set default animation properties */
	// TODO: create options.animations.bouncing
	L.Marker.mergeOptions({
		bounceHeight 	 : 15,	// how high marker can bounce (px)
		contractHeight	 : 15,	// how much marker can contract (px)
		bounceSpeed		 : 52,	// bouncing speed coefficient
		contractSpeed	 : 52,	// contracting speed coefficient
		shadowAngle		 : Math.PI / 4,	// shadow inclination angle (radians)
		bouncingElastic	 : true,	// activate contract animation
		bouncingExclusif : false,	// many markers can bounce in the same time
	});

	L.Marker._bouncingMarkers = [];	// array of bouncing markers

	/**
	 * Adds the marker to the list of bouncing markers. If flag 'exclusif' is
	 * set to true, stops all bouncing markers before.
	 *
	 * @param marker - L.Marker object;
	 * @param exclusif - flag of exclusif bouncing. If set to true, stops the
	 *		bouncing of all other markers.
	 */
	L.Marker._addBouncingMarker = function(marker, exclusif) {
		if (exclusif) {
			L.Marker._stopAllBouncing();
		}
		L.Marker._bouncingMarkers.push(marker);
	};

	/**
	 * Stops the bouncing of all currently bouncing markers. Purge the array of
	 * bouncing markers.
	 */
	L.Marker._stopAllBouncing = function() {
		var marker;
		while (marker = L.Marker._bouncingMarkers.shift()) {
			marker._isBouncing = false;
		}
	};

	var oldInitialize = L.Marker.prototype.initialize;
	var oldInitIcon = L.Marker.prototype._initIcon;
	var oldSetPos = L.Marker.prototype._setPos;

	/**
	 * Redeclaration of initialize() function.
	 */
	L.Marker.prototype.initialize = function(latlng, options) {
		oldInitialize.call(this, latlng, options);
		
		/*
		 * Animation is defined by shifts of the marker from it's original
		 * position. Each step of the animation is a shift of 1px.
		 *
		 * We define function f(x) - time of waiting between shift of x px and
		 * shift of x+1 px.
		 *
		 * We use for this the inverse function f(x) = a / x; where a is the
		 * animation speed and x is the shift from original position in px.
		 */

		var motion = {
			moveDeltaTime: [],
			resizeDeltaTime: [],
			baseCssText: ''
		};

		this._bouncingMotion = motion;

		/* Calculate delta time for bouncing animation */
		var bounceHeight = this.options.bounceHeight;
		var bounceSpeed = this.options.bounceSpeed;
		for (var dY = 0; dY <= bounceHeight; dY++) {
			switch (dY) {
				case bounceHeight:
					motion.moveDeltaTime[dY] = bounceSpeed;
					break;
				default:
					motion.moveDeltaTime[dY] = Math.round(
						bounceSpeed / (bounceHeight - dY));
			}
		}

		/* Calculate delta time for contracting animation. */
		var contractHeight = this.options.contractHeight;
		var contractSpeed = this.options.contractSpeed;
		for (var dH = 0; dH <= contractHeight; dH++) {
			switch (dH) {
				case contractHeight:
					motion.resizeDeltaTime[dH] = contractSpeed;
					break;
				default:
					motion.resizeDeltaTime[dH] = Math.round(
						contractSpeed / (contractHeight - dH))
			}
		}
	};

	/**
	 * Redeclaration of _initIcon() function.
	 */
	L.Marker.prototype._initIcon = function() {
		oldInitIcon.call(this);

		/* Create base cssText */
		var styles = parseCssText(this._icon.style.cssText);
		delete styles.transform;	// delete old trasform style definition
		this._bouncingMotion.baseCssText = renderCssText(styles);

		/* Create base cssText for shadow */
		styles = parseCssText(this._shadow.style.cssText);
		delete styles.transform;	// delete old trasform style definition
		this._bouncingMotion.baseShadowCssText = renderCssText(styles);
	};

	/**
	 * Redeclaration of _setPos() function.
	 */
	L.Marker.prototype._setPos = function(pos) {
		// if (!disable3D && L.Browser.any3d) {
		// 	el.style[L.DomUtil.TRANSFORM] =  L.DomUtil.getTranslateString(point);
		// } else {
		// 	el.style.left = point.x + 'px';
		// 	el.style.top = point.y + 'px';
		// }
		
		oldSetPos.call(this, pos);

		if (L.Browser.any3d) {

			/* Calculate transforms for 3D browsers */

			/* Recalculate move transforms */
			// TODO: debug Z coordinate
			this._bouncingMotion.moveTransforms = createMoveTransforms(
				pos.x,
				pos.y,
				0,
				this.options.bounceHeight
			);

			/* Recalculate resize transforms */
			// TODO: debug Z coordinate
			this._bouncingMotion.resizeTrasforms = createResizeTransforms(
				pos.x,
				pos.y,
				0,
				this.options.icon.options.iconSize[1],
				this.options.contractHeight
			);

			/* Shadow transformations */
			this._bouncingMotion.shadowMoveTransforms = createShadowMoveTransforms(
				pos.x,
				pos.y,
				0,
				this.options.bounceHeight,
				this.options.shadowAngle
			);

			this._bouncingMotion.shadowResizeTransforms = createResizeTransforms(
				pos.x,
				pos.y,
				0,
				this.options.icon.options.iconSize[1],
				this.options.contractHeight
			);

		} else {

			/* Calculate move points */

			/* For the marker */
			this._bouncingMotion.movePoints = createMovePoints(
				pos.x,
				pos.y,
				0,
				this.options.bounceHeight
			);

			/* And for the shadow */
			this._bouncingMotion.shadowMovePoints = createShadowMovePoints(
				pos.x,
				pos.y,
				0,
				this.options.bounceHeight,
				this.options.shadowAngle
			);

		}

	};

	L.Marker.include({

		/**
		 * Let's bounce now!
		 */
		// TODO: acception options in parameters
		// TODO: check what is faster: closure or function params
		bounce: function() {
			var self = this,
			
				icon = this._icon,
				shadow = this._shadow,

				motion = self._bouncingMotion,

				bounceHeight = self.options.bounceHeight,
				contractHeight = self.options.contractHeight,
				bouncingElastic = self.options.bouncingElastic,

				dY = 0,
				dH = 0,

				up = true,

				is3d = L.Browser.any3d,
				transform = L.DomUtil.TRANSFORM;

			/**
			 * Moves the marker up & down.
			 */
			function move() {
				if (up) {
					dY++;
				} else {
					dY--;
				}

				if (is3d) {

					/* Reset icon's cssText */
					icon.style.cssText = motion.baseCssText +  transform +': '
						+ motion.moveTransforms[dY];

					/* Reset shadow's cssText */
					shadow.style.cssText = motion.baseShadowCssText + transform
						+ ': ' + motion.shadowMoveTransforms[dY];
				} else {
					icon.style.left = motion.shadowMovePoints[dY][0];
					icon.style.top = motion.shadowMovePoints[dY][1];
				}

				if (dY == bounceHeight) {
					up = false;	// go down
				}

				if (dY > 0) {
					setTimeout(move, motion.moveDeltaTime[dY]);
				} else if (motion.isBouncing && dY == 0) {
					if (bouncingElastic && is3d) {

						/* Resize possible only in 3d browser */
						setTimeout(resize, motion.moveDeltaTime[dY]);
					} else {
						up = true;
						setTimeout(move, motion.moveDeltaTime[dY]);
					}
				}
			}

			/**
			 * Contracts & expands the marker.
			 */
			function resize() {
				if (up) {
					dH--;
				} else {
					dH++;
				}

				/* Reset icon's cssText */
				icon.style.cssText = motion.baseCssText + 'transform: '
					+ motion.resizeTrasforms[dH];
				
				/* Reset shadow's cssText */
				shadow.style.cssText = motion.baseShadowCssText + 'transform: '
					+ motion.shadowResizeTransforms[dH];

				/* Change direction */
				if (dH == contractHeight) {
					up = true;	// go up
				}

				if (dH > 0) {
					setTimeout(resize, motion.resizeDeltaTime[dH]);
				} else if (motion.isBouncing && dH == 0) {
					setTimeout(move, motion.resizeDeltaTime[dH]);
				}
			}

			motion.isBouncing = true;
			L.Marker._addBouncingMarker(self, self.options.bouncingExclusif);
			move();		// start animation
		},

		/**
		 * Stops the bouncing of the marker. Note: the bouncing not stops
		 * immediatly after the call of this method. Instead, the animation
		 * executed until the marker returns to it's original position and takes
		 * it's full size.
		 */
		stopBouncing: function() {
			this._bouncingMotion.isBouncing = false;
		},

		/**
		 * Toogle the bouncing on the marker.
		 */
		toogleBouncing: function() {
			if (this._bouncingMotion && this._bouncingMotion.isBouncing) {
				this.stopBouncing();
			} else {
				this.bounce();
			}
		}

	});

})(L);
