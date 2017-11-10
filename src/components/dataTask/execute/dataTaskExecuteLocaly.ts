import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

import { CustomParamsComponent } from '../../common/customParams';
import { DataTask } from '../../../models';
import { HTTP } from '../../../util/http-common';

@Component({
    template: require('./dataTaskExecuteLocaly.html'),
    components: {
        'custom-params': CustomParamsComponent
    }
})

export class DataTaskExecuteLocalyComponent extends Vue {

    showModal: boolean = false;

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
        
        HTTP.post('DataTask/ExecuteTaskWithParams/' + this.dataTask.DataTaskId, this.handlerSettings.toServer())
            .then(response => {
                this.hideModal();
            })
            .catch(e => {
                console.log(e);
            });
    }

    onCloseClick() {
        this.hideModal();
    }

    hideModal() {
        this.$root.$emit('bv::hide::modal', 'execute-task-localy-modal');
    }
}