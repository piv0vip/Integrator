import * as Vue from 'vue';

import BootstrapVue from 'bootstrap-vue';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import VeeValidate from 'vee-validate';

import { AppComponent } from './components/common/';
import { DataTaskListComponent } from './components/dataTask';
import { EntityStatusListComponent } from './components/entityStatus';

import { store } from './store';

Vue.use(BootstrapVue);
Vue.use(Vuetify);
Vue.use(VueRouter);
Vue.use(VeeValidate);

let router = new VueRouter({
  routes: [
    { path: '/', component: DataTaskListComponent },
    { path: '/entity-statuses', component: EntityStatusListComponent },
 ]
});

new Vue({
  el: '#app-main',
  router: router,
  store: store,
  components: {
    'app': AppComponent
  }
});
