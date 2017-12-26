import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { HTTP } from '../../../util/http-common';
import { EnumValue, CustomEnumValues, Enums, TaskStatusEnum, EntityStatusEnum } from '../../../enums';
import { AxiosResponse } from 'axios';
import { EntityStatus } from '../../../models';
import * as helper from '../../../util/helper';
import { IEnumValues, PagedList, ITableFields } from '../../../interfaces';
import { EntityStatusService } from '../../../services';

import { FilterComponent } from '../../common/filter';
import { IFilter, DateFilter, CheckBoxFilter, MultiselectFilter, Filters, ContainFilter } from '../../../classes/filter';
import { EnumValues } from 'enum-values';

import Multiselect from 'vue-multiselect';

import { Log, IPagedList } from '../../../api/models';

import FilterRemoveIcon from 'mdi-vue/FilterRemoveIcon';

@Component({
    template: require('./logList.html'),
    components: {
        Multiselect,
        FilterRemoveIcon,
        FilterComponent
    }
})

export class LogsListComponent extends Vue {

    storeFilters: any = this.$store.getters.filtersLogs;

    get filtersIsDefault(): boolean {
        return this.$store.getters.filtersLogsIsDefault;
    }

    get logs(): Log[] {
        return this.$store.getters.logs;
    }

    get pagedListMetaData(): IPagedList {
        return this.$store.getters.pagedListMetaDataLogs;
    }

    search: string = '';

    // keyword: ContainFilter = this.filters.Keyword;
    
    statusEnum = new CustomEnumValues();
    
    isBusy: boolean = false;  
    sortBy: string =  'EntityVersion';
    sortDesc: boolean = true;

    formatDate: Function = helper.formatDate;

    pageOptions: {text: number, value: number}[] = [{text: 5, value: 5}, {text: 10, value: 10}, {text: 15, value: 15}];

    pagedList: IPagedList = null; 

    pagesCount: number = 1;
    
    perPage: number = 10;
    totalRows: number = 0;
    currentPage: number = 1;
    filter: string = '';

    fields: ITableFields[] = 
    [
        {
            key: 'level',
            tdClass: 'py-3',
            label: 'Log Level',
            sortable: true,
        }, 
        {
            key: 'exception',
            label: 'Exception',
            sortable: true,
        },
        {
            key: 'renderedMessage',
            label: 'Rendered Message',
            sortable: true,
        },
        {
            key: 'properties',
            label: 'Properties',
            sortable: true,
        },
        {
            key: 'timestamp',
            tdClass: 'py-3',
            label: 'Timestamp',
            sortable: true,
            formatter: 'formatDate',    
            // thStyle: { width: '180px' },
        },
    ];

    created() {
        this.$store.dispatch('getFilterValuesLogs');
        this.$store.dispatch('getLogs');
    }

    refreshTable() {
        this.$store.dispatch('getLogs');
    }
    
    onFilterChange(e) {
        this.refreshTable();
    }

    onApplyFilter() {
        this.refreshTable();
    }

    onResetFilter() {
        this.$store.dispatch('doResetAllFilters');
    }

    onSortClicked(ctx) {
        this.$store.dispatch('doChangeSortLog', ctx);
    }

}