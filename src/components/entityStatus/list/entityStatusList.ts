import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { HTTP } from '../../../util/http-common';
import { EnumValue, CustomEnumValues, Enums, TaskStatusEnum } from '../../../enums';
import { AxiosResponse } from 'axios';
import { EntityStatus } from '../../../models';
import * as helper from '../../../util/helper';
import { IEnumValues, IPagedList, PagedList, ITableFields } from '../../../interfaces';
import { EntityStatusService } from '../../../services';
import Chance from 'chance';

@Component({
    template: require('./entityStatusList.html'),
    components: {
    }
})

export class EntityStatusListComponent extends Vue {

    statusEnum = new CustomEnumValues();
    
    currentEntity: EntityStatus = EntityStatus.createNew();

    isBusy: boolean = false;  
    sortBy: string =  'EntityVersion';
    sortDesc: boolean = true;

    formatDate: Function = helper.formatDate;

    getEnumDescription: Function = (val) => { return this.statusEnum.getEnumValueByCode(val).getDescription(); };

    pageOptions: {text: number, value: number}[] = [{text: 5, value: 5}, {text: 10, value: 10}, {text: 15, value: 15}];

    pagedList: IPagedList = new PagedList(); 

    pagesCount: number = 1;
    
    perPage: number = 5;
    totalRows: number = 0;
    currentPage: number = 1;
    filter: string = '';

    chance: Chance =  new Chance();

    fields: ITableFields[] = 
    [
        {
            key: 'Status',
            tdClass: 'py-3',
            label: 'Entity Status',
            sortable: true,
            formatter: 'getEnumDescription'
        }, 
        {
            key: 'InContent',
            label: 'In Content',
            sortable: true,
            thStyle: { width: '140px' }
        },
        {
            key: 'OutContent',
            label: 'Out Content',
            sortable: true,
            thStyle: { width: '140px' }
        },
        {
            key: 'Source',
            tdClass: 'py-3',
            label: 'Source',
            sortable: true,
        },
        {
            key: 'Target',
            tdClass: 'py-3',
            label: 'Target',
            sortable: true,
        },
        {
            key: 'EntityType',
            tdClass: 'py-3',
            label: 'Entity Type',
            sortable: true,
        },
        {
            key: 'EntityVersion',
            tdClass: 'py-3',
            label: 'Entity version',
            sortable: true,
            formatter: 'formatDate',    
            thStyle: { width: '180px' }
        },
        {
            key: 'StatusMessage',
            tdClass: 'py-3',
            label: 'Status Message',
            sortable: true,
        },
    ];

    created() {
        this.statusEnum.Load([
            { code: '0', name: 'NotFound', description: 'Not Found' },
            { code: '1', name: 'Confirmed' },
            { code: '2', name: 'NotConfirmed', description: 'Not Confirmed'},    
            { code: '3', name: 'Errored' },
            { code: '4', name: 'Ignored' },
        ]);
    }

    myProvider(ctx) {
        ctx.filter = this.filter;
        return EntityStatusService.getPagedList(ctx)
        .then( function(response: {data: EntityStatus[], metadata}) {
            this.pagedList = response.metadata;
            this.pagesCount = Math.ceil(response.metadata.totalItemCount / this.perPage);
           
            return response.data;
        }.bind(this) )
        .catch( (e) => {
            console.log(e);
            return [];
        });
    }

    refreshTable() {
        let ttt: any = this.$refs['entityStatusesTable'];
        ttt.refresh();
    }
    
    onGenerateRecordsClick() {
        let entities: any[] = [];

        for (let i = 0; i < 100; i++) {
            let entity = new EntityStatus();
            entity.EntityType = this.chance.word();
            entity.EntityVersion = this.chance.date();
            entity.StatusMessage = this.chance.sentence();
            entity.Status = this.chance.integer({min: 0, max: 4});
            entity.InDocTransferId = this.chance.natural();
            entity.OutDocTransferId = this.chance.natural();
            entity.Source = this.chance.country({ full: true });
            entity.Target = this.chance.country({ full: true });
            entity.SourceId = this.chance.word();
            entity.TargetId = this.chance.word();
            entity.InContent = `<?xml version="1.0" encoding="utf-8"?>
                                 <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                                   xmlns="urn:enterprise.soap.sforce.com">
                                   <soapenv:Body>
                                      <createResponse>
                                         <result>
                                            <id>003D000000OY9omIAD</id>
                                            <success>true</success>
                                         </result>
                                         <result>
                                            <id>001D000000HTK3aIAH</id>
                                            <success>true</success>
                                         </result>
                                      </createResponse>
                                   </soapenv:Body>
                                 </soapenv:Envelope>`;
            entity.OutContent = JSON.stringify({ text: 'kfsjfhdkjfhkdjfh', numb: 7657, boolk: true, dat: new Date()});
            entities.push(entity);
        }
        
        EntityStatusService.createEntities(entities)
        .then( (response) => {
            this.refreshTable();
        })
        .catch( e => console.log(e) );
        
    }

    onFilterChange(e) {
        this.refreshTable();
    }

    onViewContentClick(content) {
        
    }

}