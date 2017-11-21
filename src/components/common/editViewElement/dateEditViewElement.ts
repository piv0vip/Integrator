import * as Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

import { IEditViewElement } from '../../../interfaces/';

import $ from 'jquery';

@Component({
    template: require('./dateEditViewElement.html')
})

export class DateEditViewElementComponent extends Vue {

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

    @Watch('editedValue') onEditedValueChanged(value, oldValue) {
        this.element.setValue(value);
    }

    get spanValue(): string {
        this.isEdit; return this.element.getValue();
    }

    onValueClick() {
        this.isEdit = true;
        this.editedValue = this.element.getValue();
    }

    onValueChanged() {
        this.isEdit = false;
        this.element.setValue(this.editedValue);
    }

}