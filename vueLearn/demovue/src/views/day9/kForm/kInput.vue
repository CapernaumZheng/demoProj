<template>
    <div class="k-input">
        <!-- 自定义属性双向绑定 :value @input -->
        <input :type="type" :value="value" @input="onInput" v-bind="$attrs">
    </div>
</template>

<script>
export default {
  inheritAttrs: false, // 设置为false，避免设置到根元素上
  props: {
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  methods: {
    onInput (e) {
      // 派发一个input事件
      this.$emit('input', e.target.value)
      // 通知父级执行校验

      // 不能使用this.$emit，因为父级是一个slot
      // this.$emit('')

      // 使用$parent会强耦合
      this.$parent.$emit('validate')
    }
  }
}
</script>

<style lang="scss" scoped>
.k-input {
    display: inline-block;
}
</style>
