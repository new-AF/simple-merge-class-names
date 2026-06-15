import { test, expect, vi } from "vitest";
import { mergeClassNames, mergeClassNamesDebugger } from "../mergeClassNames";

const makeE = () => {};

const cases = [
    {
        input: [],
        className: "",
        warnings: [],
    },
    { input: [false], className: "", warnings: [] },
    { input: [null, undefined, ""], className: "", warnings: [] }, // these will console.warn
    { input: ["app"], className: "app", warnings: [] },
    { input: [" app  ", false], className: "app", warnings: [] },
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
        warnings: [],
    },
];

cases.forEach(({ input, className, warnings }) => {
    const stringifiedArray = JSON.stringify(input, null, 4).slice(1, -1);

    const display = `
mergeClassNames(${stringifiedArray})

mergeClassNamesDebugger(${stringifiedArray})

==> Expected output: "${className}"

==> Expected warnings: ${warnings.join(", ")}
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
