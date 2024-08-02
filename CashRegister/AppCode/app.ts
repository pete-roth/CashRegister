import path from "path";
import { config } from "node-config-ts";
import { ITransaction, ParseInputFile, WriteChangeToFile } from "./transaction";
import { IChange, CalculateChange, CreateChangeString } from "./change";

const inputFile = path.join(__dirname, config.inputFilePath);
const outputFile = path.join(__dirname, config.outputFilePath);

init();

// Reads input file, returns change according to logic, writes change-string to output file
async function init() {

    let Transactions: ITransaction[] = await ParseInputFile(inputFile);

    for (let i = 0; i < Transactions.length; i++) {
        let change: IChange[] = CalculateChange(Transactions[i].changeDue);
        let changeString =  CreateChangeString(change);
        WriteChangeToFile(outputFile, changeString);    
    }

    WriteChangeToFile(outputFile, "\n");
}