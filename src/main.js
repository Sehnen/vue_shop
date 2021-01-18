import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
//导入样式
import './assets/css/global.css'
//导入字体样式
import './assets/fonts/iconfont.css'
//导入axios
import axios from "axios"
//挂到Vue原型上面，每个组件都可以进行访问
Vue.prototype.$http=axios
//设置根路径
axios.defaults.baseURL='http://timemeetyou.com:8889/api/private/v1/'
//设置拦截器
axios.interceptors.request.use(config=>{
  config.headers.Authorization=window.sessionStorage.getItem('token')
  return config
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
