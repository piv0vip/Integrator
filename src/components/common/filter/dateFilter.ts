import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

import moment from 'moment';

@Component({
    template: require('./dateFilter.html')
})
export class DateFilterComponent extends Vue {

    calDate: string = moment().format('YYYY-MM-DD');

    @Prop() dates: string[];

    @Prop() value: string;

    @Watch('calDate')
    onWatchCalldate(value) {
        this.$emit('input', value);
    }

}