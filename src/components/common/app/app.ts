import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { DataTask, DataTaskGroup } from '../../../models';

@Component({
    template: require('./app.html')
})

export class AppComponent extends Vue {

    drawer: boolean = false;

    get consoleMessages(): string[] { return this.$store.getters.broadcastMessages; }
    get showConsole(): boolean { return this.$store.getters.showConsole; }
    get isDisconnect(): boolean { return !this.$store.getters.connected; }

    pageOptions: { text: number, value: number }[] = [{ text: 5, value: 5 }, { text: 10, value: 10 }, { text: 15, value: 15 }];

    perPage: number = 10;
    perPageDTs: number = 10;
    perPageLogs: number = 10;

    items: {
        icon: string,
        text: string,
        'icon-alt'?: string,
        model?: boolean,
        children?: any[],
        routeTo?: string
    }[] = [
        { icon: 'gavel', text: 'Scheduling Task Configuration', routeTo: '/' },
        { icon: 'history', text: 'Entity statuses', routeTo: '/entity-statuses' },
        { icon: 'assignment', text: 'Document Transfers', routeTo: '/document-transfers' },
        { icon: 'filter_list', text: 'Logs', routeTo: '/logs' }
    ];

    get productVersion(): string {
        return this.$store.getters.productVersion;
    }

    get visibility(): string {
        return this.$store.getters.loading ? 'block' : 'none';
    }

    setShowConsole() {
        this.$store.commit('showConsole', !this.showConsole);
    }

    onRefreshTableClick() {
        this.$store.dispatch('getIDataTaskGroups');
        this.$store.dispatch('getDataTasks');
    }

    onAddDatataskClick() {
        this.$store.commit('editDataTask', {
            current: new DataTask()
        });
    }

    onAddGroupClick() {
        this.$store.commit('editDataTaskGroup', {
            current: new DataTaskGroup()
        });
    }

    get isDataTasks(): boolean {
        return this.$route['name'] && this.$route['name'] === 'dataTasks';
    }

    get isEntityStatuses(): boolean {
        return this.$route['name'] && this.$route['name'] === 'entityStatuses';
    }

    get isDTs(): boolean {
        return this.$route['name'] && this.$route['name'] === 'documentTransfers';
    }

    get isLogs(): boolean {
        return this.$route['name'] && this.$route['name'] === 'logs';
    }

    @Watch('perPage')
    onPerPageChanged(value: number) {
        this.$store.dispatch('doChangePerPage', value);
    }

    @Watch('perPageLogs')
    onPerPageLogsChanged(value: number) {
        this.$store.dispatch('doChangePerPageLog', value);
    }

    @Watch('perPageDTs')
    onPerPageDTsChanged(value: number) {
        this.$store.dispatch('doChangePerPageDT', value);
    }

    onResetEntityStatusFilter() {
        this.$store.dispatch('doResetAllFilters');
    }

    get entityStatusFilterIsDefault(): boolean {
        return this.$store.getters.filtersIsDefault;
    }

    onResetLogsFilter() {
        this.$store.dispatch('doResetAllLogsFilters');
    }

    get logsFilterIsDefault(): boolean {
        return this.$store.getters.filtersLogsIsDefault;
    }

    onResetDTsFilter() {
        this.$store.dispatch('doResetAllDTsFilters');
    }

    get documentTransfersFilterIsDefault(): boolean {
        return this.$store.getters.filtersDTsIsDefault;
    }

}