<template>
  <el-dialog title="添加设备" :visible.sync="visible" width="500px">
    <el-tree
      style="background-color: white;max-height: 300px;overflow: auto;"
      :data="items"
      :props="defaultProps"
      node-key="device_id"
      show-checkbox
      :default-expanded-keys="[-1]"
      ref="tree"></el-tree>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="onClickGroupAddDevice">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: "DialogGroupAddDevice",
    props: {
      group: {}
    },
    data() {
      return {
        items: [{
          device_id: -1,
          device_name: '设备列表',
          children: []
        }],
        defaultProps: {
          children: 'children',
          label: 'device_name'
        },
        visible: false
      }
    },
    methods:{
      onClickGroupAddDevice() {
        let device_ids = this.$refs.tree.getCheckedKeys().join(",");

        this.$post('/group/add_device', {
          device_ids: device_ids,
          group_id: this.group.group_id
        }).then(result => {
          this.$message.success(result.message)
          this.visible = false

          this.$parent.get()
          this.$parent.updateGroupGrantData()
        })
      },
      openDialogGroupAddDevice(){
        this.$get('/device/list_group_unselected', {
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
