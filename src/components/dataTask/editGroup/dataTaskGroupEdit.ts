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

    @Prop()
    value: boolean;

    get showModal(): boolean {
        return this.$store.state['dataTask'].showEditDataTaskGroupDialog;
    }

    @Prop()
    dataTaskGroup: DataTaskGroup;

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
                this.$store.commit('loading', false);
                this.closeEdit(new DataTaskGroup(response.data as IDataTaskGroup));
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

    onShowModal() { }

    onCloseSaveConfirmation() {
        this.showSaveConfirmation = false;
    }

    closeEdit(dataTaskGroup?: DataTaskGroup) {
        this.$validator.reset();
        this.$store.commit('dataTaskGroupDialogVisible', false);
        this.$emit('input', false);
        this.$emit('onClose', dataTaskGroup);
    }

    refreshList() {
        this.mut = !this.mut;
    }
}