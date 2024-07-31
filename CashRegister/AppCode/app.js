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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const transaction_1 = require("./transaction");
const change_1 = require("./change");
const inputFile = path_1.default.join(__dirname, "input.txt");
const outputFile = path_1.default.join(__dirname, "output.txt");
init();
//Reads input file, returns change according to logic, writes change-string to output file
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        let Transactions = yield (0, transaction_1.ParseInputFile)(inputFile);
        for (let i = 0; i < Transactions.length; i++) {
            let change = (0, change_1.CalculateChange)(Transactions[i].changeDue);
            let changeString = (0, change_1.CreateChangeString)(change);
            (0, transaction_1.WriteChangeToFile)(outputFile, changeString);
        }
        (0, transaction_1.WriteChangeToFile)(outputFile, "\n");
    });
}
//# sourceMappingURL=app.js.map