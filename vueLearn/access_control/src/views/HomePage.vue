<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col :span="6"><el-button type="primary">初始化</el-button></el-col>
      <el-col :span="6"><el-button type="success">成功按钮</el-button></el-col>
      <el-col :span="6"><el-button type="info">信息按钮</el-button></el-col>
      <el-col :span="6"><el-button type="warning">警告按钮</el-button></el-col>
    </el-row>
    <access-tree></access-tree>
  </div>
</template>

<script>
import AccessTree from '@/components/AccessTree'
export default {
  name: 'Home',
  components: {
    AccessTree
  },
  data() {
    return {
      treeData: []
    }
  },
  methods: {

  },
  mounted () {

  },
}
</script>
<style lang="less" scoped>

</style>
