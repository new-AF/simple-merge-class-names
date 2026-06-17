export enum InavlidArgumentEnum {
    NotAString,
    EmptyString,
    Whitespace,
}

export type Argument = {
    value: unknown;
    isValid: boolean;
    ignore: boolean; // for value `false` ignore including it in classNames
    error?: InavlidArgumentEnum;
};

export type ValidArgument = string | false;
