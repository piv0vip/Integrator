import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { DataTaskHandlerSettings, HandlerTypes } from '../../../classes/settings';
import { DataTask } from '../../../models';
import { EnumValues, CustomEnumValues } from '../../../enums';
import { HTTP } from '../../../util/http-common';
import { HandlerSettingsComponent, ConfirmationComponent } from '../../common/';
import { CronStyleSchedulingComponent }  from '../../../components/common/cron/';
import { IEnumValues } from '../../../interfaces';
import { EditViewElementComponent } from '../../common/editViewElement';
import { CronPresetsComponent } from './cronPresets';   
import { Validator } from 'vee-validate';


@Component({
    template: require('./dataTaskEdit.html'),
    components: {
        'cron-style-scheduling': CronStyleSchedulingComponent,
        'handler-settings': HandlerSettingsComponent,
        'confirmation-dialog': ConfirmationComponent,
        'edit-view-element': EditViewElementComponent,
        'cron-presets': CronPresetsComponent
    }
})

export class DataTaskEditComponent extends Vue {

    showModal: boolean = false;
    height: string = '300px';
    selectedHandler: string = '';
    initToggle: boolean = false;

    cronString: string = '* * * * *';

    alertSec: number = 0;
    alertMessage: string = 'Validation errors...';

    showSaveConfirmation: boolean = false;
    showDiscardConfirmation: boolean = false;

    validator: Validator = null;

    @Prop({default: true})
    show: boolean;

    @Prop()
    dataTask: DataTask;

    @Prop({default: () => new CustomEnumValues() })
    handlersEnum: IEnumValues;

    @Prop()
    handlerTypes: HandlerTypes;

    @Prop()
    cronPresets: string[];

    @Watch('show')
    onShowChanged (value: boolean) {
        if (value) {
            this.initToggle = !this.initToggle;
            this.showModal = true;
            this.$root.$emit('bv::show::modal', 'edit-task-modal');
        }
    }

    @Watch('dataTask')
    onWatchChanged (value: DataTask) {
        this.selectedHandler = value ? value.TaskType : '';
        this.cronString = value.getCronSchedule().toString();
    }

    @Watch('selectedHandler')
    onSelectedHandlerChanged(value) {
        if (this.handlerTypes.containsKey(value) && this.dataTask.IsNew) { this.dataTask.HandlerType = this.handlerTypes.getValue(value); }
        if (this.dataTask.TaskType !== value) { this.dataTask.TaskType = value; }
    }

    @Watch('cronString')
    onCronStringChange(value){
        this.dataTask.CronSchedule = value;
    }

    created() {
        //this.
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

    onModalHidden(e) {
        this.$emit('onClose', e);
    }

    onSaveDialog(evt) {
        let request: {url: string, method: string} = this.isNew ? 
            {url: 'DataTask/Insert', method: 'post'} : 
            {url: 'DataTask/Update', method: 'put'} ;
        HTTP[request.method](request.url, this.dataTask.toServer())
            .then(response => {
                this.close();
                this.$emit('onSave', evt);
            })
            .catch(e => {
                console.log(e);
            });
    }

    onSaveClick() {
        this.$validator.validateAll()
            .then(function(isValid) {
                if (isValid) {
                    this.showSaveConfirmation = true;
                } else {
                    this.alertSec = 3;
                }
            }.bind(this))
            .catch((e) => { console.log(e); });
    }

    onSaveOkClicked(e) {
        this.onSaveDialog(e);
    }

    onDiscardOkClicked(e) {
        this.close();
    }

    onShowModal() { }

    onCloseSaveConfirmation() {
        this.showSaveConfirmation = false;
    }

    onCronPresetsChange(value) {
        this.cronString = value;
    }

    close() {
            this.showModal = false;
        this.$root.$emit('bv::hide::modal', 'edit-task-modal');
    }
}