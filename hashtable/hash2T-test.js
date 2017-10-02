
var Hash2T = require('./hash2T');

var h = new Hash2T();

h.set("HOME", "/home/user");
h.set("PATH", "/usr/bin:/usr/sbin");
h.set("UID", 1001);

console.assert(h.get("PATH") === "/usr/bin:/usr/sbin");
h.set("PATH", h.get("PATH") + ":/usr/local/bin");
console.assert(h.get("PATH") === "/usr/bin:/usr/sbin:/usr/local/bin");

h.unset("HOME");
console.assert(h.get("HOME") === undefined);

h.set("0UID", 1001);
console.assert(h.find(1001) === "0UID");

console.log("Hash2T: all tests passed.");

