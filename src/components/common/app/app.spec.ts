// import * as Vue from 'vue';
// import VueRouter from 'vue-router';
// import { expect } from 'chai';
// import { AppComponent } from './app';
// import Vuetify from 'vuetify';
// import { ComponentTest } from '../../../util/component-test';

// Vue.use(Vuetify);
// Vue.use(VueRouter);

// describe('App component', () => {
//   let directiveTest: ComponentTest;

//   beforeEach(() => {
//     directiveTest = new ComponentTest('<div><app></app></div>', { 'app': AppComponent });
//   });

//   it('should render correct contents', async () => {
//       debugger;
//     directiveTest.createComponent();
//     await directiveTest.execute((vm) => {
//         debugger;
//         expect(vm.$el.querySelector('div.toolbar__title').textContent).to.equal(`Scheduler console`);
//     //   expect(vm.$el.querySelector('.package').textContent).to.equal('vue-webpack-typescript');
//     //   expect(vm.$el.querySelector('.content .mode').textContent).to.equal('development mode');
//     });
//   });
// });