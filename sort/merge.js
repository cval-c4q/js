/**
 *   Procedure combines two already sorted adjacent sub-arrays
 *   A[p..q] and A[q+1..r] (having p <= q < r), onto
 *   and in place of current array range A[p..r].
 */
function MERGE(A, p, q, r) {
	let L = A.slice(p, q+1);
	let R = A.slice(q+1, r+1);

	for (let k = p; k <= r; k++)
		if (L.length == 0) {
			A[k] = R.shift();
		} else if (R.length == 0) {
			A[k] = L.shift();
		} else {
			if (L[0] < R[0])
				A[k] = L.shift();
			else
				A[k] = R.shift();
		}

	return A;
}

function MERGESORT(A, p, r) {
	const q = (p + r) / 2 | 0;
	if (p < r) {
		MERGESORT(A, p, q);
		MERGESORT(A, q+1, r);
		MERGE(A, p, q, r);
	}
}

if (typeof module !== "undefined")
	module.exports = {
		MERGE,
		MERGESORT,
	};

