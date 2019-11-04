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
      <el-button @click="visible=false">取消</el-button>
      <el-button type="primary" @click="onClickAddGrantPerson">添加</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import Message from '@/components/messages';

  export default {
    name: "DialogPersonList",
    props: {
      device: {
        device_sn: '',
        device_id: '',
      }
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
      onClickAddGrantPerson() {
        let person_ids = this.$refs.tree.getCheckedKeys();
        person_ids = this.$utils.removeArrMinusOne(person_ids).toString();

        let pass_number = 9999999999;
        let pass_start_time = this.$utils.stampToDate(9999999999);
        let pass_end_time = this.$utils.stampToDate(9999999999);

        this.$post('/grant/add', {
          person_ids: person_ids,
          device_ids: this.device.device_id,
          pass_number: pass_number,
          pass_start_time: pass_start_time,
          pass_end_time: pass_end_time
        }).then(result => {
          Message.success(result.message)
          this.visible = false
          this.$parent.get();
        })
      },
      openDialogAddPerson() {
        this.$get('/person/group_person_list', {
          device_sn: this.device.device_sn
        }).then(result => {
          let array = [];
          result.data.list.forEach((item, i, arr) => {
            array[i] = {
              person_id: -i,
              person_name: item.group_name,
              children: item.person_list
            }
          })
          this.items = array
          this.visible = true
        })
      }
    },
  }
</script>

<style scoped>

</style>
