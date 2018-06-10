const assert = require('assert');

describe('Init', function() {
	it('should return class', function() {
		const Blackhole = require('./index.js');
		assert.ok(typeof Blackhole === 'function');
	});

	it('should create new object', function() {
		const Blackhole = require('./index.js');
		assert.ok(typeof new Blackhole === 'object');
	});
});

describe('Proxy existing object', function() {

	const Blackhole = require('./index.js');

	const obj = {
		demo: 'demo',
		object: 'source object',
		to: 2,
		demostrate: 'demostrate',
		nested: {
			obj: 'to show deep'
		}
	};

	it('should contain same data as input obj', function() {
		const bh = new Blackhole(obj);
		assert.strictEqual(bh.demo, obj.demo);
	});

	it('should not overwrite property', function() {
		const bh = new Blackhole(obj);

		bh.object = 'changed property';
		assert.strictEqual(bh.object, 'source object');
	});

	it('should not overwrite deep property', function() {
		const bh = new Blackhole(obj);

		bh.nested.obj = 'changed nested obj';
		assert.strictEqual(bh.nested.obj, 'to show deep');
	});
});

describe('Set/Get properties', function() {
	const Blackhole = require('./index.js');
	const bh = new Blackhole;

	it('should set number', function() {
		bh.three = 3
	});

	it('should return proper value "3"', function() {
		assert.strictEqual(bh.three, 3);
	});

	it('should set string', function() {
		bh.a = 'A'
	});

	it('should return proper value "A"', function() {
		assert.strictEqual(bh.a, 'A');
	});

	it('should not overwrite number', function() {
		bh.three = 4;
		assert.strictEqual(bh.three, 3);
	});

	it('should not overwrite string', function() {
		bh.a = 'B';
		assert.strictEqual(bh.a, 'A');
	});
});

describe('Deep Set/Get properties', function() {
	const Blackhole = require('./index.js');
	const bh = new Blackhole;
	const o = {
		c: 'C',
		d: 19,
		e: {
			i: 'Î'
		},
		5: 0
	};
	const a = [1,4,6,'?','Cosmos', {t:'test'}];
	a.t = 'A T';

	it('should set an object', function() {
		bh.obj = o;
	});

	it('should return same obj', function() {
		assert.deepStrictEqual(bh.obj, o);
	});

	it('should set an array', function() {
		bh.arr = a;
	});

	it('should return same array', function() {
		assert.deepStrictEqual(bh.arr, a);
	});

	it('should not overwrite obj', function() {
		bh.obj.c = 'D';
		bh.obj.d = 20;
		bh.obj.e.i = 'Ï';
		bh.obj[5] = 5;
		assert.deepStrictEqual(bh.obj, o);
	});

	it('should not overwrite array', function() {
		bh.arr[0] = 3;
		bh.arr[1] = 3;
		bh.arr[2] = 3;
		assert.deepStrictEqual(bh.arr, a);
	});
});

