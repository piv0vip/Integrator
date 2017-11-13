import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import { IContent } from '../../../interfaces'

@Component({
    template: require('./contentView.html'),
})

export class ContentViewComponent extends Vue {

    dialogShow: boolean = false;

    @Prop()
    content: IContent
}
