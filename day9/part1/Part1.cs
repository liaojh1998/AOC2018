using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace part1
{
    public class MarbleMania
    {
        public static int Main(string[] args)
        {
            if (args.Length < 1 || args.Length > 2)
            {
                Console.WriteLine("usage: Part1 <input file> <optional output file>");
                return 1;
            }

            StreamReader input = new StreamReader(args[0]);
            string line = input.ReadLine();
            input.Close();

            string[] values = line.Split(' ');
            int players = int.Parse(values[0]);
            int marbles = int.Parse(values[values.Length - 2]);

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

        public static int Simulate(int players, int marbles_count)
        {
            LinkedList<int> marbles = new LinkedList<int>();
            if (players <= 0)
                return 0;
            int[] player_scores = new int[players];

            int player = 0;
            LinkedListNode<int> marble = marbles.AddFirst(0);
            for (int i = 1; i <= marbles_count; i++)
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
