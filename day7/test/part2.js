const assert = require('assert');
const part2 = require('../part2/solution.js');

function clone(graph) {
	let map = new Map();
	graph.forEach((value, key) => {
		map.set(key, { inCount: value.inCount, out: value.out.slice() });
	});
	return map;
}

describe('Part 2', function() {
	describe('simulate()', function() {
		it('should return no time required of nothing', function() {
			testMap = new Map();

			assert.equal(part2.simulate(testMap, 0, () => {}), 0, 'there\'s nothing to do.');
			assert.equal(part2.simulate(testMap, 1, () => {}), 0, 'there\'s nothing to do even if there\'s a worker.');
			assert.equal(part2.simulate(testMap, 100, () => {}), 0, 'there\'s nothing to do even if all the workers in the world exist.');
		});

		it('should return correct time required of a chain', function() {
			testMap = new Map();
			testMap.set(1, { inCount: 1, out: [] });
			testMap.set(2, { inCount: 1, out: [1] });
			testMap.set(3, { inCount: 1, out: [2] });
			testMap.set(4, { inCount: 1, out: [3] });
			testMap.set(5, { inCount: 0, out: [4] });
			const duration = (job) => job;

			assert.equal(part2.simulate(clone(testMap), 1, duration), 15, 'incorrect time required on chain.');
			assert.equal(part2.simulate(clone(testMap), 2, duration), 15, 'incorrect time required on chain with 2 workers.');
			assert.equal(part2.simulate(clone(testMap), 100, duration), 15, 'incorrect time required on chain with all the workers in the world.');
		});

		it('should return correct time required of jobs that can have 2 parents when all jobs take the same amount of time', function() {
			testMap = new Map();
			testMap.set(1, { inCount: 2, out: [] });
			testMap.set(2, { inCount: 1, out: [1] });
			testMap.set(3, { inCount: 1, out: [1] });
			testMap.set(4, { inCount: 2, out: [2, 3] });
			testMap.set(5, { inCount: 0, out: [4] });
			testMap.set(6, { inCount: 0, out: [4] });
			const duration = (job) => 10;

			assert.equal(part2.simulate(clone(testMap), 1, duration), 60, 'incorrect time required because one worker cannot multitask.');
			assert.equal(part2.simulate(clone(testMap), 2, duration), 40, 'incorrect time required when worker has a buddy.');
			assert.equal(part2.simulate(clone(testMap), 3, duration), 40, 'incorrect time required when worker has a buddy and another useless buddy.');
			assert.equal(part2.simulate(clone(testMap), 100, duration), 40, 'incorrect time required when worker has a buddy and too many useless buddies.');
		});

		it('should return correct time required of jobs that can have 2 other job requirements when job time varies', function() {
			testMap = new Map();
			testMap.set(1, { inCount: 2, out: [] });
			testMap.set(2, { inCount: 1, out: [1] });
			testMap.set(3, { inCount: 1, out: [1] });
			testMap.set(4, { inCount: 2, out: [2, 3] });
			testMap.set(5, { inCount: 0, out: [4] });
			testMap.set(6, { inCount: 0, out: [4] });
			const duration = (job) => 3 + job;

			assert.equal(part2.simulate(clone(testMap), 1, duration), 39, 'incorrect time required because one worker cannot multitask.');
			assert.equal(part2.simulate(clone(testMap), 2, duration), 26, 'incorrect time required when worker has a buddy.');
			assert.equal(part2.simulate(clone(testMap), 3, duration), 26, 'incorrect time required when worker has a buddy and another useless buddy.');
			assert.equal(part2.simulate(clone(testMap), 100, duration), 26, 'incorrect time required when worker has a buddy and too many useless buddies.');

			testMap2 = new Map();
			testMap2.set(1, { inCount: 2, out: [] });
			testMap2.set(2, { inCount: 1, out: [1] });
			testMap2.set(3, { inCount: 1, out: [1] });
			testMap2.set(4, { inCount: 2, out: [2, 3] });
			testMap2.set(5, { inCount: 0, out: [4] });
			testMap2.set(6, { inCount: 0, out: [4] });
			const duration2 = (job) => 100 + job;

			assert.equal(part2.simulate(clone(testMap2), 1, duration2), 621, 'incorrect time required on long jobs because one worker cannot multitask.');
			assert.equal(part2.simulate(clone(testMap2), 2, duration2), 414, 'incorrect time required on long jobs when worker has a buddy.');
			assert.equal(part2.simulate(clone(testMap2), 3, duration2), 414, 'incorrect time required on long jobs when worker has a buddy and another useless buddy.');
			assert.equal(part2.simulate(clone(testMap2), 100, duration2), 414, 'incorrect time required on long jobs when worker has a buddy and too many useless buddies.');
		});

		it('should return correct time required of jobs done in a general DAG when all jobs take the same amount of time', function() {
			testMap = new Map();
			testMap.set(1, { inCount: 3, out: [] });
			testMap.set(2, { inCount: 1, out: [1] });
			testMap.set(3, { inCount: 2, out: [1] });
			testMap.set(4, { inCount: 1, out: [1] });
			testMap.set(5, { inCount: 1, out: [2, 3] });
			testMap.set(6, { inCount: 1, out: [3] });
			testMap.set(7, { inCount: 2, out: [5, 6] });
			testMap.set(8, { inCount: 0, out: [4, 7] });
			testMap.set(9, { inCount: 0, out: [7] });
			const duration = (job) => 5;

			assert.equal(part2.simulate(clone(testMap), 1, duration), 45, 'incorrect time required of a worker.');
			assert.equal(part2.simulate(clone(testMap), 2, duration), 25, 'incorrect time required of 2 workers.');
			assert.equal(part2.simulate(clone(testMap), 3, duration), 25, 'incorrect time required of 3 workers.');
			assert.equal(part2.simulate(clone(testMap), 100, duration), 25, 'NO! More workers seriously doesn\'t change anything.');
		});

		it('should return correct time required of jobs done in a general DAG when job time varies', function() {
			testMap = new Map();
			testMap.set(1, { inCount: 3, out: [] });
			testMap.set(2, { inCount: 1, out: [1] });
			testMap.set(3, { inCount: 2, out: [1] });
			testMap.set(4, { inCount: 1, out: [1] });
			testMap.set(5, { inCount: 1, out: [2, 3] });
			testMap.set(6, { inCount: 1, out: [3] });
			testMap.set(7, { inCount: 2, out: [5, 6] });
			testMap.set(8, { inCount: 0, out: [4, 7] });
			testMap.set(9, { inCount: 0, out: [7] });
			const duration = (job) => job;

			assert.equal(part2.simulate(clone(testMap), 1, duration), 45, 'incorrect time required of a worker.');
			assert.equal(part2.simulate(clone(testMap), 2, duration), 26, 'incorrect time required of 2 workers.');
			assert.equal(part2.simulate(clone(testMap), 3, duration), 26, 'incorrect time required of 3 workers.');
			assert.equal(part2.simulate(clone(testMap), 100, duration), 26, 'NO! More workers seriously doesn\'t change anything.');

			testMap2 = new Map();
			testMap2.set(1, { inCount: 3, out: [] });
			testMap2.set(2, { inCount: 1, out: [1] });
			testMap2.set(3, { inCount: 2, out: [1] });
			testMap2.set(4, { inCount: 1, out: [1] });
			testMap2.set(5, { inCount: 1, out: [2, 3] });
			testMap2.set(6, { inCount: 1, out: [3] });
			testMap2.set(7, { inCount: 2, out: [5, 6] });
			testMap2.set(8, { inCount: 0, out: [4, 7] });
			testMap2.set(9, { inCount: 0, out: [7] });
			const duration2 = (job) => 100 + job;

			assert.equal(part2.simulate(clone(testMap2), 1, duration2), 945, 'incorrect time required on long jobs of a worker.');
			assert.equal(part2.simulate(clone(testMap2), 2, duration2), 526, 'incorrect time required on long jobs of 2 workers.');
			assert.equal(part2.simulate(clone(testMap2), 3, duration2), 526, 'incorrect time required on long jobs of 3 workers.');
			assert.equal(part2.simulate(clone(testMap2), 100, duration2), 526, 'NO! More workers seriously doesn\'t change anything on long jobs.');
		});

		it('should return correct time required of jobs done in disconnected DAGs when all jobs take the same amount of time', function() {
			testMap = new Map();
			testMap.set(1, { inCount: 2, out: [] });
			testMap.set(2, { inCount: 1, out: [1] });
			testMap.set(3, { inCount: 1, out: [1] });
			testMap.set(4, { inCount: 3, out: [] });
			testMap.set(5, { inCount: 0, out: [2, 3] });
			testMap.set(6, { inCount: 0, out: [4, 7, 8] });
			testMap.set(7, { inCount: 1, out: [4] });
			testMap.set(8, { inCount: 1, out: [4] });
			const duration = (job) => 3;

			assert.equal(part2.simulate(clone(testMap), 1, duration), 24, 'incorrect time required of a worker.');
			assert.equal(part2.simulate(clone(testMap), 2, duration), 15, 'incorrect time required of 2 workers.');
			assert.equal(part2.simulate(clone(testMap), 3, duration), 12, 'incorrect time required of 3 workers.');
			assert.equal(part2.simulate(clone(testMap), 4, duration), 9, 'incorrect time required of 4 workers.');
			assert.equal(part2.simulate(clone(testMap), 5, duration), 9, 'incorrect time required of 5 workers.');
			assert.equal(part2.simulate(clone(testMap), 100, duration), 9, 'incorrect time required of all the workers in the world.');
		});

		it('should return correct time required of jobs done in disconnected DAGs when job time varies', function() {
			testMap = new Map();
			testMap.set(1, { inCount: 2, out: [] });
			testMap.set(2, { inCount: 1, out: [1] });
			testMap.set(3, { inCount: 1, out: [1] });
			testMap.set(4, { inCount: 3, out: [] });
			testMap.set(5, { inCount: 0, out: [2, 3] });
			testMap.set(6, { inCount: 0, out: [4, 7, 8] });
			testMap.set(7, { inCount: 1, out: [4] });
			testMap.set(8, { inCount: 1, out: [4] });
			const duration = (job) => job;

			assert.equal(part2.simulate(clone(testMap), 1, duration), 36, 'incorrect time required of a worker.');
			assert.equal(part2.simulate(clone(testMap), 2, duration), 22, 'incorrect time required of 2 workers.');
			assert.equal(part2.simulate(clone(testMap), 3, duration), 19, 'incorrect time required of 3 workers.');
			assert.equal(part2.simulate(clone(testMap), 4, duration), 18, 'incorrect time required of 4 workers.');
			assert.equal(part2.simulate(clone(testMap), 5, duration), 18, 'incorrect time required of 5 workers.');
			assert.equal(part2.simulate(clone(testMap), 100, duration), 18, 'incorrect time required of all the workers in the world.');

			testMap2 = new Map();
			testMap2.set(1, { inCount: 2, out: [] });
			testMap2.set(2, { inCount: 1, out: [1] });
			testMap2.set(3, { inCount: 1, out: [1] });
			testMap2.set(4, { inCount: 3, out: [] });
			testMap2.set(5, { inCount: 0, out: [2, 3] });
			testMap2.set(6, { inCount: 0, out: [4, 7, 8] });
			testMap2.set(7, { inCount: 1, out: [4] });
			testMap2.set(8, { inCount: 1, out: [4] });
			const duration2 = (job) => 100 + job;

			assert.equal(part2.simulate(clone(testMap2), 1, duration2), 836, 'incorrect time required on long jobs of a worker.');
			assert.equal(part2.simulate(clone(testMap2), 2, duration2), 522, 'incorrect time required on long jobs of 2 workers.');
			assert.equal(part2.simulate(clone(testMap2), 3, duration2), 419, 'incorrect time required on long jobs of 3 workers.');
			assert.equal(part2.simulate(clone(testMap2), 4, duration2), 318, 'incorrect time required on long jobs of 4 workers.');
			assert.equal(part2.simulate(clone(testMap2), 5, duration2), 318, 'incorrect time required on long jobs of 5 workers.');
			assert.equal(part2.simulate(clone(testMap2), 100, duration2), 318, 'incorrect time required on long jobs of all the workers in the world.');
		});

		it('should return correct time required of jobs in sample case', function() {
			testMap = new Map();
			testMap.set('E', { inCount: 3, out: [] });
			testMap.set('A', { inCount: 1, out: ['B', 'D'] });
			testMap.set('C', { inCount: 0, out: ['A', 'F'] });
			testMap.set('B', { inCount: 1, out: ['E'] });
			testMap.set('F', { inCount: 1, out: ['E'] });
			testMap.set('D', { inCount: 1, out: ['E'] });
			const duration = (job) => job.charCodeAt(0) - 'A'.charCodeAt(0) + 1;

			assert.equal(part2.simulate(testMap, 2, duration), 15, 'incorrect time required on jobs of sample case.');
		});

		it('should throw error on a cycle', function() {
			testMap = new Map();
			testMap.set(1, { inCount: 2, out: [4] });
			testMap.set(2, { inCount: 1, out: [1] });
			testMap.set(3, { inCount: 1, out: [2] });
			testMap.set(4, { inCount: 1, out: [3] });
			testMap.set(5, { inCount: 0, out: [1] });

			assert.throws(() => { part2.simulate(testMap, 1, (job) => job); }, {
				name: 'Error',
				message: 'graph has at least one cycle or badly constructed graph'
			});
		});

		it('should throw error on a badly constructed graph', function() {
			testMap = new Map();
			testMap.set(1, { inCount: 2, out: [] });
			testMap.set(2, { inCount: 1, out: [1] });
			testMap.set(3, { inCount: 1, out: [2] });
			testMap.set(4, { inCount: 1, out: [3] });
			testMap.set(5, { inCount: 0, out: [1] });

			assert.throws(() => { part2.simulate(testMap, 1, (job) => job); }, {
				name: 'Error',
				message: 'graph has at least one cycle or badly constructed graph'
			});
		});

		it('should throw error on having no workers', function() {
			testMap = new Map();
			testMap.set(1, { inCount: 2, out: [] });
			testMap.set(2, { inCount: 1, out: [1] });
			testMap.set(3, { inCount: 1, out: [2] });
			testMap.set(4, { inCount: 0, out: [3] });
			testMap.set(5, { inCount: 0, out: [1] });

			assert.throws(() => { part2.simulate(testMap, 0, (job) => job); }, {
				name: 'Error',
				message: 'no workers to do work'
			});
		});
	});
});
