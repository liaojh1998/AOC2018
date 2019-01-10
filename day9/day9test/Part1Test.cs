using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace part1
{
    [TestClass]
    public class Part1UnitTests
    {
        [TestMethod]
        public void TestSimulateShouldHandleNoPlayersCase()
        {
            int expectedSimulation = 0;
            int actualSimulation = MarbleMania.Simulate(0, 10);
            Assert.AreEqual(expectedSimulation, actualSimulation);
        }

        [TestMethod]
        public void TestSimulateShouldHandleNoMarblesCase()
        {
            int expectedSimulation = 0;
            int actualSimulation = MarbleMania.Simulate(10, 0);
            Assert.AreEqual(expectedSimulation, actualSimulation);
        }

        [TestMethod]
        public void TestSimulateShouldCirculateOnceButReturnNoHighScore()
        {
            int expectedSimulation = 0;
            int actualSimulation = MarbleMania.Simulate(1, 10);
            Assert.AreEqual(expectedSimulation, actualSimulation);
        }

        [TestMethod]
        public void TestSimulateShouldHandleExampleCaseForOneLoopWithActualHighScore()
        {
            int expectedSimulation = 32;
            int actualSimulation = MarbleMania.Simulate(9, 25);
            Assert.AreEqual(expectedSimulation, actualSimulation);
        }

        [TestMethod]
        public void TestSimulateShouldHandleExampleGeneralCase1()
        {
            int expectedSimulation = 8317;
            int actualSimulation = MarbleMania.Simulate(10, 1618);
            Assert.AreEqual(expectedSimulation, actualSimulation);
        }

        [TestMethod]
        public void TestSimulateShouldHandleExampleGeneralCase2()
        {
            int expectedSimulation = 146373;
            int actualSimulation = MarbleMania.Simulate(13, 7999);
            Assert.AreEqual(expectedSimulation, actualSimulation);
        }

        [TestMethod]
        public void TestSimulateShouldHandleExampleGeneralCase3()
        {
            int expectedSimulation = 2764;
            int actualSimulation = MarbleMania.Simulate(17, 1104);
            Assert.AreEqual(expectedSimulation, actualSimulation);
        }

        [TestMethod]
        public void TestSimulateShouldHandleExampleGeneralCase4()
        {
            int expectedSimulation = 54718;
            int actualSimulation = MarbleMania.Simulate(21, 6111);
            Assert.AreEqual(expectedSimulation, actualSimulation);
        }

        [TestMethod]
        public void TestSimulateShouldHandleExampleGeneralCase5()
        {
            int expectedSimulation = 37305;
            int actualSimulation = MarbleMania.Simulate(30, 5807);
            Assert.AreEqual(expectedSimulation, actualSimulation);
        }
    }
}