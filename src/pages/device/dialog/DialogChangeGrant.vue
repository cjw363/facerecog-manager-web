<template>
  <el-dialog title="修改通行权限"
             :visible.sync="visible"
             @opened="opened"
             width="650px"
  >

    <el-form label-width="25%" style="margin-top: 30px;width: 500px;" size="small" v-model="dialogModel">
      <el-form-item label="通行次数">
        <el-radio-group v-model="dialogModel.radio1" @change="onChangeRadio">
          <el-radio label="1">指定次数</el-radio>
          <el-radio label="2">无限次数</el-radio>
        </el-radio-group>
        <el-input v-model="dialogModel.pass_number" autocomplete="off" placeholder="请填写可通行次数"
                  style="width: 100%;display: none;" class="input_pass_number"></el-input>
      </el-form-item>
      <el-form-item label="通行时段">
        <el-radio-group v-model="dialogModel.radio2" @change="onChangeRadio">
          <el-radio label="3">指定时间</el-radio>
          <el-radio label="4">无限时段</el-radio>
        </el-radio-group>

        <el-date-picker
          unlink-panels
          class="date_picker_pass_number"
          style="display: none;"
          v-model="dialogModel.dateValue"
          type="datetimerange"
          range-separator="至"
          value-format="yyyy-MM-dd HH:mm:ss"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="">
        <el-button @click="visible =false">取消</el-button>
        <el-button type="primary" @click="changePersonGrant">保存</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
  import Message from '@/components/messages';

  export default {
    name: "DialogChangeGrant",
    props: {
      device: {
        device_sn: '',
        device_id: '',
      }
    },
    data() {
      return {
        dialogModel: {
          radio1: '',
          radio2: '',
          pass_number: '',
          dateValue: '',
        },
        grant: '',
        visible: false
      }
    },
    methods: {
      onChangeRadio(index) {
        let $input = document.querySelector('.input_pass_number');
        let $datePicker = document.querySelector('.date_picker_pass_number');
        switch (index) {
          case '1':
            if (this.grant.pass_number === 9999999999)
              this.dialogModel.pass_number = '';
            else
              this.dialogModel.pass_number = this.grant.pass_number;
            $input.style.display = "inline-flex";
            break;
          case '2':
            this.dialogModel.pass_number = 9999999999;
            $input.style.display = "none";
            break;
          case '3':
            if (this.$utils.dateToStamp(this.grant.pass_start_time) === 9999999999 || this.$utils.dateToStamp(this.grant.pass_end_time) === 9999999999) {
              this.dialogModel.dateValue = '';
            } else {
              this.dialogModel.dateValue = [this.grant.pass_start_time, this.grant.pass_end_time];
            }
            $datePicker.style.display = "inline-flex";
            break;
          case '4':
            this.dialogModel.dateValue = [this.$utils.stampToDate(9999999999), this.$utils.stampToDate(9999999999)];
            $datePicker.style.display = "none";
            break;
        }
      },
      opened() {
        let $input = document.querySelector('.input_pass_number');
        let $datePicker = document.querySelector('.date_picker_pass_number');

        $input.style.display = this.dialogModel.radio1 === '2' ? "none" : "inline-flex";
        $datePicker.style.display = this.dialogModel.radio2 === '4' ? "none" : "inline-flex";
      },
      changePersonGrant() {
        if (!this.dialogModel.pass_number) {
          Message.warning("请输入通行次数");
          return;
        } else if (!this.dialogModel.dateValue) {
          Message.warning("请输入通行时间");
          return;
        }

        let data = {
          person_ids: this.grant.person_id,
          device_ids: this.device.device_id,
          pass_number: this.dialogModel.pass_number,
          pass_start_time: this.dialogModel.dateValue[0],
          pass_end_time: this.dialogModel.dateValue[1],
          grant_id: this.grant.grant_id
        };
        this.$post('/grant/add', data).then(result => {
          Message.success(result.message)
          this.visible = false

          this.$parent.changeTableData(data)
        })
      },
      initData(data) {
        this.grant = data;
        this.dialogModel.pass_number = data.pass_number;
        this.dialogModel.dateValue = [this.$utils.formatDate(data.pass_start_time), this.$utils.formatDate(data.pass_end_time)];
        if (data.pass_number === 9999999999) {
          this.dialogModel.radio1 = '2';
        } else {
          this.dialogModel.radio1 = '1';
        }
        if (this.$utils.dateToStamp(data.pass_start_time) === 9999999999 || this.$utils.dateToStamp(data.pass_end_time) === 9999999999) {
          this.dialogModel.radio2 = '4';
        } else {
          this.dialogModel.radio2 = '3';
        }
      },
      changeDialogGrantPersonVs() {
        this.visible = !this.visible
      }
    }
  }
</script>

<style scoped>

</style>
