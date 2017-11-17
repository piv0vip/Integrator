import { Settings, Setting } from './settings';
import { HandlerType } from './handlerTypes';

import { SettingTypeEnum } from '../../enums';

interface IHandlerSetting {
    getType(): SettingTypeEnum;
    getDefaultValue(): any;
}

export class DefaultDataTaskHandlerSettings extends Settings implements IHandlerSetting {

    name: string = '';
    isRequired: boolean = false;
    defaultValue: string = '';
    type: SettingTypeEnum = SettingTypeEnum.SelectBox;
    options: string[] = [];

    getType(): SettingTypeEnum {
        throw new Error('Method not implemented.');
    }
    getDefaultValue(): any {
    };
    Parse(obj) {
        let settings: { name: string, isRequired?: boolean, defaultValue?: string, type: SettingTypeEnum, options?: string[] }[] = obj;
        settings.forEach(setting => {
            this.Add(new Setting(setting.name, setting.defaultValue, true), false);
        });
    }
}

export class HandlerSetting extends Setting implements IHandlerSetting {

    getType(): SettingTypeEnum {
        throw new Error('Method not implemented.');
    }
    getDefaultValue() {
        throw new Error('Method not implemented.');
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
            this.Add( new Setting(key, handlerSettings[key], this._handlerType.isDefaultKey(key)), false);
        }
    }
}