require File.expand_path("../../expand.rb", __FILE__)
require "minitest/autorun"

class TestExpand < Minitest::Test
  parallelize_me!

  def test_expand_on_empty_coords_array
    assert_equal 0, expand([], 0)
    assert_equal 0, expand([], 1)
    assert_equal 0, expand([], 2)
  end

  def test_expand_on_one_coord
    assert_equal 0, expand([Point.new(0, 0)], 0)
    assert_equal 1, expand([Point.new(0, 0)], 1)
    assert_equal 5, expand([Point.new(0, 0)], 2)
    assert_equal 13, expand([Point.new(0, 0)], 3)
  end

  def test_expand_general_1
    assert_equal 0, expand([Point.new(0, 0), Point.new(1, 1), Point.new(0, 1), Point.new(1, 0)], 0)
    assert_equal 0, expand([Point.new(0, 0), Point.new(1, 1), Point.new(0, 1), Point.new(1, 0)], 1)
    assert_equal 0, expand([Point.new(0, 0), Point.new(1, 1), Point.new(0, 1), Point.new(1, 0)], 2)
    assert_equal 0, expand([Point.new(0, 0), Point.new(1, 1), Point.new(0, 1), Point.new(1, 0)], 3)
    assert_equal 0, expand([Point.new(0, 0), Point.new(1, 1), Point.new(0, 1), Point.new(1, 0)], 4)
    assert_equal 4, expand([Point.new(0, 0), Point.new(1, 1), Point.new(0, 1), Point.new(1, 0)], 5)
  end

  def test_expand_general_2
    assert_equal 0, expand([Point.new(0, 0), Point.new(2, 2), Point.new(0, 2), Point.new(2, 0)], 0)
    assert_equal 0, expand([Point.new(0, 0), Point.new(2, 2), Point.new(0, 2), Point.new(2, 0)], 1)
    assert_equal 0, expand([Point.new(0, 0), Point.new(2, 2), Point.new(0, 2), Point.new(2, 0)], 2)
    assert_equal 0, expand([Point.new(0, 0), Point.new(2, 2), Point.new(0, 2), Point.new(2, 0)], 3)
    assert_equal 0, expand([Point.new(0, 0), Point.new(2, 2), Point.new(0, 2), Point.new(2, 0)], 4)
    assert_equal 0, expand([Point.new(0, 0), Point.new(2, 2), Point.new(0, 2), Point.new(2, 0)], 5)
    assert_equal 0, expand([Point.new(0, 0), Point.new(2, 2), Point.new(0, 2), Point.new(2, 0)], 6)
    assert_equal 0, expand([Point.new(0, 0), Point.new(2, 2), Point.new(0, 2), Point.new(2, 0)], 7)
    assert_equal 0, expand([Point.new(0, 0), Point.new(2, 2), Point.new(0, 2), Point.new(2, 0)], 8)
    assert_equal 9, expand([Point.new(0, 0), Point.new(2, 2), Point.new(0, 2), Point.new(2, 0)], 9)
    assert_equal 9, expand([Point.new(0, 0), Point.new(2, 2), Point.new(0, 2), Point.new(2, 0)], 10)
    assert_equal 9, expand([Point.new(0, 0), Point.new(2, 2), Point.new(0, 2), Point.new(2, 0)], 11)
    assert_equal 9, expand([Point.new(0, 0), Point.new(2, 2), Point.new(0, 2), Point.new(2, 0)], 12)
    assert_equal 21, expand([Point.new(0, 0), Point.new(2, 2), Point.new(0, 2), Point.new(2, 0)], 13)
  end

  def test_expand_on_sample_correctly
    assert_equal 16, expand([Point.new(1, 1), Point.new(1, 6), Point.new(8, 3), Point.new(3, 4), Point.new(5, 5), Point.new(8, 9)], 32)
  end
end
