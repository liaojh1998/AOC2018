using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace part2
{
    public class MarbleMania
    {
        public static int Main(string[] args)
        {
            if (args.Length < 1 || args.Length > 2)
            {
                Console.WriteLine("usage: Part2 <input file> <optional output file>");
                return 1;
            }

            StreamReader input = new StreamReader(args[0]);
            string line = input.ReadLine();
            input.Close();

            string[] values = line.Split(' ');
            int players = int.Parse(values[0]);
            long marbles = long.Parse(values[values.Length - 2]) * 100;

            if (args.Length == 2)
            {
                StreamWriter output = new StreamWriter(args[1]);
                output.WriteLine(Simulate(players, marbles));
                output.Close();
            }
            else
            {
                Console.WriteLine(Simulate(players, marbles));
            }
            return 0;
        }

        public static long Simulate(int players, long marbles_count)
        {
            LinkedList<long> marbles = new LinkedList<long>();
            if (players <= 0)
                return 0;
            long[] player_scores = new long[players];

            int player = 0;
            LinkedListNode<long> marble = marbles.AddFirst(0);
            for (long i = 1; i <= marbles_count; i++)
            {
                if (i % 23 == 0)
                {
                    player_scores[player] += i;
                    for (int j = 0; j < 6; j++)
                    {
                        if (marble.Previous == null)
                        {
                            marble = marbles.Last;
                        }
                        else
                        {
                            marble = marble.Previous;
                        }
                    }
                    if (marble.Previous == null)
                    {
                        player_scores[player] += marbles.First.Value;
                        marbles.RemoveFirst();
                    }
                    else
                    {
                        player_scores[player] += marble.Previous.Value;
                        marbles.Remove(marble.Previous);
                    }
                }
                else
                {
                    if (marble.Next == null)
                    {
                        marble = marbles.AddAfter(marbles.First, i);
                    }
                    else
                    {
                        marble = marbles.AddAfter(marble.Next, i);
                    }
                }
                player = (player + 1) % players;
            }

            return player_scores.Max();
        }
    }
}
