import argparse

def process(f):
    lines = []
    with open(f, 'r') as inf:
        for line in inf:
            lines.append(line.strip())
    return lines

# O(N^2 * str_length)
def common(lines):
    for i in range(len(lines)):
        for j in range(i + 1, len(lines)):
            diff = 0
            pos = -1
            for k in range(len(lines[i])):
                if lines[i][k] != lines[j][k]:
                    diff += 1
                    pos = k
            if diff == 1:
                return lines[i][:pos] + lines[i][pos+1:]
    return ""

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Advent of Code Day 2 Part 2 Common")
    parser.add_argument('input_file', type=str, help='input of text for the common')
    parser.add_argument('-of', '--output', dest='output_file', type=str, default=None, help='output the common to a file')
    args = parser.parse_args()

    lines = process(args.input_file)
    if args.output_file:
        with open(args.output_file, 'w') as f:
            f.write(common(lines))
    else:
        print(common(lines))
