import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { HTTP } from '../../../util/http-common';
import { EnumValue, CustomEnumValues, Enums, TaskStatusEnum } from '../../../enums';
import { AxiosResponse } from 'axios';
import { EntityStatus } from '../../../models';
import * as helper from '../../../util/helper';
import { IEnumValues, PagedList, ITableFields } from '../../../interfaces';
import { EntityStatusService } from '../../../services';
import { ContentViewComponent } from '../contentView/contentView';
import { ContentFactory, Content } from '../contentView/classes';

import { FilterComponent } from '../../common/filter';
import { IFilter, DateFilter, CheckBoxFilter, MultiselectFilter, Filters, ContainFilter } from '../../../classes/filter';
import { EnumValues } from 'enum-values';

import Multiselect from 'vue-multiselect';

import { EntityStatus as IEntityStatus, ContentType as ContentTypeEnum, IPagedList, Status2 as EntityStatusEnum } from '../../../api/models';

import FilterRemoveIcon from 'mdi-vue/FilterRemoveIcon';

@Component({
    template: require('./entityStatusList.html'),
    components: {
        Multiselect,
        FilterRemoveIcon,
        ContentViewComponent,
        FilterComponent
    }
})

export class EntityStatusListComponent extends Vue {

    storeFilters: any = this.$store.getters.filters;

    get filtersIsDefault(): boolean {
        return this.$store.getters.filtersIsDefault;
    }

    get entityStatuses(): IEntityStatus[] {
        return this.$store.getters.entityStatuses;
    }

    get pagedListMetaData(): IPagedList {
        return this.$store.getters.pagedListMetaDataEntityStatus;
    }

    search: string = '';

    // keyword: ContainFilter = this.filters.Keyword;
    
    content: Content = ContentFactory.getFactory('').createContent();
    showContent: boolean = false;

    formatDate: Function = helper.formatDate;

    pagedList: IPagedList = null; 

    pagesCount: number = 1;
    
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
            key: 'entityStatusId',
            tdClass: 'py-3',
            label: 'ID',
            sortable: true,
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
        this.$store.dispatch('doChangeCurrentPage', value);
    }

    created() {
        this.$store.dispatch('getFilterValues');
        this.$store.dispatch('getEntityStatuses');
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
                let factory = ContentFactory.getFactory(contentValue.toString());
                this.content = factory.createContent();
                this.showContent = !this.showContent;
                this.$store.commit('loading', false);
            })
            .catch((error) => {
                console.log(error);
                this.$store.commit('loading', false);
            });
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

    onResedEntityStatus(entityStatus: EntityStatus) {
        HTTP.post('Scheduler/ResendEntity', entityStatus )
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
        this.$store.dispatch('doResetAllFilters');
        // this.filters.reset();
        // this.onApplyFilter();
    }

    customLabel(option) {
        return option.displayName;
    }

    onStatusMessageClick(item: IEntityStatus) {
        let filterData: string[] = this.storeFilters.statusMessage.FilterData;
        this.$store.commit('updateFilterValue', {
            filterName: 'statusMessage',
            values: filterData.concat([item.statusMessage])
        });
        this.refreshTable();
        console.log(item);
    }

    onSortClicked(ctx) {
        this.$store.dispatch('doChangeSort', ctx);
    }

    isResendBtnVisible(entityStatus: IEntityStatus): boolean {
        // return true
        return entityStatus.hasOutContent && (entityStatus.status === EntityStatusEnum.Errored || entityStatus.status === EntityStatusEnum.Ignored);
    }
}