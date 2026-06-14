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

enum InavlidArgument {
    NotAString,
    EmptyString,
    Whitespace,
}

type Argument = {
    value: unknown;
    isValid: boolean;
    error?: InavlidArgument;
};

const classify = (input: string[]): Argument[] => {
    // FP pattern of mapping values with extra information.
    // The core computes data.
    const maybeObjects = input.map((value): Argument => {
        // because TS types disappear in JS runtime
        if (typeof value !== "string") {
            return {
                value,
                isValid: false,
                error: InavlidArgument.NotAString,
            };
        }

        // it's a string
        if (value === "") {
            return {
                value,
                isValid: false,
                error: InavlidArgument.EmptyString,
            };
        }

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

    return maybeObjects;
};

// warns or activates debugger
type InavlidArgumentFunction = (value: Argument) => void;

// classifies arguments, filters invalid and joins into final className
const mergeClassNamesCore = (
    values: string[],
    onInvalidArgument?: InavlidArgumentFunction,
) => {
    // classify arguments
    const maybe: Argument[] = classify(values);

    // valid strings
    const valid = maybe.filter(({ isValid }) => isValid);

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
const warn = ({ isValid, value, error }: Argument) => {
    if (isValid) {
        return;
    }

    if (error === InavlidArgument.NotAString) {
        console.warn(
            `Ignored invalid non-string argument: >${value}< (type ${typeof value})`,
        );
    }

    if (error === InavlidArgument.EmptyString) {
        console.warn(`Ignored invalid empty string argument: "${value}"`);
    }

    if (error === InavlidArgument.Whitespace) {
        console.warn(`Ignored invalid whitespace string argument: "${value}"`);
    }
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
    const invalidHandlers: InavlidArgumentFunction[] = [];

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
