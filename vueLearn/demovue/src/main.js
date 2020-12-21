import Vue from 'vue'
import App from './App.vue'
// import router from './router';
// 自己实现vue-router
import router from './krouter'
// import store from './store'
//  自己实现vuex
import store from './kstore'
import create from './views/day9/utils/create'

Vue.config.productionTip = false

// Vue.prototype.$create = create
Vue.use(create)

new Vue({
  router, // 使全局可使用
  store,
  render: h => h(App)
}).$mount('#app')
