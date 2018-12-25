all: build test task clean

build:
	@echo "Compiling for day 3 part 1."
	@mkdir build
	@g++ -std=c++14 -Wl,--stack,0x400000 -o build/slice slice.cpp
	@echo "Success!"

test:
	@echo "Test 1: No overlap claims"
	build/slice tests/1_input.txt tests/1_actual.txt
	diff -y tests/1_expected.txt tests/1_actual.txt
	@echo "Passed."
	@echo "Test 2: No claims"
	build/slice tests/2_input.txt tests/2_actual.txt
	diff -y tests/2_expected.txt tests/2_actual.txt
	@echo "Passed."
	@echo "Test 3: One huge claim"
	build/slice tests/3_input.txt tests/3_actual.txt
	diff -y tests/3_expected.txt tests/3_actual.txt
	@echo "Passed."
	@echo "Test 4: An overlap between two claims"
	build/slice tests/4_input.txt tests/4_actual.txt
	diff -y tests/4_expected.txt tests/4_actual.txt
	@echo "Passed."
	@echo "Test 5: General overlap"
	build/slice tests/5_input.txt tests/5_actual.txt
	diff -y tests/5_expected.txt tests/5_actual.txt
	@echo "Passed."
	@echo "Test 6: Repetitive overlap"
	build/slice tests/6_input.txt tests/6_actual.txt
	diff -y tests/6_expected.txt tests/6_actual.txt
	@echo "Passed."
	@echo "Test 7: Example test case"
	build/slice tests/7_input.txt tests/7_actual.txt
	diff -y tests/7_expected.txt tests/7_actual.txt
	@echo "Passed."
	@rm -rf tests/*_actual.txt

task:
	@echo "Solving for Day 3 Part 1..."
	build/slice input.txt output.txt
	@echo "Done."

clean:
	rm -rf build

