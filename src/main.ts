import * as Vue from 'vue';

import BootstrapVue from 'bootstrap-vue';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import VeeValidate, { Validator } from 'vee-validate';
import VueHighlightJS from 'vue-highlight.js';

import * as helper from './util/helper';

// import ar from 'vee-validate/dist/locale/ar';

import { AppComponent } from './components/common/';
import { DataTaskListComponent } from './components/dataTask';
import { EntityStatusListComponent } from './components/entityStatus';

import store from './store';

Validator.extend('guid', {
    getMessage: field => `Value must be in 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX' format`,
    validate: value => /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(value)
});

Validator.extend('cron', {
    getMessage: field => `Value should be in CRON format. For example '* * * * *'`,
    validate: value => helper.isCronString(value)
});

Vue.use(BootstrapVue);

Vue.use(Vuetify, {
    theme: {
        primary: '#3f51b5',
        secondary: '#b0bec5',
        accent: '#8c9eff',
        error: '#b71c1c'
    }
});

Vue.use(VueRouter);

Vue.use(VeeValidate, {
    fieldsBagName: 'formFields',
    inject: false
    // locale: 'ru'
});

Vue.use(VueHighlightJS);

import 'highlight.js/styles/xcode.css';

import 'vue-multiselect/dist/vue-multiselect.min.css';

let router = new VueRouter({
  routes: [
    { path: '/', component: DataTaskListComponent },
    { path: '/entity-statuses', component: EntityStatusListComponent },
 ]
});

new Vue({
  el: '#app-main',
  router,
  store,
  components: {
    'app': AppComponent
  }
});
