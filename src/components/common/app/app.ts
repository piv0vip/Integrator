import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
    template: require('./app.html')
})

export class AppComponent extends Vue {

    drawer: boolean = false;

    get consoleMessages(): string[] { return this.$store.getters.broadcastMessages; }
    get showConsole(): boolean { return this.$store.getters.showConsole; }

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
        this.$store.commit('dataTaskGroupDialogVisible', true);
    }

    get isDataTasks(): boolean {
        return this.$route['name'] && this.$route['name'] === 'dataTasks';
    }
}