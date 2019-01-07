const heap = require('../lib/heap.js');

// Greedy simulation: first free will take the next lexicographically ordered job
function simulate(graph, workers, duration) {
	if (typeof duration !== 'function')
		throw new Error('duration parameter should be a function that indicates how long each job will take');

	// Priority Queues (in binary heap) for chronological and lexicographical ordering
	let jobQueue = new heap.Heap();
	let workerQueue = new heap.Heap((a, b) => {
		// Least time first, then those with a job.
		if (a.available == b.available) {
			if (a.job != null && b.job != null)
				return a.job < b.job;
			else
				return b.job == null;
		}
		return a.available < b.available;
	});
	let availableQueue = new heap.Heap();

	// Kahn's Algorithm
	graph.forEach((value, key) => {
		if (value.inCount == 0)
			jobQueue.push(key);
	});

	// Put in workers
	for (let i = 0; i < workers; i++) {
		if (!jobQueue.empty()) {
			let job = jobQueue.shift();
			let time = duration(job);
			workerQueue.push({ available: time, job: job });
			availableQueue.push(time);
		} else {
			workerQueue.push({ available: 0, work: null });
		}
	}

	// Simulate
	let finalTime = 0;
	while (!workerQueue.empty()) {
		let worker = workerQueue.shift();

		// If worker has a job, let him finish it first
		if (worker.job != null) {
			// Get to next available worker time after this worker
			if (!availableQueue.empty() && worker.available == availableQueue.peek())
				finalTime = availableQueue.shift();

			let to = graph.get(worker.job).out;
			for (let i = 0; i < to.length; i++) {
				graph.get(to[i]).inCount--;
				if (graph.get(to[i]).inCount == 0)
					jobQueue.push(to[i]);
			}
			worker.job = null;
		}

		if (jobQueue.empty()) {
			// If there are no jobs and there still are workers, get to when the next worker is available
			if (!availableQueue.empty()) {
				worker.available = availableQueue.peek();
				workerQueue.push(worker);
			}
		} else {
			// Let current worker take a job
			let job = jobQueue.shift();
			worker.available += duration(job);
			worker.job = job;
			workerQueue.push(worker);
			availableQueue.push(worker.available);
		}
	}

	graph.forEach((value, key) => {
		if (value.inCount != 0) {
			if (workers == 0)
				throw new Error('no workers to do work');
			else
				throw new Error('graph has at least one cycle or badly constructed graph');
		}
	});

	return finalTime;
}

module.exports = {
	simulate
}
