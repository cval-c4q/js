/**
 *  Prime Iterator factory
 *  @module prime-factory
 *
 *  Usage:
 *      const PrimeFactory = require('prime-factory');
 *      let pf = PrimeFactory(2)
 *      for (let p of pf) console.log('Next prime number:", p);
 *      if (pf.isPrime(Math.random())
 *      	....;
 */

/*
 * isPrime
 *
 * @param {number} num
 * @returns {boolean}
 */
function isPrime(num) {
	let div = num / 2 | 0;
	if (num < 2)
		return false;
	while (div > 1) {
		if (num % div === 0)
			return false;
		div--;
	}
	return true;
}

/**
 * PrimeIterator - returns an interator function that returns the next prime
 * when called.
 *
 * @param {number} - start returning primes >= |this value|
 * @returns {function} - iterator
 */
function PrimeIterator(start = 2) {
	let current = Math.abs(start);
	return {
		next: function() {
			do {
				if (isPrime(current))
					return { value: current++, done: false };
				else
					current++;
			} while (true);
		}
	}
}

function PrimeFactory(start=2) {
	if (typeof start !== 'number')
		throw new TypeError("PrimeFactory: expected numeric argument.");
	if (start < 2)
		throw new RangeError("PrimeFactory: invalid lower bound for prime generation. Expected >= 2.");
	return {
		[Symbol.iterator]: PrimeIterator(start),
		isPrime
	}
}

if (module) {
	module.exports = PrimeFactory;
}

