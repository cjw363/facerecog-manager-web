<template>
  <div class="box">
    <el-form>
      <el-form-item>
        <el-row>
          <div style="float: left">
            <el-select v-model="selectGroupModel" clearable placeholder="请选择部门" size="small" @change="changeSelectGroup">
              <el-option
                v-for="item in person.group_list"
                :key="item.group_id"
                :label="item.group_name"
                :value="item.group_id">
              </el-option>
            </el-select>
            <el-button type="primary" icon="el-icon-plus" @click="openDialogAddDevice" size="small">添加</el-button>
          </div>

          <div style="float: right">
            <el-input style="width: 200px;" size="small" placeholder="请输入搜索内容"
                      v-model="keyword"></el-input>
            <el-button type="primary" size="small" @click="searchGrantDeviceList">搜索</el-button>
          </div>
        </el-row>
      </el-form-item>
    </el-form>

    <template>
      <el-table :data="tableData" style="width: 100%" stripe>
        <el-table-column prop="grant_id" label="授权ID" min-width="10%">
        </el-table-column>
        <el-table-column prop="device_id" label="设备ID" min-width="10%">
        </el-table-column>
        <el-table-column prop="device_name" label="设备名" min-width="15%">
        </el-table-column>
        <el-table-column prop="sync_status" label="同步状态" min-width="15%">
          <template slot-scope="scope">
            <span v-if="scope.row.sync_status===0">未同步</span>
            <span v-if="scope.row.sync_status===1">同步成功</span>
            <span v-if="scope.row.sync_status===2">下载失败</span>
            <span v-if="scope.row.sync_status===3">图片失败</span>
            <span v-if="scope.row.sync_status===4">特征值失败</span>
            <span v-if="scope.row.sync_status===5">其他失败</span>
          </template>
        </el-table-column>
        <el-table-column prop="pass_number" label="通行次数" min-width="15%">
          <template slot-scope="scope">
            <span v-if="scope.row.pass_number===9999999999">无限次数</span>
            <span v-else>{{scope.row.pass_number}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="pass_start_time" label="通行时段" min-width="30%">
          <template slot-scope="scope">
            <span v-if="scope.row.pass_start_time.indexOf('2286')===0||scope.row.pass_end_time.indexOf('2286')===0">无限时段</span>
            <span v-if="scope.row.pass_start_time.indexOf('2286')!==0">{{scope.row.pass_start_time|formatDate}} - {{scope.row.pass_end_time|formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="20%">
          <template slot-scope="scope">
            <el-button type="success" size="small" @click="openDialogUpdateGrant(scope.row)"> 修改</el-button>
            <el-button type="danger" size="small" @click="banGrantDevice(scope)">禁止</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <template>
      <div class="block">
        <el-pagination ref="pagination"
                       @size-change="handleChange"
                       @current-change="handleChange"
                       :current-page.sync="currentPage"
                       :page-size.sync="pageSize"
                       :page-sizes="pageSizes"
                       prev-text="上一页"
                       next-text="下一页"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="tableTotal">
        </el-pagination>
      </div>
    </template>

    <DialogAddDevice :person="person" ref="refDialogAddDevice"/>
  </div>
</template>

<script>
  import DialogAddDevice from '../dialog/DialogAddDevice'

  export default {
    name: "PersonGrantDevice",
    components: {
      DialogAddDevice
    },
    props: {
      person: {}
    },
    data() {
      return {
        tableData: [],
        currentPage: 1,
        pageSizes: [5, 10, 20],
        pageSize: 10,
        tableTotal: 0,
        selectGroupModel: '',
        keyword: '',
      }
    },
    methods: {
      get(data = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        person_id: this.person.person_id
      }) {
        this.$get('/person/access_device_list', data).then(result => {
          this.tableData = result.data.list;
          this.tableTotal = result.data.total;
        })
      },
      handleChange() {
        this.get()
      },
      changeSelectGroup(value) {
        this.get({
          group_id: value,
          pageNum: 1,
          pageSize: this.pageSize,
          person_id: this.person.person_id
        })
      },
      searchGrantDeviceList() {
        this.get({
          pageNum: 1,
          pageSize: this.pageSize,
          keyword: this.keyword,
          person_id: this.person.person_id
        })
      },
      openDialogAddDevice() {
        this.$refs.refDialogAddDevice.changeDialogAddDevice()
      },
      openDialogUpdateGrant() {

      },
      banGrantDevice() {

      }
    },
    created() {
      this.get()
    },
    watch: {
      "person": function () {
        this.get()
      }
    }
  }
</script>

<style scoped>

</style>
