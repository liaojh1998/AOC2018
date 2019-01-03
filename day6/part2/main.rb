require File.expand_path("../expand.rb", __FILE__)

######## Main ########
if ARGV.length < 2 or ARGV.length > 3
  abort "usage: ruby main.rb <threshold> <input file> <optional output file>"
end

inputs = Array.new
threshold = ARGV[0].to_i

open(ARGV[1], "r") do |f|
  while (line = f.gets) != nil do
    inputs << parse(line)
  end
end

if ARGV.length == 3
  open(ARGV[2], "w") do |f|
    f.write(expand(inputs, threshold))
  end
else
  printf "%d\n", expand(inputs, threshold)
end
######################
