<template>
  <div class="box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>设备管理</el-breadcrumb-item>
      <el-breadcrumb-item>已激活设备</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form onsubmit="return false;">
      <el-form-item>
        <el-row>
          <div style="float: right">
            <el-input style="width: 200px;" v-model="keyword" size="small" autocomplete="off"
                      placeholder="请输入搜索内容" @keyup.enter.native="searchDeviceList"></el-input>
            <el-button type="primary" icon="el-icon-search" size="small" @click="searchDeviceList"></el-button>
          </div>
        </el-row>
      </el-form-item>
    </el-form>

    <template>
      <el-table :data="tableData" style="width: 100%" stripe>
        <el-table-column prop="device_id" label="设备ID" min-width="10%">
        </el-table-column>
        <el-table-column prop="device_name" label="设备名称" min-width="20%">
        </el-table-column>
        <el-table-column prop="device_sn" label="设备序列号" min-width="20%">
        </el-table-column>
        <el-table-column prop="online" label="在线" min-width="10%">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.online===1" :type="'success'" disable-transitions>在线</el-tag>
            <el-tag v-if="scope.row.online===0" :type="'info'" disable-transitions>离线</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="注册时间" min-width="20%">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.register_time|formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column label="激活时间" min-width="20%">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.activate_time|formatDate}}</span>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <template>
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
    </template>
  </div>
</template>

<script>
  export default {
    name: "DeviceTbl",
    data() {
      return {
        tableData: [],
        searching: true,
        currentPage: 1,
        pageSizes: [5, 10, 20],
        pageSize: 10,
        total: 0,
        keyword: ''
      }
    },
    methods: {
      get(data = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        keyword: this.keyword
      }) {
        this.$get('/device/list', data).then(result => {
          this.tableData = result.data.list;
          this.total = result.data.total;
        })
      },
      handleChange(val) {
        this.get()
      },
      searchDeviceList() {
        this.get({
          pageNum: 1,
          pageSize: this.pageSize,
          keyword: this.keyword
        })
      }
    },
    created() {
      this.get()
    }
  }
</script>

<style scoped>
</style>
