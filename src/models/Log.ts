﻿import { TEntity } from './TEntity';
import { Log as ILog, Level as LogLevel } from '../api/models';

export class Log extends TEntity<ILog> {

    constructor(log: ILog) {
        super();
        this.load(log);
    }

    get Id(): number {
        return this.model.id;
    } 

    set Id(v: number) {
        this.model.id = v;
    }

    get Timestamp(): Date {
        return this.model.timestamp;
    }

    set Timestamp(v: Date) {
        this.model.timestamp = v;
    }

    get Level(): LogLevel {
        return this.model.level;
    }

    get Exception(): string {
        return this.model.exception;
    }

    set Exception(v: string) {
        this.model.exception = v;
    }

    get Message(): string {
        return this.model.message;
    }

    set Message(v: string) {
        this.model.message = v;
    }

    get Properties(): string {
        return this.model.properties;
    }

    set Properties(v: string) {
        this.model.properties = v;
    }

    toServer(): ILog {
        return this.model;
    }

    load(model: ILog) {
        this.model = model;
    }
}