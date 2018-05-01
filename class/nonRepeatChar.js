function nonRepeatChar(str) {
	let tally = new Map();
	for (let c of str)
		tally.set(c, tally.has(c) ? tally.get(c) + 1 : 1);
	let retv = Array.from(tally.entries()).filter(entry => entry[1] == 1)[0];
	return retv ? retv[0][0] : undefined;
}

console.log(nonRepeatChar("aaabbccaddeefffcgkklll")); // g
console.log(nonRepeatChar("aaabbccaddeefffcggkklll")); // undefined
