/**
 *  Prime Iterator
 *  @module prime-iterator
 *
 *  Usage:
 *      const PrimeIterator = require('prime-iterator');
 *      let pi = PrimeIterator(2);
 *      while (true)
 *      	pi();
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
	return function() {
		do {
			if (isPrime(++current))
				return current;
		} while (true);
	}
}

module.exports = PrimeIterator;
