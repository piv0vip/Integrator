import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';

import * as helper from '../../../util/helper';

import cronstrue from 'cronstrue';

@Component({
    template: require('./cromPresets.html'),
})

export class CronPresetsComponent extends Vue {

    mut: boolean = false;

    cronPresetSelected: string = '* * * * *';

    @Prop()
    value: string;

    get cronPresets(): string[] {
        return this.$store.state['dataTask'].cronPresets;
    }

    @Watch('value')
    onValueChanged(value) {
        if (value !== this.cronPresetSelected) this.cronPresetSelected = value;
        this.mut = !this.mut;
    }

    @Watch('cronPresetSelected') onCronPresetSelectedChange(value) {
        this.$emit('input', value);
    }

    get cronPresetsList(): { value: string, text: string }[] {
        this.mut;
        let presetArray: string[] = [].concat(this.cronPresets);
        if (this.cronPresets.findIndex((preset) => preset === this.cronPresetSelected) === -1
            && this.cronPresetSelected
            && helper.isCronString(this.cronPresetSelected)) {
            presetArray.push(this.cronPresetSelected);
        };
        return presetArray.map((preset: string) => {
            return {
                value: preset,
                text: cronstrue.toString(preset.toUpperCase())
            };
        });
    }

}