package stack

import "container/list"

type Stack struct {
	list list.List
}

func (s *Stack) Init() *Stack {
	s.list.Init();
	return s;
}

func New() *Stack {
	return new(Stack).Init()
}

func (s *Stack) IsEmpty() bool {
	return s.list.Len() == 0
}

func (s *Stack) Size() int {
	return s.list.Len()
}

func (s *Stack) Top() interface{} {
	return s.list.Front().Value
}

func (s *Stack) Pop() interface{} {
	return s.list.Remove(s.list.Front())
}

func (s *Stack) Push(v interface{}) *list.Element {
	return s.list.PushFront(v)
}
