import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

import { IContent } from '../../../interfaces';
import { Content } from './classes/content';


@Component({
    template: require('./contentView.html'),
})

export class ContentViewComponent extends Vue {

    dialogShow: boolean = false;

    @Prop()
    content: Content;

    @Prop()
    show: boolean;

    @Watch('show')
    onShowChange() {
        this.dialogShow = true;
    }
}
