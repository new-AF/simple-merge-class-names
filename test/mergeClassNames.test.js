import { test, expect } from "vitest";
import { mergeClassNames } from "../mergeClassNames";

const cases = [
    { input: [], expected: "" },
    { input: [null, undefined, ""], expected: "" },
    {
        input: [
            "app",
            undefined,
            "",
            "min-h-dvh",
            "grid",
            null,
            "grid-rows-[auto_1fr_auto]",
            "outline",
            "",
        ],
        expected: "app min-h-dvh grid grid-rows-[auto_1fr_auto] outline",
    },
];

cases.forEach(({ input, expected }) => {
    const stringifiedArray = JSON.stringify(input).slice(1, -1);

    const displayString = `Input: mergeClassNames(${stringifiedArray})
        Expected output: '${expected}'`;

    test(displayString, () => {
        expect(mergeClassNames(...input)).toBe(expected);
    });
});
