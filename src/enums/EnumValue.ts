import { IEnumValue } from '../interfaces';

export class EnumValue implements IEnumValue {
    
    code: string;
    name: string;
    description?: string;

    constructor(code: string, name: string, description: string = null) {
        this.code = code;
        this.name = name;
        this.description = description;
    }

    getDescription(): string {
        return this.description || this.name;
    }
    getCode(): string {
        return this.code;
    }

    static getUndefinedEnum(): EnumValue {
        return new EnumValue( '9999', 'Undefined', 'Undefined Description');
    }
}