import Vue from 'vue';

import { Component, Watch } from 'vue-property-decorator';

import { HTTP } from '../../../util/http-common';

import { EnumValue, EnumValues, Enums, TaskStatusEnum, CustomEnumValues } from '../../../enums';

import { AxiosResponse } from 'axios';


import { HandlerTypes } from '../../../classes/settings/handlerTypes';
import { DataTask } from '../../../models';

import { DataTaskEditComponent } from '../edit';
import { ConfirmationButtonComponent } from '../../common/';
import { DataTaskExecuteLocalyComponent } from '../../dataTask/execute';

import * as helper from '../../../util/helper';

import { IEnumValues, IPagedList, PagedList, ITableFields } from '../../../interfaces';

import { DataTaskService } from '../../../services';

import chance from 'chance';

import * as signalR from '@aspnet/signalr-client';

import _ from 'lodash';

@Component({
    template: require('./dataTaskList.html'),
    components: {
        'edit-task': DataTaskEditComponent,
        'confirmation-button': ConfirmationButtonComponent,
        'execute-task-localy': DataTaskExecuteLocalyComponent,
    },
})

export class DataTaskListComponent extends Vue {

    statusEnum = new CustomEnumValues();

    handlerTypes: HandlerTypes = new HandlerTypes();

    cronPresets: string[] = [];

    showConsole: boolean = false; 
    consoleMessages: string[] = ['SignalR console:', '================'];

    currentTask: DataTask = new DataTask();

    showExecuteTaskLocaly: boolean = false;
    showEditTask: boolean = false;

    isBusy: boolean = false;  
    sortBy: string =  'LastStartTime';
    sortDesc: boolean = true;

    formatDate: Function = helper.formatDate;

    getEnumDescription: Function = (val) => { return this.statusEnum.getEnumValueByCode(val).getDescription(); };

    hubConnection: signalR.HubConnection;

    chance: chance;

    fieldds: ITableFields[] = 
    [
        {
            key: 'ExecLoc',
            tdClass: 'td-button',
            label: ' ',
        },
        {
            key: 'ExecSch',
            tdClass: 'td-button',
            label: ' '
        },
        {
            key: 'Reset',
            tdClass: 'td-button',
            label: ' '
        },
        {
            key: 'Config',
            tdClass: 'td-button',
            label: ' '
        },
        {
            key: 'DisplayName', 
            label: 'Task Name',
            tdClass: 'py-3',
            sortable: true,
        },
        {
            key: 'Status',
            tdClass: 'py-3',
            label: 'Task Status',
            sortable: true,
            formatter: 'getEnumDescription'
        }, 
        {
            key: 'LastStartTime',
            tdClass: 'py-3',
            label: 'Task Start Time',
            sortable: true,
            formatter: 'formatDate'
        },
        {
            key: 'LastEndTime',
            tdClass: 'py-3',
            label: 'Task End Time',
            sortable: true,
            formatter: 'formatDate'
        },
        {
            key: 'NextStartTime',
            tdClass: 'py-3',
            label: 'Next Start Time',
            sortable: true,
            formatter: 'formatDate'
        },
        {
            key: 'LastExecutionTime',
            tdClass: 'py-3',
            label: 'Last Execution Time',
            sortable: true,
        },
        {
            key: 'Delete',
            tdClass: 'td-button',
            label: ' '
        },
    ];

    created() {

        this.$store.dispatch('getDataTasks');

        this.statusEnum.Load([
            { code: 'NotStarted', name: 'NotStarted', description: 'Not Started'},
            { code: 'Running', name: 'Running'},
            { code: 'Successful', name: 'Successful'},
            { code: 'Error', name: 'Error'},
            { code: 'Cancelled', name: 'Cancelled'}
        ]);

        let hubUrl = 'http://localhost:5000/hub';
        let httpConnection = new signalR.HttpConnection(hubUrl);
        
        this.hubConnection = new signalR.HubConnection(httpConnection);
        this.hubConnection.on('Broadcast', this.handler);

        this.hubConnection.start();
    }

    destroyed() {
        this.hubConnection.off('Broadcast', this.handler);
    }

    handler(data) {
        this.consoleMessages.push(data);
        if (this.consoleMessages.length > 200) _.drop(this.consoleMessages);
    }

    get dataTasks(): DataTask[] {
        return this.$store.getters.dataTasksArray;
    }

    onExecLocalyTaskClick(dataTask: DataTask) {
        this.currentTask = dataTask;
        this.showExecuteTaskLocaly = true;
    }

    onExecInSchTaskClick(dataTask: DataTask) {
        HTTP.post('DataTask/ExecuteTask/' + dataTask.DataTaskId)
        .then((response: AxiosResponse) => {
            this.refreshTable();
        })
        .catch(e => {
            console.log(e);
            this.refreshTable();
        });
    }

    onResetTaskClick(dataTask: DataTask) {
        HTTP.post('DataTask/ResetTaskStatus/' + dataTask.DataTaskId)
        .then((response: AxiosResponse) => {
            this.refreshTable();
        })
        .catch(e => {
            console.log(e);
            this.refreshTable();
        });
    }

    onAddDatataskClick() {
        this.currentTask = new DataTask();
        this.showEditTask = true;
    }

    refreshTable() {
        this.$store.dispatch('getDataTasks');
    }

    onRefreshTableClick() {
        this.$store.commit('setDataTaskStatus', TaskStatusEnum.NotStarted);
    }

    onEditTaskClick(dataTask: DataTask) {
        this.currentTask = dataTask;
        this.showEditTask = true;
    }

    onDeleteTaskClick(dataTask: DataTask) {
        HTTP.delete('DataTask/Delete/' + dataTask.DataTaskId)
        .then((response: AxiosResponse) => {
            this.refreshTable();
        })
        .catch(e => {
            this.isBusy = false;
            console.log(e);
        });
    }

    closeExecuteTaskLocaly(e) {
        this.showExecuteTaskLocaly = false;
        this.refreshTable();
    }

    closeEditTask(e) {
        this.showEditTask = false;
        this.refreshTable();
    }

    onFilterChange(e) {
        this.refreshTable();
    }

}