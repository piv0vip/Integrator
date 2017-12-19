import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
    template: require('./app.html')
})

export class AppComponent extends Vue {
    get productVersion(): string {
        return this.$store.getters.productVersion;
    }

    get visibility(): string {
        return this.$store.getters.loading ? 'block' : 'none';
    }
}