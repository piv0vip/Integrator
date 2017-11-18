import { DefaultDataTaskHandlerSettings } from './handlerSettings';
import { Setting } from './settings';

export interface IHandlerType {
    readonly TaskType: string;

    readonly TaskHandlerName: string;

    readonly DefaultHandlerSettings: DefaultDataTaskHandlerSettings;
}

export class HandlerType implements IHandlerType {
    readonly TaskType: string;

    readonly TaskHandlerName: string;

    readonly DefaultHandlerSettings: DefaultDataTaskHandlerSettings;

    constructor(taskType: string, taskHandlerName: string, handlerSettings: DefaultDataTaskHandlerSettings) {
        this.TaskType = taskType;

        this.TaskHandlerName = taskHandlerName;

        this.DefaultHandlerSettings = handlerSettings;
    }

    isDefaultKey(key) {
        return this.DefaultHandlerSettings.hasKey(key);
    }

    static CreateFromServer(obj: { taskType: string, taskHandlerName: string, defaultHandlerSettings: {}[] }): HandlerType {
        let handlerSettings: DefaultDataTaskHandlerSettings = new DefaultDataTaskHandlerSettings();
        handlerSettings.Parse(obj.defaultHandlerSettings);
        return new HandlerType(obj.taskType, obj.taskHandlerName, handlerSettings);
    }
}

export class HandlerTypes {
    _handlerTypes: {};

    constructor() {
        this._handlerTypes = {};
    }
    
    getHandlerType(name): HandlerType {
        return (name && this._handlerTypes[name]) ? this._handlerTypes[name] : HandlerType.CreateFromServer({ taskType:'', taskHandlerName:'', defaultHandlerSettings:[] });
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