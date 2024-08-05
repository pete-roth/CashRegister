import _, { Dictionary } from "lodash";

export interface IChange {
    name: string,
    namePlural: string,
    value: number,
    currencyLocale?: string //to-do: account for different currency(ies)?
}

let change: IChange[] = GetCurrencyForLocale().sort((m, n) => m.value < n.value ? 1 : -1); // sort largest->smallest value

export function CalculateChange(changeDue: number, divisor:number = 3): IChange[] { 

        let result: IChange[];

        if (changeDue % divisor == 0) {
            result = CalculateChangeRandom(changeDue);
        }
        else {
            result = CalculateMinChange(changeDue);
        }

        return result; 
}
// Recursive function to calculate the minimum number of demoninations for change
function CalculateMinChange(changeDue: number, changePool: IChange[] = change, returnChange: IChange[] = []): IChange[] {

    try {

        if (changeDue == 0) {
            _.orderBy(returnChange, m => m.value, "desc");
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
    _.orderBy(returnChange, m => m.value, "desc");
    return returnChange;
}

// Generates random numbers of demoninations 
function CalculateChangeRandom(changeDue: number, changePool: IChange[] = change, returnChange: IChange[] = []): IChange[] {

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
    _.orderBy(returnChange, m => m.value, "desc");

    return (returnChange);
}

// Generates a string formatted for the output file
export function CreateChangeString(change: IChange[]): string {

    let outputString: string = "";

    let grouped = _.groupBy(change, m => m.value);

    let mapped = _.mapValues(grouped, (m) => {
        return `${ChangeStringHelper(m)}`;
    });
    let sorted = _.sortBy(mapped, "desc");

    sorted.forEach((line) => {
        if (outputString.length > 0) {
            outputString += ", " + line
        }
        else {
            outputString += line
        }
    });

    return outputString;
}

// Additional string formatting for QoL display
function ChangeStringHelper(change: IChange[]): string {
    return change.length > 1 ? "(" + change.length + ") " + change[0].namePlural : "(" + change.length + ") " + change[0].name;
}

//determine change values and verbiage based on locale
function GetCurrencyForLocale(locale: string = "en-US") {

    //read these values from a config or persistence/storage in realistic scenario
    let change: IChange[] = [
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

export class Change { }