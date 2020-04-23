import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './index.css';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';
import userMessage from './assets/userMessage.css';

Vue.use(ElementUI, axios);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  userMessage,
  axios,
  render: (h) => h(App),
}).$mount('#app');
