/**
 *  Reverse polish notation calculator, using stack
 */

const Stack = require("./stack");
const rl = require("readline").createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: "> ",
});

let s = new Stack();

rl.prompt();
rl.on('line', (ln) => {
	ln.split(/[ \t]+/).forEach(tok => {
		if (/[+\-]?(([0-9]?\.[0-9]+)|([0-9]+(\.[0-9]?)?))/.test(tok)) { // Number
			s.push(Number(tok));
		} else if (/[+\-*\/]$/.test(tok)) {
			// 
			let opB = s.pop();
			let opA = s.pop();
			if (opB === undefined || opA === undefined) { // Operator
				console.error("Insufficient number of operands for operation");
				if (opB !== undefined)
					s.push(opB);
				return;
			}

			let result = tok == "+" ? opA + opB
				: tok == "-" ? opA - opB
				: tok == "*" ? opA * opB
				: tok == "/" ? opA / opB
				: console.assert("UNREACHEABLE");
			s.push(result);
		} else if (tok == "=") {
			let result = s.peek();
			console.log(result !== undefined ? result : "No result to display (empty stack).");
		} else {
			console.log("Unrecognized token: '" + tok + "'");
		}
	});
	rl.prompt();
});

