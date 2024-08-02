import { readFile, createWriteStream } from "fs";

export interface ITransaction {
    amountDue: number,
    amountTendered: number,
    changeDue: number
}

// Read the filepath in, split on new lines, and again on the comma-delimited value
export async function ParseInputFile(filePath: string): Promise<ITransaction[]> {

    return new Promise(async (resolve, reject) => {

        let transactions: ITransaction[] = [];

        await readFile(filePath, "utf8", function (err, data) {
            if (err) {
                reject(err);
            }
            console.log("done reading");

            data.split("\r\n").forEach((line: any) => {
                let transaction: ITransaction = {
                    amountDue: +(+line.split(",")[0]).toPrecision(3),
                    amountTendered: +(+line.split(",")[1]).toPrecision(3),
                    changeDue: +(+line.split(",")[1] - +line.split(",")[0]).toPrecision(3)
                };
                transactions.push(transaction);
            });

            console.log("done parsing");

            resolve(transactions);
        });

    });
}

// Write the formatted string to the destination file (creates and appends as/if needed)
export function WriteChangeToFile(filePath: string, changeString: string): any {
    try {
        let stream = createWriteStream(filePath, { flags: 'a' });
        stream.write(changeString + "\n");
        stream.end();
    } catch (ex) {

    }
}

export class Transaction { }