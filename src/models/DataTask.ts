import * as helper  from '../util/helper';
import { CronSchedule } from '../components/common';
import { Setting, DataTaskHandlerSettings, HandlerType, HandlerTypes, HandlerSettings } from '../classes/settings';
import { TEntity } from './TEntity';
import { TaskStatusEnum } from '../enums';

export class DataTask extends TEntity {

    protected _HandlerType: HandlerType;
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
    protected _cronString: string;
    
    constructor() {
        super();
        
        this._TaskType = '';
        this._HandlerSettings = new DataTaskHandlerSettings();
        this._CronSchedule = new CronSchedule();
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
        // return this._CronSchedule.toString();
        return this._cronString;
    }

    get CronSchedule(): string {
        // return this._CronSchedule.toString();
        return this._cronString;
    }

    set CronSchedule(value: string) {
        // this._CronSchedule.Parse(value);
        this._cronString = value.toUpperCase();
    }

    get IsRunning(): boolean {
        return this.Status == TaskStatusEnum.Running;
    }

    getHandlerSettings(): DataTaskHandlerSettings {
        return this._HandlerSettings;
    }

    getCronSchedule(): CronSchedule {
        return this._CronSchedule;
    }

    toServer(): {} {
        return {
            cronSchedule: this.CronSchedule,
            dataTaskId: this.DataTaskId,
            displayName: this.DisplayName,
            enabled: this.Enabled,
            groupName: this.GroupName,
            handlerSettings: this.HandlerSettings,
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

    static createDataTaskFromJson(handlerTypes: HandlerTypes, params) {
        let dataTask = new DataTask();
        let taskType = params['TaskType'] || params['taskType'];
        if (taskType && handlerTypes.containsKey(taskType)) dataTask.HandlerType = handlerTypes.getValue(taskType);
        dataTask.Parse(params);
        return dataTask;
    }
}