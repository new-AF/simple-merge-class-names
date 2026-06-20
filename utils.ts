import {
    ValidArgument,
    Classified,
    ClassifiedInvalid,
    ClassifiedInavlidReason,
} from "./types";

// classifies input arguments
export const classify = (value: ValidArgument): Classified => {
    // FP pattern of mapping values with extra information.
    // The core computes data.
    // because TS types disappear in JS runtime

    // valid
    if (value === false) {
        return {
            value,
            ignore: true,
            isValid: true,
        };
    }

    // invalid
    if (typeof value !== "string") {
        return {
            value,
            isValid: false,
            reason: ClassifiedInavlidReason.NotAString,
        };
    }

    // it's a string

    // invalid.
    if (value === "") {
        return {
            value,
            isValid: false,
            reason: ClassifiedInavlidReason.EmptyString,
        };
    }

    const trimmed = value.trim();

    // invalid
    if (trimmed === "") {
        return {
            value: trimmed,
            isValid: false,
            reason: ClassifiedInavlidReason.Whitespace,
        };
    }

    // valid
    return {
        value: trimmed,
        isValid: true,
        ignore: false,
    };
};

export const warningMessage = ({
    value,
    reason,
}: ClassifiedInvalid): string => {
    // null or undefined
    if (
        reason === ClassifiedInavlidReason.NotAString &&
        (value === null || value === undefined)
    ) {
        return `Ignored invalid argument: ${value}`;
    }

    // array
    if (reason === ClassifiedInavlidReason.NotAString && Array.isArray(value)) {
        const sub = value.slice(0, 3);
        const string = sub.join(", ");
        const ellipsisPart = value.length > sub.length ? ", ..." : "";

        return `Ignored invalid argument, array: [${string}${ellipsisPart}]`;
    }

    // empty string
    if (reason === ClassifiedInavlidReason.EmptyString) {
        return `Ignored invalid argument: empty string.`;
    }

    // whitespace
    if (reason === ClassifiedInavlidReason.Whitespace) {
        return `Ignored invalid argument, whitespace string: "${value}"`;
    }

    // object
    return `Ignored invalid argument, Object: ${value}`;
};

// console.warn
export const warn = (invalid: ClassifiedInvalid) => {
    const warning = warningMessage(invalid);

    console.warn(warning);
};

// activates debugger
export const activateDebugger = (_invalid: ClassifiedInvalid) => {
    debugger;
};
