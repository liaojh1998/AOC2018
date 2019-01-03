package day1.part1;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;

public class ChronalCalibration {

    public static int sum(int[] arr) {
        int ans = 0;
        for (int i = 0; i < arr.length; i++)
            ans += arr[i];
        return ans;
    }

    public static void main(String[] args) throws IOException {
        if (args.length < 1)
            throw new IOException("usage: java day1.part1.ChroncalCalibration <input file> <optional output file>");

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

            // Write the summation of frequency changes.
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
