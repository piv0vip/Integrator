import { Type } from '../api/models'

export interface IValidable {
    isValid(): boolean;
    getValidationString(): string;
}

export interface IClonable<T> {
    clone(): T;
}

export interface IEqualable<T> {
    isEqual(object: T): boolean;
}

export interface ISetting {
    readonly Name: string;
    Value: string;
}

export interface IDefaultable {
    resetToDefault(): void;
    isDefault(): boolean;
}

export interface IHandlerSetting extends ISetting, IDefaultable {

    readonly DefaultValue: string;

    readonly Type: Type;

    readonly Options: string[];

    readonly IsRequired: boolean;

    Value: string;
}

export interface IHandlerSettings<T> extends IDefaultable {
    add(handlerSetting: T);
}

