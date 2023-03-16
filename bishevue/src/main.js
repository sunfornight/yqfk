import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import './assets/icon_font/iconfont.css'

import echarts from 'echarts'

// 引入axios处理跨域请求
import axios from 'axios'
// 挂载axios
Vue.prototype.$http = axios
// 设置访问根路径
axios.defaults.baseURL = "http://localhost:8050"

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
