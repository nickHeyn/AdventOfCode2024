import { getProblemFromList } from "./getProblemFromList";

// modify this variable to change the problem day we're solving
const PROBLEM_DAY_TO_SOLVE = 9;

const dayProblem = getProblemFromList(PROBLEM_DAY_TO_SOLVE);

if(dayProblem) {
    console.log("Solving for Day " + PROBLEM_DAY_TO_SOLVE + "\n");
    const solution1String = dayProblem.calculateSolution1();
    const solution2String = dayProblem.calculateSolution2();

    if(solution1String) {
        console.log("\nSolution 1:");
        console.log(solution1String);
    }
    

    if(solution2String) {
        console.log("\nSolution 2:");
        console.log(solution2String);
    }
    
}
else {
    console.error("Could not find problem for day " + PROBLEM_DAY_TO_SOLVE);
}