package day1.part2;

import java.io.IOException;
import java.io.File;

import org.junit.Test;
import org.junit.Assert;

public class TestChronalCalibration {
    @Test
    public void TestShouldSumNoChanges() {
        int[] arr = new int[0];
        int expectedSum = -1;

        int actualSum = ChronalCalibration.sum(arr);

        Assert.assertEquals(actualSum, expectedSum);
    }

    @Test
    public void TestShouldSumToFirstRepeat() {
        int[] arr = {10, 20, 30, -40, -10, 60, -90, -23, 345, 123};
        int expectedSum = 10;

        int actualSum = ChronalCalibration.sum(arr);

        Assert.assertEquals(actualSum, expectedSum);
    }

    @Test
    public void TestShouldSumToFirstRepeatInLoop() {
        int[] arr = {3, 3, 4, -2, -4};
        int expectedSum = 10;

        int actualSum = ChronalCalibration.sum(arr);

        Assert.assertEquals(actualSum, expectedSum);
    }

    @Test
    public void TestShouldSumToFirstRepeatInTwoLoops() {
        int[] arr = {-6, 3, 8, 5, -6};
        int expectedSum = 5;

        int actualSum = ChronalCalibration.sum(arr);

        Assert.assertEquals(actualSum, expectedSum);
    }

    @Test
    public void TestShouldSumToFirstRepeatInThreeLoops() {
        int[] arr = {7, 7, -2, -7, -4};
        int expectedSum = 14;

        int actualSum = ChronalCalibration.sum(arr);

        Assert.assertEquals(actualSum, expectedSum);
    }

    @Test
    public void TestShouldSumToFirstRepeatInManyLoops() {
        int[] arr = {100, -99};
        int expectedSum = 100;

        int actualSum = ChronalCalibration.sum(arr);

        Assert.assertEquals(actualSum, expectedSum);
    }
}
