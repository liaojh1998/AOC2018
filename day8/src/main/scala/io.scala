package io

import scala.io.Source
import scala.io.BufferedSource

class FilePositiveIntIterator extends Iterator[Int] {
  private var source: BufferedSource = _
  
  def this(name: String) = { this(); this.source = Source.fromFile(name) }
  def close(): Unit = this.source.close()

  override def hasNext: Boolean = {
    while (!this.source.ch.isDigit && this.source.hasNext)
      this.source.next()
    this.source.ch.isDigit
  }

  override def next(): Int = {
    var int = 0
    if (this.hasNext) {
      int = (int << 1) + (int << 3) + this.source.ch.asDigit
      while (this.source.hasNext && this.source.next().isDigit)
        int = (int << 1) + (int << 3) + this.source.ch.asDigit
      int
    } else {
      throw new NoSuchElementException("next on empty iterator")
    }
  }
}
