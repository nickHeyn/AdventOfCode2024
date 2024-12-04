import { Problem } from "./problem";

export class Day4 extends Problem {
    private readonly XMAS = "XMAS";


    private getString(grid: Array<string>, rowStart: number, colStart: number, rowEnd: number, colEnd: number) {
        let row = rowStart;
        const rowIncrement = rowStart < rowEnd ? 1 : -1;
        let col = colStart;
        const colIncrement = colStart < colEnd ? 1 : -1;
        let result = "";
        while(row != rowEnd || col != colEnd) {
            result += grid[row][col]
            if(row != rowEnd) {
                row += rowIncrement;
            }
            if(col != colEnd) {
                col += colIncrement;
            }
        }
        return result;
    }

    private getXmasOccuranceCountAtCell(grid: Array<string>, row: number, col: number) {
        let count = 0;
        const hasRoomToRight = col <= grid[0].length - 4;
        const hasRoomToLeft = col >= 3
        const hasRoomAbove = row >= 3;
        const hasRoomBelow = row <= grid.length - 4;

        // check horizontally
        if(hasRoomToRight && this.getString(grid, row, col, row, col+4) === this.XMAS) {
            count++;
        }
        if(hasRoomToLeft && this.getString(grid, row, col, row, col-4) === this.XMAS) {
            count++;
        }

        // check vertically
        if(hasRoomAbove && this.getString(grid, row, col, row-4, col) === this.XMAS) {
            count++;
        }
        if(hasRoomBelow && this.getString(grid, row, col, row+4, col) === this.XMAS) {
            count++;
        }

        // check above diagonally
        if(hasRoomAbove && hasRoomToRight && this.getString(grid, row, col, row-4, col+4) === this.XMAS) {
            count++;
        }
        if(hasRoomAbove && hasRoomToLeft && this.getString(grid, row, col, row-4, col-4) === this.XMAS) {
            count++;
        }

        // check below diagonally
        if(hasRoomBelow && hasRoomToRight && this.getString(grid, row, col, row+4, col+4) === this.XMAS) {
            count++;
        }
        if(hasRoomBelow && hasRoomToLeft && this.getString(grid, row, col, row+4, col-4) === this.XMAS) {
            count++;
        }

        return count;
    }

    public calculateSolution1() {
        const fileContent = this.readInputFile().trim();
        const fileContentList = this.convertFileContentToNewlineDelimittedList(fileContent);
        let resultSum = 0;

        for(let row = 0; row < fileContentList.length; row++) {
            for(let col = 0; col < fileContentList[row].length; col++) {
                resultSum += this.getXmasOccuranceCountAtCell(fileContentList, row, col);
            }
        }

        return resultSum.toString();
    }

    private isCellCenterOfX(grid: Array<string>, row: number, col: number) {
        if(row < 1 || row >= grid.length-1 || col < 1 || col >= grid[row].length-1) {
            return false;
        }

        const diagonalString1 = this.getString(grid, row-1, col-1, row+2, col+2);
        const diagonalString2 = this.getString(grid, row+1, col-1, row-2, col+2);

        return (diagonalString1 === "MAS" || diagonalString1 === "SAM") && (diagonalString2 === "MAS" || diagonalString2 === "SAM")
    }

    public calculateSolution2() {
        const fileContent = this.readInputFile().trim();
        const fileContentList = this.convertFileContentToNewlineDelimittedList(fileContent);
        let resultSum = 0;

        for(let row = 0; row < fileContentList.length; row++) {
            for(let col = 0; col < fileContentList[row].length; col++) {
               if(this.isCellCenterOfX(fileContentList, row, col)) {
                resultSum++;
               }
            }
        }

        return resultSum.toString();
    }
}