all: test run

test:
ifdef TRAVIS_SCALA_VERSION
	sbt ++${TRAVIS_SCALA_VERSION} "project part1" test
	sbt ++${TRAVIS_SCALA_VERSION} "project part2" test
else
	sbt "project part1" test
	sbt "project part2" test
endif

run:
	sbt "project part1" "run input.txt output/part1.txt"
	sbt "project part2" "run input.txt output/part2.txt"

clean:
	rm -rf **/target
