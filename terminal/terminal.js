
/**
 *  @param {Object} paramObj - configuration for new terminal instance :
 *      paramObj {
 *          element: <HTMLElement>,
 *          rows: <Number>
 *          cols: <Number>
 *          prompt: <String>
 *      }
 *  TODO:
 *    * proper handling for horizental scrolling/long lines
 *    * line edition
 */
function Terminal(paramObj) {
	const blockCursor = '\u25A0';
	let buf = new Array(),
	    curLine = 1;

	/* Make sure terminal has valid dimensions, with a default of 80x25 */
	let rows = paramObj.rows ? Number(paramObj.rows) :
		paramObj.element.rows ? Number(paramObj.element.rows) : paramObj.element.rows = 25;
	let cols = paramObj.cols ? Number(paramObj.cols) :
		paramObj.element.cols ? Number(paramObj.element.cols) : paramObj.element.cols = 80;

	function update() {
		paramObj.element.innerHTML = buf.join('') + blockCursor;
	}

	/**
	 *  Discard the first line
	 */
	function scrollUp() {
		if (buf.length > 0) {
			let indexLF = buf.indexOf('\n');
			if (indexLF !== -1)
				buf.splice(0, indexLF+1);
		}
	}

	this.clear = function() {
		buf = new Array();
		update();
		curLine = 1;
	}

	this.log = function(str) {
		str.split('').forEach((c) => {
			if (c === '\n' || c === '\r') {
				if (curLine === rows) {
					scrollUp();
				} else
					curLine++;
			}
			buf.push(c);
		});
		update();
	}

	this.prompt = function() {
		this.log(paramObj.prompt);
	}

	this.backspace = function() {
		if (buf.length > 0)
			buf.pop();
		update();
	}
}

