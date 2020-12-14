<template>
    <div class="child2">
        <h4>child2</h4>
        <!-- 使用bus总线传递参数 -->
        <div class="child2">
            <p>bus总线传递参数</p>
            <input type="text" v-model="childVal">
            <button @click="childTransmit">Vue中Bus传递到父</button>
            <button @click="childTransmit2">自定义Bus传递到兄弟</button>
        </div>
        <!-- $attrs的使用 -->
        <div class="child2">
            <p>$attrs</p>
            <p v-bind="$attrs">{{$attrs.foo}}</p>
        </div>
        <!-- $listeners的使用 -->
        <div class="child2">
            <p>$listeners</p>
            <p v-on="$listeners" style="cursor: pointer">点我触发父方法</p>
        </div>
    </div>
</template>

<script>
import Bus from './bus.js'
export default {
  data () {
    return {
      childVal: ''
    }
  },
  mounted () {
    this.$parent.$on('transByParent', val => alert(`收到来自兄弟的参数：${val}`))
  },
  methods: {
    childTransmit () {
      Bus.$emit('childTrans', this.childVal)
    },
    childTransmit2 () {
      this.$bus.$emit('transToBrother', this.childVal)
    }
  }
}
</script>

<style lang="scss" scoped>
.child2 {
    margin: 10px;
    border: 1px solid pink;
}
</style>
