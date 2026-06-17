import { InavlidArgumentEnum, Argument, ValidArgument } from "./types";

// console.warn
export const createWarning = ({ isValid, value, error }: Argument): string => {
    if (isValid) {
        return false;
    }

    // null or undefined
    if (
        error === InavlidArgumentEnum.NotAString &&
        (value === null || value === undefined)
    ) {
        return `Ignored invalid argument: ${value}`;
    }

    // array
    if (error === InavlidArgumentEnum.NotAString && Array.isArray(value)) {
        return `Ignored invalid empty string argument: "${value}"`;
    }

    // empty string
    if (error === InavlidArgumentEnum.EmptyString) {
        return `Ignored invalid empty string argument.`;
    }

    // whitespace
    if (error === InavlidArgumentEnum.Whitespace) {
        return `Ignored invalid whitespace string argument: "${value}"`;
    }

    return false;
};
