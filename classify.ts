import { ValidArgument, Argument, InavlidArgumentEnum } from "./types";

// classifies input arguments
export const classify = (value: ValidArgument): Argument => {
    // FP pattern of mapping values with extra information.
    // The core computes data.

    // because TS types disappear in JS runtime
    if (value === false) {
        return {
            value,
            ignore: true,
            isValid: true,
        };
    }

    if (typeof value !== "string") {
        return {
            value,
            isValid: false,
            ignore: true,
            error: InavlidArgumentEnum.NotAString,
        };
    }

    // it's a string
    if (value === "") {
        return {
            value,
            isValid: false,
            ignore: true,
            error: InavlidArgumentEnum.EmptyString,
        };
    }

    const trimmed = value.trim();

    if (trimmed === "") {
        return {
            value: trimmed,
            isValid: false,
            ignore: true,
            error: InavlidArgumentEnum.Whitespace,
        };
    }

    return {
        value: trimmed,
        isValid: true,
        ignore: false,
    };
};
