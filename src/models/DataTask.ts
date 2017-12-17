import * as helper  from '../util/helper';
import { Setting, DataTaskHandlerSettings, HandlerType, HandlerTypes, HandlerSettings } from '../classes/settings';
import { TEntity } from './TEntity';

import { IntegratorAPIModels as Models } from '../api/integratorAPI'

export class DataTask extends TEntity<Models.DataTask> {

    protected _HandlerType: HandlerType;
    protected _HandlerSettings: DataTaskHandlerSettings;
    protected _TaskType: string;

    DisplayName: string = '';
    Enabled: boolean = false;
    Inactive: boolean = false;
    GroupName: string = '';
    IsMaintenance: boolean = false;
    MaxRetries: number = 0;
    Progress: string;
    Retries: number;
    Status: Models.Status = Models.Status.NotStarted;
    LastEndTime: string;
    LastExecutionTime: string;
    LastStartTime: string;
    NextStartTime: string;
    protected _cronString: string;
    
    constructor() {
        super();
        
        this._TaskType = '';
        this._HandlerSettings = new DataTaskHandlerSettings();
        this._HandlerType = HandlerType.CreateEmpty();
        this._cronString = '* * * * *';
    }

    get DataTaskId(): number { return this.EntityId; }

    set DataTaskId(value: number) { this.EntityId = value; }

    set HandlerType(handlerType: HandlerType) {
        this._HandlerType = handlerType;
        this._HandlerSettings.setHandlerSettings(handlerType.DefaultHandlerSettings);
    }

    get TaskType(): string {
        return this._HandlerType.TaskType;
    }

    set TaskType(value: string) {
        this._TaskType = value;
    }

    get HandlerSettings(): string{
        return JSON.stringify(this._HandlerSettings.toServer());
    }

    set HandlerSettings(value: string) {
        this._HandlerSettings.Parse(value);
    }

    get CronString(): string {
        return this._cronString;
    }

    get CronSchedule(): string {
        return this._cronString;
    }

    set CronSchedule(value: string) {
        this._cronString = value.toUpperCase();
    }

    get IsRunning(): boolean {
        return this.Status === Models.Status.Running;
    }

    getHandlerSettings(): DataTaskHandlerSettings {
        return this._HandlerSettings;
    }

    toServer(): Models.DataTask {
        return {
            cronSchedule: this.CronSchedule,
            dataTaskId: this.DataTaskId,
            displayName: this.DisplayName,
            enabled: this.Enabled,
            inactive: this.Inactive,
            handlerSettings: this.HandlerSettings,
            isMaintenance: this.IsMaintenance,
            maxRetries: this.MaxRetries,
            retries: this.Retries,
            status: this.Status,
            taskType: this.TaskType
        };
    }

    static createDataTaskFromJson(handlerTypes: HandlerTypes, iDataTask: Models.DataTask) {
        let dataTask = new DataTask();
        let taskType = iDataTask.taskType;
        if (taskType && handlerTypes.containsKey(taskType)) dataTask.HandlerType = handlerTypes.getValue(taskType);
        dataTask.Parse(iDataTask);
        return dataTask;
    }
}