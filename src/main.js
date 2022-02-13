import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios";
import utils from './utils/index';
import fixTooltip from './directive/fixTooltip/install';
import piButton from './components/button/install';
import piPagination from './components/pagination/install';
import piDialog from './components/dialog/install';
import piQuerybar from './components/querybar/install';
import piQuerybarItem from './components/querybarItem/install';
import inputDirective from './directive/input/install';
import './style/index.css';


Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use( fixTooltip);
Vue.use(piButton);
Vue.use(piPagination);
Vue.use(piDialog);
Vue.use(piQuerybar);
Vue.use(piQuerybarItem);
Vue.use(inputDirective)

Vue.prototype.$utils= utils;
Vue.prototype.$axios=axios;
Vue.prototype.$bus=new Vue();


new Vue({
  render: h => h(App)
}).$mount('#app')
