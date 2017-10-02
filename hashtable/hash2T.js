/**
 *   hash2T is implemented with index synced array with keys sorted in increasing order.
 *   Usage: var Hash2T = require('./hash2T.js');
 *          var h = new Hash2T();
 *   Interface:
 *          Hash2T.set(key,val)		// set hash[key] to val
 *          Hash2T.unset(key)		// delete hash[key] if any
 *          Hash2T.get(key)		// lookup hash[key]
 *          Hash2T.find(val)		// reverse lookup, returns first matching key
 */

function Hash2T()
{
	let keys = [], values = []

	/* Setter methods */
	this.set = function(key, val) {
		let i = 0;
		while (keys[i] !== undefined && keys[i] < key)
			i++;
		if (keys[i] === key) {
			values[i] = val; /* overwrite */
		} else {
			keys.splice(i, 0, key);
			values.splice(i, 0, val);
		}
		// console.log(keys, values);
	}

	this.unset = function(key) {
		let i = 0;
		while (keys[i] !== undefined && keys[i] != key)
			i++;
		if (keys[i] !== undefined) {
			keys.splice(i, 1);
			values.splice(i, 1);
		}
		// console.log(keys, values);
	}

	/* Accessor methods */
	this.get = function(key) {
		return keys.indexOf(key) !== -1 ?
			values[keys.indexOf(key)] :
			undefined;
	}

	this.find = function(val) {
		return values.indexOf(val) !== -1 ?
			keys[values.indexOf(val)] :
			undefined;
	}
}

module.exports = Hash2T;
