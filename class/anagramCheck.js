
function anagramCheck(str1, str2) {
	str1 = str1.toUpperCase().split("").filter(c => /[A-Z]/.test(c)).sort();
	str2 = str2.toUpperCase().split("").filter(c => /[A-Z]/.test(c)).sort();
	// return str1.join("") == str2.join("");
	let i = 0;
	while (str1[i] == str2[i] && str1[i] != undefined)
		i++;
	return str1[i] == str2[i];
}

console.log(anagramCheck('William Shakespeare', 'I am a weakish speller'));
console.log(anagramCheck('Silliam Whakespeare', 'I am a weakish speller'));
console.log(anagramCheck('Wil1iam Chakespeare', 'I am a weakish speller'));
console.log(anagramCheck('Wllm Chkspr', 'I am a weakish speller'));
