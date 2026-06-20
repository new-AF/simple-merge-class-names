export type ValidArgument = string | false;

export type ClassifiedValid = {
    value: string;
    isValid: true;
    ignore: false;
};

// for value `false` ignore including it in classNames
export type ClassifiedValueFalse = {
    value: false;
    isValid: true;
    ignore: true;
};

export enum ClassifiedInavlidReason {
    NotAString,
    EmptyString,
    Whitespace,
}

export type ClassifiedInvalid = {
    value: unknown;
    isValid: false;
    reason: ClassifiedInavlidReason;
};

export type Classified =
    | ClassifiedValid
    | ClassifiedValueFalse
    | ClassifiedInvalid;

// called on invalid arguments, warns or activates debugger or both
export type ClassifiedInvalidFunction = (value: ClassifiedInvalid) => void;
