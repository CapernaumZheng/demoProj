<template>
    <div>
        <!-- label -->
        <label v-if="label" for="">{{label}}</label>
        <slot></slot>
        <!-- 校验信息展示 -->
        <p v-if="error">{{error}}</p>

        <!-- 校验规则
        <p>{{form.rules}}</p> -->
    </div>
</template>

<script>
import Schema from 'async-validator'
export default {
  inject: ['form'],
  props: {
    label: {
      type: String,
      default: ''
    },
    prop: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      error: '' // error是空说明校验通过
    }
  },
  mounted () {
    this.$on('validate', () => {
      this.validate()
    })
  },
  methods: {
    validate () {
      // 规则
      const rules = this.form.rules[this.prop]

      // 当前值
      const value = this.form.model[this.prop]

      // 校验描述对象
      const desc = {
        [this.prop]: rules
      }
      // 创建schema实例
      const schema = new Schema(desc)
      return schema.validate({ [this.prop]: value }, errors => {
        if (errors) {
          this.error = errors[0].message
        } else {
          // 校验通过
          this.error = ''
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
