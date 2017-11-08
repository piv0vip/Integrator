import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import { CronPartComponent, CronSchedule } from '../';

import { DataTask } from '../../../../models/DataTask';

@Component({
    template: require('./cronStyleScheduling.html'),
    components: {
        'cron-part': CronPartComponent
    }
})

export class CronStyleSchedulingComponent extends Vue {

    @Prop()
    dataTask: DataTask;

    get cron(): CronSchedule  {
        return this.dataTask.getCronSchedule();
    }
}