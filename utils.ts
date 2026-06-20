import {
    ValidArgument,
    Classified,
    ClassifiedInvalid,
    ClassifiedInavlidReason,
    ClassifiedClassName,
} from "./types";

// classifies input arguments
export const classify = (value: ValidArgument): Classified => {
    // FP pattern of mapping values with extra information.
    // The core computes data.
    // because TS types disappear in JS runtime

    // valid but ignore
    if (value === false) {
        return {
            status: "ignore",
            value,
        };
    }

    // invalid
    if (typeof value !== "string") {
        return {
            status: "invalid",
            value,
            reason: ClassifiedInavlidReason.NotAString,
        };
    }

    // it's a string

    // invalid.
    if (value === "") {
        return {
            status: "invalid",
            value,
            reason: ClassifiedInavlidReason.EmptyString,
        };
    }

    const trimmed = value.trim();

    // invalid
    if (trimmed === "") {
        return {
            status: "invalid",
            value,
            reason: ClassifiedInavlidReason.Whitespace,
        };
    }

    // valid
    return {
        status: "class-name",
        value: trimmed,
    };
};

// get only valid objects
export const getClassNames = (values: Classified[]): ClassifiedClassName[] => {
    return values.filter((obj) => obj.status === "class-name");
};

// get only valid objects
export const getInvalid = (values: Classified[]): ClassifiedInvalid[] => {
    return values.filter((obj) => obj.status === "invalid");
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
        return `Ignore invalid argument: ${value}`;
    }

    // array
    if (reason === ClassifiedInavlidReason.NotAString && Array.isArray(value)) {
        const sub = value.slice(0, 3);
        const string = sub.join(", ");
        const ellipsisPart = value.length > sub.length ? ", ..." : "";

        return `Ignore invalid argument, array: [${string}${ellipsisPart}]`;
    }

    // empty string
    if (reason === ClassifiedInavlidReason.EmptyString) {
        return `Ignore invalid argument: empty string.`;
    }

    // whitespace
    if (reason === ClassifiedInavlidReason.Whitespace) {
        return `Ignore invalid argument, whitespace string: "${value}"`;
    }

    // object
    return `Ignore invalid argument, Object: ${value}`;
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
