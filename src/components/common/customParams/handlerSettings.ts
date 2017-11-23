import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

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

    @Watch('initToggle')
    onInitToggleChange(value) {
        this.mut = !this.mut;
    }

    get handlerSettingsList(): HandlerSetting[] {
        this.$nextTick(() => {
            this.refreshList();
        });
        return this.handlerSettings && this.handlerSettings.values();
    }
    
    refreshList() { this.mut = !this.mut; }
}   