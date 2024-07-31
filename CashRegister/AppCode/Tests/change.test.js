"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const change_1 = require("../change");
(0, globals_1.describe)('change module', () => {
    (0, globals_1.test)('CalculateChange call returns (3) cents', () => {
        let testChange = [
            { name: "Penny", namePlural: "Pennies", value: .01, currencyLocale: "en-US" },
            { name: "Penny", namePlural: "Pennies", value: .01, currencyLocale: "en-US" },
            { name: "Penny", namePlural: "Pennies", value: .01, currencyLocale: "en-US" }
        ];
        (0, globals_1.expect)((0, change_1.CalculateChange)(.03)).toEqual(testChange);
    });
    (0, globals_1.test)('Randomly distribute change, test that outputs values add up to input', () => {
        // used when change due is divisible by 3
        let input = 3;
        let test = (0, change_1.CalculateChange)(input);
        let controlResult = (test.flatMap(m => m.value).reduce((prev, next) => prev + next));
        (0, globals_1.expect)(input).toBeCloseTo(controlResult); // account for floating-point precision rounding errors
    });
    (0, globals_1.test)('CreateOutputFileString for 3 cents', () => {
        let testChange = [
            { name: "Penny", namePlural: "Pennies", value: .01, currencyLocale: "en-US" },
            { name: "Penny", namePlural: "Pennies", value: .01, currencyLocale: "en-US" },
            { name: "Penny", namePlural: "Pennies", value: .01, currencyLocale: "en-US" }
        ];
        let expectedResult = "(3) Pennies";
        (0, globals_1.expect)((0, change_1.CreateChangeString)(testChange)).toEqual(expectedResult);
    });
    (0, globals_1.test)('Test change randomness', () => {
        let input = 9; // where input % 3 = 0
        if (input % 3 != 0) {
            fail("Randomness fitness must supply a number divisible by 3");
        }
        let testOne = (0, change_1.CalculateChange)(input);
        let testTwo = (0, change_1.CalculateChange)(input);
        (0, globals_1.expect)(testOne).not.toBe(testTwo); // given low variability of input, could make a false positive here and there...
    });
});
//# sourceMappingURL=change.test.js.map