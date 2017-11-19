import { Settings, Setting } from './settings';
import { HandlerType } from './handlerTypes';
import _ from 'lodash';

import { SettingTypeEnum } from '../../enums';
import { IHandlerSetting, IValidable, IClonable } from '../../interfaces';

import { Dictionary } from 'typescript-collections';

export class DefaultDataTaskHandlerSettings extends Settings {

    Parse(obj) {
        let settings: { name: string, isRequired?: boolean, defaultValue?: string, type: SettingTypeEnum, options?: string[] }[] = obj;
        settings.forEach(setting => {
            this.Add(new Setting(setting.name, setting.defaultValue), false);
        });
    }
}

export class HandlerSetting implements IHandlerSetting, IValidable, IClonable<HandlerSetting> {

    readonly Name: string;

    readonly Type: SettingTypeEnum;

    readonly DefaultValue: string;

    readonly Options: string[];

    readonly IsRequired: boolean;

    private _value: string;

    constructor(name: string, type: SettingTypeEnum, defaultValue: string = '', options: string[] = [], isRequired: boolean = false) {
        this.Name = name;
        this.Type = type;
        this.DefaultValue = defaultValue;
        this.Options = options;
        this.IsRequired = isRequired;
        this.Value = defaultValue;
    }

    set Value(val: string) {
        this._value = val;
    }

    get Value(): string {
        return this._value;
    }

    isValid(): boolean {
        return this.IsRequired ? !_.isEmpty(_.trim(this.Value)) : true;
    }

    clone(): HandlerSetting {
        return new HandlerSetting(this.Name, this.Type, this.DefaultValue, this.Options, this.IsRequired);
    }
}

export class HandlerSettings extends Dictionary<string, HandlerSetting> {
    add(value: HandlerSetting) {
        this.setValue(value.Name, value);
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
            this.Add(new Setting(key, handlerSettings[key]));
        }
    }
}