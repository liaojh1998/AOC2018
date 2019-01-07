// Binary Heap module
class Heap {
	constructor(comparison_function) {
		if (typeof comparison_function === 'undefined')
			this._less_than = (a, b) => a < b;
		else if (typeof comparison_function === 'function')
			this._less_than = comparison_function;
		else
			throw new Error('Heap constructor accepts a function as an argument');
		this._array = [];
	}

	size() {
		return this._array.length;
	}

	empty() {
		return this.size() == 0;
	}

	// Internal swap function of elements in the array
	_swap(idx_a, idx_b) {
		let tmp_v = this._array[idx_b];
		this._array[idx_b] = this._array[idx_a];
		this._array[idx_a] = tmp_v;
	}

	// Swap if value at idx_a is less than value at idx_b
	_swap_if_less(idx_a, idx_b) {
		if (this._less_than(this._array[idx_a], this._array[idx_b])) {
			this._swap(idx_a, idx_b);
			return true;
		}
		return false;
	}

	// Logarithmic insertion by sifting up new element
	push(v) {
		// Push new element
		this._array.push(v);
		
		// Sift up
		let swapped = true;
		let child = this.size() - 1;
		while (child > 0 && swapped) {
			let par = Math.trunc((child - 1) / 2);
			swapped = this._swap_if_less(child, par);
			child = par;
		}
	}

	// Logarithmic deletion by sifting down last element
	shift() {
		if (this.size() == 0)
			throw new Error("no elements are in the heap");

		// Get last element
		let par = 0;
		let v = this._array[par];
		let last = this._array.pop();
		if (this.size() > 0)
			this._array[par] = last;
		
		// Sift down
		let swapped = true;
		while (swapped) {
			swapped = false;

			let child  = par * 2 + 1;
			if (child < this.size()) {
				let child2 = par * 2 + 2;
				if (child2 < this.size() && this._less_than(this._array[child2], this._array[child]))
					child = child2;

				swapped = this._swap_if_less(child, par);
				par = child;
			}
		}
		
		return v;
	}
};

// Export the Heap class
module.exports = {
	Heap
};
