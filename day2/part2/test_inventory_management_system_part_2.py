import unittest
from inventory_management_system_part_2 import common

class TestInventoryManagementSystem(unittest.TestCase):
    
    def test_should_correctly_common_nothing(self):
        expected_common = ""
        actual_common = common([])

        self.assertEqual(actual_common, expected_common)

    def test_should_correctly_common_nothing_when_more_than_one_diff(self):
        expected_common = ""
        actual_common = common(['ardmst', 'poleca', 'qwierp', 'aaaaaa', 'bbbbbb', 'daddbd'])

        self.assertEqual(actual_common, expected_common)

    def test_should_correctly_common_nothing_when_everything_matches(self):
        expected_common = ""
        actual_common = common(['ababab', 'ababab', 'ababab', 'ababab', 'ababab', 'ababab'])

        self.assertEqual(actual_common, expected_common)

    def test_should_correctly_common_on_one_diff_1(self):
        expected_common = 'fgij'
        actual_common = common(['abcde', 'fghij', 'klmno', 'pqrst', 'fguij', 'axcye', 'wvxyz'])

        self.assertEqual(actual_common, expected_common)

    def test_should_correctly_common_on_one_diff_2(self):
        expected_common = 'ardmcstskak'
        actual_common = common(['ardmssstscak', 'ardmcsstskak', 'ardmcsskscak', 'ardmssrtscrk', 'ardmcsskscak', 'ardmcsstskak', 'ardmcpstskak'])

        self.assertEqual(actual_common, expected_common)
