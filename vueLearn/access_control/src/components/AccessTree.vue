<template>
  <div class="tree-area">
    <el-form :disabled="isView">
      <el-tree
        :data="treeData"
        icon-class="el-icon-arrow-right"
        :highlight-current="false"
        node-key="id"
        :expand-on-click-node="false">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>
          <!-- 如果节点有children，认为是页面，显示选择框 -->
          <el-select class="tree-select" placeholder="请选择" size="mini" 
            v-model="treeSelectData[data.id]"
            v-if="data.children && data.children.length > 0"
            @change="val => handleTreeSelectChanged(val, data.id)">
            <el-option
              v-for="item in treeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <!-- 如果节点没有children，认为是页面上的按钮权限，显示勾选框-->
          <el-checkbox  class="tree-checkbox" :true-label="data.id" :false-label="''" 
            v-model="treeSelectData[data.id]" :disabled="disabledCheckbox(data.id)"
            @change="val => handleTreeCheckBoxChanged(val, data.id)"
            v-else>
          </el-checkbox>
          </span>
        </span>
      </el-tree>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "accessTree",
    props: {
      treeSelectData: {
        type: Object,
        default: function () {
          return {}
        },
        required: true
      }
    },
    data() {
      return {
        isView: false,
        treeData: [],        // 绘制tree的数据
        treeAccessData: {},  // tree页面元素权限数据
        allAccessNum: 0,
        treeOptions: [
          {value: 'total', label: '完全'},
          {value: 'read', label: '只读'},
          {value: 'part', label: '部分'},
          {value: 'none', label: '没有'}
        ]
      }
    },
    methods: {
      // 获取绘制tree的数据
      async getRenderTreeData() {
        let res = await this.$tools.$getJson('/mock/treeData');
        console.log('获取access_tree.json数据 >> ', JSON.stringify(res.data));
        this.treeData = res.data;
        let { configAccessList, allAccessNum } = this.$tools.getAllPagesAccess(res.data);
        this.treeAccessData = configAccessList;
        this.allAccessNum = allAccessNum;
        this.$emit('sendData', { allAccessNum: this.allAccessNum });
      },
      // 处理树下拉框选择
      handleTreeSelectChanged(val, nodeId) {
        this.$tools.updateAccessBySelect(this, nodeId);
      },
      // 处理checkbox勾选
      handleTreeCheckBoxChanged(val, nodeId) {
        this.$tools.updateAccessByCheckbox(this, nodeId);
      },
      // 置灰checkbox
      disabledCheckbox(nodeId) {
        let diabled = false
        let accessNode = this.treeAccessData.find(item => item.id === nodeId);
        let parentNodeId = accessNode && accessNode.parentIds && accessNode.parentIds[0];
        if(this.treeSelectData[parentNodeId]) {
          diabled = (this.treeSelectData[parentNodeId] !== 'part');
        } else {
          diabled = false
        }
        return diabled;
      }
    },
    mounted () {
      //获取JSON数据
      this.getRenderTreeData();
    }
  }
</script>

<style lang="scss" scoped>
.tree-area {
  padding: 20px;
  .tree-select {
    position: relative;
    top: -3px;
    margin-left: 5px;
  }
  .tree-checkbox {
    position: relative;
    top: -2px;
    margin-left: 5px;
  }
  .custom-tree-node {
    width: 100%;
    text-align: left;
    font-size: 20px;
  }
}
</style>