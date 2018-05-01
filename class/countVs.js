
function countVs(str) {
	const cVowels = "aeiou";
	let retv = {};

	for (let v of cVowels)
		retv[v] = 0;

	for (let c of str)
		if (cVowels.includes(c))
			retv[c]++;

	return retv;
}

console.log(countVs('this is a test'));
console.log(countVs('another one'));

if (module !== undefined)
	module.exports = countVs;

