import * as Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

import { ContainFilter } from '../../../classes/filter';

@Component({
    template: require('./containFilter.html')
})

export class ContainFilterComponent extends Vue {

    containValue: string = '';

    @Prop() value: string;

    @Prop() containFilter: ContainFilter;

    @Watch('value')
    onValueChanged(value) {
        if (this.containValue != value) { this.containValue = value; }
    }

    @Watch('containValue')
    onEx5Changed(value) {
        this.$emit('input', value);
    }
}