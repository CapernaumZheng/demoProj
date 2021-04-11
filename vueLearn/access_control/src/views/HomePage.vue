<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col :span="8" class="btns-area">
        <el-button type="primary" @click="handleInit">初始化</el-button>
        <el-button type="success" @click="handleSave">保存</el-button>
        <el-button type="info" @click="handleView">查看</el-button>
      </el-col>
      <el-col :span="16" class="btns-area">
        <p>初始化：清空树的状态（相当于未配置过，新增页面）</p>
        <p>保存：保存树的状态（保存在本地，刷新页面也不会丢失状态，相当于编辑页面）</p>
        <p>查看：置灰可操作性项（相当于查看页面）</p>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <access-tree ref="tree" :treeSelectData="treeSelectData" @sendData="receiveData"></access-tree>
      </el-col>
      <el-col :span="12">
        <h5>所有权限数：{{allAccessNum}}</h5>
        <h5>树的状态信息：</h5>
        {{treeSelectData}}
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
      treeSelectData: {},
      allAccessNum: 0
    }
  },
  computed: {
  },
  methods: {
    handleInit() {
      this.treeSelectData = {};
      this.$refs['tree'].isView = false;
      this.handleSave();
      this.handleSearch();
    },
    async handleSave() {
      let res = await this.$tools.$getJson('/mock/saveData', this.treeSelectData);
      this.$message({
        showClose: true,
        message: res.data.message,
        type: 'success'
      });
      this.handleSearch();
    },
    handleView() {
      this.$refs['tree'].isView = true;
    },
    async handleSearch() {
       let res = await this.$tools.$getJson('/mock/queryData', this.treeSelectData);
       this.treeSelectData = res.data
    },
    receiveData({ allAccessNum }) {
      this.allAccessNum = allAccessNum;
    }
  },
  mounted () {
    this.handleSearch()
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
