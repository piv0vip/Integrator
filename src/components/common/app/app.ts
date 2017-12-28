import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';

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

    items: {
        icon: string,
        text: string,
        'icon-alt'?: string,
        model?: boolean,
        children?: any[],
        routeTo?: string
    }[] = [
        { icon: 'contacts', text: 'Scheduling Task Configuration', routeTo: '/' },
        { icon: 'history', text: 'Entity statuses', routeTo: '/entity-statuses' },
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
        this.$store.commit('dataTaskDialogVisible', true);
    }

    onAddGroupClick() {
        this.$store.commit('editDataTaskGroup', true);
    }

    get isDataTasks(): boolean {
        return this.$route['name'] && this.$route['name'] === 'dataTasks';
    }

    get isEntityStatuses(): boolean {
        return this.$route['name'] && this.$route['name'] === 'entityStatuses';
    }

    @Watch('perPage')
    onPerPageChanged(value: number) {
        this.$store.dispatch('doChangePerPage', value);
    }

    onResetEntityStatusFilter() {
        this.$store.dispatch('doResetAllFilters');
    }

    get entityStatusFilterIsDefault(): boolean {
        return this.$store.getters.filtersIsDefault;
    }

}