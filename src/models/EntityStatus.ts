import * as helper from '../util/helper';
import { TEntity } from './TEntity';
import { Content, ContentFactory } from '../components/entityStatus/contentView/classes';

import { IntegratorAPIModels as Models } from '../api/integratorAPI'

export class EntityStatus extends TEntity<Models.EntityStatus> {
    _InContent: Content;
    _OutContent: Content;

    EntityType: string;
    EntityVersion: Date;
    StatusMessage: string;
    Status: Models.Status2 = Models.Status2.NotFound;
    InDocTransferId: number;
    OutDocTransferId: number;
    Source: string;
    SourceId: string;
    Target: string;
    TargetId: string;
    InDocTransfer: string; // => DocumentTransfer
    OutDocTransfer: string; // => DocumentTransfer

    constructor() {
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

    toServer(): Models.EntityStatus {
        return {
            entityStatusId: this.EntityStatusId,
            entityType: this.EntityType,
            entityVersion: this.EntityVersion,
            statusMessage: this.StatusMessage,
            status: this.Status,
            inDocTransferId: this.InDocTransferId,
            outDocTransferId: this.OutDocTransferId,
            source: this.Source,
            sourceId: this.SourceId,
            target: this.Target,
            targetId: this.TargetId,
            inContent: this.InContent,
            outContent: this.OutContent
        };
    }

    static createNew() {
        return new EntityStatus();
    }

    static createFromJson(iEntitySatus: Models.EntityStatus) {
        let entityStatus = new EntityStatus();
        entityStatus.Parse(iEntitySatus);
        return entityStatus;
    }
}