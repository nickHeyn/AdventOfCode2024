import { Problem } from "./problem";

class Block {
    private readonly size: number;
    private numFreeSpace: number;
    private fileId?: number;
    private isFull: boolean;

    constructor(size: number, numFreeSpace: number, fileId?: number) {
        this.size = size;
        this.numFreeSpace = numFreeSpace;
        this.isFull = numFreeSpace === size;
        this.fileId = fileId;
    }

    public hasFreeSpace() {
        return this.numFreeSpace > 0;
    }

    public addFreeSpace(numFreeSpaceToAdd: number) {
        this.numFreeSpace += numFreeSpaceToAdd;
    }

    public addFileSpaces(numFileSpaces: number) {
        this.numFreeSpace -= numFileSpaces;
    }

    public getNumFileSpaces() {
        return this.getSize() - this.getNumFreeSpace();
    }

    public hasFiles() {
        return this.numFreeSpace < this.size;
    }

    public getSize() {
        return this.size;
    }

    public getNumFreeSpace() {
        return this.numFreeSpace;
    }

    public getFileId() {
        return this.fileId;
    }

    public setNumFreeSpace(numFreeSpace: number) {
        this.numFreeSpace = numFreeSpace;
    }
}



export class Day9 extends Problem {
     
    public calculateSolution1() {
        const fileContent = this.readInputFile().trim();

        let isFile = true;
        let currentId = 0;
        const blockList = [];
        for(const size of fileContent) {
            const sizeNum = Number(size);
            let numFreeSpace = sizeNum;
            let fileId = undefined;
            if(isFile) {
                numFreeSpace = 0;
                fileId = currentId;
                currentId++;
            }
            const block = new Block(sizeNum, numFreeSpace, fileId);
            blockList.push(block);
            isFile = !isFile;
        }

        let frontBlockIndex = 0;
        let backBlockIndex = blockList.length - 1;
        let resultSum = 0;
        let indexMultiplier = 0;
        while(frontBlockIndex <= backBlockIndex) {
            const frontBlock = blockList[frontBlockIndex];
            
            if(frontBlock.hasFreeSpace()) {
                while(frontBlock.hasFreeSpace()) {
                    while(frontBlockIndex < backBlockIndex && !blockList[backBlockIndex].hasFiles()) {
                        backBlockIndex--;
                    }

                    const backBlock = blockList[backBlockIndex];
                    const backBlockIndicesToMove = Math.min(backBlock.getNumFileSpaces(), frontBlock.getNumFreeSpace());
                    frontBlock.addFileSpaces(backBlockIndicesToMove);
                    backBlock.addFreeSpace(backBlockIndicesToMove);
                    for(let i = 0; i < backBlockIndicesToMove; i++) {
                        resultSum += (indexMultiplier * (backBlock.getFileId() ?? 0));
                        indexMultiplier++;
                    }

                    if(frontBlockIndex >= backBlockIndex) {
                        break;
                    }
                }
            }
            else {
                for(let blockIndex = 0; blockIndex < frontBlock.getSize(); blockIndex++) {
                    resultSum += (indexMultiplier * (frontBlock.getFileId() ?? 0));
                    indexMultiplier++;
                }
            }
            frontBlockIndex++;
        }

        return resultSum.toString();
    }

    public calculateSolution2() {
        const fileContent = this.readInputFile().trim();

        let isFile = true;
        let currentId = 0;
        const blockList = [];
        for(const size of fileContent) {
            const sizeNum = Number(size);
            let numFreeSpace = sizeNum;
            let fileId = undefined;
            if(isFile) {
                numFreeSpace = 0;
                fileId = currentId;
                currentId++;
            }
            const block = new Block(sizeNum, numFreeSpace, fileId);
            blockList.push(block);
            isFile = !isFile;
        }

        let frontBlockIndex = 0;
        let backBlockIndex = blockList.length - 1;
        let resultSum = 0;
        let indexMultiplier = 0;
        while(frontBlockIndex <= blockList.length - 1) {
            const frontBlock = blockList[frontBlockIndex];
            
            if(frontBlock.hasFreeSpace()) {
                while(frontBlock.hasFreeSpace()) {
                    backBlockIndex = blockList.length - 1;
                    while(frontBlockIndex < backBlockIndex && (blockList[backBlockIndex].getNumFreeSpace() === blockList[backBlockIndex].getSize() || blockList[backBlockIndex].getNumFileSpaces() > frontBlock.getNumFreeSpace())) {
                        backBlockIndex--;
                    }

                    if(frontBlockIndex >= backBlockIndex) {
                        // no fitting files found
                        break;
                    }

                    const backBlock = blockList[backBlockIndex];
                    const backBlockIndicesToMove = backBlock.getNumFileSpaces();

                    
                    frontBlock.addFileSpaces(backBlockIndicesToMove);
                    backBlock.addFreeSpace(backBlockIndicesToMove);
                    for(let i = 0; i < backBlockIndicesToMove; i++) {
                        if(!backBlock.getFileId()) {
                            console.error("help1 :(");
                        }
                        resultSum += (indexMultiplier * (backBlock.getFileId() ?? 0));
                        indexMultiplier++;
                    }

                    if(frontBlockIndex >= backBlockIndex) {
                        break;
                    }
                }

                indexMultiplier += (frontBlock.getNumFreeSpace());
            }
            else {
                for(let blockIndex = 0; blockIndex < frontBlock.getSize(); blockIndex++) {
                    resultSum += (indexMultiplier * (frontBlock.getFileId() ?? 0));

                    indexMultiplier++;
                }
            }
            frontBlockIndex++;
        }

        return resultSum.toString();
    }
}