import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

import { ContainFilter, IFilter } from '../../../classes/filter';

@Component({
    template: require('./containFilter.html')
})

export class ContainFilterComponent extends Vue {

    containValue: string = '';

    filter: ContainFilter = new ContainFilter();

    @Prop() value: IFilter;

    @Watch('value.Value')
    onFValueChanged(value) {
        this.filter = this.value as ContainFilter;
    }

    mounted() {
        this.filter = this.value as ContainFilter;
    }
}