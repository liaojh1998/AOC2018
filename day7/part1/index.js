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
	let str = solution.solve(input);

	// Write to write stream
	if (process.argv.length == 4) {
		const writeStream = fs.createWriteStream(process.argv[3]);
		writeStream.write(str);
	} else {
		console.log(str);
	}
});
