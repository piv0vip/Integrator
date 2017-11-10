import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

import { Setting } from '../../../classes/settings';

import $ from 'jquery';

@Component({
    template: require('./addNewSetting.html')
})

export class AddNewSettingComponent extends Vue {
    
    editingValue: { name: string, value: string } = { name: '', value: '' };

    onAddCustomHandlerClick() {

        if (!this.editingValue.name) return;

        let setting: Setting = new Setting(this.editingValue.name, this.editingValue.value);

        this.editingValue = { name: '', value: '' };

        let nameEl: Vue = <Vue>this.$refs['name-input'];
        $(nameEl.$el).focus();

        this.$emit('onCreateSetting', setting); 
    }
}