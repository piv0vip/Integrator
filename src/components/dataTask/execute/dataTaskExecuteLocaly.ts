import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

import { HandlerSettingsComponent } from '../../common/customParams';
import { DataTask } from '../../../models';
import { HTTP } from '../../../util/http-common';

@Component({
    template: require('./dataTaskExecuteLocaly.html'),
    components: {
        'handler-settings': HandlerSettingsComponent
    },
    inject: ['$validator']
})

export class DataTaskExecuteLocalyComponent extends Vue {

    showModal: boolean = false;

    scope: string = 'taskExecute';

    @Prop({default: false})
    show: Boolean;

    @Prop()
    dataTask: DataTask;

    @Watch('show')
    onShowChanged (value: boolean) {
        if (value) {
            this.$root.$emit('bv::show::modal', 'execute-task-localy-modal');
        }
    }

    get handlerSettings() {
        return this.dataTask.getHandlerSettings();
    }

    onModalHidden(e) {
        this.$emit('onClose', e);
    }

    onExecuteClick() {

        this.$validator.reset();
        this.$validator.validateAll(this.scope)
            .then(function(isValid) {
                if (isValid) {

                    HTTP.post('DataTask/ExecuteTaskWithParams/' + this.dataTask.DataTaskId, this.handlerSettings.toServer())
                        .then(response => {
                            this.hideModal();
                        })
                        .catch(e => {
                            console.log(e);
                        });


                }
            }.bind(this))
            .catch((e) => { console.log(e); });


    }

    onCloseClick() {
        this.hideModal();
    }

    hideModal() {
        this.$root.$emit('bv::hide::modal', 'execute-task-localy-modal');
    }
}