
const handler = {
	deleteProperty: () => false
};

function proxyRecursively(obj) {
	if(typeof obj !== 'object')
		return obj;

	for(let i in obj)
		obj[i] = proxyRecursively(obj[i]);

	return new Proxy(obj, handler);
}

function set(recursive, target, key, value) {
	if(target.hasOwnProperty(key))
		return target[key];

	return target[key] = recursive ? proxyRecursively(value) : value;
}

class Blackhole {
	constructor (obj={}, options={}) {
		const {
			recursive = true,
			disabled = false
		} = options;

		if(disabled) return obj;

		handler.set = handler.defineProperty = set.bind(handler, recursive);

		if(recursive)
			return proxyRecursively(obj);
		else
			return new Proxy(obj, handler);
	}
}

module.exports = Blackhole;
