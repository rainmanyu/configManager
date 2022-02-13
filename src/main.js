import Vue from 'vue';
import App from './App.vue';

import 'element-ui/lib/theme-chalk/index.css';
import './style/index.css';
import axios from "axios";

import ElementUI from 'element-ui';


Vue.config.productionTip = false
Vue.use(ElementUI);


Vue.prototype.$axios=axios;
Vue.prototype.$bus=new Vue();

new Vue({
  render: h => h(App)
}).$mount('#app')
