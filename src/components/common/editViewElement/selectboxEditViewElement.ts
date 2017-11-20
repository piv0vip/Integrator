import * as Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

import { IEditViewElement } from '../../../interfaces/';

import { SettingTypeEnum } from '../../../enums';

import $ from 'jquery';

@Component({
    template: require('./selectBoxEditViewElement.html')
})

export class SelectBoxEditViewElementComponent extends Vue {

    editedValue: string = '';

    isEdit: boolean = false;

    @Prop()
    element: IEditViewElement;

    @Prop()
    options: string[];

    @Prop({ default: false })
    toggleEdit: boolean;

    @Watch('toggleEdit')
    onToggleEditChange() {
        this.onValueClick();
    }

    get spanValue(): string {
        this.isEdit; return this.element.getValue();
    }

    get selectOptions(): string[] {
        this.isEdit; return this.options ? this.options : []; 
    }

    onValueClick() {
        this.isEdit = true;
        this.editedValue = this.element.getValue();
        let nameEl: Vue = <Vue>this.$refs['edited-value-selectbox'];
        this.$nextTick(() => {
            $(nameEl.$el).focus();
        });
    }

    onValueChanged() {
        this.isEdit = false;
        this.element.setValue(this.editedValue);
    }
}