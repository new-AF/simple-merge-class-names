import {
    Classified,
    ClassifiedInvalidWarn,
    ClassifiedInvalidReason,
    ClassifiedClassName,
} from "./types";

// classifies input arguments
export const classify = (
    value: string | undefined | null | false,
): Classified => {
    // FP pattern of mapping values with extra information.
    // The core computes data.
    // because TS types disappear in JS runtime

    // valid but ignored
    if (
        value === false ||
        value === undefined ||
        value === null ||
        value === ""
    ) {
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
            reason: ClassifiedInvalidReason.NotAString,
        };
    }

    // it's a string

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
export const getInvalid = (values: Classified[]): ClassifiedInvalidWarn[] => {
    return values.filter((obj) => obj.status === "invalid");
};

export const warningMessage = (
    { value, reason }: ClassifiedInvalidWarn,
    functionName: string,
): string => {
    const format = (message: string) => `[${functionName}] ${message}`;

    if (reason === ClassifiedInvalidReason.NotAString) {
        // null, undefined
        if (value === null || value === undefined) {
            return format(`Ignored non-string argument: ${value}`);
        }

        // true (because false was filtered out)
        if (value === true) {
            return format(`Ignored non-string argument: ${value} (boolean)`);
        }

        // array
        if (Array.isArray(value)) {
            const sub = value.slice(0, 3);
            const string = JSON.stringify(sub).slice(1, -1);
            const ellipsisPart = value.length > sub.length ? ", ..." : "";

            return format(
                `Ignored non-string argument: array ([${string}${ellipsisPart}])`,
            );
        }
    }

    // empty string
    if (reason === ClassifiedInvalidReason.EmptyString) {
        return format(`Ignored empty string argument.`);
    }

    // whitespace
    if (reason === ClassifiedInvalidReason.Whitespace) {
        return format(`Ignored whitespace string argument: "${value}"`);
    }

    // object, symbol, etc.
    return format(`Ignored non-string argument: ${value} (${typeof value})`);
};

// console.warn
export const warn = (invalid: ClassifiedInvalidWarn, functionName: string) => {
    const warning = warningMessage(invalid, functionName);

    console.warn(warning);
};

// activates debugger
export const activateDebugger = (_invalid: ClassifiedInvalidWarn) => {
    debugger;
};
