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
    1) valid strings, which are non-empty strings, and non-whitespace strings
    2) value `false`

Invalid arguments: anything else e.g.
    - empty strings
    - whitespace strings
    - numbers
    - value true
    - 
*/

import { InavlidArgumentEnum, Argument, ValidArgument } from "./types";
import { createWarning } from "./createWarning";
import { classify } from "./classify";

// called on invalid arguments, warns or activates debugger or both
type InavlidArgumentEnumFunction = (value: Argument) => void;

// joins valid strings into final className
const mergeClassNamesCore = (
    values: ValidArgument[],
    onInvalidArgument?: InavlidArgumentEnumFunction,
) => {
    // classify arguments
    const maybe: Argument[] = values.map(classify);

    // valid strings
    const valid = maybe.filter(({ isValid, ignore }) => isValid && !ignore);

    // optional call invalid argument handlers: warn and activate debugger
    if (onInvalidArgument) {
        maybe
            .filter(({ isValid }) => {
                return !isValid;
            })
            .forEach(onInvalidArgument);
    }

    const trimmed = valid.map(({ value }) => value);
    const joined = trimmed.join(" ");
    return joined;
};

// options to createCustomMergeClassNames
type Options = {
    "console-warn-invalid-and-whitespace-arguments": boolean;
    "activate-debugger-on-invalid-arguments": boolean;
};

// console.warn
const warn = ({ isValid, value, error, ignore }: Argument) => {
    if (isValid) {
        return;
    }

    const warning = createWarning({ isValid, value, error, ignore });
    console.warn(warning);
};

// activates debugger
const activateDebugger = ({ isValid, value }: Argument) => {
    if (isValid) {
        return;
    }

    debugger;
};

// creates custom mergeClassNames e.g. warn = false, activate debugger = true
const createCustomMergeClassNames = (options: Options) => {
    const invalidHandlers: InavlidArgumentEnumFunction[] = [];

    if (options["console-warn-invalid-and-whitespace-arguments"]) {
        invalidHandlers.push(warn);
    }

    if (options["activate-debugger-on-invalid-arguments"]) {
        invalidHandlers.push(activateDebugger);
    }

    const invalidArgumentHandler = (value: Argument) => {
        invalidHandlers.forEach((func) => func(value));
    };

    // construct the function
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
