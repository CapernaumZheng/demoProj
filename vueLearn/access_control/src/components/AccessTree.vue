<template>
  <div>
    <el-tree
      :data="treeData"
      icon-class="el-icon-arrow-right"
      node-key="id"
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => append(data)">
            Append
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            Delete
          </el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
  import { $getJson } from '@/utils'
  export default {
    name: "accessTree",
    data() {
      return {
        treeData: []
      }
    },
    methods: {
      async getJsonData() {
        let res = await $getJson('/mock/treeData');
        console.log('获取access_tree.json数据 >> ', JSON.stringify(res.data));
        this.treeData = res.data;
      }
    },
    mounted () {
      //获取JSON数据
      this.getJsonData();
    }
  }
</script>

<style lang="scss" scoped>

</style>