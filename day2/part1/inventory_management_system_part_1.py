import argparse

def process(f):
    lines = []
    with open(f, 'r') as inf:
        for line in inf:
            lines.append(line.strip())
    return lines

def checksum(lines):
    twos = 0
    threes = 0
    for line in lines:
        pairs = {}
        for c in line:
            if c in pairs:
                pairs[c] += 1
            else:
                pairs[c] = 1
        twos_added = False
        threes_added = False
        for k, v in pairs.items():
            if not twos_added and v == 2:
                twos += 1
                twos_added = True
            elif not threes_added and v == 3:
                threes += 1
                threes_added = True
    return twos * threes

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Advent of Code Day 2 Part 1 Checksum")
    parser.add_argument('input_file', type=str, help='input of text for the checksum')
    parser.add_argument('-of', '--output', dest='output_file', type=str, default=None, help='output the checksum to a file')
    args = parser.parse_args()

    lines = process(args.input_file)
    if args.output_file:
        with open(args.output_file, 'w') as f:
            f.write(str(checksum(lines)))
    else:
        print(checksum(lines))
