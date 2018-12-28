import std.algorithm;
import std.array;
import std.format;
import std.stdio;
import std.typecons;

struct guard
{
    int id;
    int sleep_time = 0;
    int[60] sleep_count;
}

unittest
{
    writeln("Unittesting...");
}

int main(string[] args)
{
    if (args.length < 2 || args.length > 3) {
        writeln("usage: <input file> <optional output file>");
        return 1;
    }

    auto events = events_preprocess(args[1]);
    auto guard_info = events_longest_asleep(events);

    if (args.length == 3) {
        auto fout = File(args[2], "w");
	scope (exit) fout.close();
	fout.writeln(guard_info.id * guard_info.time);
    } else {
        writeln(guard_info.id * guard_info.time);
    }

    return 0;
}

auto events_preprocess(string file_name)
{
    auto fin = File(file_name, "r");
    scope (exit) fin.close();

    string s;
    auto events_appender = appender!(string[])();
    while ((s = fin.readln()) !is null) {
        events_appender.put(s[0 .. s.length-1]);
    }

    auto events = events_appender.data;
    events.sort!();
    return events;
}

unittest
{
    void test_preprocess(string test_file, string test_expected_file)
    {
	auto f = File(test_expected_file, "r");
        string s;
        auto events_appender = appender!(string[])();
        while ((s = f.readln()) !is null) {
            events_appender.put(s[0 .. s.length-1]);
        }
        auto test_expected_output = events_appender.data;

	auto test_actual_output = events_preprocess(test_file);

	assert(test_actual_output.length == test_expected_output.length,
	    format!"Length of actual and expected output string array differs:
	        \n\texpected: %d\n\tactual: %d"(
	        test_expected_output.length, test_actual_output.length));
	for (int i = 0; i < test_expected_output.length; i++)
	    assert (!test_expected_output[i].cmp(test_actual_output[i]),
	        format!"String differ at index %d:\n\texpected: %s\n\tactual:%s"(
		i, test_expected_output[i], test_actual_output[i]));
    }
    
    writeln("Testing preprocessing of input.");
    write("Sort on 1 element... ");
    test_preprocess("tests/1.txt", "tests/1_sort_expected.txt");
    writeln("Success.");
    write("Sort on more elements, no falls asleep or wakes up... ");
    test_preprocess("tests/2.txt", "tests/2_sort_expected.txt");
    writeln("Success.");
    write("General inputs... ");
    test_preprocess("tests/3.txt", "tests/3_sort_expected.txt");
    test_preprocess("tests/4.txt", "tests/4_sort_expected.txt");
    test_preprocess("tests/5.txt", "tests/5_sort_expected.txt");
    test_preprocess("tests/6.txt", "tests/6_sort_expected.txt");
    writeln("Success.");
}

auto events_longest_asleep(string[] events)
{
    guard[int] guards;
    guard *sleepy_guard = null;
    int cur_guard = -1;
    int prev = -1;
    foreach (string e; events) {
        int year, month, day, hour, minute;
	string type;
	e.formattedRead!"[%d-%d-%d %d:%d] %s"(
	    year, month, day, hour, minute, type);
	if (!type.cmp("falls asleep")) {
	    assert(cur_guard != -1, "Need guard id to fall asleep.");
	    assert(prev == -1, "Current guard is already asleep.");

	    prev = minute;
	} else if (!type.cmp("wakes up")) {
	    assert(cur_guard != -1, "Need guard id to wake up.");
	    assert(cur_guard in guards, "Guard cannot be found in set.");
	    assert(prev != -1, "Current guard is not yet asleep.");

	    for (int i = prev; i < minute; i++)
		guards[cur_guard].sleep_count[i]++;
	    guards[cur_guard].sleep_time += minute - prev;
	    prev = -1;
	    
	    if (sleepy_guard == null ||
	            sleepy_guard.sleep_time < guards[cur_guard].sleep_time)
		sleepy_guard = &guards[cur_guard];
	} else {
	    type.formattedRead!"Guard #%d begins shift"(cur_guard);
	    guard new_guard;
	    new_guard.id = cur_guard;
	    guards.require(cur_guard, new_guard);
	}
    }

    auto guard_info = tuple!("id", "time")(-1, -1);
    if (sleepy_guard == null)
	return guard_info;

    guard_info.id = sleepy_guard.id;
    int sleepiest_time = 0;
    for (int i = 1; i < 60; i++)
        if (sleepy_guard.sleep_count[sleepiest_time] < sleepy_guard.sleep_count[i])
	    sleepiest_time = i;
    guard_info.time = sleepiest_time;

    return guard_info;
}

unittest
{
    void test_guard(string test_file, Tuple!(int, "id", int, "time") test_expected_output)
    {
	auto test_preprocess_output = events_preprocess(test_file);
        auto test_actual_output = events_longest_asleep(test_preprocess_output);

	assert(test_actual_output.id == test_expected_output.id,
	    format!"Guard id differs:\n\texpected: %d\n\tactual: %d"(
	        test_expected_output.id, test_actual_output.id));
	assert(test_actual_output.time == test_expected_output.time,
	    format!"Guard most asleep time differs:\n\texpected: %d\n\tactual: %d"(
	        test_expected_output.time, test_actual_output.time));
    }
    
    writeln("Testing function to get the guard the slept the most.");
    write("One element, no sleep... ");
    test_guard("tests/1.txt", tuple!("id", "time")(-1, -1));
    writeln("Success.");
    write("Multiple elements, no sleep... ");
    test_guard("tests/2.txt", tuple!("id", "time")(-1, -1));
    writeln("Success.");
    write("Sleep once each... ");
    test_guard("tests/3.txt", tuple!("id", "time")(18, 20));
    writeln("Success.");
    write("Sleep twice on same day... ");
    test_guard("tests/4.txt", tuple!("id", "time")(1238, 15));
    writeln("Success.");
    write("Sleep twice different day... ");
    test_guard("tests/5.txt", tuple!("id", "time")(18, 20));
    writeln("Success.");
    write("Example input... ");
    test_guard("tests/6.txt", tuple!("id", "time")(10, 24));
    writeln("Success.");
}

unittest
{
    writeln("Unittesting complete.");
}
