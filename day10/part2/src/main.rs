use std::env;
use std::fs::File;
use std::io::Write;
use std::io::BufRead;
use std::io::BufReader;
use std::collections::hash_set::HashSet;

#[derive(Copy, Debug, Eq)]
pub struct Coord {
    pub x: i64,
    pub y: i64,
    pub vx: i64,
    pub vy: i64,
}

impl Clone for Coord {
    fn clone(&self) -> Coord { *self }
}

impl PartialEq for Coord {
    fn eq(&self, other: &Coord) -> bool {
        self.x == other.x && self.y == other.y && self.vx == other.vx && self.vy == other.vy
    }
}

fn main() -> std::io::Result<()> {
    let args: Vec<String> = env::args().collect();
    if args.len() < 2 || args.len() > 3 {
        panic!("usage: cargo run <input file> <optional output file>");
    }

    let reader = BufReader::new(File::open(&args[1])?);
    let input: Vec<Coord> = reader.lines()
        .map(|l| parse_line(l.unwrap()))
        .collect();
    let (s, best) = find(input);
    let g = graph(best);
    
    if args.len() == 3 {
        let mut output = File::create(&args[2])?;
        output.write_fmt(format_args!("{} seconds required\n", s))?;
        for line in g {
            output.write_fmt(format_args!("{}\n", line))?;
        }
    } else {
        println!("{} seconds required\n", s);
        for line in g {
            println!("{}", line);
        }
    }
    Ok(())
}

fn parse_line(line: String) -> Coord {
    let res: Vec<_> = line
        .split(|c| c == '<' || c == ',' || c == '>')
        .collect();
    let x = res[1].trim().parse();
    let y = res[2].trim().parse();
    let vx = res[4].trim().parse();
    let vy = res[5].trim().parse();
    if x.is_err() {
        panic!("cannot parse x for \"{}\"", line);
    }
    if y.is_err() {
        panic!("cannot parse y for \"{}\"", line);
    }
    if vx.is_err() {
        panic!("cannot parse vx for \"{}\"", line);
    }
    if vy.is_err() {
        panic!("cannot parse vy for \"{}\"", line);
    }
    Coord {
        x: x.unwrap(),
        y: y.unwrap(),
        vx: vx.unwrap(),
        vy: vy.unwrap(),
    }
}

#[cfg(test)]
mod parse_line_tests {
    use super::*;

    #[test]
    fn parse_line_should_successfully_parse_one_coordinate() {
        let test_string = "position=<-1,  4> velocity=< 3, -4>".to_string();
        let expected_coord = Coord {
            x: -1,
            y: 4,
            vx: 3,
            vy: -4,
        };

        let actual_coord = parse_line(test_string);
        assert_eq!(expected_coord, actual_coord);
    }

    #[test]
    fn parse_line_should_successfully_parse_one_coordinate_2() {
        let test_string = "position=< 1, -4> velocity=<-3,  4>".to_string();
        let expected_coord = Coord {
            x: 1,
            y: -4,
            vx: -3,
            vy: 4,
        };

        let actual_coord = parse_line(test_string);
        assert_eq!(expected_coord, actual_coord);
    }

    #[test]
    #[should_panic(expected = "cannot parse x for \"position=<  , -4> velocity=<-3,  4>\"")]
    fn parse_line_should_fail_to_parse_x_on_bad_input() {
        let test_string = "position=<  , -4> velocity=<-3,  4>".to_string();
        parse_line(test_string);
    }

    #[test]
    #[should_panic(expected = "cannot parse y for \"position=< 3,   > velocity=<-3,  4>\"")]
    fn parse_line_should_fail_to_parse_y_on_bad_input() {
        let test_string = "position=< 3,   > velocity=<-3,  4>".to_string();
        parse_line(test_string);
    }

    #[test]
    #[should_panic(expected = "cannot parse vx for \"position=< 3, -4> velocity=<  ,  4>\"")]
    fn parse_line_should_fail_to_parse_vx_on_bad_input() {
        let test_string = "position=< 3, -4> velocity=<  ,  4>".to_string();
        parse_line(test_string);
    }

