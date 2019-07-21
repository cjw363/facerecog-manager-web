<template>
  <div class="box">
    <el-form>
      <el-form-item>
        <el-row>
          <div style="float: left">
            <el-select v-model="selectGroupModel" clearable placeholder="请选择部门" size="small" @change="changeSelectGroup">
              <el-option
                v-for="item in options2"
                :key="item.group_id"
                :label="item.group_name"
                :value="item.group_id">
              </el-option>
            </el-select>
            <el-button type="primary" icon="el-icon-plus" @click="openDialogPerson" size="small">添加</el-button>
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
            <span v-if="scope.row.pass_start_time==='2286-11-21 01:46:39'||scope.row.pass_end_time==='2286-11-21 01:46:39'">无限时段</span>
            <span v-if="scope.row.pass_start_time!=='2286-11-21 01:46:39'">{{scope.row.pass_start_time}} - {{scope.row.pass_end_time}}</span>
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
  </div>
</template>

<script>
  export default {
    name: "DeviceGrantPerson",
    props: {
      options2: {
        type: Array,
        required: false,
      }
    },
    data() {
      return {
        tableData1: [],
        currentPage1: 1,
        pageSizes1: [5, 10, 20],
        pageSize1: 10,
        tableTotal: 0,
        visible: false,
        dialogModel: {
          radio1: '',
          radio2: '',
          pass_number: '',
          dateValue: '',
        },
        grant: '',
        keyword: '',
        selectGroupModel: ''
      }
    },
    methods: {
      handleChange1() {
      },
      changeSelectGroup() {
      },
      banGrantPerson() {
      },
      onChangeRadio() {
      },
      openDialogChangeGrant() {
      },
      opened() {
      },
      changePersonGrant() {
      },
      dialog() {
      },
      selectGrantPersonList() {
      },
      openDialogPerson() {
      },
    }
  }
</script>

<style scoped>

</style>
