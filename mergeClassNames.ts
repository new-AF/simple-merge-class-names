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

type InavlidArgumentFunction = (value: Argument) => void;

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

type Options = {
    "console-warn-invalid-and-whitespace-arguments": boolean;
    "activate-debugger-on-invalid-arguments": boolean;
};

const warn = ({ isValid, value, error }: Argument) => {
    if (isValid) {
        return;
    }

    console.warn("x", value);
};

const activateDebugger = ({ isValid, value }: Argument) => {
    if (isValid) {
        return;
    }

    debugger;
};

const createCustomMergeClassNames = (options: Options) => {
    const invalidHandlers = [];

    if (options["console-warn-invalid-and-whitespace-arguments"]) {
        invalidHandlers.push(warn);
    }

    if (options["activate-debugger-on-invalid-arguments"]) {
        invalidHandlers.push(activateDebugger);
    }

    const invalidArgumentHandler = (value: unknown) => {
        invalidHandlers.forEach((func) => func(value));
    };

    // construct the function
    return (...input: string[]) =>
        mergeClassNamesCore(input, invalidArgumentHandler);
};

export const mergeClassNamesDebugger = createCustomMergeClassNames({
    "activate-debugger-on-invalid-arguments": true,
    "console-warn-invalid-and-whitespace-arguments": true,
});

export const mergeClassNames = createCustomMergeClassNames({
    "activate-debugger-on-invalid-arguments": false,
    "console-warn-invalid-and-whitespace-arguments": true,
});
