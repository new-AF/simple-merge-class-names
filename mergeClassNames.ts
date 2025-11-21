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

// valid arguments: non-empty strings and `false`
// invalid arguments: empty strings, anything that's not value `false`

// to be exported

const isTypeString = (value: unknown) => typeof value === "string";

const isEmptyString = (value: unknown) =>
    isTypeString(value) && value.length === 0;

const isWhiteSpace = (value: unknown) =>
    isTypeString(value) && value.trim().length === 0;

export const isValidString = (value: unknown) =>
    !isEmptyString(value) && !isWhiteSpace(value);

type userInputArray = Array<string | false>;

type coreArguments = {
    array: userInputArray;
    activateDebugger: boolean;
};

const mergeClassNamesCore = ({ array, activateDebugger }: coreArguments) => {
    const kept: string[] = [];
    const space = " ";

    array.forEach(
        (element) => {
            if (!isTypeString(element)) {
                console.warn(
                    `Ignored invalid argument: >${element}< (${typeof element})`
                );

                if (activateDebugger) {
                    debugger;
                }

                return;
            } // end not a string

            if (isEmptyString(element)) {
                console.warn(`Ignored empty string: ""`);

                if (activateDebugger) {
                    debugger;
                }

                return;
            } //  empty string

            const trimmed = element.trim();
            if (isWhiteSpace(trimmed)) {
                console.warn(`Ignored whitespace string: ${element}`);

                if (activateDebugger) {
                    debugger;
                }

                return;
            } // whitespace

            kept.push(trimmed);
        } // end for each
    );

    const className = kept.join(space);
    return className;
};

export const mergeClassNames = (...array: userInputArray) =>
    mergeClassNamesCore({ array, activateDebugger: false });

export const mergeClassNamesDebugger = (...array: userInputArray) =>
    mergeClassNamesCore({ array, activateDebugger: true });
