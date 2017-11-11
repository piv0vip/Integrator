import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import { Setting } from '../../../classes/settings';

import { EditViewElementComponent } from '../editViewElement';

@Component({
    template: require('./customParamsSetting.html'),
    components: {
        'edit-view-element': EditViewElementComponent
    }
})

export class CustomParamsSettingComponent extends Vue {

    toggleEdit: boolean = false;

    @Prop()
    setting: Setting;

    onClick() {
        this.toggleEdit = !this.toggleEdit;
    }

}