package stack

import "testing"

func TestStackFailTop(t *testing.T) {
	defer func() {
		if r := recover(); r == nil {
			t.Error("Empty stack should fail Top() but succeeded.")
		}
	}()

	s := New()
	s.Top()
}

func TestStackFailPop(t *testing.T) {
	defer func() {
		if r := recover(); r == nil {
			t.Error("Empty stack should fail Pop() but succeeded.")
		}
	}()

	s := New()
	s.Pop()
}

func TestStackNewIsEmpty(t *testing.T) {
	s := New()
	if b := s.IsEmpty(); !b {
		t.Error("IsEmpty() did not return new stack as empty.")
	}
}

func TestStackOneElement(t *testing.T) {
	s := New()
	s.Push(0)
	if e := s.Top(); e != 0 {
		t.Errorf("Stack Top() did not return 0, but %d as top element.\n", e)
	}
	if e := s.Pop(); e != 0 {
		t.Errorf("Stack Pop() did not return 0, but %d as top element.\n", e)
	}
}

func TestStackGeneral(t *testing.T) {
	s := New()
	s.Push(0)
	s.Push(1)
	s.Push(2)
	if e := s.Top(); e != 2 {
		t.Errorf("Stack Top() did not return 2, but %d as top element.\n", e)
	}
	if e := s.Pop(); e != 2 {
		t.Errorf("Stack Pop() did not return 2, but %d as top element.\n", e)
	}
	if e := s.Top(); e != 1 {
		t.Errorf("Stack Top() did not return 1, but %d as 2nd element.\n", e)
	}
	if e := s.Pop(); e != 1 {
		t.Errorf("Stack Pop() did not return 1, but %d as 2nd element.\n", e)
	}
	if e := s.Top(); e != 0 {
		t.Errorf("Stack Top() did not return 0, but %d as 3rd element.\n", e)
	}
	if e := s.Pop(); e != 0 {
		t.Errorf("Stack Pop() did not return 0, but %d as 3rd element.\n", e)
	}
}
