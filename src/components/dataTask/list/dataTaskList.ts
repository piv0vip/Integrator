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

    handlers: HandlerTypes = new HandlerTypes();
    handlersEnum = new CustomEnumValues();

    cronPresets: string[] = [];

    currentTask: DataTask = DataTask.createEmptyDataTask();

    showExecuteTaskLocaly: boolean = false;
    showEditTask: boolean = false;

    isBusy: boolean = false;  
    sortBy: string =  'LastStartTime';
    sortDesc: boolean = true;

    formatDate: Function = helper.formatDate;

    getEnumDescription: Function = (val) => { return this.statusEnum.getEnumValueByCode(val).getDescription(); };

    pageOptions: {text: number, value: number}[] = [{text: 5, value: 5}, {text: 10, value: 10}, {text: 15, value: 15}];

    pagedList: IPagedList = new PagedList(); 
    
    perPage: number = 5;
    totalRows: number = 0;
    currentPage: number = 1;
    filter: string = '';

    pagesCount: number = 1;

    chance: chance;

    fields: {
        key: string, 
        tdClass?: string, 
        label: string, 
        sortable?: boolean, 
        formatter?: string | Function
    }[] = 
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
        HTTP.get('DataTask/GetHandlersWithDefaultSettings')
            .then(function (response: AxiosResponse) {

                this.handlers.Parse(response.data);

                let handlers = response.data.map(function (o) {
                    return {
                        TaskHandlerName: o.taskHandlerName,
                        TaskType: o.taskType,
                        DefaultHandlerSettings: o.defaultHandlerSettings
                    };
                });
                this.handlersEnum = Enums.createHandlerEnum(handlers);
            }.bind(this))
            .catch(function (e) {
                console.log(e);
            }.bind(this));

        HTTP.get('DataTask/CrontabPresets')
            .then(function (response: AxiosResponse) {

                this.cronPresets = response.data;

            }.bind(this))
            .catch(function (e) {
                console.log(e);
            }.bind(this));

        this.statusEnum.Load([
            {code: '0', name: 'NotStarted', description: 'Not Started'},
            {code: '1', name: 'Running'},
            {code: '2', name: 'Successful'},
            {code: '3', name: 'Error'},
            {code: '4', name: 'Cancelled'}
        ]);
    }

    myProvider(ctx) {
        ctx.filter = this.filter;
        return DataTaskService.getPagedList(this.handlers, ctx)
        .then( function (response: {data: DataTask[], metadata}) {
            this.pagedList = response.metadata;
            this.pagesCount = Math.ceil(response.metadata.totalItemCount / this.perPage);
            return response.data;
        }.bind(this))
        .catch( (e) => {
            console.log(e);
            return [];
        });
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
        this.currentTask = DataTask.createNewDataTask(this.handlers);
        this.showEditTask = true;
    }

    refreshTable() {
        let ttt: any = this.$refs['dataTasksTable'];
        ttt.refresh();
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