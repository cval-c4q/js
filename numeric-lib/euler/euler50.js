/**
 * https://projecteuler.net/problem=50
 * Which prime, below one-million, can be written as the sum of the most consecutive primes?
 */
const PrimeIterator = require('../prime-iterator');
const THRESHOLD = 1e6;

let cur_sum = []
let pi = new PrimeIterator.PrimeIterator(2);

do {
	let next_prime = pi();
	if (cur_sum.reduce((acc, val) => acc + val, 0) + next_prime < THRESHOLD)
		cur_sum.push(next_prime);
	else
		break;
} while (true);

/*
 * Now narrow down to the array of primes whose sum satisfy the criteria (primality, below threshold)
 */
while (cur_sum.length > 0) {
	if (PrimeIterator.isPrime(cur_sum.reduce((acc, val) => acc + val, 0)))
		break;
	else
		cur_sum.pop();
}

console.log(`P = Set of ${cur_sum.length} natural numbers, \u2200x\u2208P, x is a prime.`);
console.log(`\u2211P = ${cur_sum.reduce((acc, val) => acc + val, 0)}, \u2211P is a prime that is less than ${THRESHOLD}.`);

