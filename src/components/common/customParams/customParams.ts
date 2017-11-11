import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import { Settings, Setting } from '../../../classes/settings';

import { ITableFields, IEditViewElement } from '../../../interfaces';

import { CustomParamsSettingComponent } from './customParamsSetting';

import { AddNewSettingComponent } from './addNewSetting';
 
import $ from 'jquery';

@Component({
    template: require('./customParams.html'),
    components: {
        'custom-params-setting': CustomParamsSettingComponent,
        'add-new-setting': AddNewSettingComponent
    }
})

export class CustomParamsComponent extends Vue { 

    @Prop()
    customSettings: Settings;

    @Prop({default: '318px'})
    height: string;

    mut: boolean = false; // hack for refresh data

    get tableData(): Setting[] { this.mut; return this.customSettings.asArray(); }

    onCreateSetting(setting: Setting) {

        let existElement: Setting = this.customSettings.finByName(setting.Name);

        if (existElement) {
            existElement.Value = setting.Value;
        } else {
            this.customSettings.Add(setting);
        };

        this.customSettings.Add(setting);

        this.refreshList();
    }

    onDeleteClick(item) {
        this.customSettings.Delete(item);
        this.refreshList();
    }

    isShowDelete(item) {
        return !item.IsDefault;
    }

    refreshList() { this.mut = !this.mut; }
}