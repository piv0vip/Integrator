import { DefaultDataTaskHandlerSettings } from './handlerSettings';
import { Setting } from './settings';

export class HandlerType {

    _taskType: string;
    _taskHandlerName: string;
    _defaultHandlerSettings: DefaultDataTaskHandlerSettings;

    constructor(taskType = 'dafault', taskHandlerName = '') {
        this._taskType = taskType;
        this._taskHandlerName = taskHandlerName;
        this._defaultHandlerSettings = new DefaultDataTaskHandlerSettings();
    }

    set TaskType(value) { this._taskType = value; }
    set TaskHandlerName(value) { this._taskHandlerName = value; }
    set DefaultHandlerSettings(value) { this._defaultHandlerSettings.Parse(value); }

    get TaskType() { return this._taskType; }
    get TaskHandlerName() { return this._taskHandlerName; }
    get DefaultHandlerSettings() { return this._defaultHandlerSettings; }

    isDefaultKey(key) {
        return this.DefaultHandlerSettings.hasKey(key);
    }

    static CreateFromServer(obj) {
        let handlerSetting = new HandlerType();
        if (obj.TaskType || obj.taskType) {
            handlerSetting.TaskType = obj.TaskType || obj.taskType;
            handlerSetting.TaskHandlerName = obj.TaskHandlerName || obj.taskHandlerName;
            handlerSetting.DefaultHandlerSettings = obj.DefaultHandlerSettings || obj.defaultHandlerSettings;
        }
        return handlerSetting;
    }
}

export class HandlerTypes {
    _handlerTypes: {};

    constructor() {
        this._handlerTypes = {};
    }
    
    getDefaultSetting(name): Setting[] {
        return (name && this._handlerTypes[name]) ? this._handlerTypes[name].DefaultHandlerSettings.asArray() : [];
    }

    getHandlerType(name): HandlerType {
        return (name && this._handlerTypes[name]) ? this._handlerTypes[name] : new HandlerType();
    }

    getFirst() {
        for (let key in this._handlerTypes) {
            return this._handlerTypes[key];
        }
    }

    Parse(handlerTypes) {

        this._handlerTypes = {};

        handlerTypes.forEach((handlerType) => {
            this._handlerTypes[handlerType.taskType] = HandlerType.CreateFromServer(handlerType);
        });
    }
}

// min: 3 5 10 30
// hour: 2 3 