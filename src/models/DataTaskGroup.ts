import { TEntity } from './TEntity';
import { DataTask } from '../models';
import { DataTaskGroup as IDataTaskGroup } from '../api/models';

export class DataTaskGroup extends TEntity<IDataTaskGroup> {

    private _dataTasks: DataTask[] = [];

    constructor(dataTaskGroup?: IDataTaskGroup) {
        super();
        this.load(dataTaskGroup);
    }

    get Name(): string { return this.model.name || ''; }
    set Name(v: string) { this.model.name = v; }

    get Enabled(): boolean { return this.model.enabled || false; }
    set Enabled(v: boolean) { this.model.enabled = v; }

    get GroupOnly(): boolean { return this.model.groupOnly || false; }
    set GroupOnly(v: boolean) { this.model.groupOnly = v; }

    get MaxRetries(): number { return this.model.maxRetries || 0; }
    set MaxRetries(v: number) { this.model.maxRetries = v; }

    get Retries(): number { return this.model.retries || 0; }
    set Retries(v: number) { this.model.retries = v; }

    get DataTaskGroupId(): number { return this.EntityId; }
    set DataTaskGroupId(v: number) { this.EntityId = v; }

    get CronSchedule(): string { return this.model.cronSchedule || '* * * * *'; }
    set CronSchedule(v: string) { this.model.cronSchedule = v.toUpperCase(); }
    get CronString(): string { return this.model.cronSchedule; }

    get DataTasks(): DataTask[] {
        return this._dataTasks;
    }

    load(model: IDataTaskGroup) {
        this.model = model;
        this.model.dataTaskList.forEach((dataTask) => {
            this._dataTasks.push(DataTask.createDataTaskFromJson(dataTask));
        });
    }

    toServer(): IDataTaskGroup {
        return {
            cronSchedule: this.CronSchedule,
            dataTaskGroupId: this.DataTaskGroupId,
            name: this.Name,
            enabled: this.Enabled,
            maxRetries: this.MaxRetries,
            retries: this.Retries,
            groupOnly: this.GroupOnly
        };
    }

}