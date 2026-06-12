/**
 * mergeClassNames - A class names merger for TypeScript, JavaScript, TSX / JSX (React).
 *
 * @license AGPL-3.0
 * Copyright (C) 2025 Abdullah Fatota
 *
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

/*
Valid arguments:
    1) non-empty non-fully-whitspace strings
    2) `false`

Invalid arguments: anything else
*/
const mergeClassNamesCore0 = ({ array, activateDebugger }) => {
    const kept = [];
    const space = " ";

    array.forEach(
        (element) => {
            const elementType = typeof element;
            const isString = elementType === "string";

            if (!isString) {
                console.warn(
                    `Ignored invalid argument: >${element}< (${elementType})`,
                );

                if (activateDebugger) {
                    debugger;
                }

                return;
            } // end not a string

            const isEmptyString = element.length === 0;

            if (isEmptyString) {
                console.warn(`Ignored empty string: ""`);

                if (activateDebugger) {
                    debugger;
                }

                return;
            } //  empty string

            const trimmed = element.trim();
            const isWhiteSpace = trimmed.length === 0;

            if (isWhiteSpace) {
                console.warn(`Ignored whitespace string: ${element}`);

                if (activateDebugger) {
                    debugger;
                }

                return;
            } // whitespace

            kept.push(trimmed);
        }, // end for each
    );

    const finalClassName = kept.join(space);
    return finalClassName;
};

export const mergeClassNames0 = (...array) =>
    mergeClassNamesCore({
        array,
        activateDebugger: false,
    });

export const mergeClassNamesDebugger0 = (...array) =>
    mergeClassNamesCore({
        array,
        activateDebugger: true,
    });

enum InavlidArgument {
    NotAString,
    Whitespace,
}

type MaybeArgument = {
    value: unknown;
    isValid: boolean;
    error?: InavlidArgument;
};

const mergeClassNamesCore = () => {};

export const mergeClassNames = (...input: string[]) => {
    // FP pattern of mapping values with extra information.
    // The core computes data.
    const maybeObjects = input.map((value): MaybeArgument => {
        // because TS types disappear in JS runtime
        if (typeof value !== "string") {
            return {
                value,
                isValid: false,
                error: InavlidArgument.NotAString,
            };
        }

        // it's a string
        const trimmed = value.trim();

        if (trimmed === "") {
            return {
                value: trimmed,
                isValid: false,
                error: InavlidArgument.Whitespace,
            };
        }

        return {
            value: trimmed,
            isValid: true,
        };
    });

    const valid = maybeObjects.filter(({ isValid }) => isValid);
    const trimmed = valid.map(({ value }) => value);
    const joined = trimmed.join(" ");
    return joined;
};

type Options = {
    consoleWarn: boolean;
    activateDebugger: boolean;
};

const customMergeClassNames = () => {};

export const mergeClassNamesDebugger = mergeClassNames;
