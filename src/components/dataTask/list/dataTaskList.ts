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
    get consoleMessages(): string[] { return this.$store.getters.broadcastMessages; }

    currentTask: DataTask = new DataTask();

    showExecuteTaskLocaly: boolean = false;
    showEditTask: boolean = false;

    isBusy: boolean = false;  
    sortBy: string =  'LastStartTime';
    sortDesc: boolean = true;

    formatDate: Function = helper.formatDate;

    getEnumDescription: Function = (val) => { return this.statusEnum.getEnumValueByCode(val).getDescription(); };

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

        this.refreshTable();

        this.statusEnum.Load([
            { code: 'NotStarted', name: 'NotStarted', description: 'Not Started'},
            { code: 'Running', name: 'Running'},
            { code: 'Successful', name: 'Successful'},
            { code: 'Error', name: 'Error'},
            { code: 'Cancelled', name: 'Cancelled'}
        ]);


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
            // this.refreshTable();
        })
        .catch(e => {
            console.log(e);
            // this.refreshTable();
        });
    }

    onResetTaskClick(dataTask: DataTask) {
        HTTP.post('DataTask/ResetTaskStatus/' + dataTask.DataTaskId)
        .then((response: AxiosResponse) => {
            // this.refreshTable();
        })
        .catch(e => {
            console.log(e);
            // this.refreshTable();
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
        this.refreshTable();
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
        // this.refreshTable();
    }

    closeEditTask(e) {
        this.showEditTask = false;
        this.refreshTable();
    }

    onFilterChange(e) {
        this.refreshTable();
    }

}