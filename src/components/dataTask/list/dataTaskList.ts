import Vue from 'vue';

import { Component, Watch } from 'vue-property-decorator';

import { HTTP } from '../../../util/http-common';

import { EnumValue, EnumValues, Enums, CustomEnumValues } from '../../../enums';

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

import { DataTaskGroup as IDataTaskGroup, DataTask as IDataTask, Status as TaskStatusEnum } from '../../../api/models';

import cronstrue from 'cronstrue';

import _ from 'lodash';

interface IHeaders {
    text: string;
    value: string;
    align?: 'left' | 'right' | 'center';
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

    handlerTypes: HandlerTypes = new HandlerTypes();

    cronPresets: string[] = [];

    currentTask: DataTask = new DataTask();
    currentGroup: DataTaskGroup = new DataTaskGroup();
    confirmationCBFunc: Function = null;
    confirmationMessage: string = '';

    showConfirmation: boolean = false;

    showExecuteTaskLocaly: boolean = false;
    showEditTask: boolean = false;
    showEditGroup: boolean = false;

    isBusy: boolean = false;  
    sortBy: string =  'LastStartTime';
    sortDesc: boolean = true;

    DataTask = DataTask;
    DataTaskGroup = DataTaskGroup;

    createDataTaskGroup(iDataTaskGroup: IDataTaskGroup): DataTaskGroup {
        return new DataTaskGroup(iDataTaskGroup);
    }

    createDataTask(iDataTask: IDataTask): DataTask {
        return DataTask.createDataTaskFromJson(iDataTask);
    }

    formatDate: Function = helper.formatDate;

    chance: chance;

    created() {
        this.refreshTable();
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
        .then((response: AxiosResponse) => { })
        .catch(e => {
                console.log(e);
        });
    }

    onResetTaskClick(dataTask: DataTask) {
        HTTP.post('DataTask/ResetTaskStatus/' + dataTask.DataTaskId)
        .then((response: AxiosResponse) => { })
        .catch(e => { });
    }
    
    onExecGroupClick(dataTaskGroup: IDataTaskGroup) {
        HTTP.post('Scheduler/ExecuteTaskGroup/' + dataTaskGroup.dataTaskGroupId)
            .then((response: AxiosResponse) => { })
            .catch(e => {
                console.log(e);
            });
    }

    refreshTable() {
        this.$store.dispatch('getDataTasks');
    }

    onRefreshTableClick() {
        this.refreshTable();
    }

    onEditTaskClick(dataTask: DataTask) {
        this.currentTask = dataTask;
        this.$nextTick(() => {
            this.$store.commit('dataTaskDialogVisible', true);
        });
    }

    onEditGroupClick(dataTaskGroup: DataTaskGroup) {
        this.$store.commit('editDataTaskGroup', {
            currentGroup: dataTaskGroup
        });
    }

    onDeleteTaskClick(dataTask: DataTask) {
        HTTP.delete('DataTask/Delete/' + dataTask.DataTaskId)
        .then((response: AxiosResponse) => { })
        .catch(e => {
            console.log(e);
        });
    }

    closeExecuteTaskLocaly(e) {
    }

    closeEditTask(e) {
        this.currentTask = new DataTask();
        this.$store.commit('dataTaskDialogVisible', false);
    }

    closeEditGroup(dataTaskGroup?: DataTaskGroup) {
        if (dataTaskGroup) {
        }
        this.currentGroup = new DataTaskGroup();
    }

    onFilterChange(e) {
    }

    onDeleteGroupClick(dataTaskGroup: DataTaskGroup) {
        HTTP.delete('DataTaskGroup/Delete/' + dataTaskGroup.DataTaskGroupId)
            .then((response: AxiosResponse) => { })
            .catch(e => { });
    }

    onDeleteTask(dataTask: DataTask) {
        this.confirmationMessage = 'Do you want to Remove \'' + dataTask.DisplayName + '\' Task?';
        this.confirmationCBFunc = () => {
            this.onDeleteTaskClick(dataTask);
        };
        this.showConfirmation = true;
    }

    onDeleteGroup(dataTaskGroup: DataTaskGroup) {
        this.confirmationMessage = 'Do you want to Remove \'' + dataTaskGroup.Name + '\' Group?';
        this.confirmationCBFunc = () => {
            this.onDeleteGroupClick(dataTaskGroup);
        };
        this.showConfirmation = true;
    }

    cronHumanity(cron: string): string {
        return cronstrue.toString(cron.toUpperCase());
    }

    isTaskRunning(task: IDataTask): boolean {
        return this.getTaskStatus(task) === TaskStatusEnum.Running;
    }

    isGroupRunning(group: IDataTaskGroup): boolean {
        return this.getGroupStatus(group) === TaskStatusEnum.Running;
    }

    getTaskStatus(dataTask: IDataTask): TaskStatusEnum {
        return dataTask.status;
    }

    getGroupStatus(dataTaskGroup: IDataTaskGroup): TaskStatusEnum {

        let status: TaskStatusEnum = TaskStatusEnum.NotStarted;
        let tasks: IDataTask[] = dataTaskGroup.dataTaskList;

        if (_.every(tasks, (task: IDataTask) => task.status === TaskStatusEnum.Successful))
            return TaskStatusEnum.Successful;

        if (_.some(tasks, (task: IDataTask) => task.status === TaskStatusEnum.Running))
            return TaskStatusEnum.Running;

        if (_.some(tasks, (task: IDataTask) => task.status === TaskStatusEnum.Error))
            return TaskStatusEnum.Error;

        return status;
    }

    getStatusColor(status: TaskStatusEnum): string {
        switch (status) {
            case (TaskStatusEnum.Error):
                return 'red--text text--accent-3';
            case (TaskStatusEnum.Successful):
                return 'teal--text text--accent-3';
            case (TaskStatusEnum.Running):
                return 'blue--text text--accent-3';
            default:
                return 'grey--text text--darken-2';
        }        
    }

    taskGroupStatus(group: IDataTaskGroup): {
        total: number,
        error: number,
        isRunning: number
    } {
        console.log(group);
        let dataTasks: IDataTask[] = group.dataTaskList || [];
        return {
            total: dataTasks.length,
            error: _.filter(dataTasks, dataTask => dataTask.status === TaskStatusEnum.Error).length,
            isRunning: _.filter(dataTasks, dataTask => dataTask.status === TaskStatusEnum.Running).length,
        };
    }

    changeOrder(dataTasks: IDataTask[], index1: number, index2: number): void {

        let i = 0;

        _.forEach(dataTasks, dataTask => {
            dataTasks[i].executionOrder = (i === index1) ? index2 : (i === (index2)) ? index1 : i;
            i++;
        });

        HTTP.put('DataTask/UpdateArray', dataTasks);

    }

    orderDataTasks(dataTasks: IDataTask[]): IDataTask[] {
        return _.sortBy(dataTasks, dataTask => dataTask.executionOrder);
    }
}