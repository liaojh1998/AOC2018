ifndef DC
	export DC=dmd
endif

all: unittest clean build run

build:
	dub build

unittest:
	dub test --compiler=${DC} --coverage -- input.txt output.txt
	@awk 'END { print $0 }' source-app.lst

run:
	dub run -- input.txt output.txt

clean:
	rm -rf .dub
	rm -rf *.exe
	rm -rf *.obj
	rm -rf *.lst
