import { Settings, Setting } from './settings';
import { HandlerType } from './handlerTypes';
import _ from 'lodash';

import { SettingTypeEnum } from '../../enums';

export interface IValidable {
    isValid(): boolean;
}

export interface IHandlerSetting {

    readonly name: string;

    readonly defaultValue: string;

    readonly type: SettingTypeEnum;

    readonly options: string[];

    readonly isRequired: boolean;

    Value: string;

}

export class DefaultDataTaskHandlerSettings extends Settings {

    name: string = '';

    isRequired: boolean = false;

    defaultValue: string = '';

    type: SettingTypeEnum = SettingTypeEnum.SelectBox;

    options: string[] = [];

    Parse(obj) {
        let settings: { name: string, isRequired?: boolean, defaultValue?: string, type: SettingTypeEnum, options?: string[] }[] = obj;
        settings.forEach(setting => {
            this.Add(new Setting(setting.name, setting.defaultValue, true), false);
        });
    }
}

export class HandlerSetting implements IHandlerSetting, IValidable {

    name: string;

    type: SettingTypeEnum;

    defaultValue: string;

    options: string[];

    isRequired: boolean;

    private _value: string;

    constructor(name: string, type: SettingTypeEnum, defaultValue: string = '', options: string[] = [], isRequired: boolean = false) {
        this.name = name;
        this.type = type;
        this.defaultValue = defaultValue;
        this.options = options;
        this.isRequired = isRequired;
        this.Value = defaultValue;
    }

    set Value(val: string) {
        this._value = val;
    }

    get Value(): string {
        return this._value;
    }

    isValid(): boolean {
        return this.isRequired ? !_.isEmpty(_.trim(this.Value)) : true;
    }
}

export class DataTaskHandlerSettings extends Settings {
    _handlerType: HandlerType;

    constructor(handlerType: HandlerType) {
        super();
        this.setHandlerType(handlerType);
    }

    setHandlerType(handlerType: HandlerType) {
        this._handlerType = handlerType;
    }

    toServer(): {} {
        let out = {};
        for (let key in this._settings) {
            out[key] = this._settings[key].Value;
        }
        return out;
    }

    Parse(obj) {
        let handlerSettings = JSON.parse(obj);
        for (let key in handlerSettings) {
            this.Add(new Setting(key, handlerSettings[key], this._handlerType.isDefaultKey(key)), false);
        }
    }
}