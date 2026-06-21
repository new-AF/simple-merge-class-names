// export type ValidArgument = string | false;

export type ClassifiedClassName = {
    status: "class-name";
    value: string;
};

// for value `false` ignore including it in classNames
export type ClassifiedValueFalse = {
    status: "ignore";
    value: false;
};

export type ClassifiedInvalid = {
    status: "invalid";
    value: unknown;
    reason: ClassifiedInvalidReason;
};

export enum ClassifiedInvalidReason {
    NotAString,
    EmptyString,
    Whitespace,
}

export type Classified =
    | ClassifiedClassName
    | ClassifiedValueFalse
    | ClassifiedInvalid;

// called on invalid arguments, warns or activates debugger or both
export type ClassifiedInvalidFunction = (value: ClassifiedInvalid) => void;

// options to createCustomMergeClassNames
export type CustomOptions = {
    "console-warn-invalid-and-whitespace-arguments": boolean;
    "activate-debugger-on-invalid-arguments": boolean;
    name?: string;
};
