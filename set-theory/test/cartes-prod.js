
const assert = require("assert");
const Range = require("../../numeric-lib/range");
const Cartes = require("../cartes-prod");

describe("Cartesian product of non-empty arrays", function() {
	it("[1,2,3]x['a','b']", function() {
		let retv = Cartes([1,2,3], ['a','b']);
		assert.deepStrictEqual(retv[0], [ 'a', 1 ]);
		assert.deepStrictEqual(retv[1], [ 'b', 1 ]);
		assert.deepStrictEqual(retv[2], [ 'a', 2 ]);
		assert.deepStrictEqual(retv[3], [ 'b', 2 ]);
		assert.deepStrictEqual(retv[4], [ 'a', 3 ]);
		assert.deepStrictEqual(retv[5], [ 'b', 3 ]);
	});

	it("[1,2]x['a','b']x[true,false]", function() {
		let retv = Cartes([1,2], ['a','b'], [true,false]);
		assert.deepStrictEqual(retv, [
			[true, 'a', 1],
			[false, 'a', 1],
			[true, 'b', 1],
			[false, 'b', 1],
			[true, 'a', 2],
			[false, 'a', 2],
			[true, 'b', 2],
			[false, 'b', 2],
		]);
	});
});

describe("Cartesian product of non-empty set-like objects", function() {
	it("[1,2,3]x{'a','b'}", function() {
		let retv = Cartes([1,2], new Set(['x', 'y']));
		assert.deepStrictEqual(retv, [
			[ 'x', 1 ],
			[ 'y', 1 ],
			[ 'x', 2 ],
			[ 'y', 2 ],
		]);
	});

	it("['c']xRange(0,1,.125)", function() {
		let retv = Cartes(['c'], Range(0,1,.125));
		assert.deepStrictEqual(retv, [
			[ 0, 'c' ],
			[ 0.125, 'c' ],
			[ 0.25, 'c' ],
			[ 0.375, 'c' ],
			[ 0.5, 'c' ],
			[ 0.625, 'c' ],
			[ 0.75, 'c' ],
			[ 0.875, 'c' ],
			[ 1, 'c' ]
		]);
	});
});

describe("Edge cases", function() {
	it("[1,2,3]x[]", function() {
		let retv = Cartes([1,2,3], []);
		assert.deepStrictEqual(retv, [ ]);
	});

	it("[]x[]", function() {
		let retv = Cartes([], []);
		assert.deepStrictEqual(retv, [ ]);
	});
});
