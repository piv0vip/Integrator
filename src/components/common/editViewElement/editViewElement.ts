﻿import * as Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import { IEditViewElement } from '../../../interfaces/';

import $ from 'jquery';

@Component({
    template: require('./editViewElement.html')
})

export class EditViewElementComponent extends Vue {

    editedValue: string = '';

    isEdit: boolean = false;

    @Prop()
    element: IEditViewElement;

    get spanValue(): string {
        this.isEdit; return this.element.getValue();
    }

    onValueClick() {
        this.editedValue = this.element.getValue();
        this.isEdit = true;
        let nameEl: Vue = <Vue>this.$refs['edited-value-input'];
        this.$nextTick(() => {
            $(nameEl.$el).focus();
        });
    }

    onValueChanged() {
        this.element.setValue(this.editedValue);
        this.isEdit = false;
    }
}