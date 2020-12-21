<template>
    <div class="child1">
        <h4>child1</h4>
        <!-- props接收父组件参数 -->
        <p>{{ msg }}</p>
        <!-- 子组件自定义事件传参 -->
        <div class="child1">
            <p>子组件自定义事件传参</p>
            <input type="text" v-model="inVal">
            <button @click="$emit('childTrans', inVal)">点击传递input值</button>
        </div>
        <!-- 通过$parent中介传递参数 -->
        <div class="child1">
            <p>通过父组件中介，$parent向兄弟传递参数</p>
            <button @click="tansToBrother">点击传递</button>
        </div>
        <!-- 通过provide/inject获取参数 -->
        <div class="child1">
            <grandson></grandson>
        </div>
    </div>
</template>

<script>
import grandson from './grandson.vue'
export default {
  props: {
    msg: String,
    // eslint-disable-next-line vue/require-prop-type-constructor
    default: ''
  },
  components: {
    grandson
  },
  mounted () {
    this.$bus.$on('transToBrother', this.handleBrotherTans)
  },
  data () {
    return {
      inVal: ''
    }
  },
  methods: {
    handleBrotherTans (val) {
      this.inVal = val
    },
    tansToBrother () {
      this.$parent.$emit('transByParent', this.inVal)
    }
  }
}
</script>

<style lang="scss" scoped>
.child1 {
    margin: 10px;
    border: 1px solid #333;
}
</style>
