import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import { HandlerSetting } from '../../../classes/settings';

import { SettingTypeEnum } from '../../../enums';

import { 
    EditViewElementComponent,
    BoolEditViewElementComponent,
    SelectBoxEditViewElementComponent
} from '../editViewElement';

@Component({
    template: require('./customParamsSetting.html'),
    components: {
        'edit-view-element': EditViewElementComponent,
        'bool-edit-view-element': BoolEditViewElementComponent,
        'selectbox-edit-view-element': SelectBoxEditViewElementComponent
    }
})

export class CustomParamsSettingComponent extends Vue {

    toggleEdit: boolean = false;

    @Prop() handlerSetting: HandlerSetting;

    get selectOptions(): string[] {
        return this.handlerSetting ? this.handlerSetting.Options : [];
    }

    get isBool(): boolean {
        return this.handlerSetting.Type == SettingTypeEnum.Bool;
    }

    get isSelectBox(): boolean {
        return this.handlerSetting.Type == SettingTypeEnum.SelectBox;
    }

    get isDate(): boolean {
        return this.handlerSetting.Type == SettingTypeEnum.Date;
    }

    get isDateTyme(): boolean {
        return this.handlerSetting.Type == SettingTypeEnum.DateTime;
    }

    onClick() {
        this.toggleEdit = !this.toggleEdit;
    }

}