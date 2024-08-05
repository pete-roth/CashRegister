"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Change = void 0;
exports.CalculateChange = CalculateChange;
exports.CreateChangeString = CreateChangeString;
const lodash_1 = __importDefault(require("lodash"));
let change = GetCurrencyForLocale().sort((m, n) => m.value < n.value ? 1 : -1); // sort largest->smallest value
function CalculateChange(changeDue, divisor = 3) {
    let result;
    if (changeDue % divisor == 0) {
        result = CalculateChangeRandom(changeDue);
    }
    else {
        result = CalculateMinChange(changeDue);
    }
    return result;
}
// Recursive function to calculate the minimum number of demoninations for change
function CalculateMinChange(changeDue, changePool = change, returnChange = []) {
    try {
        if (changeDue == 0) {
            lodash_1.default.orderBy(returnChange, m => m.value, "desc");
            return returnChange;
        }
        changePool = changePool.filter(m => m.value <= changeDue); // filter out larger denominations from recursive function
        for (let i = 0; i < changePool.length; i++) {
            let currentChangeValue = changePool[i].value;
            if (currentChangeValue <= changeDue) {
                returnChange.push(changePool[i]);
                return CalculateMinChange(+(changeDue - currentChangeValue).toPrecision(3), changePool, returnChange);
            }
        }
    }
    catch (ex) {
        throw (ex);
    }
    lodash_1.default.orderBy(returnChange, m => m.value, "desc");
    return returnChange;
}
// Generates random numbers of demoninations 
function CalculateChangeRandom(changeDue, changePool = change, returnChange = []) {
    try {
        while (changeDue > 0) {
            changePool = changePool.filter(m => m.value <= changeDue);
            let maxArrayValue = Math.floor((Math.random() * changePool.length));
            let currentChangeValue = changePool[maxArrayValue].value;
            if (currentChangeValue <= changeDue) {
                returnChange.push(changePool[maxArrayValue]);
                changeDue = +(changeDue - currentChangeValue).toPrecision(3);
            }
        }
    }
    catch (ex) {
        throw (ex);
    }
    lodash_1.default.orderBy(returnChange, m => m.value, "desc");
    return (returnChange);
}
// Generates a string formatted for the output file
function CreateChangeString(change) {
    let outputString = "";
    let grouped = lodash_1.default.groupBy(change, m => m.value);
    let mapped = lodash_1.default.mapValues(grouped, (m) => {
        return `${ChangeStringHelper(m)}`;
    });
    let sorted = lodash_1.default.sortBy(mapped, "desc");
    sorted.forEach((line) => {
        if (outputString.length > 0) {
            outputString += ", " + line;
        }
        else {
            outputString += line;
        }
    });
    return outputString;
}
// Additional string formatting for QoL display
function ChangeStringHelper(change) {
    return change.length > 1 ? "(" + change.length + ") " + change[0].namePlural : "(" + change.length + ") " + change[0].name;
}
//determine change values and verbiage based on locale
function GetCurrencyForLocale(locale = "en-US") {
    //read these values from a config or persistence/storage in realistic scenario
    let change = [
        { name: "One Hundred Dollar Bill", namePlural: "One Hundred Dollar Bills", value: 100, currencyLocale: "en-US" },
        { name: "Fifty Dollar Bill", namePlural: "Fifty Dollar Bills", value: 50, currencyLocale: "en-US" },
        { name: "Twenty Dollar Bill", namePlural: "Twenty Dollar Bills", value: 20, currencyLocale: "en-US" },
        { name: "Ten Dollar Bill", namePlural: "Ten Dollar Bills", value: 10, currencyLocale: "en-US" },
        { name: "Five Dollar Bill", namePlural: "Five Dollar Bills", value: 5, currencyLocale: "en-US" },
        { name: "One Dollar Bill", namePlural: "One Dollar Bills", value: 1, currencyLocale: "en-US" },
        { name: "Quarter", namePlural: "Quarters", value: .25, currencyLocale: "en-US" },
        { name: "Dime", namePlural: "Dimes", value: .1, currencyLocale: "en-US" },
        { name: "Nickel", namePlural: "Nickels", value: .05, currencyLocale: "en-US" },
        { name: "Penny", namePlural: "Pennies", value: .01, currencyLocale: "en-US" },
    ];
    return change;
}
class Change {
}
exports.Change = Change;
//# sourceMappingURL=change.js.map