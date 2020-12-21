let Vue
class Store {
  constructor (options) {
    // 响应化处理state
    this.state = new Vue({
      data: options.state
    })
    // this._vm = new Vue({
    //     data: {
    //         // 加两个$$,Vue不做代理
    //         $$state: options.state
    //     }
    // })
    this._mutations = options.mutations
    this._actions = options.actions
    // 绑定commit、dispatch的上下文为store实例
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)
  }
  // 存取器,store.state
  // get state() {
  //     console.log('state>>>>', this._vm)
  //     return this._vm.data.$$state
  // }
  // set state(v) {
  //     console.error('不可以修改')
  // }
  // store.commit('add',1)
  // type: mutation的类型
  // payload: 载荷，是参数
  commit (type, payload) {
    // 拿到add函数
    const entry = this._mutations[type]
    if (entry) {
      entry(this.state, payload)
    }
  }
  dispatch (type, payload) {
    const entry = this._actions[type]
    if (entry) {
      entry(this, payload)
    }
  }
}
function install (_vue) {
  Vue = _vue
  Vue.mixin({
    beforeCreate () {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}
// Vuex
export default {
  Store,
  install
}
