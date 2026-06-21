/**
 * mergeClassNames - A class names merger for TypeScript, JavaScript, TSX / JSX (React).
 *
 * @license AGPL-3.0
 * Copyright (C) 2026 Abdullah Fatota
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
 

Only Valid Arguments:
    1) valid strings: non-empty, non-whitespace
    2) value `false`

Invalid arguments: anything else e.g.
    - empty strings
    - whitespace strings
    - arrays
    - numbers
    - objects
    - value true
    - etc.
*/

import {
    ClassifiedInvalidFunction,
    ClassifiedInvalid,
    CustomOptions,
} from "./types";

import {
    classify,
    getInvalid,
    warn,
    activateDebugger,
    getClassNames,
} from "./utils";

// joins valid strings into final className
const mergeClassNamesCore = (
    values: (string | false)[],
    onClassifiedInvalid?: ClassifiedInvalidFunction,
) => {
    // classify arguments
    const classified = values.map(classify);

    // optional call invalid arguments handlers: warn and/or activate debugger
    if (onClassifiedInvalid) {
        getInvalid(classified).forEach(onClassifiedInvalid);
    }

    // valid strings only
    const classNames: string[] = getClassNames(classified).map(
        ({ value }) => value,
    );

    const finalClassName = classNames.join(" ");
    return finalClassName;
};

// creates custom mergeClassNames e.g. warn = false, activate debugger = true
export const createCustomMergeClassNames = (options: CustomOptions) => {
    const invalidHandlers: ClassifiedInvalidFunction[] = [];

    // will be logged in console
    const functionName = options.name ?? "Custom mergeClassNames";

    if (options["console-warn-invalid-and-whitespace-arguments"]) {
        invalidHandlers.push((arg) => warn(arg, functionName));
    }

    if (options["activate-debugger-on-invalid-arguments"]) {
        invalidHandlers.push(activateDebugger);
    }

    const combinedInvalidHandler = (value: ClassifiedInvalid) => {
        invalidHandlers.forEach((func) => func(value));
    };

    // construct the mergeClassNames function
    return (...input: (string | false)[]) =>
        mergeClassNamesCore(
            input,
            invalidHandlers.length > 0 ? combinedInvalidHandler : undefined,
        );
};

export const mergeClassNames = createCustomMergeClassNames({
    "console-warn-invalid-and-whitespace-arguments": true,
    "activate-debugger-on-invalid-arguments": false,
    name: "mergeClassNames",
});

export const mergeClassNamesDebugger = createCustomMergeClassNames({
    "console-warn-invalid-and-whitespace-arguments": true,
    "activate-debugger-on-invalid-arguments": true,
    name: "mergeClassNamesDebugger",
});