    #[test]
    #[should_panic(expected = "cannot parse vy for \"position=< 3, -4> velocity=<-3,  >\"")]
    fn parse_line_should_fail_to_parse_vy_on_bad_input() {
        let test_string = "position=< 3, -4> velocity=<-3,  >".to_string();
        parse_line(test_string);
    }

    #[test]
    #[should_panic(expected = "cannot parse x for \"stjksdf < >  < < < >> , , 7w9er7 jkerns sdf \"")]
    fn parse_line_should_fail_to_parse_arguments_on_simply_bad_input() {
        let test_string = "stjksdf < >  < < < >> , , 7w9er7 jkerns sdf ".to_string();
        parse_line(test_string);
    }
}

fn corners(coords: &Vec<Coord>) -> (i64, i64, i64, i64) {
    if coords.len() == 0 {
        return (0, 0, 0, 0);
    }

    let mut has_min_x = false;
    let mut min_x: i64 = 0;
    let mut has_min_y = false;
    let mut min_y: i64 = 0;
    let mut has_max_x = false;
    let mut max_x: i64 = 0;
    let mut has_max_y = false;
    let mut max_y: i64 = 0;

    for coord in coords {
        let x = coord.x;
        let y = coord.y;
        if !has_min_x || min_x > x {
            has_min_x = true;
            min_x = x;
        }
        if !has_max_x || max_x < x {
            has_max_x = true;
            max_x = x;
        }
        if !has_min_y || min_y > y {
            has_min_y = true;
            min_y = y;
        }
        if !has_max_y || max_y < y {
            has_max_y = true;
            max_y = y;
        }
    }
    (min_x, max_x, min_y, max_y)
}

#[cfg(test)]
mod corners_tests {
    use super::*;

    #[test]
    fn corners_should_find_corners_of_no_coordinates() {
        let test_coords: Vec<Coord> = Vec::new();
        let expected_min_x = 0;
        let expected_max_x = 0;
        let expected_min_y = 0;
        let expected_max_y = 0;

        let (actual_min_x, actual_max_x, actual_min_y, actual_max_y) = corners(&test_coords);

        assert_eq!(expected_min_x, actual_min_x);
        assert_eq!(expected_max_x, actual_max_x);
        assert_eq!(expected_min_y, actual_min_y);
        assert_eq!(expected_max_y, actual_max_y);
    }

    #[test]
    fn corners_should_find_corners_of_some_coordinates() {
        let test_coords = vec![
            Coord { x: 12, y: 13, vx: -1, vy: 12 },
            Coord { x: 0, y: 0, vx: 3, vy: -2 },
            Coord { x: 1000000000000, y: -1000000000000, vx: -1000000000000, vy: 1000000000000 }
        ];
        let expected_min_x = 0;
        let expected_max_x = 1000000000000;
        let expected_min_y = -1000000000000;
        let expected_max_y = 13;

        let (actual_min_x, actual_max_x, actual_min_y, actual_max_y) = corners(&test_coords);

        assert_eq!(expected_min_x, actual_min_x);
        assert_eq!(expected_max_x, actual_max_x);
        assert_eq!(expected_min_y, actual_min_y);
        assert_eq!(expected_max_y, actual_max_y);
    }
}

fn next(coords: Vec<Coord>) -> Vec<Coord> {
    if coords.len() == 0 {
        return coords;
    }

    let mut res: Vec<Coord> = Vec::new();
    for coord in coords {
        let new_x: i64 = coord.x + coord.vx;
        let new_y: i64 = coord.y + coord.vy;
        res.push(Coord {
            x: new_x,
            y: new_y,
            vx: coord.vx,
            vy: coord.vy,
        });
    }
    res
}

#[cfg(test)]
mod next_tests {
    use super::*;

    #[test]
    fn next_should_iterate_no_coordinates() {
        let test_coords: Vec<Coord> = Vec::new();
        let expected_coords: Vec<Coord> = Vec::new();

        let actual_coords = next(test_coords);

        assert_eq!(expected_coords, actual_coords);
    }

