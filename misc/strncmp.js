
function strncmp(s1, s2, n) {
	let i = 0;
	let j = 0;

	if (n < 1)
		return 0;

	while (s1[i] != 0 && s1[j] != 0 && s1[i] == s2[j] && n > 0) {
		if (--n > 0) {
			i++, j++;
		}
	}

	return s1[i] - s2[j];
}

module.exports = strncmp;

