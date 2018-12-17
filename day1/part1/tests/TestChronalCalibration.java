package part1;

import java.io.IOException;
import java.io.File;

import org.junit.Test;
import org.junit.Assert;

public class TestChronalCalibration {
    @Test
    public void TestShouldSumNoChanges() {
        int[] arr = new int[0];
        int expectedSum = 0;

        int actualSum = ChronalCalibration.sum(arr);

        Assert.assertEquals(actualSum, expectedSum);
    }

    @Test
    public void TestShouldSumCorrectly() {
        int[] arr = {10, 20, 30, -40, -10, 60, -90, -23, 345, 123};
        int expectedSum = 425;

        int actualSum = ChronalCalibration.sum(arr);

        Assert.assertEquals(actualSum, expectedSum);
    }
}
