all: day3 day4

day3: day3part1 day3part2

day3part1:
	@cd day3/part1/ && make all

day3part2:
	@cd day3/part2/ && make all

day4: day4part1

day4part1:
	@cd day4/part1/ && make all

clean:
	@cd day3/part1/ && make $@
	@cd day3/part2/ && make $@
	@cd day4/part1/ && make $@
