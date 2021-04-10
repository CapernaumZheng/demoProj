<template>
  <div>
    <p>使用 scoped slot</p>
    <el-tree
      :data="treeData"
      show-checkbox
      node-key="id"
      default-expand-all
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
        let res = await $getJson(`${process.env.BASE_URL}json/access_tree.json`);
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