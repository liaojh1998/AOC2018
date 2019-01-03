require File.expand_path("../../coord.rb", __FILE__)
require "minitest/autorun"

class TestPoint < Minitest::Test
  parallelize_me!

  def setup
    @a = Point.new(1, -2)
    @b = Point.new(-5, 3)
    @c = Coord.new(5, 6)
  end

  def test_Point_should_properly_initalize
    assert_equal 1, @a.x
    assert_equal (-2), @a.y
    assert_equal false, @a.brx
    assert_equal false, @a.blx
    assert_equal false, @a.buy
    assert_equal false, @a.bdy
    assert_equal (-5), @b.x
    assert_equal 3, @b.y
    assert_equal false, @b.brx
    assert_equal false, @b.blx
    assert_equal false, @b.buy
    assert_equal false, @b.bdy
  end

  def test_Point_should_correctly_calculate_manhattan_distance_from_each_other
    assert_equal 11, @a.dist(@b)
    assert_equal 11, @b.dist(@a)
    assert_equal @a.dist(@b), @b.dist(@a)
  end

  def test_Point_should_correctly_calculate_manhattan_distance_from_Coord
    assert_equal 12, @a.dist(@c)
    assert_equal 12, @c.dist(@a)
    assert_equal @a.dist(@c), @c.dist(@a)
  end
end
