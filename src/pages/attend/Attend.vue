<template>
  <el-main>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 15px;">
      <el-breadcrumb-item>考勤管理</el-breadcrumb-item>
      <el-breadcrumb-item>考勤详情</el-breadcrumb-item>
    </el-breadcrumb>

    <div style="float:left;">
      <el-form label-width="100px" size="small" ref="form" :model="model">
        <el-form-item label="选择日期">
          <el-date-picker
            unlink-panels
            class="date_picker_pass_number"
            v-model="model.date_range"
            type="daterange"
            range-separator="至"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="上下班时间:">
          <template>
            <el-time-picker
              class="attend_time_picker"
              v-model="model.am_attend_time"
              value-format="HH:mm" format="HH:mm"
              placeholder="上班时间">
            </el-time-picker>
            <el-time-picker
              class="attend_time_picker"
              v-model="model.pm_attend_time"
              value-format="HH:mm" format="HH:mm"
              placeholder="下班时间">
            </el-time-picker>
          </template>
        </el-form-item>

        <el-form-item label="上班打卡范围:" prop="am_time_range">
          <el-time-picker
            is-range
            v-model="model.am_time_range"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
            value-format="HH:mm" format="HH:mm">
          </el-time-picker>
        </el-form-item>
        <el-form-item label="下班打卡范围:" prop="pm_time_range">
          <el-time-picker
            is-range
            v-model="model.pm_time_range"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
            value-format="HH:mm" format="HH:mm">
          </el-time-picker>
        </el-form-item>

        <el-form-item label="请选择部门:">
          <el-select v-model="selectGroupModel" clearable placeholder="请选择部门" size="small">
            <el-option
              v-for="item in group_list"
              :key="item.group_id"
              :label="item.group_name"
              :value="item.group_id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="warning" v-on:click="queryAttend" size="small">搜索</el-button>
          <el-button type="success" v-on:click="exportExcel" size="small">导出excel</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="float:left; width:calc(100% - 380px);min-width:730px;margin-left: 20px;">
      <template>
        <el-table ref="multipleTable" :data="tableData" style="width: 100%">
          <el-table-column label="日期">
            <template slot-scope="scope">
              <span>{{ scope.row.record_time|formatDate }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="person_name" label="姓名">
          </el-table-column>
          <el-table-column prop="device_name" label="设备名">
          </el-table-column>
          <el-table-column label="上班打卡时间">
            <template slot-scope="scope">
              <span>{{ scope.row.am_punch_time|formatDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="上班状态">
            <template slot-scope="scope">
              <el-tag
                v-if="scope.row.am_punch_status===0" :type="'info'"
                disable-transitions>正常
              </el-tag>
              <el-tag
                v-if="scope.row.am_punch_status===1" :type="'warning'"
                disable-transitions>迟到
              </el-tag>
              <el-tag
                v-if="scope.row.am_punch_status===2" :type="'warning'"
                disable-transitions>早退
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="下班打卡时间">
            <template slot-scope="scope">
              <span>{{ scope.row.pm_punch_time|formatDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="下班状态">
            <template slot-scope="scope">
              <el-tag
                v-if="scope.row.pm_punch_status===0" :type="'success'"
                disable-transitions>正常
              </el-tag>
              <el-tag
                v-if="scope.row.pm_punch_status===1" :type="'warning'"
                disable-transitions>迟到
              </el-tag>
              <el-tag
                v-if="scope.row.pm_punch_status===2" :type="'warning'"
                disable-transitions>早退
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="group_name" label="组名">
          </el-table-column>
        </el-table>
      </template>

      <template>
        <div class="block" style="text-align: center">
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
  </el-main>
</template>

<script>
  export default {
    name: "Attend",
    data() {
      return {
        tableData: [],
        currentPage: 1,
        pageSizes: [5, 10, 20],
        pageSize: 10,
        total: 0,
        model: {
          date_range: ['2019-01-01', '2019-12-31'],
          am_attend_time: '09:00',
          pm_attend_time: '18:00',
          am_time_range: ['00:00', '11:59'],
          pm_time_range: ['12:00', '23:59']
        },
        selectGroupModel: '',
        group_list: ''
      }
    },
    methods: {
      handleChange(val) {
        this.queryAttend();
      },
      queryAttend() {
        let model = this.$refs.form.model;

        this.$post('/attend/attend_list', {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          date_start: model.date_range[0],
          date_end: model.date_range[1],
          am_attend_time: model.am_attend_time,
          pm_attend_time: model.pm_attend_time,
          group_id: this.selectGroupModel,
          am_time_start: model.am_time_range[0],
          am_time_end: model.am_time_range[1],
          pm_time_start: model.pm_time_range[0],
          pm_time_end: model.pm_time_range[1]
        }).then(result => {
          this.total = result.data.total;
          this.tableData = result.data.list;
        })
      },
      exportExcel() {
        let model = this.$refs.form.model;
        window.open("${pageContext.request.contextPath}/attend/export?" + this.$qs.stringify({
          date_start: model.date_range[0],
          date_end: model.date_range[1],
          am_attend_time: model.am_attend_time,
          pm_attend_time: model.pm_attend_time,
          group_id: this.selectGroupModel,
          am_time_start: model.am_time_range[0],
          am_time_end: model.am_time_range[1],
          pm_time_start: model.pm_time_range[0],
          pm_time_end: model.pm_time_range[1]
        }));
      }
    },
    created() {
      this.$get('/group/list').then(result => {
        this.group_list = result.data.list
      })
    }
  }
</script>

<style scoped>
  .el-main {
    padding: 20px;
  }

  .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input__inner, /deep/ .el-input.el-input--small.el-input--suffix {
    width: 250px;
  }

  .el-date-editor.el-input.attend_time_picker {
    width: 123px;
  }
</style>
