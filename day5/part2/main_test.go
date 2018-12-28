package main

import (
	"bufio"
	"strconv"
	"testing"
	"os"
)

func assertErr(t *testing.T, e error) {
	if e != nil {
		t.Error(e)
	}
}

func TestReduceNoReduce(t *testing.T) {
	for i := 'A'; i <= 'Z'; i++ {
		f, err := os.Open("tests/1.txt")
		assertErr(t, err)
		defer f.Close()

		res, err := Reduce(bufio.NewReader(f), i)
		assertErr(t, err)
		if res != 25 {
			t.Error("Should reduce one and keep all other letters.")
		}
	}
}

func TestReduceLinear(t *testing.T) {
	for i := 'A'; i <= 'Z'; i++ {
		f, err := os.Open("tests/2.txt")
		assertErr(t, err)
		defer f.Close()

		res, err := Reduce(bufio.NewReader(f), i)
		assertErr(t, err)
		if res != 0 {
			t.Error("Should reduce all.", res)
		}
	}
}

func TestReduceRecursive(t *testing.T) {
	for i := 'A'; i <= 'Z'; i++ {
		f, err := os.Open("tests/3.txt")
		assertErr(t, err)
		defer f.Close()

		res, err := Reduce(bufio.NewReader(f), i)
		assertErr(t, err)
		if res != 0 {
			t.Error("Should reduce all.", res)
		}
	}
}

func TestReduceGeneral(t *testing.T) {
	oldArgs := os.Args
	os.Args = []string {oldArgs[0], "tests/4.txt", "tests/4_actual.txt"}
	defer func() { os.Args = oldArgs }()

	main()

	f, err := os.Open("tests/4_actual.txt")
	assertErr(t, err)
	defer func() {
		err = os.Remove("tests/4_actual.txt")
		assertErr(t, err)
	}()
	defer f.Close()

	reader := bufio.NewReader(f)
	str, err := reader.ReadString('\n')
	assertErr(t, err)

	res, err := strconv.Atoi(str[:len(str)-1])
	assertErr(t, err)
	if res != 0 {
		t.Errorf("Should reduce B for shortest polymer, but got %d.", res)
	}
}

func TestReduceExample(t *testing.T) {
	oldArgs := os.Args
	os.Args = []string {oldArgs[0], "tests/5.txt", "tests/5_actual.txt"}
	defer func() { os.Args = oldArgs }()

	main()

	f, err := os.Open("tests/5_actual.txt")
	assertErr(t, err)
	defer func() {
		err = os.Remove("tests/5_actual.txt")
		assertErr(t, err)
	}()
	defer f.Close()

	reader := bufio.NewReader(f)
	str, err := reader.ReadString('\n')
	assertErr(t, err)

	res, err := strconv.Atoi(str[:len(str)-1])
	assertErr(t, err)
	if res != 4 {
		t.Errorf("Should reduce D for shortest polymer, but got %d.", res)
	}
}
