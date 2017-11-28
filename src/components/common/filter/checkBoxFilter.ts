import * as Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

import { CheckBoxFilter } from '../../../classes/filter';

@Component({
    template: require('./checkBoxFilter.html')
})

export class CheckBoxFilterComponent extends Vue {

    checkedValues: string[] = [];

    @Prop() value: string[];

    @Prop() cbFilter: CheckBoxFilter;

    @Watch('value')
    onValueChanged(value) {
        if (this.checkedValues != value) { this.checkedValues = value }
    }

    @Watch('checkedValues')
    onEx5Changed(value) {
        this.$emit('input', value);
    }
}