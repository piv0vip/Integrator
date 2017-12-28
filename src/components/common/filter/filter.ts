import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

import { IFilter, Filter } from '../../../classes/filter';
import { DateFilterComponent, CheckBoxFilterComponent, ContainFilterComponent, MultiSelectComponent } from './';

import { FilterTypeEnum } from '../../../enums';

import FilterIcon from 'mdi-vue/FilterIcon';
import FilterOutlineIcon from 'mdi-vue/FilterOutlineIcon';
import FilterRemoveIcon from 'mdi-vue/FilterRemoveIcon';

import { ITableFields } from '../../../interfaces';

@Component({
    template: require('./filter.html'),
    components: {
        FilterIcon,
        FilterOutlineIcon,
        FilterRemoveIcon,
        CheckBoxFilterComponent,
        ContainFilterComponent,
        MultiSelectComponent,
        DateFilterComponent,
    }
})

export class FilterComponent extends Vue {

    menuActive: boolean = false;

    @Prop() value: ITableFields;
    @Prop() filter: IFilter;
    @Prop() updateFilterMethod: string;
    @Prop() resetFilterMethod: string;

    filterData: any = this.filter.FilterData;

    @Watch('filter')
    onFilterChanged(value: IFilter) {
        Vue.set(this, 'filterData', value.FilterData);
    }

    onApplyClick() {
        this.$store.commit(this.updateFilterMethod, { filterName: this.value.key, values: this.filterData });
        this.$emit('change', this.filter);
        this.closeDialog();
    }

    onCancelClick() {
        this.closeDialog();
    }

    closeDialog() {
        Vue.set(this, 'filterData', this.filter.FilterData);
        this.menuActive = false;
    }

    onResetClick() {
        this.$store.commit(this.resetFilterMethod, this.value.key);
        this.$nextTick(() => {
            this.$emit('change', this.filter);
            this.closeDialog();
        });
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
        return this.filter.Type === FilterTypeEnum.Period;
    }

    onFilterClick() {
        console.log('fd-' + this.filter.FilterData);
        Vue.set(this, 'filterData', this.filter.FilterData);
    }
}