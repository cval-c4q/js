/**
 *  Prime Iterator factory
 *  @module prime-factory
 *
 *  Usage:
 *      const PrimeFactory = require('prime-factory');
 *      let pf = [new] PrimeFactory(start=2, end=undefined)
 *      for (let p of pf) console.log('Next prime number:", p);
 *      if (pf.isPrime(Math.random())
 *      	....;
 *	Both start and end arguments must be >2 and have default values
 *	of 2 and undefined, respectively. an end value of undefined causes
 *	the interface to generate primes ad-infinitum.
 *
 */

/*
 * isPrime
 *
 * @param {number} num
 * @returns {boolean}
 */
function isPrime(num) {
	if (num < 2 || num != 2 && num & 0b1 == 0b0)
		return false;
	const upper = num / 2 | 0;
	for (let div = 2; div <= upper; div++)
		if (num % div === 0)
			return false;
	return true;
}

/**
 * PrimeIterator - returns an interator function that returns the next prime
 * when called.
 *
 * @param {number} - start returning primes >= |this value|
 * @returns {function} - iterator
 */
function PrimeIterator(start = 2, end) {
	let current = Math.abs(start);
	return {
		next: function() {
			while (!isPrime(current))
				current++;

			if (typeof end == "undefined" || current <= end) {
				return { value: current++, done: false };
			} else
				return { value: undefined, done: true };
		}
	}
}

function PrimeFactory(start=2, end) {
	if (typeof start !== 'number')
		throw new TypeError("expected numeric lower bound.");
	if (!(typeof end == "undefined" || typeof end == "number"))
		throw new TypeError("expected numeric upper bound.");
	if (start < 2)
		throw new RangeError("invalid lower bound. Expected >= 2.");
	if (typeof end == "number" && end  < 2)
		throw new RangeError("invalid upper bound. Expected >= 2.");

	return {
		[Symbol.iterator]: PrimeIterator.bind(this, start, end),
		isPrime
	}
}

if (module) {
	module.exports = PrimeFactory;
}

