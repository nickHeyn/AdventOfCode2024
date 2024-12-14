import { Problem } from "./problem";

interface Node {
    readonly row: number;
    readonly col: number;
    readonly height: number;
    connectedTrailheads: Set<Node>;
}

export class Day10 extends Problem {

    private findPaths(grid: Array<Array<Node>>, row: number, col: number, prevHeight: number, trailhead: Node): number {
        if(row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) {
            return 0;
        }
        const currentNode = grid[row][col];
        if(currentNode.height - prevHeight != 1) {
            return 0;
        }
        if(currentNode.height === 9) {
            let numToReturn = 0;
            if(!currentNode.connectedTrailheads.has(trailhead)) {
                numToReturn = 1
            }
            currentNode.connectedTrailheads.add(trailhead);
            return numToReturn;
        }

        return this.findPaths(grid, row+1, col, currentNode.height, trailhead)
            + this.findPaths(grid, row-1, col, currentNode.height, trailhead)
            + this.findPaths(grid, row, col+1, currentNode.height, trailhead)
            + this.findPaths(grid, row, col-1, currentNode.height, trailhead);
    };

    public calculateSolution1() {
        const fileContent = this.readInputFile().trim();
        const fileContentList = this.convertFileContentToNewlineDelimittedList(fileContent);

        const grid = [];
        const trailheads = [];
        for(let row = 0; row < fileContentList.length; row++) {
            const rowArray: Array<Node> = [];
            for(let col = 0; col < fileContentList[0].length; col++) {
                const height = Number(fileContentList[row][col]);
                const node = {
                    row,
                    col,
                    height,
                    connectedTrailheads: new Set<Node>(),
                };
                rowArray.push(node);
                if(height === 0) {
                    trailheads.push(node);
                }
            }
            grid.push(rowArray);
        }

        let trailheadSum = 0
        for(const trailhead of trailheads) {
            trailheadSum += this.findPaths(grid, trailhead.row, trailhead.col, -1, trailhead);
        }

        return trailheadSum.toString();

    }

    private findPaths2(grid: Array<Array<Node>>, row: number, col: number, prevHeight: number, trailhead: Node): number {
        if(row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) {
            return 0;
        }
        const currentNode = grid[row][col];
        if(currentNode.height - prevHeight != 1) {
            return 0;
        }
        if(currentNode.height === 9) {
            let numToReturn = 0;
            if(!currentNode.connectedTrailheads.has(trailhead)) {
                numToReturn = 1
            }
            currentNode.connectedTrailheads.add(trailhead);
            return 1;
        }

        return this.findPaths2(grid, row+1, col, currentNode.height, trailhead)
            + this.findPaths2(grid, row-1, col, currentNode.height, trailhead)
            + this.findPaths2(grid, row, col+1, currentNode.height, trailhead)
            + this.findPaths2(grid, row, col-1, currentNode.height, trailhead);
    };

    public calculateSolution2() {
        const fileContent = this.readInputFile().trim();
        const fileContentList = this.convertFileContentToNewlineDelimittedList(fileContent);

        const grid = [];
        const trailheads = [];
        for(let row = 0; row < fileContentList.length; row++) {
            const rowArray: Array<Node> = [];
            for(let col = 0; col < fileContentList[0].length; col++) {
                const height = Number(fileContentList[row][col]);
                const node = {
                    row,
                    col,
                    height,
                    connectedTrailheads: new Set<Node>(),
                };
                rowArray.push(node);
                if(height === 0) {
                    trailheads.push(node);
                }
            }
            grid.push(rowArray);
        }

        let trailheadSum = 0
        for(const trailhead of trailheads) {
            trailheadSum += this.findPaths2(grid, trailhead.row, trailhead.col, -1, trailhead);
        }

        return trailheadSum.toString();
    }
}