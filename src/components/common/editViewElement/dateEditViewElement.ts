import * as Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

import { HandlerSetting } from '../../../classes/settings';

import moment from 'moment';

@Component({
    template: require('./dateEditViewElement.html'),
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
        if (value !== this.editValue) this.editValue = value;
    }

    @Watch('editValue') onEditedValueChanged(value, oldValue) {
        this.calDate = value ? value : oldValue;
        this.$emit('input', value);
    }

    @Watch('calDate') onCalDateChanged(value: string) {
        this.editValue = value;
    }
}