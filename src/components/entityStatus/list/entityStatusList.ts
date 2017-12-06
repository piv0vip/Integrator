import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { HTTP } from '../../../util/http-common';
import { EnumValue, CustomEnumValues, Enums, TaskStatusEnum, EntityStatusEnum } from '../../../enums';
import { AxiosResponse } from 'axios';
import { EntityStatus } from '../../../models';
import * as helper from '../../../util/helper';
import { IEnumValues, IPagedList, PagedList, ITableFields } from '../../../interfaces';
import { EntityStatusService } from '../../../services';
import { ContentViewComponent } from '../contentView/contentView';
import { ContentFactory, Content } from '../contentView/classes';

import { FilterComponent, CheckBoxFilterComponent, ContainFilterComponent } from '../../common/filter';
import { IFilter, DateFilter, CheckBoxFilter, MultiselectFilter, Filters, EntityStatatusFilters, ContainFilter, EntityStatatusDecorator } from '../../../classes/filter';
import { EnumValues } from 'enum-values';

import Multiselect from 'vue-multiselect';

import FilterRemoveIcon from 'mdi-vue/FilterRemoveIcon';

@Component({
    template: require('./entityStatusList.html'),
    components: {
        Multiselect,
        FilterRemoveIcon,
        'content-view': ContentViewComponent,
        'checkbox-filter': CheckBoxFilterComponent,
        'contain-filter': ContainFilterComponent,
        'ifilter': FilterComponent
    }
})

export class EntityStatusListComponent extends Vue {

    filtersDecorator: EntityStatatusDecorator = new EntityStatatusDecorator();

    storeFilters: any = this.$store.getters.filters;

    get filtersIsDefault(): boolean {
        return this.$store.getters.filtersIsDefault;
    }

    search: string = '';

    // keyword: ContainFilter = this.filters.Keyword;
    
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
    
    perPage: number = 10;
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
            formatter: 'getEnumDescription',
        }, 
        {
            key: 'SourceId',
            tdClass: 'py-3',
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
            thStyle: { width: '180px' },
        },
        {
            key: 'StatusMessage',
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
        ctx.filter = this.filtersDecorator.toServer();
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
        this.$store.commit('resetAllFilters');
        // this.filters.reset();
        this.onApplyFilter();
    }

    customLabel(option) {
        return option.displayName;
    }

    onStatusMessageClick(item) {
        let filterData: string[] = this.storeFilters.StatusMessage.FilterData;
        this.$store.commit('updateFilterValue', {
            filterName: 'StatusMessage',
            values: filterData.concat([item.StatusMessage])
        });
        this.refreshTable();
        console.log(item);
    }
}