import { EnumValue } from './';
import { IEnumValue, IEnumValues } from '../interfaces';
import { Dictionary } from 'typescript-collections';

export interface ILoadable<T> {
    Load(args: T[]);
}

export abstract class EnumValues<T> implements IEnumValues, ILoadable<T> {
      
    abstract Load(args: T[]);

    dictionary: Dictionary<string, IEnumValue> = new Dictionary<string, IEnumValue>();
    
    add(enumValue: IEnumValue) {
        this.dictionary.setValue(enumValue.getCode(), enumValue);
    }

    getEnumValueByCode(code: string): IEnumValue { 
        return this.dictionary.containsKey(String(code)) ? this.dictionary.getValue(String(code)) : EnumValue.getUndefinedEnum();
    }

    asArray(): IEnumValue[] {
        return this.dictionary.values(); 
    }

    asSelectList(): { value: string, text: string }[] { 
        return this.dictionary.values().map( (item: IEnumValue) => { 
            return { value: item.getCode(), text: item.getDescription() }; 
        }); 
    }
}

export class CustomEnumValues extends EnumValues<{code: string, name: string, description?: string }> {
    
    Load(args: {code: string, name: string, description?: string}[]) {
        this.dictionary.clear();
        args.forEach(element => {
            this.add( new EnumValue(element.code, element.name, element.description) );
        });
    }
} 

