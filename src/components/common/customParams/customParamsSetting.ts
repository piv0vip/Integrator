import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

import { HandlerSetting } from '../../../classes/settings';

import { SettingTypeEnum } from '../../../enums';

import { 
    EditViewElementComponent,
    BoolEditViewElementComponent,
    SelectBoxEditViewElementComponent,
    DateEditViewElementComponent
} from '../editViewElement';

@Component({
    template: require('./customParamsSetting.html'),
    components: {
        'edit-view-element': EditViewElementComponent,
        'bool-edit-view-element': BoolEditViewElementComponent,
        'selectbox-edit-view-element': SelectBoxEditViewElementComponent,
        'date-edit-view-element': DateEditViewElementComponent
    }
})

export class HandlerSettingComponent extends Vue {

    toggleEdit: boolean = false;

    editValue: string = '';

    @Prop() handlerSetting: HandlerSetting;

    @Prop() initToggle: boolean;

    @Prop() orderNum: string;

    @Watch('initToggle') onHandlerSettingChange(value) {
        console.log(value); 
        if (this.handlerSetting) this.editValue = this.handlerSetting.Value; 
        //this.$nextTick(() => { if (this.handlerSetting) this.editValue = this.handlerSetting.Value; })
    }

    @Watch('editValue') onEditValueChanged() {
        console.log('--===---');
    }

    get validationString(): string {
        return this.handlerSetting.getValidationString();
    }

    get selectOptions(): string[] {
        return this.handlerSetting ? this.handlerSetting.Options : [];
    }

    get isBool(): boolean {
        return this.handlerSetting.Type === SettingTypeEnum.Bool;
    }

    get isSelectBox(): boolean {
        return this.handlerSetting.Type === SettingTypeEnum.SelectBox;
    }

    get isNumber(): boolean {
        return this.handlerSetting.Type === SettingTypeEnum.Number;
    }

    get isDate(): boolean {
        return this.handlerSetting.Type === SettingTypeEnum.Date;
    }

    get isDateTime(): boolean {
        return this.handlerSetting.Type === SettingTypeEnum.DateTime;
    }

    get getIcon(): string {
        let iconStr: string = this.isSelectBox ? '<i class="material-icons">format_list_bulleted</i>' :
            this.isNumber ? '123' :
            (this.handlerSetting.Type === SettingTypeEnum.Url) ? 'URL' :
            (this.handlerSetting.Type === SettingTypeEnum.Guid) ? 'GUID' :
            this.isDate || this.isDateTime ? '<i class="material-icons">event</i>' :
            this.isBool ? '<i class="material-icons">check_box</i>' : '<i class="material-icons">short_text</i>';
        return iconStr;
    }

    onClick() {
        this.toggleEdit = !this.toggleEdit;
    }

}