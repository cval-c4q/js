/**
 *  Given an array of numbers, write a function shiftZeros that will reset the
 *  array to put all the non-zero numbers in front of all the zeros in the
 *  array, then return the new array and the count of non-zero numbers.
 *
 *  XXX: shiftZeros([3,0,2,0,0,1,0,4]) // returns [3,2,1,4,0,0,0,0], 4
 *       Javascript won't return compound values as in Golang for ex.
 */


function shiftZeroes(arr) {
	let zeroes = [];
	arr = arr.filter(e => {
		if (e)
			zeroes.push(0);
		return e;
	});
	return {
		array: arr.concat(zeroes),
		count: zeroes.length,
	};
}

console.log(shiftZeroes([3,0,2,0,0,1,0,4]));

