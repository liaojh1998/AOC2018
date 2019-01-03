require File.expand_path("../../coord.rb", __FILE__)
require "minitest/autorun"

class TestParse < Minitest::Test
  parallelize_me!

  def test_parse
    @pt1 = parse("-3, 5")
    @pt2 = parse("4, -6")
    assert_equal (-3), @pt1.x
    assert_equal 5, @pt1.y
    assert_equal 4, @pt2.x
    assert_equal (-6), @pt2.y
  end
end
