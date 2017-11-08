import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import {CronPart} from '../cronParts';

@Component({
    template: require('./cronPart.html')
})

export class CronPartComponent extends Vue {

    @Prop({default: ''})
    labelName: String;

    @Prop()
    cronPart: CronPart;

    onFocusOutInput(e) {
        // this.cronPart.InputValue = e.target.value;
    }

    onSelectChanged(value) {
        // this.cronPart.SelectValue = value;
    }
}