    #[test]
    fn next_should_iterate_some_coordinates_once() {
        let test_coords = vec![
            Coord { x: 12, y: 13, vx: -1, vy: 12 },
            Coord { x: 0, y: 0, vx: 3, vy: -2 },
            Coord { x: 1000000000000, y: -1000000000000, vx: -1000000000000, vy: 1000000000000 }
        ];
        let expected_coords = vec![
            Coord { x: 11, y: 25, vx: -1, vy: 12 },
            Coord { x: 3, y: -2, vx: 3, vy: -2 },
            Coord { x: 0, y: 0, vx: -1000000000000, vy: 1000000000000 }
        ];

        let actual_coords = next(test_coords);

        assert_eq!(expected_coords, actual_coords);
    }
}

fn area(coords: &Vec<Coord>) -> i64 {
    if coords.len() == 0 {
        return 0;
    }

    let (min_x, max_x, min_y, max_y) = corners(coords);
    (max_x - min_x + 1) * (max_y - min_y + 1)
}

#[cfg(test)]
mod area_tests {
    use super::*;

    #[test]
    fn area_should_get_area_that_covers_no_coordinates() {
        let test_coords: Vec<Coord> = Vec::new();
        let expected_area = 0;

        let actual_area = area(&test_coords);

        assert_eq!(expected_area, actual_area);
    }

    #[test]
    fn area_should_get_small_area_that_covers_some_coordinates() {
        let test_coords = vec![
            Coord { x: 11, y: 25, vx: -1, vy: 12 },
            Coord { x: 3, y: -2, vx: 3, vy: -2 },
            Coord { x: 0, y: 0, vx: -1000000000000, vy: 1000000000000 }
        ];
        let expected_area = 336;

        let actual_area = area(&test_coords);

        assert_eq!(expected_area, actual_area);
    }

    #[test]
    fn area_should_get_big_area_that_covers_some_coordinates() {
        let test_coords = vec![
            Coord { x: 0, y: 13, vx: -1, vy: 12 },
            Coord { x: -14, y: 0, vx: 3, vy: -2 },
            Coord { x: 100000000, y: -100000000, vx: -1000000000000, vy: 1000000000000 }
        ];
        let expected_area = 10000002900000210;

        let actual_area = area(&test_coords);

        assert_eq!(expected_area, actual_area);
    }
}

fn find(mut coords: Vec<Coord>) -> (i32, Vec<Coord>) {
    let mut found = false;
    let mut prev = area(&coords);
    let mut sec = 0;
    while !found {
        let new_coords = next(coords.clone());
        let area = area(&new_coords);
        if area >= prev {
            found = true;
        } else {
            prev = area;
            coords = new_coords;
            sec += 1;
        }
    }
    (sec, coords)
}

#[cfg(test)]
mod find_tests {
    use super::*;

    #[test]
    fn find_should_iterate_no_coordinates() {
        let test_coords: Vec<Coord> = Vec::new();
        let expected_seconds = 0;
        let expected_coords: Vec<Coord> = Vec::new();

        let (actual_seconds, actual_coords) = find(test_coords);

        assert_eq!(expected_seconds, actual_seconds);
        assert_eq!(expected_coords, actual_coords);
    }

