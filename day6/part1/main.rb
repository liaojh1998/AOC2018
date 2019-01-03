require File.expand_path("../expand.rb", __FILE__)

######## Main ########
if ARGV.length < 1 or ARGV.length > 2
  abort "usage: ruby main.rb <input file> <optional output file>"
end

inputs = Array.new

open(ARGV[0], "r") do |f|
  while (line = f.gets) != nil do
    inputs << parse(line)
  end
end

if ARGV.length == 2
  open(ARGV[1], "w") do |f|
    f.write(expand(inputs))
  end
else
  printf "%d\n", expand(inputs)
end
######################
