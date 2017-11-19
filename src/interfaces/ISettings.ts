import { SettingTypeEnum } from '../enums'

export interface IValidable {
    isValid(): boolean;
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

export interface IHandlerSetting extends ISetting {

    readonly DefaultValue: string;

    readonly Type: SettingTypeEnum;

    readonly Options: string[];

    readonly IsRequired: boolean;

}

