require File.expand_path("../../coord.rb", __FILE__)
require "minitest/autorun"

class TestCoord < Minitest::Test
  parallelize_me!

  def setup
    @a = Coord.new(1, -2)
    @b = Coord.new(-5, 3)
  end

  def test_Coord_should_properly_initalize
    assert_equal 1, @a.x
    assert_equal (-2), @a.y
    assert_equal (-5), @b.x
    assert_equal 3, @b.y
  end

  def test_Coord_should_correctly_calculate_manhattan_distance_from_each_other
    assert_equal 11, @a.dist(@b)
    assert_equal 11, @b.dist(@a)
    assert_equal @a.dist(@b), @b.dist(@a)
  end
end
