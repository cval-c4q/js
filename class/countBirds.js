
function countBirds(arr) {
	let tally = new Map();

	arr.forEach(birdID => tally.set(birdID, tally.has(birdID) ? tally.get(birdID) + 1 : 0));

	let maxtype = [ 0, -1 ];
	for (let type of tally.entries())
		if (type[1] > maxtype[1] || type[1] == maxtype[1] && type[0] < maxtype[0])
			maxtype = type;

	return maxtype[0];
}

console.log(countBirds([1, 4, 4, 4, 5, 3]));

