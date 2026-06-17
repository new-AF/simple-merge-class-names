import { test, expect, vi } from "vitest";
import { mergeClassNames, mergeClassNamesDebugger } from "../mergeClassNames";
import { createWarning } from "../createWarning";
import { classify } from "../classify";

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

cases.forEach(({ input, className, consoleWarns }) => {
    const stringifiedArray = JSON.stringify(input, null, 4).slice(1, -1);

    const display = `
mergeClassNames(${stringifiedArray})

mergeClassNamesDebugger(${stringifiedArray})

==> Expected output: "${className}"

==> Expected warnings: ${consoleWarns ? "yes" : "no"}
`;

    test(display, () => {
        // console.warn suppress output
        const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

        expect(mergeClassNames(...input)).toBe(className);

        expect(warnSpy.mock.calls.map(([message]) => message)).toEqual(
            consoleWarns
                ? input
                      .map(classify)
                      .filter((element) => !element.isValid)
                      .map(createWarning)
                : [],
        );

        expect(mergeClassNamesDebugger(...input)).toBe(className);

        warnSpy.mockRestore();
    });
});
