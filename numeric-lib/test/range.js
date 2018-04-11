const assert = require("assert");

describe("Range", function() {
	const Range = require("../range");

	describe("Increasing range", function() {
		it("[1..5] increasing, default step", function() {
			assert.deepStrictEqual(Array.from(Range(1,5)), [1,2,3,4,5]);
		});

		it("[1..5] increasing, explicit integer step=2", function() {
			assert.deepStrictEqual(Array.from(Range(1,5,2)), [1,3,5]);
		});

		it("[1..5] increasing, explicit float step=0.5", function() {
			assert.deepStrictEqual(Array.from(Range(1,5,.5)), [1,1.5,2,2.5,3,3.5,4,4.5,5]);
		});

		it("[-3..-1] increasing, default step", function() {
			assert.deepStrictEqual(Array.from(Range(-3,-1)), [-3,-2,-1]);
		});
	});

	describe("Decreasing range", function() {
		it("[5..1] decreasing, default step", function() {
			assert.deepStrictEqual(Array.from(Range(5,1)), [5,4,3,2,1]);
		});

		it("[5..1] decreasing, explicit integer step=-2", function() {
			assert.deepStrictEqual(Array.from(Range(5,1,-2)), [5,3,1]);
		});

		it("[5..1] decreasing, explicit float step=-0.5", function() {
			assert.deepStrictEqual(Array.from(Range(5,1,-.5)), [5,4.5,4,3.5,3,2.5,2,1.5,1]);
		});
	});

	describe("Error handling", function() {
	});
});
