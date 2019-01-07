const heap = require('../lib/heap.js');

function topologicalSortWithElementsOrdering(graph) {
	// Priority Queue (in binary heap) for lexicographical ordering
	let priorityQueue = new heap.Heap();

	// Kahn's Algorithm
	graph.forEach((value, key) => {
		if (value.inCount == 0)
			priorityQueue.push(key);
	});

	let sorted = []
	while (!priorityQueue.empty()) {
		let node = priorityQueue.shift();
		sorted.push(node);

		let to = graph.get(node).out;
		for (let i = 0; i < to.length; i++) {
			graph.get(to[i]).inCount--;
			if (graph.get(to[i]).inCount == 0)
				priorityQueue.push(to[i]);
		}
	}

	graph.forEach((value, key) => {
		if (value.inCount != 0)
			throw new Error('graph has at least one cycle or badly constructed graph');
	});
	return sorted;
}

function solve(input) {
	// Convert input to an adjacency list
	let graph = new Map();
	for (let i = 0; i < input.length; i++) {
		if (!graph.has(input[i].from))
			graph.set(input[i].from, { inCount: 0, out: [] });
		if (!graph.has(input[i].to))
			graph.set(input[i].to, { inCount: 0, out: [] });
		graph.get(input[i].from).out.push(input[i].to);
		graph.get(input[i].to).inCount++;
	}

	// Get topological sort result and convert into string form
	let res = topologicalSortWithElementsOrdering(graph);
	let str = String(res).replace(new RegExp(',', 'g'), '');

	return str;
}

module.exports = {
	topologicalSortWithElementsOrdering,
	solve
}
