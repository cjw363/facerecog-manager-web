<template>
  <div>
    <el-form>
      <el-form-item>
        <el-button type="primary" icon="el-icon-plus" @click="openDialogAddPerson" size="small">添加</el-button>
      </el-form-item>
    </el-form>

    <template>
      <el-table :data="tableData1" style="width: 100%" stripe>
        <el-table-column prop="person_id" label="人员ID">
        </el-table-column>
        <el-table-column prop="person_name" label="姓名">
        </el-table-column>
        <el-table-column prop="emp_number" label="工号">
        </el-table-column>
        <el-table-column label="进组时间">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.add_group_time|formatDate}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="danger" @click="deleteGroupPerson(scope.row)">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <template>
      <div class="block">
        <el-pagination
          @size-change="handleChange1"
          @current-change="handleChange1"
          :current-page.sync="currentPage1"
          :page-size.sync="pageSize1"
          :page-sizes="pageSizes1"
          prev-text="上一页"
          next-text="下一页"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total1">
        </el-pagination>
      </div>
    </template>

    <DialogGroupAddPerson :group="group" ref="refDialogGroupAddPerson"/>
  </div>
</template>

<script>
  import DialogGroupAddPerson from '../dialog/DialogGroupAddPerson'

  export default {
    name: "GroupPersonList",
    components: {
      DialogGroupAddPerson
    },
    props: {
      group: {}
    },
    data() {
      return {
        tableData1: [],
        currentPage1: 1,
        pageSizes1: [5, 10, 20],
        pageSize1: 10,
        total1: 0
      }
    },
    methods: {
      openDialogAddPerson() {
        this.$refs.refDialogGroupAddPerson.openDialogGroupAddPerson()
      },
      deleteGroupPerson(person) {
        this.$post('/group/delete_person',{
          group_id: this.group.group_id,
          person_id: person.person_id
        }).then(result=>{
          this.$message.success(result.message)
          this.$utils.arrayRemoveObj(this.tableData1, person)
          this.total1--
        })
      },
      get(data = {
        pageNum: this.currentPage1,
        pageSize: this.pageSize1,
        group_id: this.group.group_id
      }) {
        this.$get('/person/list_by_group', data).then(result => {
          this.tableData1 = result.data.list;
          this.total1 = result.data.total;
        })
      },
      handleChange1() {
        this.get()
      },
    },
    created() {
      this.get()
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
