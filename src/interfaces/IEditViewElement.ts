import { SettingTypeEnum } from '../enums'

export interface IEditViewElement {
	setValue(value: string);
    getValue(): string;
    getType(): SettingTypeEnum;
}