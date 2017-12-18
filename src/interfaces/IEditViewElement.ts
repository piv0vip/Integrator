import { Type } from '../api/models'

export interface IEditViewElement {
	setValue(value: string);
    getValue(): string;
    getType(): Type;
}