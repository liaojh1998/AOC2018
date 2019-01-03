all: day1 day3 day4 day6

day1: day1part1 day1part2

day1part1:
	@echo "---- Day 1 Part 1 ----"
	@cd day1/part1/ && make all

day1part2:
	@echo "---- Day 1 Part 2 ----"
	@cd day1/part2/ && make all

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

day6: day6part1 day6part2

day6part1:
	@echo "---- Day 6 Part 1 ----"
	@cd day6/lib/ && rake
	@cd day6/part1/ && rake

day6part2:
	@echo "---- Day 6 Part 2 ----"
	@cd day6/lib/ && rake
	@cd day6/part2/ && rake

clean:
	@cd day1/part1/ && make $@
	@cd day1/part2/ && make $@
	@cd day3/part1/ && make $@
	@cd day3/part2/ && make $@
	@cd day4/part1/ && make $@
	@cd day4/part2/ && make $@
