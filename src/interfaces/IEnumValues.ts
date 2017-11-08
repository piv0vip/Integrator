export interface IEnumValue {
    code: string;
    name: string;
    description?: string;

    getDescription(): string;
    getCode(): string;
}

export interface IEnumValues {
    add(enumValue: IEnumValue);
    getEnumValueByCode(code: string): IEnumValue;
    asArray(): IEnumValue[];
    asSelectList(): { value: string, text: string }[];
}