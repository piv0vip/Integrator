import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { HTTP } from '../../../util/http-common';
import { EnumValue, CustomEnumValues, Enums, TaskStatusEnum, EntityStatusEnum } from '../../../enums';
import { AxiosResponse } from 'axios';
import { EntityStatus } from '../../../models';
import * as helper from '../../../util/helper';
import { IEnumValues, PagedList, ITableFields } from '../../../interfaces';
import { EntityStatusService } from '../../../services';
import { ContentViewComponent } from '../contentView/contentView';
import { ContentFactory, Content } from '../contentView/classes';

import { FilterComponent, CheckBoxFilterComponent, ContainFilterComponent } from '../../common/filter';
import { IFilter, DateFilter, CheckBoxFilter, MultiselectFilter, Filters, ContainFilter, EntityStatatusDecorator } from '../../../classes/filter';
import { EnumValues } from 'enum-values';

import Multiselect from 'vue-multiselect';

import { EntityStatus as IEntityStatus, ContentType as ContentTypeEnum, IPagedList } from '../../../api/models';

import FilterRemoveIcon from 'mdi-vue/FilterRemoveIcon';

@Component({
    template: require('./entityStatusList.html'),
    components: {
        Multiselect,
        FilterRemoveIcon,
        'content-view': ContentViewComponent,
        'checkbox-filter': CheckBoxFilterComponent,
        'contain-filter': ContainFilterComponent,
        FilterComponent
    }
})

export class EntityStatusListComponent extends Vue {

    filtersDecorator: EntityStatatusDecorator = new EntityStatatusDecorator();

    storeFilters: any = this.$store.getters.filters;

    get filtersIsDefault(): boolean {
        return this.$store.getters.filtersIsDefault;
    }

    get entityStatuses(): IEntityStatus[] {
        return this.$store.getters.entityStatuses;
    }

    get pagedListMetaData(): IPagedList {
        return this.$store.getters.pagedListMetaData;
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

    pagedList: IPagedList = null; 

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
            key: 'status',
            tdClass: 'py-3',
            label: 'Entity Status',
            sortable: true,
        }, 
        {
            key: 'sourceId',
            tdClass: 'py-3',
            label: 'Source Id',
            sortable: true,
        },

        {
            key: 'inContent',
            label: 'In Content',
            sortable: true,
            thStyle: { width: '140px' }
        },
        {
            key: 'targetId',
            label: 'Target Id',
            sortable: true,
        },
        {
            key: 'outContent',
            label: 'Out Content',
            sortable: true,
            thStyle: { width: '140px' }
        },
        {
            key: 'source',
            tdClass: 'py-3',
            label: 'Source',
            sortable: true,
        },
        {
            key: 'target',
            tdClass: 'py-3',
            label: 'Target',
            sortable: true,
        },
        {
            key: 'entityType',
            tdClass: 'py-3',
            label: 'Entity Type',
            sortable: true,
        },
        {
            key: 'entityVersion',
            tdClass: 'py-3',
            label: 'Entity version',
            sortable: true,
            formatter: 'formatDate',    
            thStyle: { width: '180px' },
        },
        {
            key: 'statusMessage',
            label: 'Status Message',
            sortable: true,
        },
    ];

    @Watch('currentPage')
    onCurrentPageChanged(value: number) {
        this.$store.dispatch('doChangeCurrentPage', value)
    }

    @Watch('perPage')
    onPerPageChanged(value: number) {
        this.$store.dispatch('doChangePerPage', value)
    }



    created() {

        this.$store.dispatch('getFilterValues');

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
        this.$store.commit('loading', true);
        ctx.filter = this.filtersDecorator.toServer();
        return EntityStatusService.getPagedList(ctx)
        .then( function(response: {data: EntityStatus[], metadata}) {
            this.pagedList = response.metadata;
            this.pagesCount = Math.ceil(response.metadata.totalItemCount / this.perPage);
           
            this.$store.commit('loading', false);
            return response.data;
        }.bind(this) )
        .catch( (e) => {
            this.$store.commit('loading', false);
            console.log(e);
            return [];
        });
    }

    refreshTable() {
        this.$store.dispatch('getEntityStatuses');
    }
    
    onFilterChange(e) {
        this.refreshTable();
    }

    showContentPopup(entityId: number, contentType: ContentTypeEnum) {
        this.$store.commit('loading', true);
        HTTP.get(`EntityStatus/GetContentOfEntityStatus/${entityId}/${contentType}`)
            .then((response: AxiosResponse) => {
                let entityStatus: IEntityStatus = response.data as IEntityStatus;
                let contentValue = contentType === ContentTypeEnum.InContent ? entityStatus.inContent : entityStatus.outContent;
                let factory = ContentFactory.getFactory(contentValue);
                this.content = factory.createContent();
                this.showContent = !this.showContent;
                this.$store.commit('loading', false);
            })
            .catch((error) => {
                console.log(error);
                this.$store.commit('loading', false);
            })

    }


    onViewInContentClick(entityStatus: IEntityStatus) {
        this.showContentPopup(entityStatus.entityStatusId, ContentTypeEnum.InContent);
    }

    onViewOutContentClick(entityStatus: IEntityStatus) {
        this.showContentPopup(entityStatus.entityStatusId, ContentTypeEnum.OutContent);
    }

    onResetEntityStatus(entityStatus: EntityStatus) {
        HTTP.post('EntityStatus/Reset/' + entityStatus.EntityStatusId)
            .then((response: AxiosResponse) => {
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
        let filterData: string[] = this.storeFilters.statusMessage.FilterData;
        this.$store.commit('updateFilterValue', {
            filterName: 'statusMessage',
            values: filterData.concat([item.StatusMessage])
        });
        this.refreshTable();
        console.log(item);
    }
}