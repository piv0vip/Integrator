import Vue from 'vue';
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

    @Prop() value: string[];

}