package part2

import scala.collection.mutable.ArrayStack
import java.io.File
import java.io.PrintWriter

import io.FilePositiveIntIterator;

object Part2 {
  def main(args: Array[String]) {
    if (args.length < 1 || args.length > 2)
      throw new IllegalArgumentException("usage: sbt \"run <input file> <optional output file>\"")

    var it = new FilePositiveIntIterator(args(0))
    val res = process(it)
    if (args.length == 1) {
      println(res)
    } else {
      val out = new PrintWriter(new File(args(1)))
      out.write(res.toString())
      out.close()
    }

    it.close()
  }

  def process(it: Iterator[Int]): Int = {
    val stack = new ArrayStack[Tuple4[Int, Int, Int, Array[Int]]]()
    var rootValue = 0
    while (it.hasNext) {
      try {
        val rootChildren = it.next()
        val rootMetadata = it.next()
        val root = new Tuple4(0, rootChildren, rootMetadata, new Array[Int](rootChildren))

        stack.push(root)
        while (!stack.isEmpty) {
          val node = stack.top

          if (node._1 == node._2) {
            stack.pop

            var value = 0
            val metadata = node._3
            if (node._2 == 0) {
              for (i <- 0 until metadata)
                value += it.next()
            } else {
              for (i <- 0 until metadata) {
                val index = it.next() - 1
                if (index >= 0 && index < node._2)
                  value += node._4(index)
              }
            }

            if (stack.isEmpty)
              rootValue = value
            else {
              val parent = stack.pop
              parent._4(parent._1) = value

              val newParent = new Tuple4(parent._1 + 1, parent._2, parent._3, parent._4)
              stack.push(newParent)
            }
          } else {
            val childChildren = it.next()
            val childMetadata = it.next()
            val child = new Tuple4(0, childChildren, childMetadata, new Array[Int](childChildren))
            
            stack.push(child)
          }
        }
      } catch {
        case _: Throwable => throw new Exception("bad input detected")
      }
    }
    rootValue
  }
}
