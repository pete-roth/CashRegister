import { describe, expect, test, jest } from "@jest/globals";
import { IChange, CalculateChange,CreateChangeString } from "../change";


describe('change module', () => {

    test('CalculateChange call returns (3) cents', () => {
        let testChange: IChange[] = [
            { name: "Penny", namePlural: "Pennies", value: .01, currencyLocale: "en-US" },
            { name: "Penny", namePlural: "Pennies", value: .01, currencyLocale: "en-US" },
            { name: "Penny", namePlural: "Pennies", value: .01, currencyLocale: "en-US" }
        ];

       expect(CalculateChange(.03)).toEqual(testChange);
    });

    test('Randomly distribute change, test that outputs values add up to input', () => {
        // used when change due is divisible by 3
        let input = 3;        
        let test =  CalculateChange(input);
        let controlResult = (test.flatMap(m => m.value).reduce((prev, next) => prev + next));        

        expect(input).toBeCloseTo(controlResult); // account for floating-point precision rounding errors
    });

    test('CreateOutputFileString for 3 cents', () => {
        let testChange: IChange[] = [
            { name: "Penny", namePlural: "Pennies", value: .01, currencyLocale: "en-US" },
            { name: "Penny", namePlural: "Pennies", value: .01, currencyLocale: "en-US" },
            { name: "Penny", namePlural: "Pennies", value: .01, currencyLocale: "en-US" }
        ];
        let expectedResult: string = "(3) Pennies";

        expect(CreateChangeString(testChange)).toEqual(expectedResult)
    });

    test('Test change randomness', () => {
        let input = 9; // where input % 3 = 0
        if (input % 3 != 0) {
            fail("Randomness fitness must supply a number divisible by 3");
        }
        let testOne = CalculateChange(input);
        let testTwo = CalculateChange(input);      

        expect(testOne).not.toBe(testTwo); // given low variability of input, could make a false positive here and there...
    });


})