    #[test]
    fn find_should_iterate_for_sample_case_until_answer() {
        let test_coords = vec![
            Coord { x: 9, y: 1, vx: 0, vy: 2 },
            Coord { x: 7, y: 0, vx:-1, vy: 0 },
            Coord { x: 3, y:-2, vx:-1, vy: 1 },
            Coord { x: 6, y:10, vx:-2, vy:-1 },
            Coord { x: 2, y:-4, vx: 2, vy: 2 },
            Coord { x:-6, y:10, vx: 2, vy:-2 },
            Coord { x: 1, y: 8, vx: 1, vy:-1 },
            Coord { x: 1, y: 7, vx: 1, vy: 0 },
            Coord { x:-3, y:11, vx: 1, vy:-2 },
            Coord { x: 7, y: 6, vx:-1, vy:-1 },
            Coord { x:-2, y: 3, vx: 1, vy: 0 },
            Coord { x:-4, y: 3, vx: 2, vy: 0 },
            Coord { x:10, y:-3, vx:-1, vy: 1 },
            Coord { x: 5, y:11, vx: 1, vy:-2 },
            Coord { x: 4, y: 7, vx: 0, vy:-1 },
            Coord { x: 8, y:-2, vx: 0, vy: 1 },
            Coord { x:15, y: 0, vx:-2, vy: 0 },
            Coord { x: 1, y: 6, vx: 1, vy: 0 },
            Coord { x: 8, y: 9, vx: 0, vy:-1 },
            Coord { x: 3, y: 3, vx:-1, vy: 1 },
            Coord { x: 0, y: 5, vx: 0, vy:-1 },
            Coord { x:-2, y: 2, vx: 2, vy: 0 },
            Coord { x: 5, y:-2, vx: 1, vy: 2 },
            Coord { x: 1, y: 4, vx: 2, vy: 1 },
            Coord { x:-2, y: 7, vx: 2, vy:-2 },
            Coord { x: 3, y: 6, vx:-1, vy:-1 },
            Coord { x: 5, y: 0, vx: 1, vy: 0 },
            Coord { x:-6, y: 0, vx: 2, vy: 0 },
            Coord { x: 5, y: 9, vx: 1, vy:-2 },
            Coord { x:14, y: 7, vx:-2, vy: 0 },
            Coord { x:-3, y: 6, vx: 2, vy:-1 }
        ];
        let expected_seconds = 3;
        let expected_coords = vec![
            Coord { x: 9, y: 7, vx: 0, vy: 2 },
            Coord { x: 4, y: 0, vx:-1, vy: 0 },
            Coord { x: 0, y: 1, vx:-1, vy: 1 },
            Coord { x: 0, y: 7, vx:-2, vy:-1 },
            Coord { x: 8, y: 2, vx: 2, vy: 2 },
            Coord { x: 0, y: 4, vx: 2, vy:-2 },
            Coord { x: 4, y: 5, vx: 1, vy:-1 },
            Coord { x: 4, y: 7, vx: 1, vy: 0 },
            Coord { x: 0, y: 5, vx: 1, vy:-2 },
            Coord { x: 4, y: 3, vx:-1, vy:-1 },
            Coord { x: 1, y: 3, vx: 1, vy: 0 },
            Coord { x: 2, y: 3, vx: 2, vy: 0 },
            Coord { x: 7, y: 0, vx:-1, vy: 1 },
            Coord { x: 8, y: 5, vx: 1, vy:-2 },
            Coord { x: 4, y: 4, vx: 0, vy:-1 },
            Coord { x: 8, y: 1, vx: 0, vy: 1 },
            Coord { x: 9, y: 0, vx:-2, vy: 0 },
            Coord { x: 4, y: 6, vx: 1, vy: 0 },
            Coord { x: 8, y: 6, vx: 0, vy:-1 },
            Coord { x: 0, y: 6, vx:-1, vy: 1 },
            Coord { x: 0, y: 2, vx: 0, vy:-1 },
            Coord { x: 4, y: 2, vx: 2, vy: 0 },
            Coord { x: 8, y: 4, vx: 1, vy: 2 },
            Coord { x: 7, y: 7, vx: 2, vy: 1 },
            Coord { x: 4, y: 1, vx: 2, vy:-2 },
            Coord { x: 0, y: 3, vx:-1, vy:-1 },
            Coord { x: 8, y: 0, vx: 1, vy: 0 },
            Coord { x: 0, y: 0, vx: 2, vy: 0 },
            Coord { x: 8, y: 3, vx: 1, vy:-2 },
            Coord { x: 8, y: 7, vx:-2, vy: 0 },
            Coord { x: 3, y: 3, vx: 2, vy:-1 }
        ];

        let (actual_seconds, actual_coords) = find(test_coords);

        assert_eq!(expected_seconds, actual_seconds);
        assert_eq!(expected_coords, actual_coords);
    }

