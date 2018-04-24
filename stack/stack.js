
class Stack {
	constructor() {
		let stackPtr = 0;
		this.push = (arg) => this[stackPtr++] = arg;
		this.pop = (arg) => stackPtr > 0 ? this[--stackPtr] : undefined;
		this.peek = () => stackPtr > 0 ? this[stackPtr-1] : undefined;
		Object.defineProperty(this, "size", { enumerable: true, get: () => stackPtr });
	}
}

if (typeof module !== "undefined")
	module.exports = Stack;

