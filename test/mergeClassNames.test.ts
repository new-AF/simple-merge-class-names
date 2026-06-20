import { test, expect, vi } from "vitest";
import { mergeClassNames, mergeClassNamesDebugger } from "../mergeClassNames";
import { warningMessage, classify } from "../utils";

const cases = [
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

const prettyPrint = (value: unknown) => JSON.stringify(value, null, 4);

cases.forEach(({ input, className, consoleWarns }) => {
    const stringifiedArray = prettyPrint(input);

    const warnings = consoleWarns
        ? input
              .map(classify)
              .filter((obj) => !obj.isValid)
              .map(warningMessage)
        : [];

    const display = `
mergeClassNames(${stringifiedArray})

mergeClassNamesDebugger(${stringifiedArray})

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
