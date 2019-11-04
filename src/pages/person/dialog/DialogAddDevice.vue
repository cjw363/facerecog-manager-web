<template>
  <el-dialog title="添加设备" :visible.sync="visible" width="500px">
    <el-tree
      style="background-color: white;max-height: 300px;overflow: auto;"
      :data="items"
      :props="defaultProps"
      node-key="device_id"
      show-checkbox
      ref="tree"></el-tree>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="onClickAddGrantDevice">添加</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: "DialogAddDevice",
    props: {
      person: {}
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
    methods: {
      onClickAddGrantDevice() {
        let device_ids = this.$refs.tree.getCheckedKeys();
        device_ids = this.$utils.removeArrMinusOne(device_ids).toString();

        let pass_number = 9999999999;
        let pass_start_time = this.$utils.stampToDate(9999999999);
        let pass_end_time = this.$utils.stampToDate(9999999999);

        this.$post('/grant/add',{
          person_ids: this.person.person_id,
          device_ids: device_ids,
          pass_number: pass_number,
          pass_start_time: pass_start_time,
          pass_end_time: pass_end_time
        }).then(result=>{
          this.$message.success(result.message)
          this.changeDialogAddDeviceVs()
          this.$parent.get();
        })
      },
      changeDialogAddDeviceVs() {
        this.visible = !this.visible
      }
    },
    created() {
      this.$get('/device/group_device_list', {
        person_id: this.person.person_id,
      }).then(result => {
        result.data.list.forEach((item, i, arr) => {
          this.items[i] = {
            device_id: -i,
            device_name: item.group_name,
            children: item.device_list
          }
        })
      })
    }
  }
</script>

<style scoped>

</style>
