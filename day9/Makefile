all: build test run clean

build:
	@echo "Building..."
	dotnet build /p:Configuration=Release day9.sln
	@echo "Done."

test:
	@echo "Testing..."
	dotnet test day9test/day9test.csproj
	@echo "Done."

run:
	@echo "Running for Part 1..."
	dotnet run --project part1/part1.csproj -- input.txt output/part1.txt
	cat output/part1.txt
	@echo "Done"
	@echo "Running for Part 2..."
	dotnet run --project part2/part2.csproj -- input.txt output/part2.txt
	cat output/part2.txt
	@echo "Done"
clean:
	rm -rf **/bin
	rm -rf **/*.exe
	rm -rf **/obj/*.nuget.*
	rm -rf **/obj/Debug
	rm -rf **/obj/Release
