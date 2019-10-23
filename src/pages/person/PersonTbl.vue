<template>
  <div class="box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>人员管理</el-breadcrumb-item>
      <el-breadcrumb-item>人员列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form onsubmit="return false;">
      <el-form-item>
        <el-row>
          <div style="float: right">
            <el-input style="width: 200px;" v-model="keyword" size="small" autocomplete="off" placeholder="请输入搜索内容" @keyup.enter.native="searchPersonList"></el-input>
            <el-button type="primary" icon="el-icon-search" size="small" @click="searchPersonList"></el-button>
          </div>
        </el-row>
      </el-form-item>
    </el-form>

    <template>
      <el-table :data="tableData" style="width: 100%" stripe>
        <el-table-column prop="person_id" label="人员ID">
        </el-table-column>
        <el-table-column prop="person_name" label="姓名">
        </el-table-column>
        <el-table-column prop="emp_number" label="工号">
        </el-table-column>
        <el-table-column label="底库照片">
          <template slot-scope="scope">
            <img class="image_tbl" :src="'data:image/jpeg;base64,'+scope.row.base_image">
          </template>
        </el-table-column>
        <el-table-column label="注册时间">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.add_time|formatDate}}</span>
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
  </div>
</template>

<script>
  export default {
    name: "PersonTbl",
    data() {
      return {
        tableData: [],
        searching: true,
        currentPage: 1,
        pageSizes: [5, 10, 20],
        pageSize: 5,
        total: 0,
        keyword: ''
      }
    },
    methods: {
      get(data = {
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }) {
        this.$get('/person/list_base64', data).then(result => {
          this.tableData = result.data.list;
          this.total = result.data.total;
        })
      },
      handleChange(val) {
        this.get()
      },
      searchPersonList() {
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
