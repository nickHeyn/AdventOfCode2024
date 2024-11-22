import { getProblemFromList } from "./getProblemFromList";

// modify this variable to change the problem day we're solving
const PROBLEM_DAY_TO_SOLVE = 0;

const dayProblem = getProblemFromList(PROBLEM_DAY_TO_SOLVE);

if(dayProblem) {
    const solutionString = dayProblem.calculateSolution();
    console.log("Solution: \n");
    console.log(solutionString);
}
else {
    console.error("Could not find problem for day " + PROBLEM_DAY_TO_SOLVE);
}