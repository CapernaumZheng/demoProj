import Vue from 'vue'
import App from './App.vue'
import router from './router'
import create from './views/day9/utils/create'

Vue.config.productionTip = false
Vue.prototype.$create = create

const sss = 'aaa'
console.log('object', sss)
new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
