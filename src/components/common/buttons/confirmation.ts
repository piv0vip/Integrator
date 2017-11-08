import * as Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

@Component({
    template: require('./confirmation.html')
})

export class ConfirmationComponent extends Vue {

    dialogIsVisible: boolean = false;

    @Prop({default: false})
    dialogVisible: boolean;

    @Prop({default: 'Question'})
    dialogTitle: String;

    @Prop({default: 'Message'})
    dialogMessage: String;

    @Watch('dialogVisible')
    onDialogVisibleChanged (value: boolean) {
        this.dialogIsVisible = value;
    }

    onOkClicked(e) {
        this.$emit('onOkClicked');
        this.emitCloseClicked();
    }

    onCloseClicked(e) {
        this.$emit('onCancelClicked');
        this.emitCloseClicked();
    }

    emitCloseClicked() { 
        this.$emit('onCloseDialog');
    }
}    