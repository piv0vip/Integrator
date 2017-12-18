import {
    IServerable,
    IEditViewElement,
    ISetting,
    IClonable,
    IEqualable
} from '../../interfaces';

import { Type } from '../../api/models';

export class Setting implements ISetting, IClonable<Setting>, IEqualable<Setting>, IEditViewElement {

    _value: string;

    readonly Name: string;

    constructor(name: string, value: string) {
        this.Name = name;
        this.Value = value;
    }

    get Value(): string {
        return this._value;
    }

    set Value(value: string) {
        this._value = value;
    }

    clone(): Setting {
        return new Setting(this.Name, this.Value);
    }

    isEqual(setting: Setting): boolean {
        return this.Name === setting.Name;
    }

    setValue(value: string) {
        this.Value = value;
    }

    getValue(): string {
        return this.Value;
    }

    getType(): Type {
        return Type.String;
    }
}

export abstract class Settings {

    _settings: {};

    constructor() {
        this._settings = {};
    }

    Add(setting, fireEvent = true) {
        if (setting instanceof Setting) {
            this._settings[setting.Name] = setting;
        }
    }

    Delete(setting, fireEvent = true) {
        if (setting instanceof Setting) {
            if (this._settings[setting.Name]) {
                delete this._settings[setting.Name];
            };
        }
    }

    finByName(name): Setting {
        return this._settings[name];
    }

    ClearAll() {
        this._settings = {};
    }

    hasKey(key) {
        return (this._settings[key] === undefined) ? false : true;
    }

    asArray(): Setting[] {
        let out: Setting[] = [];
        for (let key in this._settings) {
            out.push(this._settings[key]);
        }
        return out;
    }

    count(): number {
        return this.asArray().length;
    }

    has(setting: Setting): boolean {
        return (this._settings[setting.Name] === undefined) ? false : true;
    }
}

export class CustomHandlerSettings extends Settings implements IServerable<{name: string, value: string}[]> {
    
    load(arg: { name: string; value: string; }[]) {
        arg.forEach ( (setting) => {
            this.Add( new Setting( setting.name, setting.value));
        });
    }
    
    toServer(): { name: string; value: string; }[] {
        let res = [];
        for (let key in this._settings) {
            res.push({
                name: this._settings[key].Name,
                value: this._settings[key].Value
            });
        }
        return res;
    }
}

