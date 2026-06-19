export type ValidArgument = string | false;

export type ClassifiedValid = {
    value: ValidArgument;
    isValid: true;

    // for value `false` ignore including it in classNames
    ignore?: boolean;
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

export type Classified = ClassifiedValid | ClassifiedInvalid;

// called on invalid arguments, warns or activates debugger or both
export type InavlidArgumentFunction = (value: ClassifiedInvalid) => void;
