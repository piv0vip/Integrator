import * as helper  from '../util/helper';
import { IServerable } from '../interfaces';

export abstract class TEntity implements IServerable<object> {

    EntityId?: number = null;

    RecCreated: string;
    RecModified: string;
    EntityName: string;

    protected keys: {
        realKey: string,
        camelKey: string,
        capitalKey: string
    }[];

    get IsNew(): boolean {
        return this.EntityId === null;
    }

    protected params: object;

    Parse(params: object) {
        
        this.params = params;
        let keys: string[] = Object.keys(params);
        this.keys = keys.map((key) => {
            return {
                realKey: key,
                camelKey: helper.firstCharToLower(key),
                capitalKey: helper.firstCharToUpper(key)
            };
        });

        this.keys.forEach( key => { this[key.capitalKey] = params[key.realKey] || params[key.camelKey]; });
    };

    abstract toServer(): {};

}
