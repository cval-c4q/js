/**
 *   Numeric Range generator for ES6+
 *   Author: <carlovalenti@ac.c4q.nyc>
 *
 *   calling/instantiating Range returns an JavaScript object that:
 *    > Capable of handling increasing and decreasing ranges, integral and real steppings
 *    > Is an ES6 iterable (can be looped over, passed to Array.from(), etc..)
 *    > Has functional helper methods borrowed from Array attached to its prototype
 *    > Has storage requirements on the order of O(1)
 *    > Performs several sanity checks, throwing if any fail
 */

'use strict';
function Range(from, to, step=1) {
	if (!(typeof from === 'number' && typeof to === 'number' && typeof step === 'number'))
		throw new TypeError("Constructor called with non-numeric arguments");
	if (from === to)
		throw new RangeError("Constructor called with identifical upper and lower bounds");
	if (step === 0.0)
		throw new RangeError("Constructor called with step=0");
	else if (from < to && step < 0)
		throw new RangeError("Increasing range called with NEGATIVE step=%f", step);
	else if (from > to && step > 0) {
		if (arguments.length == 2 && step === 1)
			step = -1; // special case, defualt step for negative ranges
		else
			throw new RangeError("Decreasing range called with POSITIVE step=" + step + ", argsLen="+ arguments.length);

	}
	const thisObj = typeof this !== "undefined" ? this : Object.create(Range.prototype);

	Object.assign(thisObj, { [Symbol.iterator]() {
		let counter = from;
		return function*() {
			while (from < to ? counter <= to : counter >= to) {
				yield counter;
				counter += step;
			}
		}();
	}});

	return thisObj;
}

Range.prototype.map = function (...theArgs) { return Array.from(this).map(...theArgs); }
Range.prototype.forEach = function (...theArgs) { return Array.from(this).forEach(...theArgs); };
Range.prototype.filter = function (...theArgs) { return Array.from(this).filter(...theArgs); };
Range.prototype.reduce = function (...theArgs) { return Array.from(this).reduce(...theArgs); };

if (typeof module !== "undefined")
	module.exports = Range;
