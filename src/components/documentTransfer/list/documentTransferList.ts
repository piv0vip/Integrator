import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { HTTP } from '../../../util/http-common';
import { AxiosResponse } from 'axios';
import { IEnumValues, PagedList, ITableFields } from '../../../interfaces';

import { FilterComponent } from '../../common/filter';
import { IFilter, DateFilter, CheckBoxFilter, MultiselectFilter, Filters, ContainFilter } from '../../../classes/filter';

import * as helper from '../../../util/helper';

import { DocumentTransfer, IPagedList } from '../../../api/models';

import { ContentViewComponent } from '../../entityStatus/contentView/contentView';
import { ContentFactory, Content } from '../../entityStatus/contentView/classes';

import FilterRemoveIcon from 'mdi-vue/FilterRemoveIcon';

@Component({
    template: require('./documentTransferList.html'),
    components: {
        FilterRemoveIcon,
        FilterComponent,
        ContentViewComponent
    }
})

export class DocumentTransferListComponent extends Vue {

    storeFilters: any = this.$store.getters.filtersDTs;

    get filtersIsDefault(): boolean {
        return this.$store.getters.filtersDTsIsDefault;
    }

    get documentTransfers(): DocumentTransfer[] {
        return this.$store.getters.documentTransfers;
    }

    get pagedListMetaData(): IPagedList {
        return this.$store.getters.pagedListMetaDataDTs;
    }

    search: string = '';

    content: Content = ContentFactory.getFactory('').createContent();
    showContent: boolean = false;

    sortBy: string = 'EntityVersion';
    sortDesc: boolean = true;

    formatDate: Function = helper.formatDate;

    pagedList: IPagedList = null; 

    pagesCount: number = 1;
    
    perPage: number = 10;
    totalRows: number = 0;
    currentPage: number = 1;
    filter: string = '';

    @Watch('currentPage')
    onCurrentPageChanged(value: number) {
        this.$store.dispatch('doChangeCurrentPageDT', value);
    }

    @Watch('perPage')
    onPerPageChanged(value: number) {
        this.$store.dispatch('doChangePerPageDT', value);
    }

    fields: ITableFields[] =
    [
        {
            key: 'status',
            tdClass: 'py-3',
            label: 'Status',
            sortable: true,
        }, 
        {
            key: 'documentType',
            tdClass: 'py-3',
            label: 'Document Type',
            sortable: true,
        }, 
        {
            key: 'errorMessage',
            tdClass: 'py-3',
            label: 'Error Message',
            sortable: true,
        }, 
        {
            key: 'sourceId',
            tdClass: 'py-3',
            label: 'Source Id',
            sortable: true,
        }, 
        {
            key: 'source',
            tdClass: 'py-3',
            label: 'Source',
            sortable: true,
        }, 
        {
            key: 'targetId',
            tdClass: 'py-3',
            label: 'Target Id',
            sortable: true,
        }, 
        {
            key: 'target',
            tdClass: 'py-3',
            label: 'Target',
            sortable: true,
        }, 
        {
            key: 'content',
            tdClass: 'py-3',
            label: 'content',
            sortable: true,
        }, 
    ];

    created() {
        this.$store.dispatch('getFilterValuesDTs');
        this.$store.dispatch('getDTs');
    }

    refreshTable() {
        this.$store.dispatch('getDTs');
    }
    
    onFilterChange(e) {
        this.refreshTable();
    }

    onApplyFilter() {
        this.refreshTable();
    }

    onResetFilter() {
        this.$store.dispatch('doResetAllDTsFilters');
    }

    onSortClicked(ctx) {
        this.$store.dispatch('doChangeSortDT', ctx);
    }

    showContentPopup(entityId: number) {
        this.$store.commit('loading', true);
        HTTP.get(`DocumentTransfer/GetContentOfDocumentTransfer/${entityId}`)
            .then((response: AxiosResponse) => {
                let documentTransfer: DocumentTransfer = response.data as DocumentTransfer;
                let contentValue = documentTransfer.content;
                let factory = ContentFactory.getFactory(contentValue);
                this.content = factory.createContent();
                this.showContent = !this.showContent;
                this.$store.commit('loading', false);
            })
            .catch((error) => {
                console.log(error);
                this.$store.commit('loading', false);
            });
    }


    onViewContentClick(documentTransfer: DocumentTransfer) {
        this.showContentPopup(documentTransfer.documentTransferId);
    }
}