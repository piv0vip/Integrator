import { TEntity } from './TEntity';
import { DataTask } from '../models';
import { DataTaskGroup as IDataTaskGroup, DataTask as  IDataTask } from '../api/models';

export class DataTaskGroup extends TEntity<IDataTaskGroup> {

    private _dataTasks: DataTask[] = [];
    protected _cronString: string = '* * * * *';

    Name: string = '';
    Enabled: boolean = false;
    GroupOnly: boolean = false;
    MaxRetries: number = 0;
    Retries: number = 0;

    get DataTaskGroupId(): number { return this.EntityId; }
    set DataTaskGroupId(v: number) { this.EntityId = v; }

    get CronSchedule(): string { return this._cronString || '* * * * *'; }
    set CronSchedule(v: string) { this._cronString = v.toUpperCase(); }
    get CronString(): string { return this._cronString; }

    get DataTasks(): DataTask[] {
        return this._dataTasks;
    }

    set DataTaskList(v: IDataTask[]) {
        this._dataTasks = [];
        v.forEach((dataTask: IDataTask) => {
            this._dataTasks.push(DataTask.createDataTaskFromJson(dataTask));
        });
    }

    constructor(dataTaskGroup?: IDataTaskGroup) {
        super();
        if (dataTaskGroup) {
            this.load(dataTaskGroup);
        }
    }

    // load(model: IDataTaskGroup) {
    //    this.model = model;
    //    this.model.dataTaskList.forEach((dataTask) => {
    //        this._dataTasks.push(DataTask.createDataTaskFromJson(dataTask));
    //    });
    // }

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