require File.expand_path("../lib/coord.rb")

def parse(str)
  tmp_pair = str.split(/, /)
  pt = Point.new(tmp_pair[0].to_i, tmp_pair[1].to_i)
  return pt
end

def block_test(a, b)
  raise "Cannot have same points for block_test(a, b)" unless a.x != b.x or a.y != b.y
  if a.x > b.x
    if a.y > b.y
      if a.y - b.y == a.x - b.x
        a.blx = true
	a.buy = true
	b.brx = true
	b.bdy = true
      elsif a.y - b.y > a.x - b.x
        a.buy = true
	b.bdy = true
      else
        a.blx = true
	b.brx = true
      end
    else
      if b.y - a.y == a.x - b.x
        a.blx = true
        a.bdy = true
	b.brx = true
	b.buy = true
      elsif b.y - a.y > a.x - b.x
	a.bdy = true
	b.buy = true
      else
        a.blx = true
        b.brx = true
      end
    end
  else
    if a.y > b.y
      if a.y - b.y == b.x - a.x
        a.brx = true
	a.buy = true
	b.blx = true
	b.bdy = true
      elsif a.y - b.y > b.x - a.x
        a.buy = true
	b.bdy = true
      else
        a.brx = true
	b.blx = true
      end
    else
      if b.y - a.y == b.x - a.x
        a.brx = true
        a.bdy = true
	b.blx = true
	b.buy = true
      elsif b.y - a.y > b.x - a.x
	a.bdy = true
	b.buy = true
      else
        a.brx = true
        b.blx = true
      end
    end
  end
end

def expand(coords, debug=false)
  for i in (0..coords.length-1)
    for j in (i+1..coords.length-1)
      block_test(coords[i], coords[j])
    end
  end

  min_x = nil
  min_y = nil
  max_x = nil
  max_y = nil
  ownership = Hash.new
  claim = Array.new(coords.length) {0}

  for i in (0..coords.length-1)
    if coords[i].blx and coords[i].brx and coords[i].buy and coords[i].bdy
      q = Queue.new
      q << Coord.new(coords[i].x, coords[i].y)

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

        if not ownership.has_key?(c)
          min_dist = -1
	  owner = -1
	  for j in (0..coords.length-1)
	    if min_dist == -1 || c.dist(coords[j]) < min_dist
              min_dist = c.dist(coords[j])
	      owner = j
            elsif min_dist == c.dist(coords[j])
              owner = -1
	    end
	  end
	  if owner == i
            ownership[c] = owner
	    claim[i] += 1
	    q << Coord.new(c.x+1, c.y)
	    q << Coord.new(c.x-1, c.y)
	    q << Coord.new(c.x, c.y+1)
	    q << Coord.new(c.x, c.y-1)
          end
        end
      end
    else
      if debug
        claim[i] += 1
        ownership[Coord.new(coords[i].x, coords[i].y)] = i
	if max_x == nil or coords[i].x > max_x
	  max_x = coords[i].x
	end
	if min_x == nil or coords[i].x < min_x
          min_x = coords[i].x
	end
	if max_y == nil or coords[i].y > max_y
	  max_y = coords[i].y
	end
	if min_y == nil or coords[i].y < min_y
          min_y = coords[i].y
	end
      end
    end
  end

  if debug
    for j in (min_y..max_y)
      for i in (min_x..max_x)
        if ownership.has_key?(Coord.new(i, j))
          print ownership[Coord.new(i, j)]
        else
          print "#"
        end
      end
      print "\n"
    end
  end

  res = claim.max
  return res ? res : 0
end
