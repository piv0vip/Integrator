import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

import { HandlerSettingsComponent, ConfirmationComponent } from '../../common/';
import { DataTask } from '../../../models';
import { HTTP } from '../../../util/http-common';

@Component({
    template: require('./dataTaskExecuteLocaly.html'),
    components: {
        'handler-settings': HandlerSettingsComponent,
        'confirmation': ConfirmationComponent,
    },
    inject: ['$validator']
})

export class DataTaskExecuteLocalyComponent extends Vue {

    scope: string = 'taskExecute';

    showConfirmation: boolean = false;

    @Prop()
    value: Boolean;

    @Prop()
    dataTask: DataTask;

    get handlerSettings() {
        return this.dataTask.getHandlerSettings();
    }

    Execute() {
        HTTP.post('DataTask/ExecuteTaskWithParams/' + this.dataTask.DataTaskId, this.handlerSettings.toServer())
            .then(response => {
                this.hideModal();
            })
            .catch(e => {
                console.log(e);
            });
    }

    onExecuteClick() {
        this.$validator.reset();
        this.$validator.validateAll(this.scope)
            .then(function(isValid) {
                if (isValid) {
                    this.showConfirmation = true;
                }
            }.bind(this))
            .catch((e) => { console.log(e); });
    }

    onCloseClick() {
        this.hideModal();
    }

    hideModal() {
        this.$emit('input', false);
        this.$emit('onClose');
    }
}