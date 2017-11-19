import * as Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

import { IEditViewElement } from '../../../interfaces/';

import $ from 'jquery';

@Component({
    template: require('./boolEditViewElement.html')
})

export class BoolEditViewElementComponent extends Vue {

    editedValue: string = '';

	mut: boolean = false;

    @Prop() element: IEditViewElement;

    get spanValue(): string {
        this.mut; return this.element.getValue();
    }

	mounted(){
		console.log('mounted')
		this.editedValue = this.element.getValue();
	}

    onValueClick() {
//        this.isEdit = true;
		console.log('aaaaa')

        //this.editedValue = this.element.getValue();
        let nameEl: Vue = <Vue>this.$refs['bool-edited-value-input'];
        this.$nextTick(() => {
           // $(nameEl.$el).click();
        });
    }

    onValueChanged() {
		console.log('ddddd')
        this.mut = !this.mut;
        this.element.setValue(this.editedValue);
    }
}