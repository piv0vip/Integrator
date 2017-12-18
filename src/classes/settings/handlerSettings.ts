import { Settings, Setting } from './settings';
import { HandlerType } from './handlerTypes';
import _ from 'lodash';

import { SettingTypeEnum } from '../../enums';
import { IHandlerSetting, IValidable, IClonable, IEditViewElement, IServerable, IHandlerSettings } from '../../interfaces';

import { Dictionary } from 'typescript-collections';

import { SettingDescription, Type } from '../../api/models';

export class HandlerSetting implements IHandlerSetting, IValidable, IClonable<HandlerSetting>, IEditViewElement {

    readonly Name: string;

    readonly Type: Type;

    readonly DefaultValue: string;

    readonly Options: string[];

    readonly IsRequired: boolean;

    private _value: string;

    constructor(name: string, type: Type, defaultValue: string = '', options: string[] = [], isRequired: boolean = false) {
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

    getType(): Type {
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
        (this.Type === Type.Guid) && resArr.push('guid');
        (this.Type === Type.Url) && resArr.push('url');
        (this.Type === Type.Number) && resArr.push('numeric');
        (this.Type === Type.Date || this.Type === Type.DateTime) && resArr.push('date_format:YYYY-MM-DD');
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

    Parse(settingDescriptions: SettingDescription[]) {
        let settings: { name?: string, isRequired?: boolean, defaultValue?: string, type?: Type, options?: string[] }[] = settingDescriptions;
        settingDescriptions.forEach(settingDescription => {
            this.add(new HandlerSetting(settingDescription.name, settingDescription.type, settingDescription.defaultValue, settingDescription.options, settingDescription.isRequired));
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