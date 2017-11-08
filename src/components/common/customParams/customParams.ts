import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import { Settings, Setting, CustomHandlerSettings } from '../../../classes/settings';
import EventBus from '../../../util/EventBus';

import { ITableFields } from '../../../interfaces/ITableFields';

import $ from 'jquery';

@Component({
    template: require('./customParams.html')
})

export class CustomParamsComponent extends Vue {

    @Prop()
    customSettings: Settings;

    @Prop({default: '318px'})
    height: string;

    tableData: Setting[] = this.customSettings.asArray();

    editedName: string = '';

    editedValue: { name: string, value: string, default: boolean } = { name: '', value: '', default: false };

    fields: ITableFields[] = [
        {
            key: 'name',
            label: 'Name',
            tdClass: 'py-3',
            sortable: true
        },
        {
            key: 'value',
            label: 'Value',
            tdClass: 'py-3',
            sortable: true
        },
        {
            key: 'edit',
            label: ' ',
            tdClass: 'edit-td'
        },
        {
            key: 'delete',
            label: ' ',
            tdClass: 'delete-td'
        }
    ];

    created() {
        console.log('EventBus.$on(\'refresh\')');
        EventBus.$on('refresh', value => {
            this.tableData = this.customSettings.asArray();
            this.editedValue = {
                name: '',
                value: '',
                default: false
            };
        });
    }

    beforeDestroy() {
        // console.log("EventBus.$off('refresh')");
        // EventBus.$off('refresh');
    }

    onAddCustomHandlerClick() {
        if (!(this.editedValue.name || this.editedValue.value)) return;

        let existElement: Setting = this.customSettings.finByName(this.editedValue.name);

        if (existElement) {
            existElement.Value = this.editedValue.value;
        } else {
            this.customSettings.Add(new Setting(this.editedValue.name, this.editedValue.value));
        };

        let nameEl: Vue = <Vue>this.$refs['name-input'];
        
        $(nameEl.$el).focus();

        EventBus.$emit('refresh');

    }

    onEditClick(data) {
        this.onValueClick(data);
    }

    onValueClick(data) {
        this.editedName = (this.editedName === data.item.name) ? '' : data.item.name;
        let nameEl: Vue = <Vue>this.$refs['edited-value-input'];
        this.$nextTick(() => {
            $(nameEl.$el).focus();
        });
    }

    onValueEnterPressed(event, data) {
        data.item.Value = event.target.value;
        this.editedName = '';
    }

    onDeleteClick(row) {
        this.customSettings.Delete(row.item);
    }

    isShowDelete(data) {
        return !data.item.IsDefault;
    }

}