<template>
  <el-main>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 15px;">
      <el-breadcrumb-item>记录管理</el-breadcrumb-item>
      <el-breadcrumb-item>记录列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form onsubmit="return false;">
      <el-form-item>
        <el-row>
          <el-button type="primary" size="small" @click="deleteRecords">批量删除
          </el-button>
          <el-button type="danger" size="small" @click="clearRecord">清空记录</el-button>

          <el-select v-model="selectDeviceModel" clearable placeholder="请选择设备" size="small" @change="changeSelectDevice">
            <el-option
              v-for="item in device_list"
              :key="item.device_id"
              :label="item.device_name"
              :value="item.device_id">
            </el-option>
          </el-select>

          <div style="float: right">
            <el-input style="width: 200px;" v-model="keyword" size="small"
                      placeholder="请输入搜索内容" @keyup.enter.native="searchRecordList"></el-input>
            <el-button type="primary" icon="el-icon-search" size="small" @click="searchRecordList"></el-button>

          </div>
        </el-row>
      </el-form-item>
    </el-form>

    <template>
      <el-table ref="multipleTable" :data="tableData" style="width: 100%"
                @selection-change="handleSelectionChange" stripe>
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="record_id" label="记录ID">
        </el-table-column>
        <el-table-column prop="person_name" label="姓名">
        </el-table-column>
        <el-table-column prop="device_name" label="设备名">
        </el-table-column>
        <el-table-column label="识别模式">
          <template slot-scope="scope">
            <span v-if="scope.row.recog_type==0">人脸</span>
            <span v-if="scope.row.recog_type==1">身份证</span>
            <span v-if="scope.row.recog_type==2">工号</span>
            <span v-if="scope.row.recog_type==3">人脸+身份证</span>
            <span v-if="scope.row.recog_type==4">人脸+工号</span>
          </template>
        </el-table-column>
        <el-table-column label="识别时间">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.record_time|formatDate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="识别图片">
          <template slot-scope="scope">
            <img class="image_tbl" :src="'data:image/jpeg;base64,'+scope.row.base_image">
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="danger" size="small" @click="deleteRecordById(scope)">删除</el-button>
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
                       :total="total">
        </el-pagination>
      </div>
    </template>
  </el-main>
</template>

<script>
  import Message from '@/components/messages'

  export default {
    name: "Record",
    data() {
      return {
        tableData: [],
        searching: true,
        currentPage: 1,
        pageSizes: [5, 10, 20],
        pageSize: 5,
        total: 0,
        keyword: '',
        multipleSelection: [],
        device_list: '',
        device_id: '',
        selectDeviceModel: ''
      }
    },
    methods: {
      handleChange(val) {
        this.get()
      },
      searchRecordList() {
        this.get({
          pageNum: 1,
          pageSize: this.pageSize,
          device_id: this.device_id,
          keyword: this.keyword
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      deleteRecords() {
        if (this.multipleSelection.length === 0) {
          this.$message.warning('请勾选待删除记录')
          return;
        }

        let arr = []
        this.multipleSelection.forEach(item => arr.push(item.record_id))
        let record_ids = arr.join(',');

        Message.confirm('确定删除勾选记录').then(() => {
          this.$post('/record/deleteLists', {
            record_ids: record_ids
          }).then(result => {
            this.$message.success(result.message)
            this.get()
          })
        })
      },
      clearRecord() {
        Message.confirm('警告! 该操作将删除所有记录，是否继续？').then(() => {
          this.$post('/record/clear', {
            device_id: this.device_id
          }).then(result => {
            this.$message.success(result.message)
            this.tableData = []
            this.total = 0
          })
        })
      },
      deleteRecordById(scope) {
        Message.confirm('确定删除该记录').then(() => {
          this.$post('/record/delete', {
            record_id: scope.row.record_id
          }).then(result => {
            this.$message.success(result.message)
            this.$utils.arrayRemoveObj(this.tableData, scope.row)
            this.total--
          })
        })
      },
      changeSelectDevice(value) {
        this.device_id = value

        this.get({
          pageNum: 1,
          pageSize: this.pageSize,
          device_id: this.device_id,
          keyword: this.keyword
        })
      },
      getDeviceList() {
        this.$get('/device/list').then(result => {
          this.device_list = result.data.list;
        })
      },
      get(data = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        device_id: this.device_id,
        keyword: this.keyword
      }) {
        this.$get('/record/list_base64', data).then(result => {
          this.tableData = result.data.list;
          this.total = result.data.total;
        })
      }
    },
    created() {
      this.get()
      this.getDeviceList()
    },
  }
</script>

<style scoped>
  .el-main {
    padding: 20px;
  }
</style>