    #[test]
    fn find_should_not_iterate_for_sample_case_when_start_at_answer() {
        let test_coords = vec![
            Coord { x: 9, y: 7, vx: 0, vy: 2 },
            Coord { x: 4, y: 0, vx:-1, vy: 0 },
            Coord { x: 0, y: 1, vx:-1, vy: 1 },
            Coord { x: 0, y: 7, vx:-2, vy:-1 },
            Coord { x: 8, y: 2, vx: 2, vy: 2 },
            Coord { x: 0, y: 4, vx: 2, vy:-2 },
            Coord { x: 4, y: 5, vx: 1, vy:-1 },
            Coord { x: 4, y: 7, vx: 1, vy: 0 },
            Coord { x: 0, y: 5, vx: 1, vy:-2 },
            Coord { x: 4, y: 3, vx:-1, vy:-1 },
            Coord { x: 1, y: 3, vx: 1, vy: 0 },
            Coord { x: 2, y: 3, vx: 2, vy: 0 },
            Coord { x: 7, y: 0, vx:-1, vy: 1 },
            Coord { x: 8, y: 5, vx: 1, vy:-2 },
            Coord { x: 4, y: 4, vx: 0, vy:-1 },
            Coord { x: 8, y: 1, vx: 0, vy: 1 },
            Coord { x: 9, y: 0, vx:-2, vy: 0 },
            Coord { x: 4, y: 6, vx: 1, vy: 0 },
            Coord { x: 8, y: 6, vx: 0, vy:-1 },
            Coord { x: 0, y: 6, vx:-1, vy: 1 },
            Coord { x: 0, y: 2, vx: 0, vy:-1 },
            Coord { x: 4, y: 2, vx: 2, vy: 0 },
            Coord { x: 8, y: 4, vx: 1, vy: 2 },
            Coord { x: 7, y: 7, vx: 2, vy: 1 },
            Coord { x: 4, y: 1, vx: 2, vy:-2 },
            Coord { x: 0, y: 3, vx:-1, vy:-1 },
            Coord { x: 8, y: 0, vx: 1, vy: 0 },
            Coord { x: 0, y: 0, vx: 2, vy: 0 },
            Coord { x: 8, y: 3, vx: 1, vy:-2 },
            Coord { x: 8, y: 7, vx:-2, vy: 0 },
            Coord { x: 3, y: 3, vx: 2, vy:-1 }
        ];
        let expected_seconds = 0;
        let expected_coords = vec![
            Coord { x: 9, y: 7, vx: 0, vy: 2 },
            Coord { x: 4, y: 0, vx:-1, vy: 0 },
            Coord { x: 0, y: 1, vx:-1, vy: 1 },
            Coord { x: 0, y: 7, vx:-2, vy:-1 },
            Coord { x: 8, y: 2, vx: 2, vy: 2 },
            Coord { x: 0, y: 4, vx: 2, vy:-2 },
            Coord { x: 4, y: 5, vx: 1, vy:-1 },
            Coord { x: 4, y: 7, vx: 1, vy: 0 },
            Coord { x: 0, y: 5, vx: 1, vy:-2 },
            Coord { x: 4, y: 3, vx:-1, vy:-1 },
            Coord { x: 1, y: 3, vx: 1, vy: 0 },
            Coord { x: 2, y: 3, vx: 2, vy: 0 },
            Coord { x: 7, y: 0, vx:-1, vy: 1 },
            Coord { x: 8, y: 5, vx: 1, vy:-2 },
            Coord { x: 4, y: 4, vx: 0, vy:-1 },
            Coord { x: 8, y: 1, vx: 0, vy: 1 },
            Coord { x: 9, y: 0, vx:-2, vy: 0 },
            Coord { x: 4, y: 6, vx: 1, vy: 0 },
            Coord { x: 8, y: 6, vx: 0, vy:-1 },
            Coord { x: 0, y: 6, vx:-1, vy: 1 },
            Coord { x: 0, y: 2, vx: 0, vy:-1 },
            Coord { x: 4, y: 2, vx: 2, vy: 0 },
            Coord { x: 8, y: 4, vx: 1, vy: 2 },
            Coord { x: 7, y: 7, vx: 2, vy: 1 },
            Coord { x: 4, y: 1, vx: 2, vy:-2 },
            Coord { x: 0, y: 3, vx:-1, vy:-1 },
            Coord { x: 8, y: 0, vx: 1, vy: 0 },
            Coord { x: 0, y: 0, vx: 2, vy: 0 },
            Coord { x: 8, y: 3, vx: 1, vy:-2 },
            Coord { x: 8, y: 7, vx:-2, vy: 0 },
            Coord { x: 3, y: 3, vx: 2, vy:-1 }
        ];

        let (actual_seconds, actual_coords) = find(test_coords);

        assert_eq!(expected_seconds, actual_seconds);
        assert_eq!(expected_coords, actual_coords);
    }
}

