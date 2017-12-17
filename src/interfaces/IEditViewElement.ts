import { IntegratorAPIModels } from '../api/integratorAPI'

export interface IEditViewElement {
	setValue(value: string);
    getValue(): string;
    getType(): IntegratorAPIModels.Type;
}