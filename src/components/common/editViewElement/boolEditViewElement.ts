import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

import { HandlerSetting } from '../../../classes/settings/handlerSettings';

import $ from 'jquery';

@Component({
    template: require('./boolEditViewElement.html')
})

export class BoolEditViewElementComponent extends Vue {

    editedValue: string = '';

    @Prop() element: HandlerSetting;

    @Prop() initToggle: boolean;

    @Watch('initToggle') onInitToggleChange() {
        this.editedValue = this.element.getValue();
    }

    mounted() {
        this.editedValue = this.element.getValue();
    }

    @Watch('editedValue') onEditedValueChanged(value: string) {
        this.element.setValue(value);
    }
}