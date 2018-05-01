
function sortFunc(str) {
	const swap = (arr, i, j) => {
		const tmp = arr[i];
		arr[i] = arr[j];
		arr[j] = tmp;
	};

	return (function qsort(arr, m, n) {
		if (m < n) {
			let k = (m+n)/2 | 0;
			swap(arr, m, k);
			for (let i = (k=m))+1; i <= n; i++)
				if (arr[i] < arr[m])
					swap(arr, i, ++k);
			swap(arr, m, k);
			qsort(arr, m, k-1);
			qsort(arr, k+1, n);

			return arr;
		}
	})(str.split(""), 0, str.length-1)
		.join("");
}

[
	"bananas",
	"TheQuickBrownFox"
].forEach(s => {
	console.log(`'${s}' => '${sortFunc(s)}'`);
	console.assert(sortFunc(s) == s.split("").sort().join(""));
});

