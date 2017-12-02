import * as Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

import { MultiselectFilter, IFilter, Filter } from '../../../classes/filter';

import Multiselect from 'vue-multiselect';

@Component({
    template: require('./multiselectFilter.html'),
    components: {
        Multiselect
    }
})

export class MultiSelectComponent extends Vue {

    checkedValues: string[] = [];

    filter: MultiselectFilter = new MultiselectFilter([]);

    items: string[] = [];

    @Prop() value: IFilter;

    // @Watch('value.ChangesToggle')
    // onVValuesChansged(value) {
    //    console.log('dddd');
    //    Filter.getFilterFromFilter(value)//       this.filter.Values = (this.value as MultiselectFilter).Values;
    // }

    @Watch('filter.CheckedValues')
    onCVValuesChansged() {
        this.$emit('input', this.filter);
    }

    mounted() {
        this.filter = this.value as MultiselectFilter;
    }
}