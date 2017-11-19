import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import { HandlerSettings, HandlerSetting } from '../../../classes/settings';

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
    customSettings: HandlerSettings;

    @Prop({default: '418px'})
    height: string;

    @Prop()
    initToggle: boolean;

    mut: boolean = false; // hack for refresh data

    get handlerSettings(): HandlerSetting[] { this.mut; return this.customSettings.values(); }
    
    // onCreateSetting(setting: Setting) {

    //    let existElement: Setting = this.customSettings.finByName(setting.Name);

    //    if (existElement) {
    //        existElement.Value = setting.Value;
    //    } else {
    //        this.customSettings.Add(setting);
    //    };

    //    this.customSettings.Add(setting);

    //    this.refreshList();
    // }

    // onDeleteClick(item) {
    //    this.customSettings.Delete(item);
    //    this.refreshList();
    // }

    refreshList() { this.mut = !this.mut; }
}