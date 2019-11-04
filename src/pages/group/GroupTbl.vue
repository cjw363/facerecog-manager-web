<template>
  <div class="box">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 15px;">
      <el-breadcrumb-item>组别管理</el-breadcrumb-item>
      <el-breadcrumb-item>组别列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form onsubmit="return false;">
      <el-form-item>
        <el-row>
          <div style="float: right">
            <el-input style="width: 200px;" v-model="keyword" size="small" placeholder="请输入搜索内容" @keyup.enter.native="searchGroupList"></el-input>
            <el-button type="primary" icon="el-icon-search" size="small" @click="searchGroupList"></el-button>

          </div>
        </el-row>
      </el-form-item>
    </el-form>

    <template>
      <el-table :data="tableData" style="width: 100%" stripe>
        <el-table-column prop="group_id" label="组ID">
        </el-table-column>
        <el-table-column prop="group_name" label="组名">
        </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.create_time|formatDate}}</span>
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
    name: "GroupTbl",
    data(){
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
        pageSize: this.pageSize
      }) {
        this.$get('/group/list', data).then(result => {
          this.tableData = result.data.list;
          this.total = result.data.total;
        })
      },
      handleChange(val) {
        this.get()
      },
      searchGroupList() {
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
