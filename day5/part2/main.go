package main

import (
	"bufio"
	"errors"
	"fmt"
	"io"
	"os"
	"unicode"

	"github.com/liaojh1998/AOC2018/day5/stack"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main() {
	if len(os.Args) < 2 || len(os.Args) > 3 {
		check(errors.New("usage: go run main.go <input file> <optional output file>"))
	}

	res := -1
	for i := 'A'; i <= 'Z'; i++ {
		f, err := os.Open(os.Args[1])
		check(err)
		defer f.Close()

		reader := bufio.NewReader(f)
		reader.Reset(f)
		length, err := Reduce(reader, i)
		if res == -1 || length < res {
			res = length
		}
		check(err)
	}

	if len(os.Args) == 3 {
		fout, err := os.Create(os.Args[2])
		check(err)
		defer fout.Close()

		w := bufio.NewWriter(fout)
		fmt.Fprintf(w, "%d\n", res)
		w.Flush()
	} else {
		fmt.Println(res)
	}
}

func Reduce(r *bufio.Reader, letter rune) (int, error) {
	s := stack.New()
	for c, _, err := r.ReadRune(); err != io.EOF; c, _, err = r.ReadRune() {
		if err != nil {
			return -1, err
		} else if unicode.IsUpper(c) && c != letter{
			if s.IsEmpty() || s.Top() != unicode.ToLower(c) {
				s.Push(c)
			} else {
				s.Pop()
			}
		} else if unicode.IsLower(c) && unicode.ToUpper(c) != letter {
			if s.IsEmpty() || s.Top() != unicode.ToUpper(c) {
				s.Push(c)
			} else {
				s.Pop()
			}
		}
	}
	return s.Size(), nil
}
