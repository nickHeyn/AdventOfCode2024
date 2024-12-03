import { Problem } from "./problem";

export class Day3 extends Problem {

    private readonly MUL_START = "mul(";
    private readonly DO_STATEMENT = "do()";
    private readonly DONT_STATEMENT = "don't()";

    private findStringLocations(stringToSearchIn: string, stringToSearchFor: string) {
        const locations = [];
        let prevIndex = 0;
        while(stringToSearchIn.indexOf(stringToSearchFor, prevIndex) >= 0) {
            const index = stringToSearchIn.indexOf(stringToSearchFor, prevIndex+1);
            locations.push(index);
            prevIndex = index+1;
        }

        return locations;
    }

    public calculateSolution1() {
        const fileContent = this.readInputFile().trim();
        
        const mulStartLocations = this.findStringLocations(fileContent, this.MUL_START);
        let resultSum = 0;
        for(const mulStartIndex of mulStartLocations) {
            const numStartIndex = mulStartIndex+this.MUL_START.length;
            const stringAfterStartIndex = fileContent.slice(numStartIndex);
            const multEndIndex = stringAfterStartIndex.indexOf(")");
            if(multEndIndex >= 0) {
                const multArgsSubstring = stringAfterStartIndex.slice(0, multEndIndex);
                const multNumStrings = multArgsSubstring.split(",");
                if(multNumStrings.length == 2 && !isNaN(+multNumStrings[0]) && !isNaN(+multNumStrings[1])) {
                    resultSum += (Number(multNumStrings[0]) * Number(multNumStrings[1]))
                }
            }
        }

        return resultSum.toString();
    }

    private isEnabled(startIndex: number, doList: Array<number>, dontList: Array<number>) {
        let latestDoIndex = 0;
        let latestDontIndex = -1;

        for(const doIndex of doList) {
            if(doIndex > startIndex) {
                break;
            }
            else {
                latestDoIndex = doIndex;
            }
        }

        for(const dontIndex of dontList) {
            if(dontIndex > startIndex) {
                break;
            }
            else {
                latestDontIndex = dontIndex;
            }
        }

        return latestDoIndex > latestDontIndex;
    }

    public calculateSolution2() {
        const fileContent = this.readInputFile().trim();
        
        const mulStartLocations = this.findStringLocations(fileContent, this.MUL_START);
        const doLocations = this.findStringLocations(fileContent, this.DO_STATEMENT);
        const dontLocations = this.findStringLocations(fileContent, this.DONT_STATEMENT);

        let resultSum = 0;
        for(const mulStartIndex of mulStartLocations) {

            const numStartIndex = mulStartIndex+this.MUL_START.length;
            const stringAfterStartIndex = fileContent.slice(numStartIndex);
            const multEndIndex = stringAfterStartIndex.indexOf(")");
            if(multEndIndex >= 0) {
                const multArgsSubstring = stringAfterStartIndex.slice(0, multEndIndex);
                const multNumStrings = multArgsSubstring.split(",");
                if(multNumStrings.length == 2 && !isNaN(+multNumStrings[0]) && !isNaN(+multNumStrings[1]) && this.isEnabled(mulStartIndex, doLocations, dontLocations)) {
                    resultSum += (Number(multNumStrings[0]) * Number(multNumStrings[1]))
                }
            }
        }

        return resultSum.toString();
    }
}