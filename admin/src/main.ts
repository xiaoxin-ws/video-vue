import Vue from 'vue'
import App from './App.vue'

import './plugins/element'

// 引入 vue-ele-form
import EleForm from 'vue-ele-form'

import Avue from '@smallwei/avue'
import '@smallwei/avue/lib/index.css'

import router from './router'
import axios from 'axios'
// 注册 vue-ele-form
Vue.use(EleForm)
Vue.use(Avue);
Vue.config.productionTip = false


const http =axios.create({
  baseURL:process.env.VUE_APP_API_URL
})

Vue.prototype.$http = http
Vue.prototype.$httpajax = http
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

