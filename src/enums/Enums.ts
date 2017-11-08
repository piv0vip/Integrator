import { EnumValue, CustomEnumValues} from '.';
import { IEnumValues } from '../interfaces';

export class Enums {
	
    static createHandlerEnum(handlerArray): IEnumValues {

        let enumValues = new CustomEnumValues();

        enumValues.Load(handlerArray.map(function(item){
            return {
                code: item.TaskType,
                name: item.TaskHandlerName
            };
        }));

        return enumValues;
    }
}