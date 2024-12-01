import fs from "fs";

export abstract class Problem {
    private readonly inputFilename: string;
    private readonly dayNumber: number;
    private debugMode: boolean;

    readonly INPUT_DATA_DIRECTORY = "inputData/";
    readonly SAMPLE_DATA_DIRECTORY = "sampleData/";

    constructor(inputFilename: string, dayNumber: number) {
        this.inputFilename = inputFilename;
        this.dayNumber = dayNumber;
        this.debugMode = false;
    }

    /**
     * Prints a string to the console if debug mode is on
     * @param stringToPrint The string to print if debugMode is on
     */
    public printDebug(objectToPrint: any) {
        if(this.debugMode) {
            console.log("[DEBUG] " + objectToPrint)
        }
    }

    public setDebugMode(debugMode: boolean) {
        this.debugMode = debugMode;
    }

    public readInputFile() {
        return fs.readFileSync(this.INPUT_DATA_DIRECTORY + this.inputFilename, { encoding: 'utf8', flag: 'r' });
    }

    public readSampleFile(filename: string) {
        return fs.readFileSync(this.SAMPLE_DATA_DIRECTORY + filename, { encoding: 'utf8', flag: 'r' });
    }

    public getDayNumber() {
        return this.dayNumber;
    }

    public convertFileContentToNewlineDelimittedList(fileContent: string) {
        return fileContent.split("\n");
    }

    public abstract calculateSolution1(): string | undefined;

    public abstract calculateSolution2(): string | undefined;
}