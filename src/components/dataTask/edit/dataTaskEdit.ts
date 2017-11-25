import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { DataTaskHandlerSettings, HandlerTypes, HandlerSetting } from '../../../classes/settings';
import { DataTask } from '../../../models';
import { EnumValues, CustomEnumValues } from '../../../enums';
import { HTTP } from '../../../util/http-common';
import { HandlerSettingComponent, ConfirmationComponent } from '../../common/';
import { IEnumValues } from '../../../interfaces';
import { CronPresetsComponent } from './cronPresets';   

@Component({
    template: require('./dataTaskEdit.html'),
    components: {
        'handler-setting': HandlerSettingComponent,
        'confirmation': ConfirmationComponent,
        'cron-presets': CronPresetsComponent
    },
    inject: ['$validator'],
})

export class DataTaskEditComponent extends Vue {

    showModal: boolean = false;

    height: string = '300px';

    scope: string = 'dataTaskEditScope';

    selectedHandler: string = '';

    initToggle: boolean = false;

    mut: boolean = false; // hack for refresh data

    cronString: string = '* * * * *';

    alertSec: number = 0;
    alertMessage: string = 'Validation errors...';

    showSaveConfirmation: boolean = false;
    showDiscardConfirmation: boolean = false;

    @Prop()
    value: boolean;

    @Watch('value')
    onValueChanged(value) {
        this.showModal = value;
    }

    @Prop()
    dataTask: DataTask;

    @Prop({default: () => new CustomEnumValues() })
    handlersEnum: IEnumValues;

    @Prop()
    handlerTypes: HandlerTypes;

    @Prop()
    cronPresets: string[];

    @Watch('dataTask')
    onWatchChanged (value: DataTask) {
        this.selectedHandler = (value ? value.TaskType : '');
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

    @Watch('cronString')
    onCronStringChange(value) {
        this.dataTask.CronSchedule = value;
    }

    get handlerSettingsSelectList(): any[] {
        return this.handlersEnum ? this.handlersEnum.asSelectList() : [];
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
        let request: {url: string, method: string} = this.isNew ? 
            {url: 'DataTask/Insert', method: 'post'} : 
            {url: 'DataTask/Update', method: 'put'} ;
        HTTP[request.method](request.url, this.dataTask.toServer())
            .then(function(response) {
                this.closeEditTask();
                this.$emit('onSave', evt);
            }.bind(this))
            .catch(e => {
                console.log(e);
            });
    }

    onSaveClick() {
        this.$validator.reset();
        this.$validator.validateAll(this.scope)
            .then(function(isValid) {
                if (isValid) {
                    this.showSaveConfirmation = true;
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

    onCronPresetsChange(value) {
        this.cronString = value;
    }

    closeEditTask() {
        this.$validator.reset();
        this.$emit('input', false);
        this.$emit('onClose');
    }

    refreshList() {
        this.mut = !this.mut;
    }
}