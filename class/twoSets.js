
let Range = require("../numeric-lib/range");

function twoSets(setA, setB) {
	let upperBound = setB.reduce((acc, e) => e > acc ? e : acc, -Infinity) / 2;
	return Range(1, upperBound).filter(e => {
		for (let n of setA)
			if (e < n || e % n != 0)
				return false;
		for (let n of setB)
			if (n % e != 0)
				return false;
		return true;
	});
}

console.log(twoSets([2,4], [16,32,96]));

