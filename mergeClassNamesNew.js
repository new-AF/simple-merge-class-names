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

const isString = (value) => typeof value === "string";

const partition = ({ array, predicate }) => {
    const kept = [];
    const ignored = [];
    for (const element of array) {
        const array = predicate(element) ? kept : ignored;
        array.push(element);
    }
    return { kept, ignored };
};

const warnAndPossibleDebug = ({
    notStrings,
    invalidStrings,
    activateDebugger,
}) => {
    const notStringsArray = notStrings ?? [];
    const invalidStringsArray = invalidStrings ?? [];
    const debuggerFunction =
        activateDebugger === true
            ? () => {
                  debugger;
              }
            : () => {};

    notStringsArray.forEach((element) => {
        console.warn(
            `Invalid argument is ignored: >${element}< (${typeof element})`
        );
        debuggerFunction();
    });

    invalidStringsArray.forEach((element) => {
        console.warn(
            element.length === 0
                ? `Empty string is ignored`
                : `Whitespace string >${element}< is ignored`
        );
        debuggerFunction;
    });
};

// valid arguments: non-empty strings and `false`
// invalid arguments: empty strings, anything that's not value `false`
const mergeClassNamesCore = ({ array, activateDebugger }) => {
    const { kept: strings, ignored: notStrings } = partition({
        array,
        predicate: isString,
    });
    const { kept: validStrings, ignored: invalidStrings } = partition({
        strings,
        predicate: (string) => string.trim().length >= 1,
    });
};

export const mergeClassNames = (...argumentsArray) => {
    const { validArguments, invalidArguments } =
        filterArguments(argumentsArray);
    warnOnly(invalidArguments, "mergeClassNames", "mergeClassNamesDebugger");
    const classNames = join(validArguments);
    const result = finalResult(classNames);
    return result;
};

export const mergeClassNamesDebugger = (...argumentsArray) => {
    const { validArguments, invalidArguments } =
        filterArguments(argumentsArray);
    warnDebug(invalidArguments, "mergeClassNamesDebugger");
    const classNames = join(validArguments);
    const result = finalResult(classNames);
    return result;
};
