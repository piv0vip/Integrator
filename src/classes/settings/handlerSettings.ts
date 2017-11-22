import { Settings, Setting } from './settings';
import { HandlerType } from './handlerTypes';
import _ from 'lodash';

import { SettingTypeEnum } from '../../enums';
import { IHandlerSetting, IValidable, IClonable, IEditViewElement, IServerable, IHandlerSettings } from '../../interfaces';

import { Dictionary } from 'typescript-collections';

export class HandlerSetting implements IHandlerSetting, IValidable, IClonable<HandlerSetting>, IEditViewElement {

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

    setValue(value: string) {
        this.Value = value;
    }

    getValue(): string {
        return this.Value;
    }

    getType(): SettingTypeEnum {
        return this.Type;
    }

    resetToDefault(): void {
        this.Value = this.DefaultValue;
    }

    isDefault(): boolean {
        return this.Value === this.DefaultValue;
    }

    // todo: strong refactor this !!!!!!!!!!!!
    getValidationString(): string {
        let resArr: string[] = [];
        this.IsRequired && resArr.push('required');
        (this.Type == SettingTypeEnum.Guid) && resArr.push('guid');
        (this.Type == SettingTypeEnum.Url) && resArr.push('url');
        (this.Type == SettingTypeEnum.Number) && resArr.push('numeric');
        return resArr.join('|');
    }

}

export class HandlerSettings extends Dictionary<string, HandlerSetting> implements IHandlerSettings<HandlerSetting>   {

    add(handlerSetting: HandlerSetting) {
        this.setValue(handlerSetting.Name, handlerSetting);
    }

    resetToDefault(): void {
        this.forEach((key, value) => {
            value.resetToDefault();
        });
    }

    isDefault(): boolean {
        return _.every(this.values(), value => value.isDefault());
    }

}

export class DefaultHandlerSettings extends HandlerSettings {

    Parse(obj) {
        let settings: { name: string, isRequired?: boolean, defaultValue?: string, type: SettingTypeEnum, options?: string[] }[] = obj;
        settings.forEach(setting => {
            this.add(new HandlerSetting(setting.name, setting.type, setting.defaultValue, setting.options, setting.isRequired));
        });
    }
}

export class DataTaskHandlerSettings extends HandlerSettings implements IServerable<object> {

    constructor(handlerSettings?: HandlerSettings) {
        super();
        if (handlerSettings !== undefined) this.setHandlerSettings(handlerSettings);
    }

    setHandlerSettings(handlerSettings: HandlerSettings) {
        this.clear();
        handlerSettings.forEach((key, value) => {
            this.add(value.clone());
        });
    }

    toServer(): {} {
        let out = {};
        this.forEach((key, value) => {
            out[key] = value.Value;
        });
        return out;
    }

    Parse(obj) {
        let handlerSettings = JSON.parse(obj);
        for (let key in handlerSettings) {
            if (this.containsKey(key)) {
                this.getValue(key).Value = handlerSettings[key];
            }
        }
    }
}