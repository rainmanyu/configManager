import Vue from 'vue';
import App from './App.vue';

import 'element-ui/lib/theme-chalk/index.css';
import './style/index.css';
import axios from "axios";
import utils from './utils/index';

import ElementUI from 'element-ui';
import piButton from './components/button/install';
import piDialog from './components/dialog/install';
import piQuerybar from './components/querybar/install';
import piQuerybarItem from './components/querybarItem/install';




Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(piButton);
Vue.use(piDialog);
Vue.use(piQuerybar);
Vue.use(piQuerybarItem);

Vue.prototype.$utils= utils;
Vue.prototype.$axios=axios;
Vue.prototype.$bus=new Vue();


new Vue({
  render: h => h(App)
}).$mount('#app')
