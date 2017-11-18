import { IServerable, IEditViewElement } from '../../interfaces';

export class Setting implements IEditViewElement {

    name: string;

    value: string;

    isDefault: boolean;

    constructor(name: string, value: string, isDefault: boolean = false) {
        this.name = name;
        this.value = value;
        this.isDefault = isDefault;
    }

    get Name(): string {
        return this.name;
    }

    get Value(): string {
        return this.value;
    }

    set Value(value: string) {
        this.value = value;
    }

    get IsDefault(): boolean {
        return this.isDefault;
    }

    clone(): Setting {
        return new Setting(this.name, this.value, this.isDefault);
    }

    isEqual(setting): boolean {
        return this.name === setting.name;
    }

    setValue(value: string) {
        this.Value = value;
    }

    getValue(): string {
        return this.Value;
    }
}

export abstract class Settings {

    _settings: {};

    constructor() {
        this._settings = {};
    }

    Add(setting, fireEvent = true) {
        if (setting instanceof Setting) {
            this._settings[setting.name] = setting;
        }
    }

    Delete(setting, fireEvent = true) {
        if (setting instanceof Setting) {
            if (this._settings[setting.name]) {
                delete this._settings[setting.name];
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
    
    Parse(arg: { name: string; value: string; }[]) {
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

