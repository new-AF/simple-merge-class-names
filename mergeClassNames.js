/**
 * mergeClassNames - A straightforward utility for merging CSS class names in React + Tailwind, and other JavaScript projects.
 *
 * @license AGPL-3.0
 * Copyright (C) 2025 Abdullah Fatota
 *
 * Example usage:
 * import { mergeClassNames } from "simple-merge-class-names";
 *
 * function MyComponent() {
 *   return (
 *     <div
 *       className={mergeClassNames(
 *         "app",
 *         "min-h-dvh",
 *         "grid",
 *         "grid-rows-[auto_1fr_auto]",
 *         "outline"
 *       )}
 *     >
 *       Hello, world!
 *     </div>
 *   );
 * }
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

const isValueFalse = (val) => val === false;

const isTypeString = (val) => typeof val === "string";

const isEmptyString = (val) => {
    const trimmed = val.trim();
    return trimmed === "";
};

const partition = (array, keepPredicate) => {
    const keep = [];
    const ignore = [];
    for (const element of array) {
        (keepPredicate(element) ? keep : ignore).push(element);
    }
    return [keep, ignore];
};

const warnInvalidArguments = ({
    nonStrings,
    emptyStrings,
    activateDebugger = false,
}) => {
    const hasInvalidTypes = nonStrings.length > 0;
    const hasEmptyStrings = emptyStrings.length > 0;
    const doPrint = hasInvalidTypes || hasEmptyStrings;

    if (doPrint === false) return;

    const messages = [];
    const newline = "\n";
    const doubleNewline = newline.repeat(2);

    const tabString = (string, tabCount = 0) => {
        const tab = "\t".repeat(tabCount);
        return `${tab}${string}`;
    };

    const tabArray = (array, tabCount) =>
        array.map((element) => tabString(element, tabCount));

    /* convert array to nice string because console.warn(array) squashes it on 1 line */
    const makeMessage = ({
        array,
        expected,
        tabCount = 1,
        includeElementType = false,
        arrayMaxLength = 5,
    }) => {
        const count = array.length;
        const addEllipsis = count > arrayMaxLength;
        const slice = addEllipsis ? array.slice(0, arrayMaxLength) : array;

        const formatElementWithType = (element, index) =>
            `(${index + 1}/${count}): >${element}< of type "${typeof element}"`;

        const formatElement = (element, index) =>
            `(${index + 1}/${count}): >${element}<`;

        const initialMapped = slice.map(
            includeElementType ? formatElementWithType : formatElement
        );

        const mapped = addEllipsis ? [...initialMapped, "..."] : initialMapped;

        const string = [
            tabString(
                `${expected}, but got ${count} invalid value(s):`,
                tabCount
            ),
            tabString("[", tabCount),
            tabArray(mapped, tabCount).join("," + newline),
            tabString("]", tabCount),
        ].join(newline);

        return string;
    };

    /* "Replace "mergeClassNames" with "mergeClassNamesDebugger" ... " */
    if (doPrint && activateDebugger === false) {
        messages.push(
            tabString(
                '* Replace "mergeClassNames" with "mergeClassNamesDebugger" without changing any arguments, and open the Developer Console, or attach Debugger (see README.md).',
                1
            )
        );
    }

    /* "Expected all arguments to be either ..." */
    if (hasInvalidTypes) {
        if (activateDebugger) {
            debugger;
        }
        messages.push(
            makeMessage({
                array: nonStrings,
                expected:
                    "* Expected all arguments to be either strings or value `false`",
                includeElementType: true,
            })
        );
    }

    /* "Expected 0 empty strings ..." */
    if (hasEmptyStrings) {
        if (activateDebugger) {
            debugger;
        }
        messages.push(
            makeMessage({
                array: emptyStrings,
                expected: "* Expected 0 empty strings",
            })
        );
    }

    /* Full Warn makeMessage */
    const functionName =
        activateDebugger === false
            ? "mergeClassNames"
            : "mergeClassNamesDebugger";

    const string = [
        `[${functionName}] Warning: invalid arguments were provided and ignored:`,
        ...messages,
    ].join(doubleNewline);

    console.warn(string);
};

const mergeClassNamesCore = ({ args, activateDebugger }) => {
    const space = "\x20"; // ASCII code for a single space character (" "), decimal 32

    const [_, nonFalseValues] = partition(args, isValueFalse); // ignore all false values used for conditional class inclusion
    const [strings, nonStrings] = partition(nonFalseValues, isTypeString);
    const [emptyStrings, nonEmptyStrings] = partition(strings, isEmptyString);
    const trimmed = nonEmptyStrings.map((val) => val.trim());
    const className = trimmed.join(space);

    /* Don't silently ignore invalid input, explicitly disclose them as it may indicate a bigger problem */
    warnInvalidArguments({ nonStrings, emptyStrings, activateDebugger });

    return className;
};

export const mergeClassNames = (...args) =>
    mergeClassNamesCore({ args, activateDebugger: false });

export const mergeClassNamesDebugger = (...args) =>
    mergeClassNamesCore({ args, activateDebugger: true });
