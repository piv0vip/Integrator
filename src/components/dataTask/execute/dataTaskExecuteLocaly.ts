import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

import { CustomParamsComponent } from '../../common/customParams';
import { DataTask } from '../../../models';
import { HTTP } from '../../../util/http-common';
import EventBus from '../../../util/EventBus';

@Component({
    template: require('./dataTaskExecuteLocaly.html'),
    components: {
        'custom-params': CustomParamsComponent
    }
})

export class DataTaskExecuteLocalyComponent extends Vue {

    showModal: boolean = false;
    height: string = '300px';

    @Prop({default: false})
    show: Boolean;

    @Prop()
    webTask: DataTask;

    @Watch('show')
    onShowChanged (value: boolean) {
        if (value) {
            this.$root.$emit('bv::show::modal', 'execute-task-localy-modal');
        }
    }

    get handlerSettings() {
        this.$nextTick(() => {
            EventBus.$emit('refresh');
        });
        return this.webTask.getHandlerSettings();
    }

    onModalHidden(e) {
        this.$emit('onClose', e);
    }

    onExecuteClick() {
        
        HTTP.post('DataTask/ExecuteTaskWithParams/' + this.webTask.DataTaskId, this.handlerSettings.toServer())
            .then(response => {
                this.$root.$emit('bv::hide::modal', 'execute-task-localy-modal');
            })
            .catch(e => {
                console.log(e);
            });
    }
}