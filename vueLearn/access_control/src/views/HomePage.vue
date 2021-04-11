<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col :span="8" class="btns-area">
        <el-button type="primary">初始化</el-button>
        <el-button type="success">保存</el-button>
        <el-button type="info">查看</el-button>
      </el-col>
      <el-col :span="16" class="btns-area">
        <p>初始化：清空树的状态（相当于未配置过，新增页面）</p>
        <p>保存：保存树的状态（保存在本地，刷新页面也不会丢失状态，相当于编辑页面）</p>
        <p>查看：置灰可操作性项（相当于查看页面）</p>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <access-tree ref="tree"></access-tree>
      </el-col>
      <el-col :span="12">
        <h5>树的状态信息：</h5>
        {{treeStatusData}}
      </el-col>
    </el-row>
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
      treeStatusData: {}
    }
  },
  methods: {
  },
  mounted () {
    // 渲染时，获取树组件的状态数据
    this.treeStatusData = this.$refs['tree'].treeSelectData
  }
}
</script>
<style lang="scss" scoped>
p {
  margin: 0;
}
.btns-area {
  text-align: left;
}
</style>
