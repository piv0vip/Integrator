import Vue from 'vue';

import { Component, Watch } from 'vue-property-decorator';

import { HTTP } from '../../../util/http-common';

import { EnumValue, EnumValues, Enums, TaskStatusEnum, CustomEnumValues } from '../../../enums';

import { AxiosResponse } from 'axios';


import { HandlerTypes } from '../../../classes/settings/handlerTypes';
import { DataTask, DataTaskGroup } from '../../../models';

import { DataTaskEditComponent } from '../edit';
import { DataTaskGroupEditComponent } from '../editGroup';
import { ConfirmationComponent } from '../../common/';
import { DataTaskExecuteLocalyComponent } from '../../dataTask/execute';

import * as helper from '../../../util/helper';

import { IEnumValues, IPagedList, PagedList, ITableFields } from '../../../interfaces';

import { DataTaskService } from '../../../services';

import chance from 'chance';

import { DataTaskGroup as IDataTaskGroup } from '../../../api/models';

import cronstrue from 'cronstrue';

import _ from 'lodash';

interface IHeaders {
    text: string,
    value: string,
    align?: 'left' | 'right' | 'center'
}

@Component({
    template: require('./dataTaskList.html'),
    components: {
        'edit-task': DataTaskEditComponent,
        'edit-group': DataTaskGroupEditComponent,
        'confirmation': ConfirmationComponent,
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
    currentGroup: DataTaskGroup = new DataTaskGroup();
    confirmationCBFunc: Function = null;
    confirmationMessage: string = ''

    showConfirmation: boolean = false;

    showExecuteTaskLocaly: boolean = false;
    showEditTask: boolean = false;
    showEditGroup: boolean = false;

    isBusy: boolean = false;  
    sortBy: string =  'LastStartTime';
    sortDesc: boolean = true;

    DataTask = DataTask;

    formatDate: Function = helper.formatDate;

    getEnumDescription: Function = (val) => { return this.statusEnum.getEnumValueByCode(val).getDescription(); };

    chance: chance;

    vtfGroupGridHeaders: IHeaders[] = [
        { text: 'Group Name', value: 'name', align: 'center' },
        { text: 'Cron', value: 'cronSchedule', align: 'center' },
        { text: 'Tasks Count', value: 'dataTaskList', align: 'center'  },
        { text: 'Group Only', value: 'groupInly', align: 'center' }
    ];

    vtfTaskGridHeaders: IHeaders[] = [
        { text: 'Action', value: 'nothing', align: 'center' },
        { text: 'Task Name', value: 'displayName', align: 'center' },
        { text: 'Cron', value: 'cronSchedule', align: 'center' },
        { text: 'Task Status', value: 'status', align: 'center' },
        { text: 'Task Start Time', value: 'lastStartTime', align: 'center' },
        { text: 'Next Start Time', value: 'nextStartTime', align: 'center' },
    ];

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
        let arr: DataTask[] = [];
        this.dataTaskGroups.forEach((group: DataTaskGroup) => {
            group.DataTasks.forEach((task: DataTask) => {
                arr.push(task);
            });
        });
        return arr;
    }

    get dataTaskGroups(): DataTaskGroup[] {
        return this.$store.getters.dataTaskGroupsArray;
    }

    get iDataTaskGroups(): IDataTaskGroup[] {
        return this.$store.getters.iDataTaskGroups;
    }

    onExecLocalyTaskClick(dataTask: DataTask) {
        this.currentTask = dataTask;
        this.showExecuteTaskLocaly = true;
    }

    onExecInSchTaskClick(dataTask: DataTask) {
        HTTP.post('Scheduler/ExecuteTask/' + dataTask.DataTaskId, null, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
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

    onAddGroupClick() {
        this.currentGroup = new DataTaskGroup();
        this.showEditGroup = true;
    }

    refreshTable() {
        this.$store.dispatch('getIDataTaskGroups');
        this.$store.dispatch('getDataTasks');
    }

    onRefreshTableClick() {
        this.refreshTable();
    }

    onEditTaskClick(dataTask: DataTask) {
        this.currentTask = dataTask;
        this.showEditTask = true;
    }

    onEditGroupClick(dataTaskGroup: DataTaskGroup) {
        this.currentGroup = dataTaskGroup;
        this.showEditGroup = true;
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

    closeEditGroup(dataTaskGroup?: DataTaskGroup) {
        this.showEditGroup = false;
        if (dataTaskGroup) {
            this.refreshTable();
        }
    }

    onFilterChange(e) {
        this.refreshTable();
    }

    onExecGroupClick(dataTaskGroup: IDataTaskGroup) {
    }

    onDeleteGroupClick(dataTaskGroup: DataTaskGroup) {
        HTTP.delete('DataTaskGroup/Delete/' + dataTaskGroup.DataTaskGroupId)
            .then((response: AxiosResponse) => {
                this.refreshTable();
            })
            .catch(e => {
                this.isBusy = false;
            });
    }

    onDeleteTask(dataTask: DataTask) {
        this.confirmationMessage = 'Do you want to Remove \'' + dataTask.DisplayName + '\' Task?'
        this.confirmationCBFunc = () => {
            this.onDeleteTaskClick(dataTask);
        }
        this.showConfirmation = true;
    }

    onDeleteGroup(dataTaskGroup: DataTaskGroup) {
        this.confirmationMessage = 'Do you want to Remove \'' + dataTaskGroup.Name + '\' Group?'
        this.confirmationCBFunc = () => {
            this.onDeleteGroupClick(dataTaskGroup);
        }
        this.showConfirmation = true;
    }

    cronHumanity(cron: string): string {
        return cronstrue.toString(cron.toUpperCase());
    }

}