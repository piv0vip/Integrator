import * as helper  from '../util/helper';
import { CronSchedule } from '../components/common';
import { Setting, DataTaskHandlerSettings, HandlerType, HandlerTypes } from '../classes/settings';
import { TEntity } from './TEntity';
import { TaskStatusEnum } from '../enums';

export class DataTask extends TEntity {

    defaultHandlers: HandlerTypes;
 
    protected _HandlerSettings: DataTaskHandlerSettings;
    protected _TaskType: string;
    protected _CronSchedule: CronSchedule;

    DisplayName: string = '';
    Enabled: boolean = false;
    GroupName: string = '';
    IsMaintenance: boolean = false;
    MaxRetries: number = 0;
    Progress: string;
    Retries: string;
    Status: TaskStatusEnum = TaskStatusEnum.NotStarted;
    LastEndTime: string;
    LastExecutionTime: string;
    LastStartTime: string;
    NextStartTime: string;
    RecCreated: string;
    RecModified: string;
    
    constructor(defaultHandlers: HandlerTypes, params: {} = {}) {
        super();
        
        this.defaultHandlers = defaultHandlers;

        this._TaskType = '';
        this._HandlerSettings = new DataTaskHandlerSettings(HandlerType.CreateFromServer({ taskType: '', taskHandlerName: '', defaultHandlerSettings:[]})); // ????????????????????????????
        this._CronSchedule = new CronSchedule();
    }

    get DataTaskId(): number { return this.EntityId; }
    set DataTaskId(value: number) { this.EntityId = value; }

    set HandlerType(value: HandlerType) {
        this._HandlerSettings.setHandlerType(value);
    }

    get TaskType(): string {
        return this._TaskType;
    }


    set TaskType(value: string) {
        this.HandlerType = this.defaultHandlers.getHandlerType(value);
        this._TaskType = value;
    }

    set HandlerSettings(value: string) {
        this._HandlerSettings.Parse(value);
    }

    get CronString(): string {
        return this._CronSchedule.toString();
    }

    set CronSchedule(value: string) {
        this._CronSchedule.Parse(value);
    }

    getHandlerSettings(): DataTaskHandlerSettings {
        return this._HandlerSettings;
    }

    getCronSchedule(): CronSchedule {
        return this._CronSchedule;
    }

    toServer(): {} {
        return {
            cronSchedule: this._CronSchedule.toString(),
            dataTaskId: this.DataTaskId,
            displayName: this.DisplayName,
            enabled: this.Enabled,
            groupName: this.GroupName,
            handlerSettings: JSON.stringify(this._HandlerSettings.toServer()),
            isMaintenance: this.IsMaintenance,
            lastEndTime: this.LastEndTime,
            lastExecutionTime: this.LastExecutionTime,
            lastStartTime: this.LastStartTime,
            maxRetries: this.MaxRetries,
            nextStartTime: this.NextStartTime,
            progress: this.Progress,
            recCreated: this.RecCreated,
            recModified: this.RecModified,
            retries: this.Retries,
            status: this.Status,
            taskType: this.TaskType
        };
    }

    static createNewDataTask(defaultHandlers) {
        return new NewDataTask(defaultHandlers);
    }

    static createEmptyDataTask(): DataTask {
        return new EmptyDataTask();
    }

    static createDataTaskFromJson(defaultHandlers, params) {
        let dataTask = new DataTask(defaultHandlers, params);
        dataTask.Parse(params);
        return dataTask;
    }
}

export class EmptyDataTask extends DataTask {
    constructor() {
        super(new HandlerTypes(), {});
    }
}

export class NewDataTask extends DataTask {

    constructor(defaultHandlers) {
        super(defaultHandlers);

    }

    set HandlerType(value: HandlerType) {
        this._HandlerSettings.setHandlerType(value);

        this._HandlerSettings.ClearAll();

        value.DefaultHandlerSettings.asArray().forEach((setting: Setting) => {
            this._HandlerSettings.Add(setting.clone());
        });
    }
}