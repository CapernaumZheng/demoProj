import Vue from 'vue'
// 发布-订阅模式
// 事件的派发者和监听者通常是一个

// vue总线
const Bus = new Vue()

// 自定义总线
class Bus2 {
  constructor () {
    this.callbacks = {}
  }

  $on (name, fn) {
    this.callbacks[name] = this.callbacks[name] || []
    this.callbacks[name].push(fn)
  }

  $emit (name, args) {
    if (this.callbacks[name]) {
      this.callbacks[name].forEach(cb => cb(args))
    }
  }
}

Vue.prototype.$bus = new Bus2()

export default Bus
