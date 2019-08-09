<template>
  <el-dialog title="添加人员" :visible.sync="visible" width="500px">
    <el-tree
      style="background-color: white;max-height: 300px;overflow: auto;"
      :data="items"
      :props="defaultProps"
      node-key="person_id"
      show-checkbox
      ref="tree"></el-tree>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="onClickAddGrantPerson">添加</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: "DialogChangeGrant",
    data() {
      return {
        items: [{
          person_id: -1,
          person_name: '人员列表',
          children: []
        }],
        defaultProps: {
          children: 'children',
          label: 'person_name'
        },
        visible: false
      }
    },
    methods: {
      onClickAddGrantPerson() {

      }
    }
  }
</script>

<style scoped>

</style>
