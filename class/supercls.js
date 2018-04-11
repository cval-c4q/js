/**
 *   Demo JavaScript manually implemented prototype-based polymorphism
 */

function Shape(id) { // Shape `class' constructor
	this.ShapeID = id;
}

Shape.prototype.describe = function() {
	console.assert(this.vCall !== undefined);
	console.assert(typeof this.vCall === 'function');
	console.log(this.ShapeID, ':', this.vCall());
}

// Base class vCall
Shape.prototype.vCall = function() { throw new Error("<GENERIC VCALL>"); }

/**
 *  Rect `class' constructor */
function Rect(id, x=0, y=0, w=64, h=64) {
	console.assert(id);

	Shape.call(this, id); // super()
	Object.defineProperty(this, 'constructor', { value: Rect }); // toString()
	this.vCall = function() {
		return `Rectangle: ${w}x${h} @(${x},${y})`;
	}
}

// instanceof
Rect.prototype = Object.create(Shape.prototype);

function Circle(id, x=128, y=128, radius=64) {
	console.assert(id);

	Shape.call(this, id); // super()
	Object.defineProperty(this, 'constructor', { value: Circle}); // toString()
	this.vCall = function() {
		return `Circle of radius ${radius} @(${x},${y})`;
	}
}

Circle.prototype = Object.create(Shape.prototype);

function ImproperVirt(id) {
	Shape.call(this, id);
}
Object.assign(ImproperVirt.prototype, Shape.prototype);


var r = new Rect('rect01');
var c = new Circle('circle01');

r.describe();
c.describe();

var i = new ImproperVirt('Incomplete');
try {
	i.describe(); // GENERIC 'vCall'
} catch (e) {
	console.log("ImporoperlyDerivedCls: Base class vCall:", e);
}

module.exports = {
	Shape,
	Rect,
	Circle,
};

