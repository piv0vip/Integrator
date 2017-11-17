import * as helper  from '../util/helper';
import { TEntity } from './TEntity';
import { Content, ContentFactory } from '../components/entityStatus/contentView/classes';
import { EntityStatusEnum } from '../enums';

export class EntityStatus extends TEntity {

    _InContent: Content;
    _OutContent: Content;

    EntityType: string;
    EntityVersion: Date;
    StatusMessage: string;
    Status: EntityStatusEnum = EntityStatusEnum.NotFound;
    InDocTransferId: string; 
    OutDocTransferId: string;
    Source: string;
    SourceId: string;
    Target: string;
    TargetId: string;
    InDocTransfer: string; // => DocumentTransfer
    OutDocTransfer: string; // => DocumentTransfer

    constructor( ) {
        super();
        let factory = ContentFactory.getFactory('');
        this._InContent = factory.createContent();
        this._OutContent = factory.createContent();
    }

    set InContent(value: string) {
        let factory = ContentFactory.getFactory(value);
        this._InContent = factory.createContent();
    }
    get InContent(): string {
        return this._InContent.getContent();
    }

    set OutContent(value: string) {
        let factory = ContentFactory.getFactory(value);
        this._OutContent = factory.createContent();
    }
    get OutContent(): string {
        return this._OutContent.getContent();
    }

    get EntityStatusId(): number { return this.EntityId; }
    set EntityStatusId(value: number) { this.EntityId = value; }

    getInContent(): Content {
        return this._InContent;
    }

    getOutContent(): Content {
        return this._OutContent;
    }

    get IsNew(): boolean { return false; }

    toServer(): {} {
        return {
            entityStatusId: this.EntityStatusId,
            entityType: this.EntityType,
            entityVersion: this.EntityVersion,
            statusMessage: this.StatusMessage,
            status: this.Status,
            inDocTransferId: this.InDocTransferId,
            outDocTransferId: this.OutDocTransferId,
            source: this.Source,
            sourceId: this.Source,
            target: this.TargetId,
            targetId: this.TargetId,
            inDocTransfer: this.InDocTransfer,
            outDocTransfer: this.OutDocTransfer,
            inContent: this.InContent,
            outContent: this.OutContent
        };
    }

    static createNew() {
        return new EntityStatus();
    }

    static createFromJson(params) {
        let dataTask = new EntityStatus();
        dataTask.Parse(params);
        return dataTask;
    }
}

