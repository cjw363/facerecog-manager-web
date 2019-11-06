<template>
  <div>
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
  </div>
</template>

<script>
  export default {
    name: "GroupGrant",
    props: {
      group: {}
    },
    data() {
      return {
        person_list: [],
        device_list: [],
        value1: [],
        value2: [],
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
      onChangeRadio() {

      },
      grantPass() {

      },
      banPass() {

      },
      get() {
        this.$get('/group/list_device_person_by_group', {
          group_id: this.group.group_id
        }).then(result => {
          this.person_list = result.data.person_list
          this.device_list = result.data.device_list

          this.device_list.forEach((item, i, arr) => this.value2[i] = item.device_id)
        })
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
