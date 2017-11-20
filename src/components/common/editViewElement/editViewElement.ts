﻿import * as Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

import { IEditViewElement } from '../../../interfaces/';

import { SettingTypeEnum } from '../../../enums';

import $ from 'jquery';

@Component({
    template: require('./editViewElement.html')
})

export class EditViewElementComponent extends Vue {

    editedValue: string = '';

    isEdit: boolean = false;

    @Prop() element: IEditViewElement;

    @Prop({ default: false }) toggleEdit: boolean;

    @Watch('toggleEdit') onToggleEditChange() {
        this.onValueClick();
    }

    @Prop() initToggle: boolean;

    @Watch('initToggle') onInitToggleChange() {
        this.editedValue = this.element.getValue();
    }

   get spanValue(): string {
        this.isEdit; return this.element.getValue();
    }

    onValueClick() {
        this.isEdit = true;
        this.editedValue = this.element.getValue();
        let nameEl: Vue = <Vue>this.$refs['edited-value-input'];
        this.$nextTick(() => {
            $(nameEl.$el).focus();
        });
    }

    onValueChanged() {
        this.isEdit = false;
        this.element.setValue(this.editedValue);
    }

    get inputType() {
        return this.isNumber ? 'number' : 'text';
    }

    get isGuid(): boolean {
        return this.element.getType() === SettingTypeEnum.Guid;
    }

    get isNumber(): boolean {
        return this.element.getType() === SettingTypeEnum.Number;
    }

    get isUrl(): boolean {
        return this.element.getType() === SettingTypeEnum.Url;
    }
}