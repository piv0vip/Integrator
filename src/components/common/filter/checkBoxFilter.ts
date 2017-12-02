import * as Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

import { CheckBoxFilter, IFilter, Filter } from '../../../classes/filter';

@Component({
    template: require('./checkBoxFilter.html'),
})

export class CheckBoxFilterComponent extends Vue {

    checkedValues: string[] = [];

    filter: CheckBoxFilter = new CheckBoxFilter([]);

    items: string[] = [];

    @Prop() value: IFilter;

    @Watch('value.Values')
    onVValuesChansged(values) {
        this.filter.Values = (this.value as CheckBoxFilter).Values;
    }

    @Watch('value.CheckedValues')
    onCValuesChansged(values) {
        if (values !== this.filter.CheckedValues)
            this.filter.CheckedValues = values;
    }

    @Watch('filter.CheckedValues')
    onCVValuesChansged() {
        this.$emit('input', this.filter);
    }

    mounted() {
        this.filter.Values = (this.value as CheckBoxFilter).Values;
    }
}