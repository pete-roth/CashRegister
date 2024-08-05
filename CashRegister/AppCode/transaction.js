"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
exports.ParseInputFile = ParseInputFile;
exports.WriteChangeToFile = WriteChangeToFile;
const fs_1 = require("fs");
// Read the filepath in, split on new lines, and again on the comma-delimited value
function ParseInputFile(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let transactions = [];
            yield (0, fs_1.readFile)(filePath, "utf8", function (err, data) {
                if (err) {
                    reject(err);
                }
                console.log("done reading");
                data.split("\r\n").forEach((line) => {
                    let transaction = {
                        amountDue: +(+line.split(",")[0]).toPrecision(3),
                        amountTendered: +(+line.split(",")[1]).toPrecision(3),
                        changeDue: +(+line.split(",")[1] - +line.split(",")[0]).toPrecision(3)
                    };
                    transactions.push(transaction);
                });
                console.log("done parsing");
                resolve(transactions);
            });
        }));
    });
}
// Write the formatted string to the destination file (creates and appends as/if needed)
function WriteChangeToFile(filePath, changeString) {
    try {
        let stream = (0, fs_1.createWriteStream)(filePath, { flags: 'a' });
        stream.write(changeString + "\n");
        stream.end();
    }
    catch (ex) {
        throw (ex);
    }
}
class Transaction {
}
exports.Transaction = Transaction;
//# sourceMappingURL=transaction.js.map