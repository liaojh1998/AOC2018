package day1.part2;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;

public class ChronalCalibration {

    public static int sum(int[] arr) {
        HashSet<Integer> set = new HashSet<Integer>();
	set.add(0);
	int cur = 0;
        for (int i = 0; i < arr.length; i = (i + 1) % arr.length) {
            cur += arr[i];
            if (set.contains(cur))
		return cur;
	    set.add(cur);
	}
	return -1; // Only reaches here if length == 0
    }

    public static void main(String[] args) throws IOException {
        if (args.length < 1)
            throw new IOException("Need to specify an input file path.");

        // Read frequency changes and convert them to integers.
        BufferedReader fin = new BufferedReader(new FileReader(new File(args[0])));
        try {
            ArrayList<Integer> buffer = new ArrayList<Integer>();
        
            String str;
            while ((str = fin.readLine()) != null)
                if (str.length() < 1)
                    throw new IOException("Detected invalid input: " + str + ".");
                else if (str.charAt(0) == '+')
                    buffer.add(Integer.valueOf(str.substring(1)));
                else
                    buffer.add(Integer.valueOf(str));
        
            int[] arr = new int[buffer.size()];
            for (int i = 0; i < buffer.size(); i++)
                arr[i] = buffer.get(i);

            // Write the first re-encountered summation of frequency changes.
            if (args.length == 2) {
                BufferedWriter fout = new BufferedWriter(new FileWriter(new File(args[1])));
                try {
                    fout.write(String.valueOf(sum(arr)) + "\n");
                } finally {
                    fout.close();
                }
            } else
                System.out.println(sum(arr));
        } finally {
            fin.close();
        }
    }
}
