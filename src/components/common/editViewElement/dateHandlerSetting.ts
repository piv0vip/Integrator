import * as Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

import { HandlerSetting } from '../../../classes/settings';

import moment from 'moment';

@Component({
    template: require('./dateHandlerSetting.html'),
    inject: ['$validator']
})

export class DateHandlerSettingComponent extends Vue {

    editValue: string = '';

    calDate: string = moment().format('YYYY-MM-DD');

    @Prop() value: string;

    @Prop() scope: string;

    @Prop() handlerSetting: HandlerSetting;

    @Prop() orderNum: string;

    @Watch('value') onValueChanged(value) {
        let tempValue = /\d{4}-\d{2}-\d{2}/.test(value) ? value : moment(value).format('YYYY-MM-DD');
        if (tempValue !== this.editValue) this.editValue = tempValue;
    }

    @Watch('editValue') onEditedValueChanged(value) {
        this.calDate = /\d{4}-\d{2}-\d{2}/.test(value) ? value : moment().format('YYYY-MM-DD');
        this.$emit('input', value);
    }

    @Watch('calDate') onCalDateChanged(value: string) {
        this.editValue = value;
    }
}