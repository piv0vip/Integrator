import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import { HandlerSetting } from '../../../classes/settings';

import { SettingTypeEnum } from '../../../enums';

import { 
    EditViewElementComponent,
    BoolEditViewElementComponent
} from '../editViewElement';

@Component({
    template: require('./customParamsSetting.html'),
    components: {
        'edit-view-element': EditViewElementComponent,
        'bool-edit-view-element': BoolEditViewElementComponent
    }
})

export class CustomParamsSettingComponent extends Vue {

    toggleEdit: boolean = false;

    @Prop() handlerSetting: HandlerSetting;

    get isString(): boolean {
        return this.handlerSetting.Type == SettingTypeEnum.String;
    }

    get isBool(): boolean {
        return this.handlerSetting.Type == SettingTypeEnum.Bool;
    }

    get isDate(): boolean {
        return this.handlerSetting.Type == SettingTypeEnum.Date;
    }

    get isDateTyme(): boolean {
        return this.handlerSetting.Type == SettingTypeEnum.DateTime;
    }

    get isGuid(): boolean {
        return this.handlerSetting.Type == SettingTypeEnum.Guid;
    }

    get isNumber(): boolean {
        return this.handlerSetting.Type == SettingTypeEnum.Number;
    }

    get isSelectBox(): boolean {
        return this.handlerSetting.Type == SettingTypeEnum.SelectBox;
    }

    get isUrl(): boolean {
        return this.handlerSetting.Type == SettingTypeEnum.Url;
    }

    onClick() {
        this.toggleEdit = !this.toggleEdit;
    }

}