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

const partition = (array, keepPredicate) => {
    const keep = [];
    const ignore = [];
    for (const element of array) {
        const arrayRef = keepPredicate(element) ? keep : ignore;
        arrayRef.push(element);
    }
    return [keep, ignore];
};

const filterArguments = (argumentsArray) => {
    /* 
    returns {
        valid: bool,
        value: any
        (optional) isString: bool,
        (optional) valueType: any
        (optional) isValueFalse
        (optional) isValidString: bool
    }
    */
    const isValidArgument = (value) => {
        const valueType = typeof value;

        if (value === false) {
            return { valid: true, value };
        }

        if (valueType === "string") {
            const trimmed = value.trim();

            // invalid string
            if (trimmed === "") {
                return {
                    valid: false,
                    value,
                    isString: true,
                    isValidString: false,
                };
            }
            // valid string
            return {
                valid: true,
                value: trimmed,
                isString: true,
                isValidString: true,
            };
        }

        // everything else
        return { valid: false, value, isString: false, valueType };
    };

    // array of objects
    const newArguments = argumentsArray.map((element) =>
        isValidArgument(element)
    );

    // includes `false`
    const [validArgumentsWithFalse, invalidArguments] = partition(
        newArguments,
        ({ valid }) => valid === true
    );

    // ignore `false`
    const [validArguments, _] = partition(
        validArgumentsWithFalse,
        ({ value }) => value !== false
    );

    // console.log({ validArgumentsWithFalse, validArguments, invalidArguments });

    return { validArguments, invalidArguments };
};

const warnMessage = (
    { value, isString, valueType, isValidString },
    callerFunctionName
) => {
    if (isString === false) {
        return `[${callerFunctionName}] Ignored non-string >${value}< (${valueType})`;
    } else if (isValidString === false) {
        return `[${callerFunctionName}] Ignored empty string "${value}"`;
    }
};

const warnOnly = (
    invalidArgumentsArray,
    callerFunctionName,
    debuggerVariantName
) =>
    invalidArgumentsArray.forEach((obj) => {
        const message = warnMessage(obj, callerFunctionName);
        console.warn(`${message}`);
    });

const warnDebug = (invalidArgumentsArray, callerFunctionName) =>
    invalidArgumentsArray.forEach((obj) => {
        console.warn(warnMessage(obj, callerFunctionName));
        debugger;
    });

const join = (argumentsArray) => {
    const space = "\x20"; // ASCII for single space (" "), decimal 32
    const classNames = argumentsArray.map(({ value }) => value).join(space);
    return classNames;
};

const finalResult = (joinedClassNames) =>
    joinedClassNames === "" ? false : joinedClassNames;

// exported
// export const mergeClassNamesNoWarning = (...argumentsArray) => {
//     const { validArguments, _ } = filterArguments(argumentsArray);
//     const classNames = join(validArguments);
//     const result = finalResult(classNames);
//     return result;
// };

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
