
const PrimeFactory = require("../prime-factory");
const assert = require("assert");

describe("PrimeFactory", function() {
	it("default parameters", function() {
		let pf = new PrimeFactory();
		let count = 0;
		for (let p of pf) {
			if (++count == 1000) {
				// After a thousand iterations of prime numbers returned
				// Satisfactorily pass the test
				break;
			}
			if (pf.isPrime(p) == false) {
				return false;
			}
		}

		return true;
	});

	it("with lower bound param", function() {
		let pf = new PrimeFactory(100);
		let count = 0;
		for (let p of pf) {
			if (++count == 1000) {
				// After a thousand iterations of prime numbers returned
				// Satisfactorily pass the test
				break;
			}
			if (pf.isPrime(p) == false) {
				return false;
			}
		}

		return true;
	});

	it("with lower and upper bounds", function() {
		let pf = new PrimeFactory(3, 10);
		assert.deepStrictEqual(Array.from(pf), [ 3, 5, 7 ]);
	});
});

