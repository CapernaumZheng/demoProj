// router-link组件
export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  // 在这不能写template渲染，因为是运行时环境，没有编译器，无法编译
  // template: '<a>scd<a>'
  render (h) {
    // h(tag, data, children)
    console.log('router-link slots =>', this.$slots)
    return h('a', { attrs: { href: '#' + this.to }}, this.$slots.default)
    // 使用jsx语法 也可以实现
    // return <a href={'#' + this.to}>{ this.$slots.default }</a>
  }
}
