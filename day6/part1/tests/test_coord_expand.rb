require File.expand_path("../../expand.rb", __FILE__)
require "minitest/autorun"

class TestExpand < Minitest::Test
  parallelize_me!

  def test_expand_on_empty_coords_array
    assert_equal 0, expand([])
  end

  def test_expand_on_one_coord
    assert_equal 0, expand([Point.new(0, 0)])
  end

  def test_expand_on_non_blocking_coord
    assert_equal 0, expand([Point.new(0, 0), Point.new(1, 1)])
    assert_equal 0, expand([Point.new(0, 0), Point.new(-1, -1), Point.new(1, 0)])
    assert_equal 0, expand([Point.new(0, 0), Point.new(-1, 0), Point.new(1, 0), Point.new(0, 1)])
    assert_equal 0, expand([Point.new(0, 0), Point.new(-1, 0), Point.new(1, 0), Point.new(0, -1)])
  end

  def test_expand_on_blocking_coord
    assert_equal 7, expand([Point.new(0, 0), Point.new(2, 2), Point.new(-2, -2)])
    assert_equal 1, expand([Point.new(0, 0), Point.new(2, 0), Point.new(-2, 0), Point.new(0, 2), Point.new(0, -2)])
    assert_equal 9, expand([Point.new(0, 0), Point.new(3, 0), Point.new(-3, 0), Point.new(0, 3), Point.new(0, -3)])
  end

  def test_expand_on_sample_correctly
    assert_equal 17, expand([Point.new(1, 1), Point.new(1, 6), Point.new(8, 3), Point.new(3, 4), Point.new(5, 5), Point.new(8, 9)])
  end
end
