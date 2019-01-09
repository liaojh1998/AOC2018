import org.scalatest._

import part2._

class Part2Test extends FlatSpec with Matchers {
  "Part2.process function" should "correctly process an empty iterator and return 0" in {
    Part2.process(Array[Int]().iterator) should be (0)
  }

  it should "throw Exception on invalid trees" in {
    val tree = Array(1, 0, 0)

    the [Exception] thrownBy Part2.process(tree.iterator) should have message "bad input detected"
  }

  it should "correctly process a simple root with metadata" in {
    val tree = Array(0, 3, 1, 20, 9)

    Part2.process(tree.iterator) should be (30)
  }
  
  it should "correctly process a simple tree with one child and its metadata" in {
    val tree = Array(1, 0, 0, 3, 1, 20, 9)

    Part2.process(tree.iterator) should be (0)
  }
  
  it should "correctly process a simple tree with one child and the root has no metadata that points to the child" in {
    val tree = Array(1, 2, 0, 3, 1, 20, 9, 0, 2)

    Part2.process(tree.iterator) should be (0)
  }

  it should "correctly process a tree with two child" in {
    val tree = Array(2, 3, 0, 3, 5, 11, 7, 0, 2, 17, 16, 1, 2, 3)

    Part2.process(tree.iterator) should be (56)
  }

  it should "correctly process a general tree with recursively defined children" in {
    val tree = Array(3, 5, 2, 1, 0, 1, 1, 0, 2, 2, 3, 2, 0, 4, 4, 5, 6, 7, 2, 3, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 2, 1, 2, 3, 4, 2)

    Part2.process(tree.iterator) should be(49)
  }

  it should "correctly process sample case" in {
    val tree = Array(2, 3, 0, 3, 10, 11, 12, 1, 1, 0, 1, 99, 2, 1, 1, 2)

    Part2.process(tree.iterator) should be (66)
  }
}
