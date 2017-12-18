import * as helper  from '../util/helper';
import { IServerable } from '../interfaces';

export abstract class TEntity<IModel> implements IServerable<IModel> {

    protected model: IModel;

    EntityId?: number = null;

    EntityName: string = '';

    RecCreated: Date;
    RecModified: Date;

    protected keys: {
        realKey: string,
        camelKey: string,
        capitalKey: string
    }[];

    get IsNew(): boolean {
        return this.EntityId === null;
    }

    load(model: IModel) {
        
        this.model = model;
        let keys: string[] = Object.keys(model);
        this.keys = keys.map((key) => {
            return {
                realKey: key,
                camelKey: helper.firstCharToLower(key),
                capitalKey: helper.firstCharToUpper(key)
            };
        });

        this.keys.forEach(key => { this[key.capitalKey] = model[key.realKey] || model[key.camelKey]; });
    };

    abstract toServer(): IModel;

}
