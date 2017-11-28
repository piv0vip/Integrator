import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { HTTP } from '../../../util/http-common';
import { EnumValue, CustomEnumValues, Enums, TaskStatusEnum, EntityStatusEnum } from '../../../enums';
import { AxiosResponse } from 'axios';
import { EntityStatus } from '../../../models';
import * as helper from '../../../util/helper';
import { IEnumValues, IPagedList, PagedList, ITableFields } from '../../../interfaces';
import { EntityStatusService } from '../../../services';
import { ContentViewComponent } from '../contentView/contentView';
import { ContentFactory, Content } from '../contentView/classes';

import { CheckBoxFilterComponent, ContainFilterComponent } from '../../common/filter';
import { CheckBoxFilter, Filters, EntityStateFilters, ContainFilter } from '../../../classes/filter';
import { EnumValues } from 'enum-values';

@Component({
    template: require('./entityStatusList.html'),
    components: {
        'content-view': ContentViewComponent,
        'checkbox-filter': CheckBoxFilterComponent,
        'contain-filter': ContainFilterComponent
    }
})

export class EntityStatusListComponent extends Vue {

    filters: EntityStateFilters = new EntityStateFilters();

    keyword: ContainFilter = this.filters.Keyword;
    cbFilter: CheckBoxFilter = this.filters.EntityStatuses;
    
    statusEnum = new CustomEnumValues();
    
    currentEntity: EntityStatus = EntityStatus.createNew();

    content: Content = ContentFactory.getFactory('').createContent();
    showContent: boolean = false;

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

    fields: ITableFields[] = 
    [
        {
            key: 'Reset',
            tdClass: 'td-button',
            label: ' '
        },
        {
            key: 'Status',
            tdClass: 'py-3',
            label: 'Entity Status',
            sortable: true,
            formatter: 'getEnumDescription'
        }, 
        {
            key: 'SourceId',
            label: 'Source Id',
            sortable: true,
        },

        {
            key: 'InContent',
            label: 'In Content',
            sortable: true,
            thStyle: { width: '140px' }
        },
        {
            key: 'TargetId',
            label: 'Target Id',
            sortable: true,
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

        this.$store.dispatch('getEntityStatuses');

        this.statusEnum.Load([
            { code: 'NotFound', name: 'NotFound', description: 'Not Found' },
            { code: 'ReadyToSend', name: 'ReadyToSend', description: 'Ready to send' },
            { code: 'Confirmed', name: 'Confirmed' },
            { code: 'NotConfirmed', name: 'NotConfirmed', description: 'Not Confirmed'},    
            { code: 'Errored', name: 'Errored' },
            { code: 'Ignored', name: 'Ignored' },
        ]);
    }

    myProvider(ctx) {
        ctx.filter = this.filters;
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
    
    onFilterChange(e) {
        this.refreshTable();
    }

    onViewContentClick(content: Content) {
        this.content = content;
        this.showContent = !this.showContent;
    }

    onResetEntityStatus(entityStatus: EntityStatus) {
        HTTP.post('EntityStatus/Reset/' + entityStatus.EntityStatusId)
            .then((response: AxiosResponse) => {
                console.log(response.data);
                this.refreshTable();
            })
            .catch(e => {
                console.log(e);
                this.refreshTable();
            });
    }

    onApplyFilter() {
        this.refreshTable();
    }

    onResetFilter() {
        this.filters.reset();
    }

}