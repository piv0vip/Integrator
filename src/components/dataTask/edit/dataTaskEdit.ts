import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { DataTaskHandlerSettings, HandlerTypes, HandlerType, HandlerSetting } from '../../../classes/settings';
import { DataTask, DataTaskGroup } from '../../../models';
import { EnumValues, CustomEnumValues } from '../../../enums';
import { HTTP } from '../../../util/http-common';
import { HandlerSettingComponent, ConfirmationComponent } from '../../common/';
import { IEnumValues } from '../../../interfaces';
import { CronPresetsComponent } from './cronPresets';   

import { DataTaskGroupEditComponent } from '../editGroup';

import { DataTaskGroup as IDataTaskGroup } from '../../../api/models'

import $ from 'jquery';
import _ from 'lodash';

@Component({
    template: require('./dataTaskEdit.html'),
    components: {
        'handler-setting': HandlerSettingComponent,
        'confirmation': ConfirmationComponent,
        'cron-presets': CronPresetsComponent,
        'edit-group': DataTaskGroupEditComponent,
    },
    inject: ['$validator'],
})

export class DataTaskEditComponent extends Vue {

    height: string = '300px';

    scope: string = 'dataTaskEditScope';

    currentGroup: DataTaskGroup = new DataTaskGroup();
    showEditGroup: boolean = false;

    selectedHandler: string = '';
    selectedGroup: number = null;

    initToggle: boolean = false;

    mut: boolean = false; // hack for refresh data

    cronString: string = '* * * * *';

    groupSelect: number = null;

    showSaveConfirmation: boolean = false;
    showDiscardConfirmation: boolean = false;

    @Prop()
    value: boolean;

    @Prop()
    dataTask: DataTask;

    get showModal(): boolean {
        return this.$store.state['dataTask'].showEditDataTaskDialog;
    }

    get handlerTypes(): HandlerTypes {
        return this.$store.state['dataTask'].handlerTypes;
    }

    get handlerSettingsSelectList(): any[] {
        return this.handlerTypes.asSelectBoxList();
    }

    get dataTaskGroups(): {value: number, text: string}[] {
        return this.$store.getters.dataTaskGroupsAsSelect;
    }

    @Watch('dataTask')
    onDataTaskChanged (value: DataTask) {
        this.selectedHandler = (value ? value.TaskType : '');
        this.selectedGroup = (value ? value.DataTaskGroupId : null);
        this.cronString = value.CronSchedule;
    }

    @Watch('selectedHandler')
    onSelectedHandlerChanged(value: string) {
        if (this.handlerTypes.containsKey(value) && this.dataTask.IsNew) {
            this.dataTask.HandlerType = this.handlerTypes.getValue(value);
        }
        if (this.dataTask.TaskType !== value) { this.dataTask.TaskType = value; }
        this.$nextTick(() => { this.refreshList(); });
    }

    @Watch('selectedGroup')
    onSelectedGroup(value) {
        console.log('selected group: ' + value);
        if (this.selectedGroup > 0) {
            this.dataTask.DataTaskGroupId = this.selectedGroup;
        } 
    }

    @Watch('cronString')
    onCronStringChange(value) {
        this.dataTask.CronSchedule = value;
    }

    get isNew(): boolean {
        return this.dataTask ? this.dataTask.IsNew : true;
    }

    get handlerSettings(): DataTaskHandlerSettings {
        return this.dataTask.getHandlerSettings();
    }

    get handlerSettingsList(): HandlerSetting[] {
        this.mut; return this.dataTask.getHandlerSettings().values();
    }

    get handlerSettingsIsDafault(): boolean {
        this.mut; return this.handlerSettings.isDefault();
    }

    onModalHidden(e) {
    }

    onSaveDialog(evt) {
        this.$store.commit('loading', true);
        let request: {url: string, method: string} = this.isNew ? 
            {url: 'DataTask/Insert', method: 'post'} : 
            {url: 'DataTask/Update', method: 'put'} ;
        HTTP[request.method](request.url, this.dataTask.toServer())
            .then(function(response) {
                this.$store.commit('loading', false);
                this.closeEditTask();
            }.bind(this))
            .catch(e => {
                this.$store.commit('loading', false);
                console.log(e);
            });
    }

    onSaveClick() {
        this.$validator.reset();
        this.$validator.validateAll(this.scope)
            .then(function(isValid) {
                if (isValid) {
                    this.showSaveConfirmation = true;
                } else {
                    let errors = this.$validator.errors;
                    let firstErrorItem = _.isArray(errors.items) && errors.items.length > 0 && errors.items;
                    let scopedError = firstErrorItem ? _.find(firstErrorItem, (value) => {
                        return value.scope === this.scope;
                    }) : null;
                    if (scopedError) {
                        let $el = $('[data-vv-name=' + scopedError.field + '][data-vv-scope=' + scopedError.scope + ']');
                        if ($el) { $el.focus(); }
                    }
                }
            }.bind(this))
            .catch((e) => { console.log(e); });
    }

    onSaveOkClicked(e) {
        this.onSaveDialog(e);
    }

    onDiscardOkClicked(e) {
        this.closeEditTask();
    }

    onShowModal() { }

    onCloseSaveConfirmation() {
        this.showSaveConfirmation = false;
    }

    closeEditTask() {
        this.$validator.reset();
        this.$emit('input', false);
        this.$emit('onClose');
    }

    refreshList() {
        this.mut = !this.mut;
    }

    createNewGroup() {
        this.$store.commit('editDataTaskGroup', {
            onClose: (dataTaskGroup?: IDataTaskGroup) => {
                if (dataTaskGroup) {
                    this.selectedGroup = dataTaskGroup.dataTaskGroupId;
                } else {
                    this.selectedGroup = this.dataTask.DataTaskGroupId;
                }
            }
        });
    }
}