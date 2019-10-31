<template>
  <div class="box">
    <el-form>
      <el-form-item>
        <el-row>
          <div style="float: left">
            <el-select v-model="selectGroupModel" clearable placeholder="请选择部门" size="small" @change="changeSelectGroup">
              <el-option
                v-for="item in device.group_list"
                :key="item.group_id"
                :label="item.group_name"
                :value="item.group_id">
              </el-option>
            </el-select>
            <el-button type="primary" icon="el-icon-plus" @click="openDialogAddPerson" size="small">添加</el-button>
          </div>

          <div style="float: right">
            <el-input style="width: 200px;" size="small" v-model="keyword"
                      placeholder="请输入搜索内容"></el-input>
            <el-button type="primary" size="small" @click="selectGrantPersonList">搜索</el-button>
          </div>
        </el-row>
      </el-form-item>
    </el-form>
    <template>
      <el-table :data="tableData1" style="width: 100%" stripe>
        <el-table-column prop="grant_id" label="授权ID" min-width="10%">
        </el-table-column>
        <el-table-column prop="person_name" label="姓名" min-width="10%">
        </el-table-column>
        <el-table-column prop="emp_number" label="工号" min-width="10%">
        </el-table-column>
        <el-table-column prop="sync_status" label="同步状态" min-width="15%">
          <template slot-scope="scope">
            <span v-if="scope.row.sync_status===0">未同步</span>
            <span v-else-if="scope.row.sync_status===1">同步成功</span>
            <span v-else-if="scope.row.sync_status===2">下载失败</span>
            <span v-else-if="scope.row.sync_status===3">图片失败</span>
            <span v-else-if="scope.row.sync_status===4">特征值失败</span>
            <span v-else="scope.row.sync_status===5">其他失败</span>
          </template>
        </el-table-column>
        <el-table-column prop="pass_number" label="通行次数" min-width="15%">
          <template slot-scope="scope">
            <span v-if="scope.row.pass_number===9999999999">无限次数</span>
            <span v-else>{{scope.row.pass_number}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="pass_start_time" label="通行时段" min-width="25%">
          <template slot-scope="scope">
            <span v-if="scope.row.pass_start_time.indexOf('2286')===0||scope.row.pass_end_time.indexOf('2286')===0">无限时段</span>
            <span v-if="scope.row.pass_start_time.indexOf('2286')!==0">{{scope.row.pass_start_time|formatDate}} - {{scope.row.pass_end_time|formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="20%">
          <template slot-scope="scope">
            <el-button type="success" size="small" @click="openDialogChangeGrant(scope.row)">修改</el-button>
            <el-button type="danger" size="small" @click="banGrantPerson(scope)">禁止</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <template>
      <div class="block">
        <el-pagination ref="pagination1"
                       @size-change="handleChange1"
                       @current-change="handleChange1"
                       :current-page.sync="currentPage1"
                       :page-size.sync="pageSize1"
                       :page-sizes="pageSizes1"
                       prev-text="上一页"
                       next-text="下一页"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="tableTotal">
        </el-pagination>
      </div>
    </template>

    <DialogPersonList :device="device"/>
    <DialogChangeGrant :device="device" ref="refDialogChangeGrant"/>
  </div>
</template>

<script>
  import DialogPersonList from '../dialog/DialogPersonList'
  import DialogChangeGrant from '../dialog/DialogChangeGrant'
  import Message from '@/components/messages';

  export default {
    name: "DeviceGrantPerson",
    components: {
      DialogPersonList,
      DialogChangeGrant
    },
    props: {
      device: {
        device_sn: '',
        device_id: '',
        group_list: ''
      }
    },
    data() {
      return {
        tableData1: [],
        currentPage1: 1,
        pageSizes1: [5, 10, 20],
        pageSize1: 10,
        tableTotal: 0,
        keyword: '',
        selectGroupModel: ''
      }
    },
    methods: {
      get(data = {
        pageNum: this.currentPage1,
        pageSize: this.pageSize1,
        device_sn: this.device.device_sn
      }) {
        this.$get('/device/grant_person_list', data).then(result => {
          this.tableData1 = result.data.list;
          this.tableTotal = result.data.total;
        })
      },
      handleChange1() {
        this.get()
      },
      changeSelectGroup(value) {
        this.get({
          group_id: value,
          pageNum: 1,
          pageSize: this.pageSize1,
          device_sn: this.device.device_sn
        })
      },
      selectGrantPersonList() {
        this.get({
          pageNum: 1,
          pageSize: this.pageSize1,
          keyword: this.keyword,
          device_sn: this.device.device_sn
        })
      },
      openDialogAddPerson() {
        this.$store.commit('device/changeDialogAddPersonVs')
      },
      openDialogChangeGrant(data) {
        this.$store.commit('device/changeDialogGrantPersonVs')
        this.$refs.refDialogChangeGrant.initData(data)
      },
      banGrantPerson(scope) {
        this.$post('/grant/ban', {
          device_ids: this.device.device_id,
          person_ids: scope.row.person_id
        }).then(result => {
          Message.success(result.message)
          this.$utils.arrayRemoveObj(this.tableData1, scope.row)
          this.tableTotal--
        })
      },
      changeTableData(data) {
        this.tableData1.find(person => {
          if (data.grant_id === person.grant_id) {
            person.pass_number = data.pass_number;
            person.pass_start_time = data.pass_start_time;
            person.pass_end_time = data.pass_end_time;
          }
        });
      }
    },
    created() {
      this.get()
      this.$store.commit('device/setDialogAddPersonVs', false)
      this.$store.commit('device/setDialogGrantPersonVs', false)
    },
    watch: {
      "device": function () {
        this.get()
        this.$store.commit('device/setDialogAddPersonVs', false)
        this.$store.commit('device/setDialogGrantPersonVs', false)
      }
    }
  }
</script>

<style scoped>

</style>
