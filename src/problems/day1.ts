import { Problem } from "./problem";

export class Day1 extends Problem {
    private readonly DATA_DELIMITTER = "   ";

    public calculateSolution1() {
        const fileContent = this.readInputFile().trim();
        const fileContentList = this.convertFileContentToNewlineDelimittedList(fileContent);
        const leftList = []
        const rightList = []
        for(const fileLine of fileContentList) {
            const splitLine = fileLine.split(this.DATA_DELIMITTER);
            leftList.push(parseInt(splitLine[0]));
            rightList.push(parseInt(splitLine[1]))
        }

        const sortedLeft = leftList.sort();
        const sortedRight = rightList.sort();

        let sum = 0
        for(let index = 0; index < sortedLeft.length; index++) {
            const leftNum = sortedLeft[index];
            const rightNum = sortedRight[index];

            sum += (Math.abs(leftNum - rightNum));
        }

        return sum.toString();
    }

    public calculateSolution2() {
        const fileContent = this.readInputFile().trim();
        const fileContentList = this.convertFileContentToNewlineDelimittedList(fileContent);
        const leftList = [];
        const rightList = [];
        for(const fileLine of fileContentList) {
            const splitLine = fileLine.split(this.DATA_DELIMITTER);
            leftList.push(parseInt(splitLine[0]));
            rightList.push(parseInt(splitLine[1]));
        }

        const rightListNumCountMap = new Map();

        for(const rightNum of rightList) {
            let rightNumOccurances = 1;
            if(rightListNumCountMap.has(rightNum)) {
                rightNumOccurances += rightListNumCountMap.get(rightNum);
            }

            rightListNumCountMap.set(rightNum, rightNumOccurances);
        }

        let result = 0;
        for(const leftNum of leftList) {
            const numOccurancesOnRight = rightListNumCountMap.get(leftNum) ?? 0;
            result += (leftNum * numOccurancesOnRight);
        }

        return result.toString();
    }
}