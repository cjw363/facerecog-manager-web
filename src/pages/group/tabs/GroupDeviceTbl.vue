<template>
  <div>
    <el-form>
      <el-form-item>
        <el-button type="primary" icon="el-icon-plus" @click="openDialogAddDevice" size="small">添加</el-button>
      </el-form-item>
    </el-form>
    <template>
      <el-table :data="tableData2" style="width: 100%" stripe>
        <el-table-column prop="device_id" label="设备ID">
        </el-table-column>
        <el-table-column prop="device_name" label="设备名">
        </el-table-column>
        <el-table-column prop="device_sn" label="设备序列号">
        </el-table-column>
        <el-table-column prop="online" label="在线状态">
          <template slot-scope="scope">
            <span v-if="scope.row.online===1">在线</span>
            <span v-if="scope.row.online===0">离线</span>
          </template>
        </el-table-column>
        <el-table-column label="进组时间">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.add_group_time|formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="danger" @click="deleteGroupDevice(scope.row)">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <template>
      <div class="block">
        <el-pagination ref="pagination2"
                       @size-change="handleChange2"
                       @current-change="handleChange2"
                       :current-page.sync="currentPage2"
                       :page-size.sync="pageSize2"
                       :page-sizes="pageSizes2"
                       prev-text="上一页"
                       next-text="下一页"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="total2">
        </el-pagination>
      </div>
    </template>
    <DialogGroupAddDevice :group="group" ref="refDialogGroupAddDevice"/>
  </div>
</template>

<script>
  import DialogGroupAddDevice from '../dialog/DialogGroupAddDevice'

  export default {
    name: "GroupDeviceTbl",
    components: {
      DialogGroupAddDevice
    },
    props: {
      group: {}
    },
    data() {
      return {
        tableData2: [],
        currentPage2: 1,
        pageSizes2: [5, 10, 20],
        pageSize2: 10,
        total2: 0
        ,
      }
    },
    methods: {
      openDialogAddDevice() {
        this.$refs.refDialogGroupAddDevice.openDialogGroupAddDevice()
      },
      deleteGroupDevice(device) {
        this.$post('/group/delete_device', {
          group_id: this.group.group_id,
          device_id: device.device_id
        }).then(result => {
          this.$message.success(result.message)
          this.$utils.arrayRemoveObj(this.tableData2, device)
          this.total2--

          this.updateGroupGrantData()
        })
      },
      handleChange2() {
        this.get()
      },
      get(data = {
        pageNum: this.currentPage2,
        pageSize: this.pageSize2,
        group_id: this.group.group_id
      }) {
        this.$get('/device/list_by_group', data).then(result => {
          this.tableData2 = result.data.list;
          this.total2 = result.data.total;
        })
      },
      updateGroupGrantData(){
        this.$emit('updateGroupGrantData')
      }
    },
    watch: {
      "group": function () {
        this.get()
      }
    }
  }
</script>

<style scoped>

</style>
