<template>
    <div>
        <h4>孙子组件</h4>
        <!-- <p>获取来自祖先的数据：{{toSon}}</p> -->
        <!-- 设置别名 -->
        <!-- <p>获取来自祖先的数据：{{myName}}</p> -->
    </div>
</template>

<script>
export default {
  inject: ['toSon']
  // 可以设置别名
  // inject: { myName: { from: 'toSon' } }
}
</script>

<style lang="scss" scoped>

</style>
