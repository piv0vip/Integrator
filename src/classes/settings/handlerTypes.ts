import { DefaultDataTaskHandlerSettings, HandlerSettings } from './handlerSettings';
import { Setting } from './settings';
import { Dictionary } from 'typescript-collections';

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

export class HandlerTypes extends Dictionary<string, HandlerType> {

    getHandlerType(name): HandlerType {
        return (name && this.containsKey(name)) ? this.getValue(name) : HandlerType.CreateFromServer({ taskType: '', taskHandlerName: '', defaultHandlerSettings: [] });
    }

    Parse(handlerTypes) {
        this.clear();
        handlerTypes.forEach((handlerType) => {
            let ht: HandlerType = HandlerType.CreateFromServer(handlerType);
            this.setValue(ht.TaskType, ht);
        });
    }
}