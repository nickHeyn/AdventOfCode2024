import { Problem } from "./problem";

export class Day2 extends Problem {

    private areNumbersValid(num1: number, num2: number, isIncreasing: boolean) {
        if(isIncreasing && num1 >= num2) {
            return false;
        }

        if(!isIncreasing && num1 <= num2) {
            return false;
        }
        const diff = Math.abs(num2 - num1);

        if(diff > 3) {
            return false;
        }

        return true;
    }

    public calculateSolution1() {
        const fileContent = this.readInputFile().trim();
        const fileContentList = this.convertFileContentToNewlineDelimittedList(fileContent);
        let validReportCount = 0
        for(const line of fileContentList) {
            const report = line.split(" ").map(val => parseInt(val));
            let prevNum = report[0];
            let isIncreasing = true;
            let isValidReport = true;
            for(let index = 1; index < report.length; index++) {
                const num = report[index];
                if(index == 1) {
                    if(num < prevNum) {
                        isIncreasing = false;
                    }
                }

                if(!this.areNumbersValid(prevNum, num, isIncreasing)) {
                    isValidReport = false;
                    break; 
                }
                prevNum = num
            }

            if(isValidReport) {
                validReportCount++;
            }
        }

        return validReportCount.toString();
    }

    private isReportValid(report: Array<number>) {
        let prevNum = report[0];
        let isIncreasing = true;
        let isValidReport = true;
        for(let index = 1; index < report.length; index++) {
            const num = report[index];
            if(index === 1) {
                if(num < prevNum) {
                    isIncreasing = false;
                }
                else if(num > prevNum) {
                    isIncreasing = true
                }
            }

            if(!this.areNumbersValid(prevNum, num, isIncreasing)) {
                isValidReport = false;
                break;
            }
            prevNum = num
        }

        return isValidReport;
    }

    public calculateSolution2() {
        const fileContent = this.readInputFile().trim();
        const fileContentList = this.convertFileContentToNewlineDelimittedList(fileContent);
        let validReportCount = 0
        for(const line of fileContentList) {
            const report = line.split(" ").map(val => parseInt(val));
            if(this.isReportValid(report)) {
                validReportCount++;
            }
            else {
                let validFound = false;
                for(let removedIndex = 0; removedIndex < report.length; removedIndex++) {
                    if(this.isReportValid(report.slice(0, removedIndex).concat(report.slice(removedIndex+1, report.length)))) {
                        validFound = true;
                        break;
                    }
                }
                if(validFound) {
                    validReportCount++;
                }
            }
        }

        return validReportCount.toString();
    }
}