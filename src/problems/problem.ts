import fs from "fs";

export abstract class Problem {
    private readonly inputFilename: string;
    private readonly dayNumber: number;

    readonly INPUT_DATA_DIRECTORY = "inputData/";

    constructor(inputFilename: string, dayNumber: number) {
        this.inputFilename = inputFilename;
        this.dayNumber = dayNumber;
    }

    public readInputFile() {
        return fs.readFileSync(this.INPUT_DATA_DIRECTORY + this.inputFilename, { encoding: 'utf8', flag: 'r' });
    }

    public getDayNumber() {
        return this.dayNumber;
    }

    public abstract calculateSolution(): string;
}