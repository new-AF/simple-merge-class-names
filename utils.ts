import {
    ValidArgument,
    Classified,
    ClassifiedInvalid,
    ClassifiedInvalidReason,
    ClassifiedClassName,
} from "./types";

// classifies input arguments
export const classify = (value: ValidArgument): Classified => {
    // FP pattern of mapping values with extra information.
    // The core computes data.
    // because TS types disappear in JS runtime

    // valid but ignored
    if (value === false) {
        return {
            status: "ignored",
            value,
        };
    }

    // invalid
    if (typeof value !== "string") {
        return {
            status: "invalid",
            value,
            reason: ClassifiedInvalidReason.NotAString,
        };
    }

    // it's a string

    // invalid.
    if (value === "") {
        return {
            status: "invalid",
            value,
            reason: ClassifiedInvalidReason.EmptyString,
        };
    }

    const trimmed = value.trim();

    // invalid
    if (trimmed === "") {
        return {
            status: "invalid",
            value,
            reason: ClassifiedInvalidReason.Whitespace,
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
    if (reason === ClassifiedInvalidReason.NotAString) {
        // null, undefined
        if (value === null || value === undefined) {
            return `Ignored non-string argument: ${value}`;
        }

        // true (because false was filtered out)
        if (value === true) {
            return `Ignored non-string argument: ${value} (boolean)`;
        }

        // array
        if (Array.isArray(value)) {
            const sub = value.slice(0, 3);
            const string = sub.join(", ");
            const ellipsisPart = value.length > sub.length ? ", ..." : "";

            return `Ignored non-string argument: array ([${string}${ellipsisPart}])`;
        }
    }

    // empty string
    if (reason === ClassifiedInvalidReason.EmptyString) {
        return `Ignored empty string argument.`;
    }

    // whitespace
    if (reason === ClassifiedInvalidReason.Whitespace) {
        return `Ignored whitespace string argument: "${value}"`;
    }

    // object, symbol, etc.
    return `Ignored non-string argument: ${value} (${typeof value})`;
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
