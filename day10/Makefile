all: build test run

build:
	cd part1 && cargo build --verbose
	cd part2 && cargo build --verbose

test:
	cd part1 && cargo test --verbose
	cd part2 && cargo test --verbose

run:
	cd part1 && cargo run ../input.txt ../output/part1.txt
	cd part2 && cargo run ../input.txt ../output/part2.txt
