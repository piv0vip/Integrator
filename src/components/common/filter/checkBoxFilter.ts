import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

import { CheckBoxFilter, IFilter, Filter } from '../../../classes/filter';

import { ITableFields } from '../../../interfaces';

@Component({
    template: require('./checkBoxFilter.html'),
})

export class CheckBoxFilterComponent extends Vue {

    checkedValues: string[] = [];

    @Prop() items: string[];

    @Prop() value: string[];

    @Watch('value')
    onCValuesChansged(value: string[]) {
        if (value !== this.checkedValues)
            this.checkedValues = value;
    }

    @Watch('checkedValues')
    onCheckedValues(checkedValues: string[]) {
        if (checkedValues !== this.value)
            this.$emit('input', checkedValues);
    }

}