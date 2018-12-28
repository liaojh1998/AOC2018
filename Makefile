all: day3 day4

day3: day3part1 day3part2

day3part1:
	@echo "---- Day 3 Part 1 ----"
	@cd day3/part1/ && make all

day3part2:
	@echo "---- Day 3 Part 2 ----"
	@cd day3/part2/ && make all

day4: day4part1 day4part2

day4part1:
	@echo "---- Day 4 Part 1 ----"
	@cd day4/part1/ && make all

day4part2:
	@echo "---- Day 4 Part 2 ----"
	@cd day4/part2/ && make all

clean:
	@cd day3/part1/ && make $@
	@cd day3/part2/ && make $@
	@cd day4/part1/ && make $@
