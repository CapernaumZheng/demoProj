import View from './krouter-view'
import Link from './krouter-link'
// 1. 实现插件，挂载$router
let Vue
class kVueRouter {
  constructor (options) {
    this.$options = options
    // 需要创建响应式的current属性,路径变化需要重新渲染
    Vue.util.defineReactive(this, 'current', '/')
    // this.current = '/'
    // 监控url变化
    window.addEventListener('hashchange', this.onHashChange.bind(this))
    // 监听load，用户刷新页面
    window.addEventListener('load', this.onHashChange.bind(this))
    // 创建一个路由的映射表
    this.routeMap = {}
    options.routes.forEach(route => {
      this.routeMap[route.path] = route
    })
  }
  onHashChange () {
    console.log(window.location.hash)
    this.current = window.location.hash.slice(1)
  }
}
kVueRouter.install = function (_Vue) {
  // 保存构造函数，在kVueRouter里面使用
  Vue = _Vue
  // 挂载$router
  // 怎么获取根vue实例中的router选项
  Vue.mixin({
    beforeCreate () {
      // 确保根vue实例的时候才执行
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }
      console.log('kVueRouter :>> ', this)
    }
  })
  // 任务2:实现两个全局组件router-link和router-view
  Vue.component('router-link', Link)
  Vue.component('router-view', View)
}
export default kVueRouter
