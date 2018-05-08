/**
 *
 *   Desk calculator
 *   Author: <carlovalenti@ac.c4q.nyc>
 *
 *   Polynomial expression evaluator and REPL interface
 */

// const getopts = require("getopts");
const readline = require("readline").createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: "> ",
});

const evalLine = require("./eval");

/**
 *  main REPL
 */
readline.prompt();
readline.on("line", (line) => {
	let retv = evalLine(line);
	if (retv !== undefined)
		console.log(retv);
	readline.prompt();
});

