import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

import moment from 'moment';

@Component({
    template: require('./dateFilter.html')
})
export class DateFilterComponent extends Vue {

    calDate: { From: string, To: string } = {
        From: moment().format('YYYY-MM-DD'),
        To: moment().format('YYYY-MM-DD')
    }

    @Prop() dates: string[];

    @Prop({
        default: {
            From: moment().format('YYYY-MM-DD'),
            To: moment().format('YYYY-MM-DD')
        }}) value: {From: string, To: string};

    @Watch('calDate.From')
    onWatchFromCalldate(value) {
        this.$emit('input', this.calDate);
    }

    @Watch('calDate.To')
    onWatchToCalldate(value) {
        this.$emit('input', this.calDate);
    }
}