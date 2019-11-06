<template>
  <el-main>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 15px;">
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限操作</el-breadcrumb-item>
    </el-breadcrumb>

    <el-transfer
      filterable :filter-method="filterMethod1"
      filter-placeholder="请输入关键词"
      v-model="value1" :data="person_list" :props="props1"
      :titles="['可选人员', '授权人员']"
    >
    </el-transfer>
    <el-transfer
      filterable :filter-method="filterMethod2"
      filter-placeholder="请输入关键词"
      v-model="value2" :data="device_list" :props="props2"
      :titles="['授权设备', '可选设备']"
    >
    </el-transfer>

    <el-form label-width="150px" style="margin-top: 30px;width: 600px;" size="small">
      <el-form-item label="通行次数">
        <el-radio-group v-model="radio1" @change="onChangeRadio">
          <el-radio label="1">指定次数</el-radio>
          <el-radio label="2">无限次数</el-radio>
        </el-radio-group>
        <el-input v-model="pass_number" autocomplete="off" placeholder="请填写可通行次数"
                  style="width: 100%;display: none;" class="input_pass_number"></el-input>
      </el-form-item>
      <el-form-item label="通行时段">
        <el-radio-group v-model="radio2" @change="onChangeRadio">
          <el-radio label="3">指定时间</el-radio>
          <el-radio label="4">无限时段</el-radio>
        </el-radio-group>

        <el-date-picker
          unlink-panels
          class="date_picker_pass_number"
          style="display: none;"
          v-model="dateValue"
          type="datetimerange"
          range-separator="至"
          value-format="yyyy-MM-dd HH:mm:ss"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="grantPass()">授权通行</el-button>
        <el-button type="danger" @click="banPass()">禁止通行</el-button>
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script>
  export default {
    name: "Grant",
    data() {
      return {
        person_list: [],
        device_list: [],
        value1: [],
        value2: [],
        value2temp: [],
        props1: {
          label: 'person_name',
          key: 'person_id'
        },
        props2: {
          label: 'device_name',
          key: 'device_id'
        },
        radio1: '2',
        radio2: '4',
        pass_number: '',
        dateValue: '',
      }
    },
    methods: {
      filterMethod1(query, item) {
        return item.person_name.indexOf(query) > -1;
      },
      filterMethod2(query, item) {
        return item.device_name.indexOf(query) > -1;
      },
      onChangeRadio(index) {
        let $input = document.querySelector('.input_pass_number');
        let $datePicker = document.querySelector('.date_picker_pass_number');

        switch (index) {
          case '1':
            $input.style.display = "inline-flex";
            break;
          case '2':
            $input.style.display = "none";
            break;
          case '3':
            $datePicker.style.display = "inline-flex";
            break;
          case '4':
            $datePicker.style.display = "none";
            break;
        }
      },
      grantPass() {
        let person_ids = this.value1.join(',');
        let device_ids = this.$utils.arrayIntersect(this.value2temp, this.value2).join(',');
        let pass_number = 9999999999;
        let pass_start_time = this.$utils.stampToDate(9999999999);
        let pass_end_time = this.$utils.stampToDate(9999999999);

        if (!person_ids) {
          this.$message.warning("请添加授权人员");
          return;
        }
        if (!device_ids) {
          this.$message.warning("请添加授权设备");
          return;
        }

        if (this.radio1 === '1') {
          if (!this.pass_number.trim()) {
            this.$message.warning("请填写通行次数");
            return;
          }
          pass_number = this.pass_number;
        }
        if (this.radio2 === '3') {
          if (!this.dateValue) {
            this.$message.warning("请填写通行日期");
            return;
          }
          pass_start_time = this.dateValue[0];
          pass_end_time = this.dateValue[1];
        }

        this.$post('/grant/add', {
          person_ids: person_ids,
          device_ids: device_ids,
          pass_number: pass_number,
          pass_start_time: pass_start_time,
          pass_end_time: pass_end_time
        }).then(result => this.$message.success(result.message))
      },
      banPass() {
        var person_ids = this.value1.join(',');
        var device_ids = this.$utils.arrayIntersect(this.value2temp, this.value2).join(',');
        if (!person_ids) {
          this.$message.warning("请添加授权人员");
          return;
        }
        if (!device_ids) {
          this.$message.warning("请添加授权设备");
          return;
        }

        this.$post('/grant/ban', {
          person_ids: person_ids,
          device_ids: device_ids
        }).then(result => this.$message.success(result.message))
      },
      get() {
        this.value1 = [];
        this.value2 = [];
        this.value2temp = [];
        this.$get('/grant/list_device_person').then(result => {
          this.person_list = result.data.person_list
          this.device_list = result.data.device_list

          this.device_list.forEach((item, i, arr) => this.value2[i] = item.device_id)
          this.value2temp = this.value2
        })
      },
    },
    created() {
      this.get()
    },
  }
</script>

<style scoped>
  .el-main {
    padding: 20px;
  }

  .el-col {
    font-size: 14px;
    font-weight: 500;
    color: #303133;
  }

  /deep/ .el-transfer-panel__item {
    height: 30px;
    line-height: 30px;
    padding-left: 15px;
    display: block;
  }

  .el-form-item .el-input {
    width: 400px;
  }

  .el-transfer {
    display: inline-block;
    width: 49%;
  }

  /deep/ .el-transfer-panel {
    width: 38%;
    height: 400px;
  }

  /deep/ .el-transfer-panel__list.is-filterable {
    height: 300px;
  }

  .el-date-editor--datetimerange.el-input__inner {
    width: 450px;
  }

  .el-transfer-panel .el-transfer-panel__header .el-checkbox .el-checkbox__label {
    font-size: 14px;
  }

  .el-transfer-panel .el-transfer-panel__header {
    padding-left: 5px;
  }
</style>
