import Vue from 'vue'
import App from './App'
import router from './router'

var echarts = require('echarts')
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.prototype.$echarts = echarts
// 将自动注册所有组件为全局组件
import dataV from '@jiaminghi/data-view'



Vue.use(dataV)
Vue.use(Antd)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
