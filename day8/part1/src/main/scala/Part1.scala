package part1

import scala.collection.mutable.ArrayStack
import java.io.File
import java.io.PrintWriter

import io.FilePositiveIntIterator;

object Part1 {
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
    val stack = new ArrayStack[Tuple2[Int, Int]]()
    var sum = 0
    while (it.hasNext) {
      try {
        var root = new Tuple2(it.next(), it.next())
        stack.push(root)
        while (!stack.isEmpty) {
          var node = stack.pop
          if (node._1 > 0) {
            var parent = new Tuple2(node._1 - 1, node._2)
            var child = new Tuple2(it.next(), it.next())
            stack.push(parent)
            stack.push(child)
          } else {
            var metadata = node._2
            while (metadata > 0) {
              sum += it.next()
              metadata -= 1
            }
          }
        }
      } catch {
        case _: Throwable => throw new Exception("bad input detected")
      }
    }
    sum
  }
}
