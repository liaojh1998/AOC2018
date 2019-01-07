const assert = require('assert');
const part1 = require('../part1/solution.js');

describe('Part 1', function() {
	describe('topologicalSortWithElementsOrdering()', function() {
		it('should return a sorted order of nothing', function() {
			testMap = new Map();

			assert.deepEqual(part1.topologicalSortWithElementsOrdering(testMap), [], 'there\'s something returned from sort.');
		});

		it('should return a sorted order of ordered elements in a chain', function() {
			testMap = new Map();
			testMap.set(1, { inCount: 1, out: [] });
			testMap.set(2, { inCount: 1, out: [1] });
			testMap.set(3, { inCount: 1, out: [2] });
			testMap.set(4, { inCount: 1, out: [3] });
			testMap.set(5, { inCount: 0, out: [4] });

			assert.deepEqual(part1.topologicalSortWithElementsOrdering(testMap), [5, 4, 3, 2, 1], 'incorrectly ordered chain.');
		});

		it('should return a sorted order of ordered elements where elements can have 2 parents', function() {
			testMap = new Map();
			testMap.set(1, { inCount: 2, out: [] });
			testMap.set(2, { inCount: 1, out: [1] });
			testMap.set(3, { inCount: 1, out: [1] });
			testMap.set(4, { inCount: 2, out: [2, 3] });
			testMap.set(5, { inCount: 0, out: [4] });
			testMap.set(6, { inCount: 0, out: [4] });

			assert.deepEqual(part1.topologicalSortWithElementsOrdering(testMap), [5, 6, 4, 2, 3, 1], 'incorrectly ordered 2-parent DAG.');
		});

		it('should return a sorted order of ordered elements of a general DAG', function() {
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

			assert.deepEqual(part1.topologicalSortWithElementsOrdering(testMap), [8, 4, 9, 7, 5, 2, 6, 3, 1], 'incorrectly ordered general DAG.');
		});

		it('should return a sorted order of disconnected DAGs', function() {
			testMap = new Map();
			testMap.set(1, { inCount: 2, out: [] });
			testMap.set(2, { inCount: 1, out: [1] });
			testMap.set(3, { inCount: 1, out: [1] });
			testMap.set(4, { inCount: 3, out: [] });
			testMap.set(5, { inCount: 0, out: [2, 3] });
			testMap.set(6, { inCount: 0, out: [4, 7, 8] });
			testMap.set(7, { inCount: 1, out: [4] });
			testMap.set(8, { inCount: 1, out: [4] });

			assert.deepEqual(part1.topologicalSortWithElementsOrdering(testMap), [5, 2, 3, 1, 6, 7, 8, 4], 'incorrectly ordered disconnected DAGs.');
		});

		it('should return a sorted order of sample case', function() {
			testMap = new Map();
			testMap.set('E', { inCount: 3, out: [] });
			testMap.set('A', { inCount: 1, out: ['B', 'D'] });
			testMap.set('C', { inCount: 0, out: ['A', 'F'] });
			testMap.set('B', { inCount: 1, out: ['E'] });
			testMap.set('F', { inCount: 1, out: ['E'] });
			testMap.set('D', { inCount: 1, out: ['E'] });

			assert.deepEqual(part1.topologicalSortWithElementsOrdering(testMap), ['C', 'A', 'B', 'D', 'F', 'E'], 'incorrectly ordered sample case DAG.');
		});

		it('should throw error on a cycle', function() {
			testMap = new Map();
			testMap.set(1, { inCount: 2, out: [4] });
			testMap.set(2, { inCount: 1, out: [1] });
			testMap.set(3, { inCount: 1, out: [2] });
			testMap.set(4, { inCount: 1, out: [3] });
			testMap.set(5, { inCount: 0, out: [1] });

			assert.throws(() => { part1.topologicalSortWithElementsOrdering(testMap); }, {
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

			assert.throws(() => { part1.topologicalSortWithElementsOrdering(testMap); }, {
				name: 'Error',
				message: 'graph has at least one cycle or badly constructed graph'
			});
		});
	});

	describe('solve()', function() {
		it('should successfully solve sample input', function() {
			testInput = [
				{ from: 'C', to: 'A' },
				{ from: 'C', to: 'F' },
				{ from: 'A', to: 'B' },
				{ from: 'A', to: 'D' },
				{ from: 'B', to: 'E' },
				{ from: 'D', to: 'E' },
				{ from: 'F', to: 'E' }
			];

			assert.equal(part1.solve(testInput), 'CABDFE', 'incorrect answer for sample input.');
		});
	});
});
