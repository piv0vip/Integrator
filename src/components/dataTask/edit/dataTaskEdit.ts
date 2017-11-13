import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { DataTaskHandlerSettings, HandlerTypes } from '../../../classes/settings';
import { DataTask } from '../../../models';
import { EnumValues, CustomEnumValues } from '../../../enums';
import { HTTP } from '../../../util/http-common';
import { CustomParamsComponent, ConfirmationComponent } from '../../common/';
import { CronStyleSchedulingComponent }  from '../../../components/common/cron/';
import { IEnumValues } from '../../../interfaces';
import { EditViewElementComponent } from '../../common/editViewElement';
import { CronPresetsComponent } from './cronPresets';   


@Component({
    template: require('./dataTaskEdit.html'),
    components: {
        'cron-style-scheduling': CronStyleSchedulingComponent,
        'custom-params': CustomParamsComponent,
        'confirmation-dialog': ConfirmationComponent,
        'edit-view-element': EditViewElementComponent,
        'cron-presets': CronPresetsComponent
    }
})

export class DataTaskEditComponent extends Vue {

    showModal: boolean = false;
    height: string = '200px';
    selectedHandler: string = '';

    alertSec: number = 0;
    alertMessage: string = 'Validation errors...';

    showSaveConfirmation: boolean = false;
    showDiscardConfirmation: boolean = false;

    @Prop({default: true})
    show: boolean;

    @Prop()
    dataTask: DataTask;

    @Prop({default: () => new CustomEnumValues() })
    handlersEnum: IEnumValues;

    @Prop({default: null})
    handlers: HandlerTypes;

    @Prop()
    cronPresets: string[];

    @Watch('show')
    onShowChanged (value: boolean) {
        if (value) {
            this.$root.$emit('bv::show::modal', 'edit-task-modal');
        }
    }

    @Watch('dataTask')
    onWatchChanged (value: DataTask) {
        this.selectedHandler = value ? value.TaskType : '';
    }

    @Watch('selectedHandler')
    onSelectedHandlerChanged(value) {
        if (this.dataTask.TaskType !== value) { this.dataTask.TaskType = value; }
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
            .then((isValid) => {
                if (isValid) {
                    this.showSaveConfirmation = true;
                } else {
                    this.alertSec = 3;
                }
            })
            .catch((e) => { console.log(e); });
    }

    onSaveOkClicked(e) {
        this.onSaveDialog(e);
    }

    onDiscardOkClicked(e) {
        this.close();
    }

    onShowModal() {
        console.log('modal is show');
    }

    onCloseSaveConfirmation() {
        console.log('onCloseSaveConfirmation');
        this.showSaveConfirmation = false;
    }

    onCronPresetsChange(value) {
        this.dataTask.getCronSchedule().Parse(value);
    }

    close() {
        this.$root.$emit('bv::hide::modal', 'edit-task-modal');
    }
}