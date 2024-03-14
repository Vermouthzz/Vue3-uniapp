import App from './App'
// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()

// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'

// #ifdef APP
import 'vant/lib/index.css'
import { ActionSheet } from 'vant';
import { Checkbox, CheckboxGroup } from 'vant';
import { SwipeCell } from 'vant';
import { Switch } from 'vant';
import { Stepper } from 'vant';
import { Dialog } from 'vant';
import { CountDown } from 'vant';
import { Empty } from 'vant';
import { Search } from 'vant';
import { Notify } from 'vant';
import { Popup } from 'vant';
import { Rate } from 'vant';
import { SubmitBar } from 'vant';
import { Form, Field, CellGroup } from 'vant';
// #endif

import pinia from './store/index.js'

export function createApp() {
  const app = createSSRApp(App)
  app.use(pinia)
  // #ifdef APP
  app.use(Popup);
  app.use(Form);
  app.use(Notify);
  app.use(Field);
  app.use(CellGroup);
  app.use(SubmitBar);
  app.use(Rate);
  app.use(ActionSheet);
  app.use(CountDown);
  app.use(Search);
  app.use(Empty);
  app.use(Checkbox);
  app.use(SwipeCell);
  app.use(Switch);
  app.use(Stepper);
  app.use(Dialog);
  // #endif
  return {
    app,
	pinia
  }
}
// #endif