import unittest
from inventory_management_system_part_1 import checksum

class TestInventoryManagementSystem(unittest.TestCase):
    
    def test_should_correctly_checksum_nothing(self):
        expected_checksum = 0
        actual_checksum = checksum([])

        self.assertEqual(actual_checksum, expected_checksum)

    def test_should_correctly_checksum_no_twos_or_threes(self):
        expected_checksum = 0
        actual_checksum = checksum(['ardmst', 'poleca', 'qwierp', 'aaaaaa', 'bbbbbb', 'daddbd'])

        self.assertEqual(actual_checksum, expected_checksum)

    def test_should_correctly_checksum_twos_and_threes(self):
        expected_checksum = 4
        actual_checksum = checksum(['ababab', 'cdcdcd', 'aababb', 'cccddd', 'abacdc', 'eeeeee'])

        self.assertEqual(actual_checksum, expected_checksum)
