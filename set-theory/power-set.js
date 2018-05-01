/**
 *  Computes and returns the power set of a given iterable object
 */

const arrEq = (arr1, arr2) => {
	var i;
	for (i = 0; i < arr1.length && i < arr2.length; i++)
		if (arr1[i] !== arr2[i])
			break;
	return arr1[i] == arr2[i];
}

function Power(set)
{
	let retv = [];

	if (set.length) {
		retv.push(set);
		set.forEach((e, idx) => {
			retv = [...Power([...set.slice(0,idx), ...set.slice(idx+1)]), ...retv];
		});
	} else {
		retv.push([]);
	}

	return retv.filter((e, idx, arr) => {
		for (let i = idx-1; i >= 0; i--)
			if (arrEq(arr[i], e))
				return false;
		return true;
	});
}

module ? (module.exports = Power) : undefined;

