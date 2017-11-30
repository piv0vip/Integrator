import * as Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

import { CheckBoxFilter } from '../../../classes/filter';

@Component({
    template: require('./checkBoxFilter.html')
})

export class CheckBoxFilterComponent extends Vue {

    menuActive: boolean = false;

    checkedValues: string[] = [];

    @Prop() value: string[];

    @Prop() items: string[];

    @Prop({default: 'Filter by'}) name: string;

    @Watch('value')
    onValueChanged(value) {
        if (this.checkedValues !== value) { this.checkedValues = value; }
    }

    onIconClick() {
        this.menuActive = !this.menuActive;
    }

    onCancelClick() {
        this.checkedValues = this.value;
        this.closeDialog();
    }
    
    onApplyClick() {
        this.$emit('input', this.checkedValues);
        this.closeDialog();
    }

    closeDialog() {
        this.menuActive = false;
    }
}