fn graph(coords: Vec<Coord>) -> Vec<String> {
    if coords.len() == 0 {
        return Vec::new();
    }

    let (min_x, max_x, min_y, max_y) = corners(&coords);
    let mut set = HashSet::new();
    for coord in coords {
        let x = coord.x;
        let y = coord.y;
        set.insert((x, y));
    }
    let mut res: Vec<String> = Vec::new();
    for y in min_y..max_y+1 {
        let mut string = String::new();
        for x in min_x..max_x+1 {
            if set.contains(&(x, y)) {
                string.push('#');
            } else {
                string.push('.');
            }
        }
        res.push(string);
    }
    res
}

#[cfg(test)]
mod graph_test {
    use super::*;

    #[test]
    fn graph_should_graph_no_coordinates() {
        let test_coords: Vec<Coord> = Vec::new();
        let expected_graph: Vec<String> = Vec::new();

        let actual_graph = graph(test_coords);

        assert_eq!(expected_graph, actual_graph);
    }

    #[test]
    fn graph_should_graph_sample_case_answer() {
        let test_coords = vec![
            Coord { x: 9, y: 7, vx: 0, vy: 2 },
            Coord { x: 4, y: 0, vx:-1, vy: 0 },
            Coord { x: 0, y: 1, vx:-1, vy: 1 },
            Coord { x: 0, y: 7, vx:-2, vy:-1 },
            Coord { x: 8, y: 2, vx: 2, vy: 2 },
            Coord { x: 0, y: 4, vx: 2, vy:-2 },
            Coord { x: 4, y: 5, vx: 1, vy:-1 },
            Coord { x: 4, y: 7, vx: 1, vy: 0 },
            Coord { x: 0, y: 5, vx: 1, vy:-2 },
            Coord { x: 4, y: 3, vx:-1, vy:-1 },
            Coord { x: 1, y: 3, vx: 1, vy: 0 },
            Coord { x: 2, y: 3, vx: 2, vy: 0 },
            Coord { x: 7, y: 0, vx:-1, vy: 1 },
            Coord { x: 8, y: 5, vx: 1, vy:-2 },
            Coord { x: 4, y: 4, vx: 0, vy:-1 },
            Coord { x: 8, y: 1, vx: 0, vy: 1 },
            Coord { x: 9, y: 0, vx:-2, vy: 0 },
            Coord { x: 4, y: 6, vx: 1, vy: 0 },
            Coord { x: 8, y: 6, vx: 0, vy:-1 },
            Coord { x: 0, y: 6, vx:-1, vy: 1 },
            Coord { x: 0, y: 2, vx: 0, vy:-1 },
            Coord { x: 4, y: 2, vx: 2, vy: 0 },
            Coord { x: 8, y: 4, vx: 1, vy: 2 },
            Coord { x: 7, y: 7, vx: 2, vy: 1 },
            Coord { x: 4, y: 1, vx: 2, vy:-2 },
            Coord { x: 0, y: 3, vx:-1, vy:-1 },
            Coord { x: 8, y: 0, vx: 1, vy: 0 },
            Coord { x: 0, y: 0, vx: 2, vy: 0 },
            Coord { x: 8, y: 3, vx: 1, vy:-2 },
            Coord { x: 8, y: 7, vx:-2, vy: 0 },
            Coord { x: 3, y: 3, vx: 2, vy:-1 }
        ];
        let expected_graph = vec![
            String::from("#...#..###"),
            String::from("#...#...#."),
            String::from("#...#...#."),
            String::from("#####...#."),
            String::from("#...#...#."),
            String::from("#...#...#."),
            String::from("#...#...#."),
            String::from("#...#..###")
        ];

        let actual_graph = graph(test_coords);

        assert_eq!(expected_graph, actual_graph);
    }
}
