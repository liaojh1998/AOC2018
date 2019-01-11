using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace part2
{
    [TestClass]
    public class Part2UnitTests
    {
        [TestMethod]
        public void TestSimulateShouldHandleNoPlayersCase()
        {
            long expectedSimulation = 0;
            long actualSimulation = MarbleMania.Simulate(0, 10);
            Assert.AreEqual(expectedSimulation, actualSimulation);
        }

        [TestMethod]
        public void TestSimulateShouldHandleNoMarblesCase()
        {
            long expectedSimulation = 0;
            long actualSimulation = MarbleMania.Simulate(10, 0);
            Assert.AreEqual(expectedSimulation, actualSimulation);
        }

        [TestMethod]
        public void TestSimulateShouldCirculateOnceButReturnNoHighScore()
        {
            long expectedSimulation = 0;
            long actualSimulation = MarbleMania.Simulate(1, 10);
            Assert.AreEqual(expectedSimulation, actualSimulation);
        }

        [TestMethod]
        public void TestSimulateShouldHandleExampleCaseForOneLoopWithActualHighScore()
        {
            long expectedSimulation = 32;
            long actualSimulation = MarbleMania.Simulate(9, 25);
            Assert.AreEqual(expectedSimulation, actualSimulation);
        }

        [TestMethod]
        public void TestSimulateShouldHandleExampleGeneralCase1()
        {
            long expectedSimulation = 8317;
            long actualSimulation = MarbleMania.Simulate(10, 1618);
            Assert.AreEqual(expectedSimulation, actualSimulation);
        }

        [TestMethod]
        public void TestSimulateShouldHandleExampleGeneralCase2()
        {
            long expectedSimulation = 146373;
            long actualSimulation = MarbleMania.Simulate(13, 7999);
            Assert.AreEqual(expectedSimulation, actualSimulation);
        }

        [TestMethod]
        public void TestSimulateShouldHandleExampleGeneralCase3()
        {
            long expectedSimulation = 2764;
            long actualSimulation = MarbleMania.Simulate(17, 1104);
            Assert.AreEqual(expectedSimulation, actualSimulation);
        }

        [TestMethod]
        public void TestSimulateShouldHandleExampleGeneralCase4()
        {
            long expectedSimulation = 54718;
            long actualSimulation = MarbleMania.Simulate(21, 6111);
            Assert.AreEqual(expectedSimulation, actualSimulation);
        }

        [TestMethod]
        public void TestSimulateShouldHandleExampleGeneralCase5()
        {
            long expectedSimulation = 37305;
            long actualSimulation = MarbleMania.Simulate(30, 5807);
            Assert.AreEqual(expectedSimulation, actualSimulation);
        }
    }
}