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
    },
    { input: [false], className: "" },
    { input: [null, undefined, ""], className: "" },
    { input: ["app"], className: "app" },
    { input: [" app  ", false], className: "app" },
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
    },
];

const allFunctions = {
    // warnings: true  activate-debugger: true
    mergeClassNamesDebugger: {
        func: mergeClassNamesDebugger,
        warnings: true,
        "activate-debugger": true,
    },

    // warnings: true  activate-debugger: false
    mergeClassNames: {
        func: mergeClassNames,
        warnings: true,
        "activate-debugger": false,
    },

    // warnings: false  activate-debugger: true
    "warnings: false  activate-debugger: true; Custom mergeClassNames": {
        func: createCustomMergeClassNames({
            warnings: false,
            "activate-debugger": true,
        }),
        warnings: false,
        "activate-debugger": true,
    },

    // warnings: false  activate-debugger: false
    "warnings: false  activate-debugger: false; Custom mergeClassNames": {
        func: createCustomMergeClassNames({
            warnings: false,
            "activate-debugger": false,
        }),
        warnings: false,
        "activate-debugger": false,
    },
};

const prettyPrint = (value: unknown) => JSON.stringify(value, null, 4);

for (const [
    functionName,
    { func, warnings, "activate-debugger": activateDebugger },
] of Object.entries(allFunctions)) {
    tests.forEach(({ input, className }) => {
        const allArguments: string = prettyPrint(input).slice(1, -1);
        const consoleWarnings: string[] = warnings
            ? getInvalid(input.map(classify)).map(warningMessage)
            : [];

        const display = `
============================================
${functionName}(${allArguments})

-> warnings: ${warnings}
-> 'activate-debugger': ${activateDebugger}

==> Expected warnings: ${prettyPrint(consoleWarnings)}
==> Expected className: "${className}"
`;

        test(display, () => {
            // console.warn suppress output
            const warnSpy = vi
                .spyOn(console, "warn")
                .mockImplementation(() => {});

            expect(func(...input)).toBe(className);

            const results = warnSpy.mock.calls;

            expect(results.map(([functionName, message]) => message)).toEqual(
                consoleWarnings,
            );

            expect(mergeClassNamesDebugger(...input)).toBe(className);

            warnSpy.mockRestore();
        });
    });
}
