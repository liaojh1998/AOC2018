const assert = require('assert');
const parser = require('../lib/parser.js');

describe('Parser', function() {
	describe('parser()', function() {
		it('should correctly parse input string', function() {
			str = "Step Q must be finished before step P can begin."
			assert.deepEqual(parser(str), { from: 'Q', to: 'P' }, 'incorrectly parsed input string.');
		});
	});
});
