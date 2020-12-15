<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
export default {
  provide () {
    return {
      form: this
    }
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {
    validate (cb) {
      // 获取所有孩子KFormItem
      // 过滤出有prop的孩子
      const tasks = this.$children
        .filter(item => item.prop)
        .map(item => item.validate())

      // 统一处理所有Promise结果
      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false))
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
