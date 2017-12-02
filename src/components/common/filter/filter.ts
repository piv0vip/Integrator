import * as Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

import { IFilter, Filter } from '../../../classes/filter';
import { DateFilterComponent, CheckBoxFilterComponent, ContainFilterComponent, MultiSelectComponent } from './';

import { FilterTypeEnum } from '../../../enums';

import FilterIcon from 'mdi-vue/FilterIcon';
import FilterOutlineIcon from 'mdi-vue/FilterOutlineIcon';
import FilterRemoveIcon from 'mdi-vue/FilterRemoveIcon';

@Component({
    template: require('./filter.html'),
    components: {
        FilterIcon,
        FilterOutlineIcon,
        FilterRemoveIcon,
        'checkbox-filter': CheckBoxFilterComponent,
        'contain-filter': ContainFilterComponent,
        'multiselect-filter': MultiSelectComponent,
        'date-filter': DateFilterComponent,
    }
})

export class FilterComponent extends Vue {

    menuActive: boolean = false;

    filter: IFilter = Filter.getFilter();

    @Prop() value: IFilter;

    @Prop() name: string;
    
    mounted() {
        this.filter = Filter.getFilterFromFilter(this.value);
    }

    onApplyClick() {
        this.$emit('input', this.filter);
        this.closeDialog();
    }

    @Watch('value.Values')
    listnValueValues() {
        this.filter = Filter.getFilterFromFilter(this.value);
    }

    onCancelClick() {
        // this.checkedValues = this.value;
        this.closeDialog();
    }

    closeDialog() {
        this.menuActive = false;
    }

    onResetClick() {
        this.filter.reset();
        this.$emit('input', this.filter);
        this.closeDialog();
    }

    isCheckBoxFilter(): boolean {
        return this.filter.Type === FilterTypeEnum.StringList;
    }

    isContainFilter(): boolean {
        return this.filter.Type === FilterTypeEnum.StringContains;
    }

    isMultiselectFilter(): boolean {
        return this.filter.Type === FilterTypeEnum.Multiselect;
    }

    isDateFilter(): boolean {
        return this.filter.Type === FilterTypeEnum.Date;
    }

    onChangeFilter(filter: IFilter) {
        console.log(filter);
    }
}