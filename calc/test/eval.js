
const assert = require("assert");
const evalLine = require("../eval.js");

describe("evaluating arithmetic expressions, no variables", function() {
	it("arithmetic, no parens, same precedence level", function() {
		assert.deepStrictEqual([
			evalLine("1+2"),
			evalLine("1+2+3"),
			evalLine("-20e-2-20"),
			evalLine(".5^.5").toPrecision(3),
			evalLine("42 % 13"),
		], [
			3,
			6,
			-20.2,
			'0.707',
			3,
		]);
	});

	it("arithmetic, no parens, mixed precendence levels", function() {
		assert.deepStrictEqual([
			evalLine("1+2*3"),
			evalLine("4*3*2+1"),
			evalLine("1+2-3*4%5^6"),
		], [
			7,
			25,
			-9
		]);
	});

	it("arithmetic, parenthesized, mixed precendence levels", function() {
		assert.deepStrictEqual([
			evalLine("(1+2)*3"),
			evalLine("1+((2-3)*4)%5"),
		], [
			9,
			-3
		]);
	});

	describe("edge cases", function() {
		it("empty expression", function() {
			assert.equal(evalLine(""), undefined);
		});

		it("superflous (balanced) parentheses", function() {
			assert.equal(evalLine("(((1+2)))"), 3);
		});
	});
});

