<template>
    <div>
        <h3>我是父组件-传参部分</h3>
        <p>从child1传递过来的值：{{child1Val}}</p>
        <p>从child2传递过来的值：{{child2Val}}</p>
        <div>
            <p>直接通过$children获取到子组件的数据</p>
            <button @click="getChildrenVals">获取子组件input值</button>
        </div>
        <!-- 组件通信 -->
        <child1 :msg="msg" @childTrans="fatherOn"></child1>
        <!-- 向子组件传递了foo -->
        <child2 class="test" foo="来自父组件的foo" @click="listenersFromChild"></child2>
        <br>
        <br>
        <br>
        <hr>
    </div>
</template>

<script>
import child1 from './child1.vue'
import child2 from './child2.vue'
import Bus from './bus'
export default {
  name: 'day9',
  provide () {
    return {
      toSon: 'Be strong'
    }
  },
  components: {
    child1,
    child2
  },
  data () {
    return {
      msg: '来自父组件的信息',
      child1Val: '', // 子组件1参数
      child2Val: '' // 子组件2参数
    }
  },
  mounted () {
    Bus.$on('childTrans', this.fatherGet)
  },
  methods: {
    fatherOn (val) {
      this.child1Val = val
    },
    fatherGet (val) {
      this.child2Val = val
    },
    getChildrenVals () {
      alert(`组件1的值为：${this.$children[0].inVal}，组件2的值为：${this.$children[1].childVal}`)
    },
    listenersFromChild () {
      console.log('子组件点击 :>> ', this)
    }
  }
}
</script>

<style lang="scss" scoped>
.father {
    display: flex;
    flex-direction: column;
}
</style>
