import Vue from 'vue';
import { Component, Prop, Watch, Inject } from 'vue-property-decorator';

import { HandlerSetting } from '../../../classes/settings';

import { Type } from '../../../api/models';

import moment from 'moment';

import { 
    EditViewElementComponent,
    BoolEditViewElementComponent,
    SelectBoxEditViewElementComponent,
    DateHandlerSettingComponent
} from '../editViewElement';

@Component({
    template: require('./handlerSetting.html'),
    components: {
        'edit-view-element': EditViewElementComponent,
        'bool-edit-view-element': BoolEditViewElementComponent,
        'selectbox-edit-view-element': SelectBoxEditViewElementComponent,
        'date-handler-setting': DateHandlerSettingComponent
    },
    inject: ['$validator']
})

export class HandlerSettingComponent extends Vue {

    toggleEdit: boolean = false;

    editValue: string = '';

    calDate: string = moment().format('YYYY-MM-DD');

    @Prop() scope: string;

    @Prop() value: string;

    @Prop() handlerSetting: HandlerSetting;

    @Prop() initToggle: boolean;

    @Prop() orderNum: string;

    @Watch('initToggle') onHandlerSettingChange(value) {
//        if (this.handlerSetting) this.editValue = this.handlerSetting.Value;
        // this.$nextTick(() => { if (this.handlerSetting) this.editValue = this.handlerSetting.Value; })
    }

    @Watch('value') onValueChanged(value) {
        this.editValue = value;
    }

    @Watch('editValue') onEditValueChanged(value) {
        this.$emit('input', value);
    }

    mounted() {
        this.editValue = this.value;
    }

    get validationString(): string {
        return this.handlerSetting.getValidationString();
    }

    get selectOptions(): string[] {
        return this.handlerSetting ? this.handlerSetting.Options : [];
    }

    get isBool(): boolean {
        return this.handlerSetting.Type === Type.Bool;
    }

    get isSelectBox(): boolean {
        return this.handlerSetting.Type === Type.SelectBox || this.handlerSetting.Type === Type.EditableSelectBox;
    }

    get isEditableSelectBox(): boolean {
        return this.handlerSetting.Type === Type.EditableSelectBox;
    }

    get isNumber(): boolean {
        return this.handlerSetting.Type === Type.Number;
    }

    get isDate(): boolean {
        return this.handlerSetting.Type === Type.Date;
    }

    get isDateTime(): boolean {
        return this.handlerSetting.Type === Type.DateTime;
    }

    get getIcon(): string {
        let iconStr: string = this.isSelectBox ? 'format_list_bulleted' :
            this.isNumber ? 'text_fields' :
                (this.handlerSetting.Type === Type.Url) ? 'public' :
                    (this.handlerSetting.Type === Type.Guid) ? 'G' :
            this.isDate || this.isDateTime ? '<i class="material-icons">event</i>' :
            this.isBool ? 'check_box' : 'text_fields';
        return iconStr;
    }

    onClick() {
        this.toggleEdit = !this.toggleEdit;
    }

}