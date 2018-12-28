package main

import (
	"bufio"
	"testing"
	"os"
)

func assertErr(t *testing.T, e error) {
	if e != nil {
		t.Error(e)
	}
}

func TestReduceNoReduce(t *testing.T) {
	f, err := os.Open("tests/1.txt")
	assertErr(t, err)
	defer f.Close()

	res, err := Reduce(bufio.NewReader(f))
	assertErr(t, err)
	if res != 26 {
		t.Error("Should reduce none and keep all 26 letters.")
	}
}

func TestReduceLinear(t *testing.T) {
	f, err := os.Open("tests/2.txt")
	assertErr(t, err)
	defer f.Close()

	res, err := Reduce(bufio.NewReader(f))
	assertErr(t, err)
	if res != 0 {
		t.Error("Should reduce all.")
	}
}

func TestReduceRecursive(t *testing.T) {
	f, err := os.Open("tests/3.txt")
	assertErr(t, err)
	defer f.Close()

	res, err := Reduce(bufio.NewReader(f))
	assertErr(t, err)
	if res != 0 {
		t.Error("Should reduce all.")
	}
}

func TestReduceGeneral(t *testing.T) {
	f, err := os.Open("tests/4.txt")
	assertErr(t, err)
	defer f.Close()

	res, err := Reduce(bufio.NewReader(f))
	assertErr(t, err)
	if res != 4 {
		t.Error("Incorrect reduction.")
	}
}

func TestReduceExample(t *testing.T) {
	f, err := os.Open("tests/5.txt")
	assertErr(t, err)
	defer f.Close()

	res, err := Reduce(bufio.NewReader(f))
	assertErr(t, err)
	if res != 10 {
		t.Error("Incorrect reduction.")
	}
}
