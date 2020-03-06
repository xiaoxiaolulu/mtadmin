import Vue from 'vue'
import App from './App.vue'
import router from "./rouers";
import auth from "./utils/auth";
import http from './utils/http';
import loading from "./utils/loading"


Vue.config.productionTip = false;
Vue.prototype.$auth = auth;
Vue.prototype.$http = http;
Vue.prototype.$loading = loading;

new Vue({
  render: h => h(App),
  router,
}).$mount('#app');
