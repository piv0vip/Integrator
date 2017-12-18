import { DefaultHandlerSettings, HandlerSettings } from './handlerSettings';
import { Setting } from './settings';
import { Dictionary } from 'typescript-collections';

import { IHandler } from '../../api/models';

export interface IHandlerType {
    readonly TaskType: string;

    readonly TaskHandlerName: string;

    readonly DefaultHandlerSettings: DefaultHandlerSettings;
}

export class HandlerType implements IHandlerType {
    readonly TaskType: string;

    readonly TaskHandlerName: string;

    readonly DefaultHandlerSettings: DefaultHandlerSettings;

    constructor(taskType: string, taskHandlerName: string, handlerSettings: DefaultHandlerSettings) {
        this.TaskType = taskType;

        this.TaskHandlerName = taskHandlerName;

        this.DefaultHandlerSettings = handlerSettings;
    }

    static CreateFromServer( obj: IHandler ): HandlerType {
        let handlerSettings: DefaultHandlerSettings = new DefaultHandlerSettings();
        handlerSettings.Parse(obj.defaultHandlerSettings);
        return new HandlerType(obj.taskType, obj.taskHandlerName, handlerSettings);
    }

    static CreateEmpty(): HandlerType {
        return new HandlerType('', '', new DefaultHandlerSettings);
    }
}

export class HandlerTypes extends Dictionary<string, HandlerType> {

    getHandlerType(name: string): HandlerType {
        return (this.containsKey(name)) ? this.getValue(name) : HandlerType.CreateEmpty();
    }

    Parse(handlerTypes) {
        this.clear();
        handlerTypes.forEach((handlerType) => {
            let ht: HandlerType = HandlerType.CreateFromServer(handlerType);
            this.setValue(ht.TaskType, ht);
        });
    }

    asSelectBoxList(): any[] {
        return this.values().map((obj: HandlerType) => {
            return {
                text: obj.TaskHandlerName,
                value: obj.TaskType
            };
        });
    }
}