// export type ValidArgument = string | false;

export type ClassifiedClassName = {
    status: "class-name";
    value: string;
};

// for value `false` ignore including it in classNames
export type ClassifiedIgnore = {
    status: "ignore";
    value: unknown;
};

export type ClassifiedInvalidWarn = {
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
    | ClassifiedIgnore
    | ClassifiedInvalidWarn;

// called on invalid arguments, warns or activates debugger or both
export type ClassifiedInvalidFunction = (value: ClassifiedInvalidWarn) => void;

// options to createCustomMergeClassNames
export type CustomOptions = {
    warnings?: boolean;
    "activate-debugger"?: boolean;
    name?: string;
};
