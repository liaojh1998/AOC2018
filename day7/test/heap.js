const assert = require('assert');
const heap = require('../lib/heap.js');

describe('Heap', function() {
	describe('#constructor()', function() {
		it('should construct a default heap with no arguments', function() {
			testHeap = new heap.Heap();
			assert.ok(typeof testHeap._less_than, 'function', '_less_than attribute of Heap should always be a function.');
			assert.equal(testHeap._array.length, 0, '_array attribute of Heap should be initalized as an empty Array.');
		});

		it('should construct a heap with a customized less_than comparison function', function() {
			testHeap = new heap.Heap((a, b) => a > b);
			assert.equal(typeof testHeap._less_than, 'function', '_less_than attribute of Heap should always be a function.');
			assert.equal(testHeap._array.length, 0, '_array attribute of Heap should be initalized as an empty Array.');
		});

		it('should throw error when given argument is not a function', function() {
			assert.throws(() => { new heap.Heap('string'); }, {
				name: 'Error', 
				message: 'Heap constructor accepts a function as an argument'
			});
			assert.throws(() => { new heap.Heap(1234); }, {
				name: 'Error', 
				message: 'Heap constructor accepts a function as an argument'
			});
			assert.throws(() => { new heap.Heap({}); }, {
				name: 'Error', 
				message: 'Heap constructor accepts a function as an argument'
			});
			assert.throws(() => { new heap.Heap([]); }, {
				name: 'Error', 
				message: 'Heap constructor accepts a function as an argument'
			});
		});
	});

	describe('#push()', function() {
		it('should successfully insert a new element from empty state', function() {
			testHeap = new heap.Heap();
			testHeap.push(0);
			assert.equal(testHeap._array[0], 0, 'Heap should successfully insert 0.');
			testHeap.push(1);
			assert.equal(testHeap._array[1], 1, 'Heap should successfully insert 1.');
			testHeap.push(34578);
			assert.equal(testHeap._array[2], 34578, 'Heap should successfully insert 34578.');
		}); 

		it('should successfully insert and sift up lesser elements', function() {
			testHeap = new heap.Heap();
			testHeap.push(234);
			assert.deepEqual(testHeap._array, [234], 'Heap should correctly insert 1st element.');
			testHeap.push(100);
			assert.deepEqual(testHeap._array, [100, 234], 'Heap should correctly insert 2nd element.');
			testHeap.push(150);
			assert.deepEqual(testHeap._array, [100, 234, 150], 'Heap should correctly insert 3rd element.');
			testHeap.push(57);
			assert.deepEqual(testHeap._array, [57, 100, 150, 234], 'Heap should correctly insert 4th element.');
			testHeap.push(70);
			assert.deepEqual(testHeap._array, [57, 70, 150, 234, 100], 'Heap should correctly insert 5th element.');
			testHeap.push(70);
			assert.deepEqual(testHeap._array, [57, 70, 70, 234, 100, 150], 'Heap should correctly insert 6th element.');
			testHeap.push(40);
			assert.deepEqual(testHeap._array, [40, 70, 57, 234, 100, 150, 70], 'Heap should correctly insert 7th element.');
			testHeap.push(100);
			assert.deepEqual(testHeap._array, [40, 70, 57, 100, 100, 150, 70, 234], 'Heap should correctly insert 8th element.');
		});

		it('should successfully use customized less_than to insert and sift up lesser elements', function() {
			testHeap = new heap.Heap((a, b) => a > b);
			testHeap.push(234);
			assert.deepEqual(testHeap._array, [234], 'Heap should correctly insert 1st element.');
			testHeap.push(100);
			assert.deepEqual(testHeap._array, [234, 100], 'Heap should correctly insert 2nd element.');
			testHeap.push(150);
			assert.deepEqual(testHeap._array, [234, 100, 150], 'Heap should correctly insert 3rd element.');
			testHeap.push(57);
			assert.deepEqual(testHeap._array, [234, 100, 150, 57], 'Heap should correctly insert 4th element.');
			testHeap.push(70);
			assert.deepEqual(testHeap._array, [234, 100, 150, 57, 70], 'Heap should correctly insert 5th element.');
			testHeap.push(70);
			assert.deepEqual(testHeap._array, [234, 100, 150, 57, 70, 70], 'Heap should correctly insert 6th element.');
			testHeap.push(40);
			assert.deepEqual(testHeap._array, [234, 100, 150, 57, 70, 70, 40], 'Heap should correctly insert 7th element.');
			testHeap.push(100);
			assert.deepEqual(testHeap._array, [234, 100, 150, 100, 70, 70, 40, 57], 'Heap should correctly insert 8th element.');
			testHeap.push(400);
			assert.deepEqual(testHeap._array, [400, 234, 150, 100, 70, 70, 40, 57, 100], 'Heap should correctly insert 9th element.');
			testHeap.push(320);
			assert.deepEqual(testHeap._array, [400, 320, 150, 100, 234, 70, 40, 57, 100, 70], 'Heap should correctly insert 10th element.');
			testHeap.push(300);
			assert.deepEqual(testHeap._array, [400, 320, 150, 100, 300, 70, 40, 57, 100, 70, 234], 'Heap should correctly insert 11th element.');
		});
	});

	describe('#shift()', function() {
		it('should successfully delete elements', function() {
			testHeap = new heap.Heap();
			testHeap.push(0);
			testHeap.push(1);
			testHeap.push(34578);
			assert.deepEqual(testHeap._array, [0, 1, 34578], 'Heap should be correctly initialized.');
			assert.equal(testHeap.shift(), 0, 'Heap should get correct 1st element.');
			assert.deepEqual(testHeap._array, [1, 34578], 'Heap should correctly organize array after removing 1st element.');
			assert.equal(testHeap.shift(), 1, 'Heap should get correct 2nd element.');
			assert.deepEqual(testHeap._array, [34578], 'Heap should correctly organize array after removing 2nd element.');
			assert.equal(testHeap.shift(), 34578, 'Heap should get correct 3rd element.');
			assert.deepEqual(testHeap._array, [], 'Heap should correctly organize array after removing 3rd element.');
		}); 

		it('should successfully delete and sift down greater elements', function() {
			testHeap = new heap.Heap();
			testHeap.push(234);
			testHeap.push(100);
			testHeap.push(150);
			testHeap.push(57);
			testHeap.push(70);
			testHeap.push(70);
			testHeap.push(40);
			testHeap.push(100);
			assert.deepEqual(testHeap._array, [40, 70, 57, 100, 100, 150, 70, 234], 'Heap should be correctly initialized.');
			assert.equal(testHeap.shift(), 40, 'Heap should get correct 1st element.');
			assert.deepEqual(testHeap._array, [57, 70, 70, 100, 100, 150, 234], 'Heap should correctly organize array after removing 1st element.');
			assert.equal(testHeap.shift(), 57, 'Heap should get correct 2nd element.');
			assert.deepEqual(testHeap._array, [70, 100, 70, 234, 100, 150], 'Heap should correctly organize array after removing 2nd element.');
			assert.equal(testHeap.shift(), 70, 'Heap should get correct 3rd element.');
			assert.deepEqual(testHeap._array, [70, 100, 150, 234, 100], 'Heap should correctly organize array after removing 3rd element.');
			assert.equal(testHeap.shift(), 70, 'Heap should get correct 4th element.');
			assert.deepEqual(testHeap._array, [100, 100, 150, 234], 'Heap should correctly organize array after removing 4th element.');
			assert.equal(testHeap.shift(), 100, 'Heap should get correct 5th element.');
			assert.deepEqual(testHeap._array, [100, 234, 150], 'Heap should correctly organize array after removing 5th element.');
			assert.equal(testHeap.shift(), 100, 'Heap should get correct 6th element.');
			assert.deepEqual(testHeap._array, [150, 234], 'Heap should correctly organize array after removing 6th element.');
			assert.equal(testHeap.shift(), 150, 'Heap should get correct 7th element.');
			assert.deepEqual(testHeap._array, [234], 'Heap should correctly organize array after removing 7th element.');
			assert.equal(testHeap.shift(), 234, 'Heap should get correct 8th element.');
			assert.deepEqual(testHeap._array, [], 'Heap should correctly organize array after removing 8th element.');
		});

		it('should successfully use customized less_than to delete and sift down greater elements', function() {
			testHeap = new heap.Heap((a, b) => a > b);
			testHeap.push(234);
			testHeap.push(100);
			testHeap.push(150);
			testHeap.push(57);
			testHeap.push(70);
			testHeap.push(70);
			testHeap.push(40);
			testHeap.push(100);
			testHeap.push(400);
			testHeap.push(320);
			testHeap.push(300);
			assert.deepEqual(testHeap._array, [400, 320, 150, 100, 300, 70, 40, 57, 100, 70, 234], 'Heap should be correctly initialized.');
			assert.equal(testHeap.shift(), 400, 'Heap should get correct 1st element.');
			assert.deepEqual(testHeap._array, [320, 300, 150, 100, 234, 70, 40, 57, 100, 70], 'Heap should correctly organize array after removing 1st element.');
			assert.equal(testHeap.shift(), 320, 'Heap should get correct 2nd element.');
			assert.deepEqual(testHeap._array, [300, 234, 150, 100, 70, 70, 40, 57, 100], 'Heap should correctly organize array after removing 2nd element.');
			assert.equal(testHeap.shift(), 300, 'Heap should get correct 3rd element.');
			assert.deepEqual(testHeap._array, [234, 100, 150, 100, 70, 70, 40, 57], 'Heap should correctly organize array after removing 3rd element.');
			assert.equal(testHeap.shift(), 234, 'Heap should get correct 4th element.');
			assert.deepEqual(testHeap._array, [150, 100, 70, 100, 70, 57, 40], 'Heap should correctly organize array after removing 4th element.');
			assert.equal(testHeap.shift(), 150, 'Heap should get correct 5th element.');
			assert.deepEqual(testHeap._array, [100, 100, 70, 40, 70, 57], 'Heap should correctly organize array after removing 5th element.');
			assert.equal(testHeap.shift(), 100, 'Heap should get correct 6th element.');
			assert.deepEqual(testHeap._array, [100, 70, 70, 40, 57], 'Heap should correctly organize array after removing 6th element.');
			assert.equal(testHeap.shift(), 100, 'Heap should get correct 7th element.');
			assert.deepEqual(testHeap._array, [70, 57, 70, 40], 'Heap should correctly organize array after removing 7th element.');
			assert.equal(testHeap.shift(), 70, 'Heap should get correct 8th element.');
			assert.deepEqual(testHeap._array, [70, 57, 40], 'Heap should correctly organize array after removing 8th element.');
			assert.equal(testHeap.shift(), 70, 'Heap should get correct 9th element.');
			assert.deepEqual(testHeap._array, [57, 40], 'Heap should correctly organize array after removing 9th element.');
			assert.equal(testHeap.shift(), 57, 'Heap should get correct 10th element.');
			assert.deepEqual(testHeap._array, [40], 'Heap should correctly organize array after removing 10th element.');
			assert.equal(testHeap.shift(), 40, 'Heap should get correct 11th element.');
			assert.deepEqual(testHeap._array, [], 'Heap should correctly organize array after removing 11th element.');
		});
		
		it('should throw error when trying to delete an element from an empty heap', function() {
			testHeap = new heap.Heap();
			assert.throws(() => { testHeap.shift() }, {
				name: 'Error',
				message: 'no elements are in the heap'
			});

			testHeap2 = new heap.Heap();
			testHeap2.push(0);
			testHeap2.shift();
			assert.throws(() => { testHeap2.shift() }, {
				name: 'Error',
				message: 'no elements are in the heap'
			});
		});
	});

	describe('#peek()', function() {
		it('should successfully see the least element', function() {
			testHeap = new heap.Heap();
			testHeap.push(0);
			testHeap.push(1);
			testHeap.push(34578);
			assert.equal(testHeap.peek(), 0, 'Heap should return the least element on ascending insert of elements.');

			testHeap2 = new heap.Heap();
			testHeap2.push(45345);
			testHeap2.push(3457);
			testHeap2.push(0);
			assert.equal(testHeap2.peek(), 0, 'Heap should return the least element on descending insert of elements.');

			testHeap3 = new heap.Heap();
			testHeap3.push(234);
			testHeap3.push(100);
			testHeap3.push(150);
			testHeap3.push(57);
			testHeap3.push(70);
			testHeap3.push(70);
			testHeap3.push(40);
			testHeap3.push(100);
			assert.equal(testHeap3.peek(), 40, 'Heap should return the least element on general insertion of elements.');
		});

		it('should successfully see the least element when using customized less_than', function() {
			testHeap = new heap.Heap((a, b) => a > b);
			testHeap.push(234);
			testHeap.push(100);
			testHeap.push(150);
			testHeap.push(57);
			testHeap.push(70);
			testHeap.push(70);
			testHeap.push(40);
			testHeap.push(100);
			testHeap.push(400);
			testHeap.push(320);
			testHeap.push(300);
			assert.equal(testHeap.peek(), 400, 'Heap should return the least element on general insertion of elements.');
		});

		it('should throw error when trying to see least element from an empty heap', function() {
			testHeap = new heap.Heap();
			assert.throws(() => { testHeap.peek() }, {
				name: 'Error',
				message: 'no elements are in the heap'
			});

			testHeap2 = new heap.Heap();
			testHeap2.push(0);
			testHeap2.shift();
			assert.throws(() => { testHeap2.peek() }, {
				name: 'Error',
				message: 'no elements are in the heap'
			});
		});
	});

	describe('#size()', function() {
		it('should be 0 on initialization', function() {
			testHeap = new heap.Heap();
			assert.equal(testHeap.size(), 0, 'newly initialized Heap should be empty.');
		});

		it('should change size when new element has been inserted', function() {
			testHeap = new heap.Heap();
			assert.equal(testHeap.size(), 0, 'newly initialized Heap should be empty.');
			testHeap.push(0);
			assert.equal(testHeap.size(), 1, 'Heap should increment size by 1 after 1 insertion.');
			testHeap.push(1);
			assert.equal(testHeap.size(), 2, 'Heap should increment size by 1 to size 2 after 1 more insertion.');
			for (let i = 0; i < 10; i++)
				testHeap.push(i);
			assert.equal(testHeap.size(), 12, 'Heap should increment size by 10 to size 12 after 10 more insertions.');
		});

		it('should change size when elements have been deleted', function() {
			testHeap = new heap.Heap();
			testHeap.push(0);
			testHeap.push(1);
			for (let i = 0; i < 10; i++)
				testHeap.push(i);
			assert.equal(testHeap.size(), 12, 'Heap should first be initialized with 12 elements.');
			testHeap.shift();
			assert.equal(testHeap.size(), 11, 'Heap should decrement size by 1 to 11 after deletion.');
			testHeap.shift();
			assert.equal(testHeap.size(), 10, 'Heap should decrement size by 1 to 10 after deletion.');
			for (let i = 0; i < 10; i++)
				testHeap.shift();
			assert.equal(testHeap.size(), 0, 'Heap should decrement size by 10 to 0 after 10 deletions.');
		});
	});

	describe('#empty()', function() {
		it('should be true on initialization', function() {
			testHeap = new heap.Heap();
			assert.ok(testHeap.empty(), 'newly initialized Heap should be empty.');
		});

		it('should become false when new element has been inserted', function() {
			testHeap = new heap.Heap();
			assert.ok(testHeap.empty(), 'newly initialized Heap should be empty.');
			testHeap.push(0);
			assert.ok(!testHeap.empty(), 'Heap should increment size by 1 after 1 insertion and should not be empty.');
			testHeap.push(1);
			assert.ok(!testHeap.empty(), 'Heap should increment size by 1 to size 2 after 1 insertion and should not be empty.');
			for (let i = 0; i < 10; i++)
				testHeap.push(i);
			assert.ok(!testHeap.empty(), 'Heap should increment size by 10 to size 12 after 10 insertion and should not be empty.');
		});

		it('should return to true when all elements have been deleted', function() {
			testHeap = new heap.Heap();
			testHeap.push(0);
			testHeap.push(1);
			for (let i = 0; i < 10; i++)
				testHeap.push(i);
			assert.ok(!testHeap.empty(), 'Heap should first be initialized with 12 elements and should not be empty.');
			testHeap.shift();
			assert.ok(!testHeap.empty(), 'Heap should decrement size by 1 to 11 after deletion and should not be empty.');
			testHeap.shift();
			assert.ok(!testHeap.empty(), 'Heap should decrement size by 1 to 10 after deletion and should not be empty.');
			for (let i = 0; i < 10; i++)
				testHeap.shift();
			assert.ok(testHeap.empty(), 'Heap should decrement size by 10 to 0 after deletion and should be empty.');
		});
	});
});
