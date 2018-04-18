
const assert = require("assert");
const { MERGE, MERGESORT } = require("../merge");

describe("MERGE", function() {
	describe("Standard cases", function() {
		it("Merges [4,5,6] and [1,2,3] into [1,2,3,4,5,6]", function() {
			let A = [4,5,6,1,2,3];
			MERGE(A, 0, 2, 5);
			assert.deepStrictEqual(A, [1,2,3,4,5,6]);
		});

		it("Merges [1,3,6] and [2,4,5] into [1,2,3,4,5,6]", function() {
			let A = [1,3,6,2,4,5];
			MERGE(A, 0, 2, 5);
			assert.deepStrictEqual(A, [1,2,3,4,5,6]);
		});
	});


	describe("Edge cases", function() {
		it("Merges subarrays of asymmetric lengths, [3,9] and [2,6,7]", function() {
			let A = [3,9,2,6,7];
			MERGE(A, 0, 1, 4);
			assert.deepStrictEqual(A, [2,3,6,7,9]);
		});
		it("Merges Empty subarray and [1,2,3] into [1,2,3]", function() {
			let A = [1,2,3];
			MERGE(A, 0, 0, 2);
			assert.deepStrictEqual(A, [1,2,3]);
		});
	});
});

describe("MERGE-SORT", function() {
	describe("Standard cases", function() {
		it("Sorts an array of unique elements", function() {
			let A = [9,2,3,8,5,1];
			MERGESORT(A, 0, A.length-1);
			assert.deepStrictEqual(A, [1,2,3,5,8,9]);
		});

		it("Sorts an array of non-unique elements", function() {
			let A = [9,2,3,8,8,5,1,1];
			MERGESORT(A, 0, A.length-1);
			assert.deepStrictEqual(A, [1,1,2,3,5,8,8,9]);
		});
	});

	describe("Edge cases", function() {
		it("Sorts a minimally-sized array [2,1]", function() {
			let A = [2,1];
			MERGESORT(A, 0, A.length-1);
			assert.deepStrictEqual(A, [1,2]);
		});

		it("Leaves an already sorted array in a valid state", function() {
			let A = [4,5,6,7];
			MERGESORT(A, 0, A.length-1);
			assert.deepStrictEqual(A, [4,5,6,7]);
		});

		it("Leave an empty array in a valid state", function() {
			let A = [];
			MERGESORT(A, 0, 0);
			assert.deepStrictEqual(A, []);
		});
	});
});
