import * as helper  from '../util/helper';
import { TEntity } from './TEntity';

export class EntityStatus extends TEntity {

    // todo: move GUID from string to class
    EntityStatusId: string;
    EntityType: string;
    EntityVersion: Date;
    StatusMessage: string;
    Status: number;
    InDocTransferId: string; // GUID
    OutDocTransferId: string;
    Source: string;
    SourceId: string;
    Target: string;
    TargetId: string;
    InDocTransfer: string; // => DocumentTransfer
    OutDocTransfer: string; // => DocumentTransfer
    InContent: string;
    OutContent: string;

    constructor( ) {
        super();

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
        return new NewEntityStatus();
    }

    static createFromJson(params) {
        let dataTask = new EntityStatus();
        dataTask.Parse(params);
        return dataTask;
    }
}

export class NewEntityStatus extends EntityStatus {

    constructor() {
        super();
        this.EntityStatusId = helper.createGuid();
    }

    get IsNew() { return true; }

}