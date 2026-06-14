import { test, expect } from "vitest";
import { mergeClassNames, mergeClassNamesDebugger } from "../mergeClassNames";

const cases = [
    { input: [], className: "" },
    { input: [false], className: "" },
    { input: [null, undefined, ""], className: "" }, // these will console.warn
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

cases.forEach(({ input, className }) => {
    const stringifiedArray = JSON.stringify(input, null, 4).slice(1, -1);

    const display = `
mergeClassNames(${stringifiedArray})

mergeClassNamesDebugger(${stringifiedArray})

==> Expected output: "${className}"
`;

    test(display, () => {
        expect(mergeClassNames(...input)).toBe(className);
        expect(mergeClassNamesDebugger(...input)).toBe(className);
    });
});
