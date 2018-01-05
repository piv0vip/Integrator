import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

import { HandlerSettingsComponent, ConfirmationComponent } from '../../common/';
import { DataTask } from '../../../models';
import { HTTP } from '../../../util/http-common';

import $ from 'jquery';
import _ from 'lodash';
    
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
        HTTP.post('Scheduler/ExecuteTask/' + this.dataTask.DataTaskId, this.handlerSettings.toServer(), {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        this.hideModal();
    }

    onExecuteClick() {
        this.$validator.reset();
        this.$validator.validateAll(this.scope)
            .then(function(isValid) {
                if (isValid) {
                    this.showConfirmation = true;
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

    onCloseClick() {
        this.hideModal();
    }

    hideModal() {
        this.$emit('input', false);
        this.$emit('onClose');
    }
}