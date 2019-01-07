all: build test run

build:
	@mkdir build
ifeq ($(shell uname), Linux)
	$(CXX) -std=c++14 -o build/slice slice.cpp
else
	g++ -std=c++14 -Wl,--stack,0x400000 -o build/slice slice.cpp
endif
	@echo "Success!"

test:
	@echo "Test 1: One overlap claims all"
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
	@echo "Test 4: General overlap with one free"
	build/slice tests/4_input.txt tests/4_actual.txt
	diff -y tests/4_expected.txt tests/4_actual.txt
	@echo "Passed."
	@echo "Test 5: Repetitive overlap with one free"
	build/slice tests/5_input.txt tests/5_actual.txt
	diff -y tests/5_expected.txt tests/5_actual.txt
	@echo "Passed."
	@echo "Test 6: Example test case"
	build/slice tests/6_input.txt tests/6_actual.txt
	diff -y tests/6_expected.txt tests/6_actual.txt
	@echo "Passed."
	@rm -rf tests/*_actual.txt

run:
	@echo "Solving for Day 3 Part 2..."
	build/slice input.txt output.txt
	@echo "Done."

clean:
	rm -rf build

