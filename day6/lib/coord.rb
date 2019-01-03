Coord = Struct.new(:x, :y) do
  def initialize(x_t, y_t)
    super(x_t, y_t)
  end
  def dist(other)
    return (x - other.x).abs + (y - other.y).abs
  end
end

class Point < Coord
  attr_accessor :brx, :blx, :buy, :bdy
  def initialize(x_t, y_t)
    super(x_t, y_t)
    @brx, @blx, @buy, @bdy = false, false, false, false
  end
end
