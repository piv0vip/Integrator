import * as Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

import { DateFilter, IFilter, Filter } from '../../../classes/filter';

import moment from 'moment';

@Component({
    template: require('./dateFilter.html'),
})

export class DateFilterComponent extends Vue {

    checkedValues: string[] = [];

    editValue: string;
    calDate: string = moment().format('YYYY-MM-DD');

    filter: DateFilter = new DateFilter([]);

    items: string[] = [];

    @Prop() value: IFilter;

    @Watch('value.Values')
    onVValuesChansged(values) {
        console.log('dateFilter.Values');
        this.filter.Values = (this.value as DateFilter).Values;
    }

    @Watch('calDate')
    onWatchCalldate(value) {
        this.filter.CheckedValues = [value];
        this.$emit('input', this.filter);
    }

    // @Watch('filter.CheckedValues')
    // onCVValuesChansged() {
    //    this.$emit('input', this.filter)
    // }

    mounted() {
        this.filter.Values = (this.value as DateFilter).Values;
    }
}