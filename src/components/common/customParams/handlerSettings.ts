import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import { HandlerSettings, HandlerSetting } from '../../../classes/settings';

import { ITableFields, IEditViewElement } from '../../../interfaces';

import { HandlerSettingComponent } from './handlerSetting';
 
import $ from 'jquery';

@Component({
    template: require('./handlerSettings.html'),
    components: {
        'handler-setting': HandlerSettingComponent,
    }
})

export class HandlerSettingsComponent extends Vue { 

    @Prop()
    handlerSettings: HandlerSettings;

    @Prop({default: '418px'})
    height: string;

    @Prop()
    initToggle: boolean;

    mut: boolean = false; // hack for refresh data

    get handlerSettingsList(): HandlerSetting[] { this.mut; return this.handlerSettings.values(); }
    
    refreshList() { this.mut = !this.mut; }
}   