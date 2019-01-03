require File.expand_path("../../coord.rb", __FILE__)
require "minitest/autorun"

class TestBlockTest < Minitest::Test
  parallelize_me!

  def test_block_test_raise_exception_on_same_points
    @a = Point.new(1, 2)
    @b = Point.new(1, 2)
    assert_raises (RuntimeError) { block_test(@a, @a) }
    assert_raises (RuntimeError) { block_test(@a, @b) }
    assert_raises (RuntimeError) { block_test(@b, @a) }
  end

  def test_block_test_correctly_identifies_blocking_on_same_axes_points
    @a = Point.new(0, 0)
    @b = Point.new(0, 1)
    @c = Point.new(1, 0)
    @d = Point.new(0, -1)
    @e = Point.new(-1, 0)
    block_test(@a, @b)
    assert_equal true, @a.bdy
    assert_equal true, @b.buy
    block_test(@a, @c)
    assert_equal true, @a.brx
    assert_equal true, @c.blx
    block_test(@a, @d)
    assert_equal true, @a.buy
    assert_equal true, @d.bdy
    block_test(@a, @e)
    assert_equal true, @a.blx
    assert_equal true, @e.brx
  end

  def test_block_test_correctly_identifies_blocking_on_equal_x_and_y_manhattan_distances
    @a = Point.new(0, 0)
    @b = Point.new(1, 1)
    @c = Point.new(-1, 1)
    @d = Point.new(-1, -1)
    @e = Point.new(1, -1)

    block_test(@a, @b)
    assert_equal true, @a.bdy
    assert_equal true, @a.brx
    assert_equal true, @b.buy
    assert_equal true, @b.blx
    @a.bdy = false
    @a.brx = false
    block_test(@a, @c)
    assert_equal true, @a.blx
    assert_equal true, @a.bdy
    assert_equal true, @c.buy
    assert_equal true, @c.brx
    @a.bdy = false
    @a.blx = false
    block_test(@a, @d)
    assert_equal true, @a.blx
    assert_equal true, @a.buy
    assert_equal true, @d.bdy
    assert_equal true, @d.brx
    @a.buy = false
    @a.blx = false
    block_test(@a, @e)
    assert_equal true, @a.brx
    assert_equal true, @a.buy
    assert_equal true, @e.bdy
    assert_equal true, @e.blx
  end

  def test_block_test_correctly_identifies_blocking_on_unequal_x_and_y_manhattan_distances
    @a = Point.new(0, 0)
    @b = Point.new(1, -2)
    @c = Point.new(2, -1)
    @d = Point.new(2, 1)
    @e = Point.new(1, 2)
    @f = Point.new(-1, 2)
    @g = Point.new(-2, 1)
    @h = Point.new(-2, -1)
    @i = Point.new(-1, -2)

    block_test(@a, @b)
    assert_equal true, @a.buy
    assert_equal true, @b.bdy
    @a.buy = false
    block_test(@a, @c)
    assert_equal true, @a.brx
    assert_equal true, @c.blx
    @a.brx = false
    block_test(@a, @d)
    assert_equal true, @a.brx
    assert_equal true, @d.blx
    @a.brx = false
    block_test(@a, @e)
    assert_equal true, @a.bdy
    assert_equal true, @e.buy
    @a.bdy = false
    block_test(@a, @f)
    assert_equal true, @a.bdy
    assert_equal true, @f.buy
    @a.bdy = false
    block_test(@a, @g)
    assert_equal true, @a.blx
    assert_equal true, @g.brx
    @a.blx = false
    block_test(@a, @h)
    assert_equal true, @a.blx
    assert_equal true, @h.brx
    @a.blx = false
    block_test(@a, @i)
    assert_equal true, @a.buy
    assert_equal true, @i.bdy
  end
end
