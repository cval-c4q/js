/**
 *
 *   Desk calculator
 *   Author: <carlovalenti@ac.c4q.nyc>
 *
 *   Polynomial expression evaluator and REPL interface
 */


/**
 *  Global state
 */
const state = {
	symTable: new Map(),
};


/**
 *  Lex
 */
const	TOKEN_NUMERIC = Symbol("Numeric"),
	TOKEN_OPERATOR = Symbol("Operator"),
	TOKEN_IDENTIFIER = Symbol("Identifier"),
	TOKEN_LPARENS = Symbol("LParens"),
	TOKEN_RPARENS = Symbol("RParens"),
	TOKEN_DELIM = Symbol("Delim"),
	TOKEN_EQUALS = Symbol("Equals"),
	TOKEN_UNKNOWN = Symbol("UNKNOWN");

const re_NUMERIC = /((([0-9]+)?\.[0-9]+)|([0-9]+(\.([0-9]+)?)?))([Ee][+\-]?[0-9]+)?/;
const re_OPERATOR = /[+\-*\/%\^]/;
const re_EQUALS = /=/;
const re_LPARENS = /\(/;
const re_RPARENS = /\)/;
const re_IDENTIFIER = /[A-Za-z_]([A-Za-z0-9_]+)?/;
const re_DELIM = /;/;
const re_REST = /[^ \t]/;

function tokenizeLine(line) {
	const re_MASTER = new RegExp(re_NUMERIC.source + "|" +
	re_OPERATOR.source + "|" + re_IDENTIFIER.source + "|" +
		re_LPARENS.source + "|" + re_RPARENS.source + "|" +
		re_EQUALS.source + "|" + re_DELIM.source + "|" +
		re_REST.source, "g");
	let retv = [];

	let m;
	while (m = re_MASTER.exec(line)) {
		const tok = m[0];
		retv.push({
			type: re_NUMERIC.test(tok) ? TOKEN_NUMERIC :
				re_OPERATOR.test(tok) ? TOKEN_OPERATOR :
				re_IDENTIFIER.test(tok) ? TOKEN_IDENTIFIER :
				re_LPARENS.test(tok) ? TOKEN_LPARENS :
				re_RPARENS.test(tok) ? TOKEN_RPARENS :
				re_DELIM.test(tok) ? TOKEN_DELIM :
				re_EQUALS.test(tok) ? TOKEN_EQUALS :
				/* Everything else: */ TOKEN_UNKNOWN,
			value: tok,
		});
	}

	return retv;
}

/**
 * Parse, grammar:
 *
 * STMT	:=	EXPR
 *		| ID, [OP], "=", EXPR
 *		| STMT, ";", STMT
 * ID	:=	/[A-Za-z_]/, {/[A-Za-z0-9_]/}
 * OP	:=	"+" | "-" | "*" | "/" | "%"
 * EXPR	:=	| ["+"|"-"], positive-numeric-literal
 *		| ID
 *		| EXPR, OP, EXPR
 *		| "(", EXPR, ")"
 */


/**
 *  Evaluate: tokenizes then recusively starts interpreting statement(s)
 *  Recursive descent parsing passes its operands down in a non-destructive
 *  manner: the intermediate/temporary copies on the call stack are mutated
 *  but the original is not.
 *
 *  The descent functions all return their result in the standard format of
 *  [return-value, [ rest-of-tokens ]]
 *
 *  A return-value value of undefined generally indicates error.  A non-empty
 *  rest-of-tokens is a generated list of tokens suitable to continue
 *  evaluating the rest of the expression/statement from the level that made
 *  the recursive call.
 */
function evalLine(line) {
	line = line.trim();
	if (line.length == 0)
		return;
	let tokens = tokenizeLine(line);
	if (tokens.length == 0)
		return undefined;
	else
		return stmt(tokens.slice(1), tokens[0])[0];
}

const opPrecedence = {
	"+": 1,
	"-": 1,
	"*": 2,
	"/": 2,
	"%": 2,
	"^": 3,
};

function execOp(opA, op, opB) {
	if (typeof opA == "string")
		opA = Number.parseFloat(opA);
	if (typeof opB == "string")
		opB = Number.parseFloat(opB);
	switch (op) {
		case '+':
			return opA + opB;
		case '-':
			return opA - opB;
		case '*':
			return opA * opB;
		case '/':
			return opA / opB;
		case '%':
			return opA % opB;
		case '^':
			return opA ** opB;
	}
}

if (typeof DEBUG !== "function") {
	DEBUG = (...args) => {
		if (typeof process !== "undefined" && process.env && process.env.VERBOSE
			|| typeof window !== "undefined" && window.VERBOSE
			|| typeof global !== "undefined" && global.VERBOSE)
			console.log(...args);
	}
}

