import Vue from 'vue'
import App from './App.vue'
import router from "./rouers";
import auth from "./utils/auth";

Vue.config.productionTip = false;
Vue.prototype.$auth = auth

new Vue({
  render: h => h(App),
  router,
}).$mount('#app');
