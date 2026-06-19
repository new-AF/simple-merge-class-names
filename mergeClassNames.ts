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
 

Valid arguments:
    1) valid strings, which are non-empty strings, and non-whitespace strings
    2) value `false`

Invalid arguments: anything else e.g.
    - empty strings
    - whitespace strings
    - numbers
    - value true
    - 
*/

import {
    ValidArgument,
    InavlidArgumentFunction,
    ClassifiedValid,
    ClassifiedInvalid,
} from "./types";

import { classify, warn, activateDebugger } from "./utils";

// joins valid strings into final className
const mergeClassNamesCore = (
    values: ValidArgument[],
    onInvalidArgument?: InavlidArgumentFunction,
) => {
    // classify arguments
    const classified = values.map(classify);

    // optional call invalid arguments handlers: warn and/or activate debugger
    if (onInvalidArgument) {
        classified
            .filter((obj): obj is ClassifiedInvalid => {
                return !obj.isValid;
            })
            .forEach(onInvalidArgument);
    }

    // valid strings only
    const classNames = classified
        .filter((obj): obj is ClassifiedValid => obj.isValid && !obj.ignore)
        .map(({ value }) => value);

    const finalClassName = classNames.join(" ");
    return finalClassName;
};

// options to createCustomMergeClassNames
type Options = {
    "console-warn-invalid-and-whitespace-arguments": boolean;
    "activate-debugger-on-invalid-arguments": boolean;
};

// creates custom mergeClassNames e.g. warn = false, activate debugger = true
const createCustomMergeClassNames = (options: Options) => {
    const invalidHandlers: InavlidArgumentFunction[] = [];

    if (options["console-warn-invalid-and-whitespace-arguments"]) {
        invalidHandlers.push(warn);
    }

    if (options["activate-debugger-on-invalid-arguments"]) {
        invalidHandlers.push(activateDebugger);
    }

    const invalidArgumentHandler = (value: ClassifiedInvalid) => {
        invalidHandlers.forEach((func) => func(value));
    };

    // construct the mergeClassNames function
    return (...input: string[]) =>
        mergeClassNamesCore(input, invalidArgumentHandler);
};

export const mergeClassNames = createCustomMergeClassNames({
    "console-warn-invalid-and-whitespace-arguments": true,
    "activate-debugger-on-invalid-arguments": false,
});

export const mergeClassNamesDebugger = createCustomMergeClassNames({
    "console-warn-invalid-and-whitespace-arguments": true,
    "activate-debugger-on-invalid-arguments": true,
});