function expr(tokens, tok, precedenceLevel=0, parensLevel=0) {
	spFMT = () => "   ".repeat(parensLevel);

	DEBUG(spFMT()+"+TRACE: expr: precLevel: %d, parensLevel: %d", precedenceLevel, parensLevel);
	DEBUG(spFMT()+"        expr: tok:", tok.value, ", tokens:", tokens.map(t=>t.value));
	if (tok.type == TOKEN_LPARENS) {
		let retv = expr(tokens.slice(1), tokens[0], 0, parensLevel+1);
		// Maintain balance of parens
		if (retv[1][0] === undefined || retv[1][0].type !== TOKEN_RPARENS) {
			console.log(`Unmatched left parenthesis (@level ${parensLevel+1})`);
			return [undefined, tokens];
		}

		// Plug back result of parenthesized expression and resume evaluation
		retv[1].shift();
		if (retv[0] == undefined || retv[1].length < 1) {
			// end of expression or error
			return retv;
		}
		return expr(retv[1], { type: TOKEN_NUMERIC, value: retv[0] }, precedenceLevel, parensLevel);
	} else if (tok.type == TOKEN_OPERATOR) { // "+" | "-", etc...
		let numTok = {};

		if (tokens.length == 0) {
			console.log("Syntax error: incomplete expression.");
			return [undefined, tokens];
		} else if (tokens[0].type == TOKEN_IDENTIFIER) {
			if (state.symTable.has(tokens[0].value) == false) {
				console.log("Error: referencing undefined variable '%s'", tokens[0].value);
				return [undefined, tokens];
			}
			numTok.value = state.symTable.get(tokens[0].value);
			numTok.type = TOKEN_NUMERIC;
		} else if (tokens[0].type == TOKEN_NUMERIC) {
			numTok.value = tokens[0].value;
			numTok.type = TOKEN_NUMERIC;
		}

		numTok.value *= tok.value == "+" ? 1 : -1;
		return expr(tokens.slice(1), numTok);
	} else { // Not an operator or lparens
		let tokValue;

		// Fetch variable from symbol table if needed
		if (tok.type == TOKEN_IDENTIFIER) {
			if (state.symTable.has(tok.value) == false) {
				console.log("Error: referencing undefined variable '%s'", tok.value);
				return [undefined, tokens];
			} else
				tokValue = state.symTable.get(tok.value);
		} else
			tokValue = tok.value;

		while (tokens.length > 0 && tokens[0].type == TOKEN_OPERATOR) {
			/* Recurse over any terms left */
			const prec = opPrecedence[tokens[0].value];
			if (prec <= precedenceLevel) {
				/* For lower precedence levels, return, also for same precedence for left-to-right associativity */
				break;
			} else {
				let opB, op = tokens[0].value;
				if (tokens.length < 2) {
					console.log("Error: insufficient operands to operation '%s'", op);
					return [undefined, tokens];
				}
				[ opB, tokens ] = expr(tokens.slice(2), tokens[1], prec, parensLevel);
				tokValue = execOp(tokValue, op, opB);
			}
		}

		// Handle explicit parenthesizing
		// XXX: specialized checking for extra )) here? currently left to stmt()
		if (tokens.length > 0 && tokens[0].type == TOKEN_RPARENS) {
			// Preserve rparens and return to caller for balance checking purposes
			DEBUG(spFMT()+"RPAR: tok: ",tok, ", tokens:", tokens.map(t=>t.value));
		}

		DEBUG(spFMT()+"-TRACE: expr: precLevel: %d, parensLevel: %d", precedenceLevel, parensLevel);
		DEBUG(spFMT()+"        expr: tokens:", tokens.map(t=>t.value), ", tokValue:", tokValue);

		return [tokValue, tokens];
	}
}

/**
 * TODO
 */
function assign(tokens, tok) {
	return [tok, tokens];
}

function stmt(tokens, tok) {
	let retv;

	while (tokens.length > 0 || tok != undefined) {
		/* Statement delim, ";" */
		if (tok.type == TOKEN_DELIM) {
			tok = tokens[0];
			tokens = tokens.slice(1);
			continue;
		}
		/* Expressions */
		else if (tok.type == TOKEN_OPERATOR && (tok.value == "+" || tok.value == "-") // (+/-) must initiate an expr
			|| tok.type == TOKEN_NUMERIC	// numeric token is start of an expr
			|| tok.type == TOKEN_IDENTIFIER && // identifier...
			!(tokens.length > 1 && tokens[0].type == TOKEN_OPERATOR &&
				tokens[1].type == TOKEN_EQUALS // ...but not an 'ID [OP]=<...>'
				|| tokens.length > 0 && tokens[0].type == TOKEN_EQUALS) // ...or an 'ID=<...>'
			|| tok.type == TOKEN_LPARENS) // an explicit left parenthesis
		{
			retv = expr(tokens, tok);

		}
		/* Assignment statements */
		else if (tok.type == TOKEN_IDENTIFIER &&
			(tokens.length > 1 && tokens[0].type == TOKEN_OPERATOR && tokens[1].type == TOKEN_EQUALS
				|| tokens.length > 0 && tokens[0].type == TOKEN_EQUALS)) {
			retv = assign(tokens, tok)
		} else {
			console.log("Syntax error: Invalid statement starting with '%s'.", tok.value);
			return [undefined];
		}

		/* mutli-statement line, shift state for next iteration */
		if (retv[1] !== undefined) {
			tokens = retv[1];
			tok = tokens[0];
			tokens = tokens.slice(1);
		}
	}

	return retv;
}

if (module)
	module.exports = evalLine;

