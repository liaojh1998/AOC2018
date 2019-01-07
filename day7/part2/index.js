const fs = require('fs');
const readline = require('readline');
const parser = require('../lib/parser.js');
const solution = require('./solution.js');

// Create read stream
if (process.argv.length < 3 || process.argv.length > 4)
	throw new Error("usage: node index.js <input file> <optional output file>");

const readStream = fs.createReadStream(process.argv[2]);
readStream.on('error', (err) => {
	throw err;
});

// Read input
let input = []
const reader = readline.createInterface({
	input: readStream
});
reader.on('line', (line) => {
	input.push(parser(line));
});

// Solve using solution's topological sort
readStream.on('end', () => {
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

	// Get simulation result
	const duration = function(job) {
		return 61 + (job.charCodeAt(0) - 'A'.charCodeAt(0));
	};
	let res = solution.simulate(graph, 5, duration);
	let str = String(res);

	// Write to write stream
	if (process.argv.length == 4) {
		const writeStream = fs.createWriteStream(process.argv[3]);
		writeStream.write(str);
	} else {
		console.log(str);
	}
});
