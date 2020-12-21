// router-view 组件
export default {
  render (h) {
    // 获取path对应的Component
    // render函数使用current响应式数据，就会被收集，响应式数据变化，就会重新render
    console.log('router-view :>> ', this.$router)
    const { routeMap, current } = this.$router
    if (routeMap[current].children && routeMap[current].children.length > 0) {
      // 这里嵌套路由
      return h(null)
    } else {
      const component = routeMap[current].component || null
      return h(component)
    }
  }
}
