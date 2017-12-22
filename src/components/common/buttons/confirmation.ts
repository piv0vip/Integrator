import * as Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

@Component({
    template: require('./confirmation.html')
})

export class ConfirmationComponent extends Vue {

    dialogIsVisible: boolean = false;

    @Prop({ default: false })
    value: boolean;

    @Watch('value')
    onValueChanged(value) {
        this.dialogIsVisible = value;
    }

    @Prop({default: 'Question'})
    title: String;

    @Prop({default: 'Message'})
    message: String;

    @Prop({ default: null })
    okCallBack: Function;

    onOkClicked(e) {
        if (this.okCallBack) {
            this.okCallBack();
        }
        this.$emit('onOkClicked');
        this.emitCloseClicked();
    }

    onCloseClicked(e) {
        this.$emit('onCancelClicked');
        this.emitCloseClicked();
    }

    emitCloseClicked() { 
        this.$emit('input', false);
    }
}    