/**
 *   hash2T Hash table with two synced, sorted arrays
 *   @module hash2T
 *
 *   Usage: var Hash2T = require('./hash2T.js');
 *          var h = new Hash2T();
 */

/**
 * Hash2T is an implementation of hash table using two arrays synced by index with keys
 * maintained in increasing order.
 * @class
 */
this.Hash2T = function()
{
	let keys = [], values = []

	/* Setter methods */
	/**
	 * set hash[key] to val
	 *
	 * @param key {any}  Key component of the associative table
	 * @param val {any}  Value associated with key
	 * @returns {undefined}
	 */
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

	/**
	 * unset deletes the key/value association from the hashtable
	 *
	 * @param key {any}    Key componenent of association to be unset
	 * @returns {undefined}
	 */
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
	/**
	 * get  retrieves value association with key, if any
	 *
	 * @param key {any}   Key componenent of the association
	 * @returns {any}  value if it exists, or undefined
	 */
	this.get = function(key) {
		return keys.indexOf(key) !== -1 ?
			values[keys.indexOf(key)] :
			undefined;
	}

	/**
	 * find   reverse-lookup to find key association with value, if any
	 *
	 * @param val {any}    Value to be searched for
	 * @returns {any}   First key in hash that matches value, if any
	 * TODO: take advantage of sort order
	 */
	this.find = function(val) {
		return values.indexOf(val) !== -1 ?
			keys[values.indexOf(val)] :
			undefined;
	}
}

module.exports = this.Hash2T;
