import Vue from 'vue';

import BootstrapVue from 'bootstrap-vue';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import VeeValidate, { Validator } from 'vee-validate';
import VueHighlightJS from 'vue-highlightjs';

import * as helper from './util/helper';

// import ar from 'vee-validate/dist/locale/ar';

import { AppComponent } from './components/common/';
import { DataTaskListComponent } from './components/dataTask';
import { EntityStatusListComponent } from './components/entityStatus';
import { LogsListComponent } from './components/log';

// import VueDragAndDropList from 'vue-drag-and-drop-list';

import store from './store';

// Vue.use(VueDragAndDropList);

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

let router = new VueRouter({
  routes: [
      { name: 'dataTasks', path: '/', components: { default: DataTaskListComponent } },
      { name: 'entityStatuses', path: '/entity-statuses', components: { default: EntityStatusListComponent } },
      { name: 'logs', path: '/logs', components: { default: LogsListComponent } },
 ]
});

new Vue({
  el: '#app-main',
  router,
  store,
  created() {
      store.dispatch('connectToHub');
  },
  components: {
    'app': AppComponent
  }
});
