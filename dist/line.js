"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateLine = calculateLine;

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