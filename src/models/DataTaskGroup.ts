import { TEntity } from './TEntity';
import { DataTaskGroup as IDataTaskGroup } from '../api/models';

export class DataTaskGroup extends TEntity<IDataTaskGroup> {

    Name: string = '';
    Enabled: boolean = false;
    GroupOnly: boolean = false;
    MaxRetries: string = '0';
    Retries: string;

    protected _cronString: string;
    
    get CronSchedule(): string {
        return this._cronString;
    }

    set CronSchedule(value: string) {
        this._cronString = value.toUpperCase();
    }

    constructor() {
        super();
        this._cronString = '* * * * *';
    }

    get DataTaskGroupId(): number { return this.EntityId; }

    set DataTaskGroupId(value: number) { this.EntityId = value; }

    get CronString(): string {
        return this._cronString;
    }

    toServer(): IDataTaskGroup {
        return {
            cronSchedule: this.CronSchedule,
            dataTaskGroupId: this.DataTaskGroupId,
            name: this.Name,
            enabled: this.Enabled,
            maxRetries: this.MaxRetries,
            retries: this.Retries,
        };
    }

    static createDataTaskGroupFromJson(params) {
        let dataTaskGroup = new DataTaskGroup();
        dataTaskGroup.Parse(params);
        return dataTaskGroup;
    }
}