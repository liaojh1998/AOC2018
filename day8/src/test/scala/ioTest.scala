import java.io.FileNotFoundException
import org.scalatest._

import io._

class ioTest extends FlatSpec with Matchers {
  "A FilePositiveIntIterator" should "successfully open and close a file" in {
    val it = new FilePositiveIntIterator("testdata/1.txt")

    it.close()
  }

  it should "throw FileNotFoundException if file does not exist" in {
    a [FileNotFoundException] should be thrownBy new FilePositiveIntIterator("what")
  }
  
  it should "successfully read one integer from a file" in {
    val it = new FilePositiveIntIterator("testdata/1.txt")

    it.next() should be (1)
    it.close()
  }

  it should "read multiple integers correctly from a file" in {
    val it = new FilePositiveIntIterator("testdata/3.txt")

    it.next() should be (1)
    it.next() should be (2)
    it.next() should be (3234)
    it.next() should be (4)
    it.next() should be (5)
    it.close()
  }
  
  it should "return false for hasNext only at the end of file" in {
    val it = new FilePositiveIntIterator("testdata/2.txt")
    val it2 = new FilePositiveIntIterator("testdata/3.txt")

    it.hasNext should be (false)
    it.close()

    it2.next() should be (1)
    it2.hasNext should be (true)
    it2.next() should be (2)
    it2.hasNext should be (true)
    it2.next() should be (3234)
    it2.hasNext should be (true)
    it2.next() should be (4)
    it2.hasNext should be (true)
    it2.next() should be (5)
    it2.hasNext should be (false)
    it2.close()
  }

  it should "read only digits in a file until the end of it" in {
    val it = new FilePositiveIntIterator("testdata/4.txt")

    it.next() should be (1)
    it.hasNext should be (true)
    it.next() should be (23)
    it.hasNext should be (true)
    it.next() should be (3)
    it.hasNext should be (true)
    it.next() should be (3454)
    it.hasNext should be (true)
    it.next() should be (545)
    it.hasNext should be (true)
    it.next() should be (6)
    it.hasNext should be (true)
    it.next() should be (7345)
    it.hasNext should be (false)
    it.close()
  }

  it should "throw NoSuchElementException when trying to read the end of file" in {
    val it = new FilePositiveIntIterator("testdata/2.txt")
    val it2 = new FilePositiveIntIterator("testdata/3.txt")
    
    it.hasNext should be (false)
    the [NoSuchElementException] thrownBy it.next() should have message "next on empty iterator"
    it.close()
    
    it2.next() should be (1)
    it2.hasNext should be (true)
    it2.next() should be (2)
    it2.hasNext should be (true)
    it2.next() should be (3234)
    it2.hasNext should be (true)
    it2.next() should be (4)
    it2.hasNext should be (true)
    it2.next() should be (5)
    it2.hasNext should be (false)
    the [NoSuchElementException] thrownBy it2.next() should have message "next on empty iterator"
    it2.close()
  }
}
