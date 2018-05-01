/**
 *  Returns the cartesian product of an arbitrary number of set-like objects.
 *  @param sets: vararg of N set-like objects
 *  @return array of N-element tuples
 */
function Cartes(...sets) {
	if (sets.length < 2) {
		return Array.from(sets[0]).map(e => [e]);
	} else {
		let lowerOrder = Cartes(...sets.slice(1));
		let retv = [];

		sets[0].forEach(e => {
			retv = [...retv, ...lowerOrder.map(p => p.concat(e))];
		});

		return retv;
	}

}


module ? (module.exports = Cartes) : undefined;

