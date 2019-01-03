require 'set'
require File.expand_path("../lib/coord.rb")

def parse(str)
  tmp_pair = str.split(/, /)
  pt = Coord.new(tmp_pair[0].to_i, tmp_pair[1].to_i)
  return pt
end

def expand(coords, threshold, debug=false)
  mid_x = 0
  mid_y = 0
  for i in (0..coords.length-1)
    mid_x += coords[i].x
    mid_y += coords[i].y
  end

  # Heuristic start point
  if coords.length != 0
    mid_x /= coords.length
    mid_y /= coords.length
  end

  min_x = nil
  min_y = nil
  max_x = nil
  max_y = nil
  
  set = Set.new
  if coords.length != 0
    q = Queue.new
    q << Coord.new(mid_x, mid_y)
    while not q.empty?
      c = q.pop
      if debug
        if max_x == nil or c.x > max_x
	  max_x = c.x
        end
        if min_x == nil or c.x < min_x
          min_x = c.x
        end
        if max_y == nil or c.y > max_y
	  max_y = c.y
        end
        if min_y == nil or c.y < min_y
          min_y = c.y
        end
      end

      if not set.include?(c)
        dist = 0
        for i in (0..coords.length-1)
	  dist += c.dist(coords[i])
        end

        if dist < threshold
	  set.add(c)
          q << Coord.new(c.x+1, c.y)
	  q << Coord.new(c.x-1, c.y)
	  q << Coord.new(c.x, c.y+1)
	  q << Coord.new(c.x, c.y-1)
        end
      end
    end

    if debug
      for j in (min_y..max_y)
        for i in (min_x..max_x)
	  coord = -1
	  for k in (0..coords.length-1)
            if coords[k].x == i and coords[k].y == j
	      coord = k
            end
	  end
          if coord == -1
            if set.include?(Coord.new(i, j))
              print "#"
            else
              print "."
            end
	  else
            print coord
	  end
        end
        print "\n"
      end
    end
  end

  return set.size
end
