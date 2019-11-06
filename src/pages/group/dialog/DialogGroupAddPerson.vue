<template>
  <el-dialog title="添加人员" :visible.sync="visible" width="500px">
    <el-tree
      style="background-color: white;max-height: 300px;overflow: auto;"
      :data="items"
      :props="defaultProps"
      node-key="person_id"
      show-checkbox
      :default-expanded-keys="[-1]"
      ref="tree"></el-tree>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="onClickGroupAddPerson">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: "DialogGroupAddPerson",
    props: {
      group: {}
    },
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
      onClickGroupAddPerson() {
        let person_ids = this.$refs.tree.getCheckedKeys().join(",");

        this.$post('/group/add_person', {
          person_ids: person_ids,
          group_id: this.group.group_id
        }).then(result => {
          this.$message.success(result.message)
          this.visible = false

          this.$parent.get()
          this.$parent.updateGroupGrantData()
        })
      },
      openDialogGroupAddPerson() {
        this.$get('/person/list_group_unselected', {
          group_id: this.group.group_id
        }).then(result => {
          this.items[0].children = result.data
          this.visible = true
        })
      }
    }
  }
</script>

<style scoped>

</style>
