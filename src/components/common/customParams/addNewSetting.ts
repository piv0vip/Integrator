import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import { Setting } from '../../../classes/settings';

import $ from 'jquery';

@Component({
    template: require('./addNewSetting.html')
})

export class AddNewSettingComponent extends Vue {
    
    editedValue: { name: string, value: string } = { name: '', value: '' };

    onAddCustomHandlerClick() {

        if (!this.editedValue.name) return;

        let setting: Setting = new Setting(this.editedValue.name, this.editedValue.value);
         
        this.editedValue = { name: '', value: '' };

        let nameEl: Vue = <Vue>this.$refs['name-input'];
        $(nameEl.$el).focus();

        this.$emit('onCreateSetting', setting); 
    }
}