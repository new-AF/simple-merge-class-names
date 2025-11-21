import { test, expect } from "vitest";
import { mergeClassNames, mergeClassNamesDebugger } from "../mergeClassNames";

const classNameCases = [
    { input: [], expected: "" },
    { input: [false], expected: "" },
    { input: [null, undefined, ""], expected: "" }, // these will console.warn
    { input: ["app"], expected: "app" },
    { input: [" app  ", false], expected: "app" },
    {
        input: [
            "  app ",
            undefined,
            [" test "],
            { key: "value" },
            "",
            "min-h-dvh",
            "grid   ",
            true,
            null,
            "grid-rows-[auto_1fr_auto]",
            "outline",
            "   ",
        ], // this one too
        expected: "app min-h-dvh grid grid-rows-[auto_1fr_auto] outline",
    },
];

classNameCases.forEach(({ input, expected }) => {
    const stringifiedArray = JSON.stringify(input).slice(1, -1);

    const displayString = `Input: mergeClassNames(${stringifiedArray})
        Expected output: '${expected}'`;

    test(displayString, () => {
        expect(mergeClassNames(...input)).toBe(expected);
    });
});

classNameCases.forEach(({ input, expected }) => {
    const stringifiedArray = JSON.stringify(input).slice(1, -1);

    const displayString = `Input: mergeClassNamesDebugger(${stringifiedArray})
        Expected output: '${expected}'`;

    test(displayString, () => {
        expect(mergeClassNamesDebugger(...input)).toBe(expected);
    });
});
