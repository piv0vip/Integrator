import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

import { ITableFields } from '../../../interfaces'

@Component({
    template: require('./pagedTable.html'),
})

export class PagedTableComponent extends Vue {

    @Prop()
    tableRef: string
    
    @Prop()
    fields: ITableFields[]

    @Prop()
    dataProvider: Function

    @Prop()
    sortBy: string;

    @Prop()
    helpers?: {}

    sortDesc: boolean = false;

    perPage: number = 5;
    currentPage: number = 1;

    isBusy: boolean = false;  

    constructor(){
        super();
    }

}