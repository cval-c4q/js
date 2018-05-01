function countIntegers(arr) {
	let tally = new Map();
	arr.forEach(n => tally.set(n, tally.has(n) ? tally.get(n) + 1 : 1));
	// convert to object form
	return Array.from(tally.entries()).map(e => new Object({ [e[0]]: e[1] }));
}

console.log(countIntegers([1, 1, 1, 1, 2, 2, 3, 3, 5]));
