import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

const sss = 'aaa'
console.log('object', sss)
new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
