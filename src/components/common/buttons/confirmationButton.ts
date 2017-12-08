import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
    template: require('./confirmationButton.html')
})
export class ConfirmationButtonComponent extends Vue {

    dialogVisible: boolean = false;

    @Prop({default: ''})
    title: String;

    @Prop({default: ''})
    iconName: String;

    @Prop({default: 'Save'})
    btnName: String;

    @Prop({default: 'Yes'})
    yesBtnName: String;

    @Prop({default: 'No'})
    noBtnName: String;

    @Prop({default: 'Question'})
    dialogTitle: String;

    @Prop({default: 'Message'})
    dialogMessage: String;

    get iconVisible(): boolean {
        return this.iconName !== '';
    }

    onOkClicked(e) {
        this.$emit('onOkClicked');
        this.dialogVisible = false;
    }

}    