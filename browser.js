var generatePrime = require('./generatePrime');
var primes = require('./primes.json');

var DH = require('./dh');

function DiffieHellmanGroup(mod) {
  var prime = new Buffer(primes[mod].prime, 'hex')
  var gen = new Buffer(primes[mod].gen, 'hex')

	return new DH(prime, gen);
}

function DiffieHellman(prime, enc, generator, genc) {
	if (Buffer.isBuffer(enc) || (typeof enc === 'string' && ['hex', 'binary', 'base64'].indexOf(enc) === -1)) {
		genc = generator;
		generator = enc;
		enc = undefined;
	}

	enc = enc || 'binary';
	genc = genc || 'binary';
	generator = generator || new Buffer([2]);

	if (!Buffer.isBuffer(generator)) {
		generator = new Buffer(generator, genc);
	}

	if (typeof prime === 'number') {
		return new DH(generatePrime(prime, generator), generator, true);
	}

	if (!Buffer.isBuffer(prime)) {
		prime = new Buffer(prime, enc);
	}

	return new DH(prime, generator, true);
}

exports.DiffieHellmanGroup = exports.createDiffieHellmanGroup = exports.getDiffieHellman = DiffieHellmanGroup;
exports.createDiffieHellman = exports.DiffieHellman = DiffieHellman;
