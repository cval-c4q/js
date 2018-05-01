const assert = require("assert");
const Power = require("../power-set");

describe("Power Sets of iterable objects", function() {
	it("P([1,2,3])", function() {
		let retv = Power([1,2,3]);
		assert.equal(retv.length, 2**3);
		assert.deepStrictEqual(retv, [
			[],
			[1],
			[2],
			[1,2],
			[3],
			[1,3],
			[2,3],
			[1,2,3],
		]);
	});
});

describe("Power Set: edge cases", function() {
	it("P([1])", function() {
		assert.deepStrictEqual(Power([1]), [
			[],
			[1],
		]);
	});

	it("P([])", function() {
		assert.deepStrictEqual(Power([]), [ [] ]);
	});
});
