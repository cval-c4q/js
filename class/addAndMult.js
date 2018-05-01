const addAndMult = (arr) => arr.reduce((acc, n) => {
	acc.sum += n;
	acc.product *= n;
	return acc;
}, { sum: 0, product: 1 });



Promise.all([
	addAndMult([1, 2, 3, 4, 5]), // returns {'sum': 15, 'product': 120}
	addAndMult([10, 10, 10]), // returns {'sum': 30, 'product': 1000}
]).then(a => a.forEach(e => console.log(e)));


