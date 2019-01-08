import io.FilePositiveIntIterator;

object Part1 {
  def main(args: Array[String]) {
    var f = new FilePositiveIntIterator(args(0))
    f.close()
  }
}
