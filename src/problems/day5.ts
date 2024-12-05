import { Problem } from "./problem";

export class Day5 extends Problem {

    private getMiddleNumber(update: Array<number>) {
        return update[Math.floor(update.length/2)];
    }

    private getRulesAsMap(updateRules: Array<Array<number>>) {
        const map = new Map();
        for(const rule of updateRules) {
            const firstNum = rule[0];
            const secondNum = rule[1];

            let setToUpdate = new Set();
            if(map.has(secondNum)) {
                setToUpdate = map.get(secondNum);
            }
            setToUpdate.add(firstNum);
            map.set(secondNum, setToUpdate);
        }
        return map;
    }

    public calculateSolution1() {
        const fileContent = this.readInputFile().trim();
        const fileContentList = this.convertFileContentToNewlineDelimittedList(fileContent);

        // parse input
        const updateRules = [];
        const updates = [];
        for(const line of fileContentList) {
            if(line.indexOf("|") >= 0) {
                // add rule
                const rule = line.split("|").map(numStr => Number(numStr));
                updateRules.push(rule);
            }
            else if(line.indexOf(",") >= 0) {
                // add update
                const update = line.split(",").map(numStr => Number(numStr));
                updates.push(update);
            }
        }

        // add rules to a map
        const ruleMap = this.getRulesAsMap(updateRules);

        let resultSum = 0;
        // go through updates
        for(const update of updates) {
            const prevNums: Array<number> = [];
            let updateValid = true;
            for(const num of update) {
                for(const prevNum of prevNums) {
                    const allNumsThatShouldBeFirst = ruleMap.get(prevNum) ?? new Set();
                    if(allNumsThatShouldBeFirst.has(num)) {
                        updateValid = false;
                        break;
                    }
                }
                if(!updateValid) {
                    break;
                }

                prevNums.push(num);
            }
            if(updateValid) {
                resultSum += this.getMiddleNumber(update);
            }
        }


        return resultSum.toString();
    }

    private swap(updateNums: Array<number>, indexA: number, indexB: number) {
        const temp = updateNums[indexA];
        updateNums[indexA] = updateNums[indexB];
        updateNums[indexB] = temp;
        return updateNums;
    }

    public calculateSolution2() {
        const fileContent = this.readInputFile().trim();
        const fileContentList = this.convertFileContentToNewlineDelimittedList(fileContent);

        // parse input
        const updateRules = [];
        const updates = [];
        for(const line of fileContentList) {
            if(line.indexOf("|") >= 0) {
                // add rule
                const rule = line.split("|").map(numStr => Number(numStr));
                updateRules.push(rule);
            }
            else if(line.indexOf(",") >= 0) {
                // add update
                const update = line.split(",").map(numStr => Number(numStr));
                updates.push(update);
            }
        }

        // add rules to a map
        const ruleMap = this.getRulesAsMap(updateRules);

        const incorrectUpdates = [];
        // go through updates
        for(const update of updates) {
            const prevNums: Array<number> = [];
            let updateValid = true;
            for(const num of update) {
                for(const prevNum of prevNums) {
                    const allNumsThatShouldBeFirst = ruleMap.get(prevNum) ?? new Set();
                    if(allNumsThatShouldBeFirst.has(num)) {
                        updateValid = false;
                        break;
                    }
                }
                if(!updateValid) {
                    break;
                }

                prevNums.push(num);
            }
            if(!updateValid) {
                incorrectUpdates.push(update);
            }
        }

        let resultSum = 0;
        for(let incorrectUpdateIndex = 0; incorrectUpdateIndex < incorrectUpdates.length; incorrectUpdateIndex++) {
            const incorrectUpdate = incorrectUpdates[incorrectUpdateIndex];
            let prevNums: Array<number> = [];
            for(let index = 0; index < incorrectUpdate.length; index++) {
                const num = incorrectUpdate[index];
                let violationFound = false;
                let violationIndex = -1;
                for(const prevNum of prevNums) {
                    const allNumsThatShouldBeFirst = ruleMap.get(prevNum) ?? new Set();
                    if(allNumsThatShouldBeFirst.has(num)) {
                        // rule violation found
                        violationIndex = incorrectUpdate.indexOf(prevNum);
                        violationFound = true;
                        break;
                    }
                }
                if(violationFound) {
                    this.swap(incorrectUpdate, index, violationIndex);
                    index = -1;
                    prevNums = [];
                    continue;
                }

                prevNums.push(num);
            }
            resultSum += this.getMiddleNumber(incorrectUpdate)
            
        }



        return resultSum.toString();
    }
}        