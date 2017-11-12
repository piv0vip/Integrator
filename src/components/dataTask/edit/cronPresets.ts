import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

import cronstrue from 'cronstrue';

@Component({
    template: require('./cromPresets.html'),
})

export class CronPresetsComponent extends Vue {

    cronPresetSelected: string = '* * * * *';

    @Prop({default: []})
    cronPresets: string[];

    @Prop()
    cronValue: string;

    @Watch('cronPresets')
    onCronPresetsChanged() {
        // if (this.cronPresets.length > 0) { this.cronPresetSelected = this.cronPresets[0]; }
    }

    @Watch('cronValue')
    onCronValueChanged(value) {
        if (value !== this.cronPresetSelected) this.cronPresetSelected = value;
    }

    get cronPresetsList(): { value: string, text: string }[] {
        let presetArray: string[] = [].concat(this.cronPresets);
        if (this.cronPresets.findIndex((preset) => preset === this.cronPresetSelected ) === -1 && this.cronPresetSelected) presetArray.push(this.cronPresetSelected);
        return presetArray.map((preset) => {
            return {
                value: preset,
                text: cronstrue.toString(preset)
            };
        });
    }

    onUserChangeSelect(value) {
        this.$emit('change', value);
    }
}