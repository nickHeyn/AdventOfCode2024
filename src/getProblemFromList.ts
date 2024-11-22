import { Day0 } from "./problems/day0";
import { Day1 } from "./problems/day1";
import { Day10 } from "./problems/day10";
import { Day11 } from "./problems/day11";
import { Day12 } from "./problems/day12";
import { Day13 } from "./problems/day13";
import { Day14 } from "./problems/day14";
import { Day15 } from "./problems/day15";
import { Day16 } from "./problems/day16";
import { Day17 } from "./problems/day17";
import { Day18 } from "./problems/day18";
import { Day19 } from "./problems/day19";
import { Day2 } from "./problems/day2";
import { Day20 } from "./problems/day20";
import { Day21 } from "./problems/day21";
import { Day22 } from "./problems/day22";
import { Day23 } from "./problems/day23";
import { Day24 } from "./problems/day24";
import { Day25 } from "./problems/day25";
import { Day3 } from "./problems/day3";
import { Day4 } from "./problems/day4";
import { Day5 } from "./problems/day5";
import { Day6 } from "./problems/day6";
import { Day7 } from "./problems/day7";
import { Day8 } from "./problems/day8";
import { Day9 } from "./problems/day9";

const problemList = [
    new Day0("day0.txt", 0),
    new Day1("day1.txt", 1),
    new Day2("day2.txt", 2),
    new Day3("day3.txt", 3),
    new Day4("day4.txt", 4),
    new Day5("day5.txt", 5),
    new Day6("day6.txt", 6),
    new Day7("day7.txt", 7),
    new Day8("day8.txt", 8),
    new Day9("day9.txt", 9),
    new Day10("day10.txt", 10),
    new Day11("day11.txt", 11),
    new Day12("day12.txt", 12),
    new Day13("day13.txt", 13),
    new Day14("day14.txt", 14),
    new Day15("day15.txt", 15),
    new Day16("day16.txt", 16),
    new Day17("day17.txt", 17),
    new Day18("day18.txt", 18),
    new Day19("day19.txt", 19),
    new Day20("day20.txt", 20),
    new Day21("day21.txt", 21),
    new Day22("day22.txt", 22),
    new Day23("day23.txt", 23),
    new Day24("day24.txt", 24),
    new Day25("day25.txt", 25),
];

export const getProblemFromList = (problemDayNumber: number) => {
    return problemList.find(problem => problem.getDayNumber() === problemDayNumber);
};