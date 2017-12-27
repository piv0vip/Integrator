import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { DataTaskGroup } from '../../../models';
import { HTTP } from '../../../util/http-common';
import { ConfirmationComponent } from '../../common/';
import { CronPresetsComponent } from '../edit/cronPresets';
import { AxiosResponse } from 'axios';

import { DataTaskGroup as IDataTaskGroup } from '../../../api/models';

import $ from 'jquery';
import _ from 'lodash';

@Component({
    template: require('./dataTaskGroupEdit.html'),
    components: {
        'confirmation': ConfirmationComponent,
        'cron-presets': CronPresetsComponent,
    },
    inject: ['$validator'],
})

export class DataTaskGroupEditComponent extends Vue {

    height: string = '300px';

    @Prop()
    scope: string;

    initToggle: boolean = false;

    mut: boolean = false; // hack for refresh data

    cronString: string = '* * * * *';

    showSaveConfirmation: boolean = false;
    showDiscardConfirmation: boolean = false;

    get showModal(): boolean {
        return this.$store.getters.requestGroup.showEditDialog;
    }

    get dataTaskGroup(): DataTaskGroup {
        return this.$store.getters.requestGroup.currentGroup;
    }

    @Watch('dataTaskGroup')
    onDataTaskChanged(value: DataTaskGroup) {
        this.cronString = value.CronSchedule;
    }

    @Watch('cronString')
    onCronStringChange(value) {
        this.dataTaskGroup.CronSchedule = value;
    }

    get isNew(): boolean {
        return this.dataTaskGroup ? this.dataTaskGroup.IsNew : true;
    }

    onSaveDialog(evt) {
        this.$store.commit('loading', true);
        let request: {url: string, method: string} = this.isNew ? 
            {url: 'DataTaskGroup/Insert', method: 'post'} : 
            {url: 'DataTaskGroup/Update', method: 'put'} ;
        HTTP[request.method](request.url, this.dataTaskGroup.toServer())
            .then(function (response: AxiosResponse) {
                this.closeEdit(response.data as IDataTaskGroup);
                this.$store.commit('loading', false);
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
        this.closeEdit();
    }

    onCloseSaveConfirmation() {
        this.showSaveConfirmation = false;
    }

    closeEdit(dataTaskGroup?: IDataTaskGroup) {
        this.$validator.reset();
        this.$store.getters.requestGroup.onClose(dataTaskGroup);
    }

}