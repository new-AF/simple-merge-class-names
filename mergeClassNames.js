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

const isTypeString = (val) => typeof val === "string";

const isNonEmptyString = (val) => val !== "";

const partition = (array, keepPredicate) => {
    const keep = [];
    const ignore = [];
    for (const element of array) {
        (keepPredicate(element) ? keep : ignore).push(element);
    }
    return [keep, ignore];
};

export const mergeClassNames = (...args) => {
    const space = "\x20"; // ASCII code for a single space character (" "), decimal 32

    const [strings, nonStrings] = partition(args, isTypeString);

    const trimmed = strings.map((val) => val.trim());

    const [nonEmptyStrings, emptyStrings] = partition(
        trimmed,
        isNonEmptyString
    );

    const className = nonEmptyStrings.join(space);

    /* Don't silently ignore invalid input, explicitly disclose them as it may indicate a bigger problem */
    const warn = [];

    /* "Expected all arguments to be strings ..." */
    if (nonStrings.length > 0) {
        const join = ", ";
        const count = nonStrings.length;
        const formatGotArray = (element, index) =>
            `(${index + 1}/${count}): (${element}) of type "${typeof element}"`;
        const message = nonStrings.map(formatGotArray).join(join);

        warn.push(
            `Expected all arguments to be strings, but got ${count} non-string values: [${message}].`
        );
    }

    /* "Expected 0 empty strings ..." */
    if (emptyStrings.length > 0) {
        const count = emptyStrings.length;
        warn.push(`Expected 0 empty strings, but got ${count}.`);
    }

    /* Full Warn Message */
    if (warn.length > 0) {
        const newline = "\n";
        const prefix = "\t" + "- ";
        const message = warn.map((text) => `${prefix}${text}`).join(newline);

        console.warn(
            "[mergeClassNames] Warning: invalid arguments were provided and were ignored:",
            newline,
            message
        );
    }

    return className;
};
