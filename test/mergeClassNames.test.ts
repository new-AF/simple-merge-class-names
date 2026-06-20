import { test, expect, vi } from "vitest";
import {
    mergeClassNames,
    mergeClassNamesDebugger,
    createCustomMergeClassNames,
} from "../src/mergeClassNames";
import { warningMessage, classify, getInvalid } from "../src/utils";

const tests = [
    {
        input: [],
        className: "",
        consoleWarns: false,
    },
    { input: [false], className: "", consoleWarns: false },
    { input: [null, undefined, ""], className: "", consoleWarns: true }, // these will console.warn
    { input: ["app"], className: "app", consoleWarns: false },
    { input: [" app  ", false], className: "app", consoleWarns: false },
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
        className: "app min-h-dvh grid grid-rows-[auto_1fr_auto] outline",
        consoleWarns: true,
    },
];

// all 4 combinations of custom merge class names
const allFunctions = {
    mergeClassNames: mergeClassNames,
    mergeClassNamesDebugger: mergeClassNamesDebugger,
};

const prettyPrint = (value: unknown) => JSON.stringify(value, null, 4);

tests.forEach(({ input, className, consoleWarns }) => {
    const allArguments: string = prettyPrint(input).slice(1, -1);

    const warnings: string[] = consoleWarns
        ? getInvalid(input.map(classify)).map(warningMessage)
        : [];

    const display = `
mergeClassNames(${allArguments})

mergeClassNamesDebugger(${allArguments})

==> Expected warnings: ${prettyPrint(warnings)}

==> Expected output: "${className}"

`;

    test(display, () => {
        // console.warn suppress output
        const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

        expect(mergeClassNames(...input)).toBe(className);

        expect(warnSpy.mock.calls.map(([message]) => message)).toEqual(
            warnings,
        );

        expect(mergeClassNamesDebugger(...input)).toBe(className);

        warnSpy.mockRestore();
    });
});
