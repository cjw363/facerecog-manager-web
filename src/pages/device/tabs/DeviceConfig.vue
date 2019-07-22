<template>
  <el-form label-width="100px" v-model="deviceModel">
    <el-form-item label="设备名称">
      <el-input v-model="deviceModel.device_name" type="text" autocomplete="off" size="small"></el-input>
    </el-form-item>
    <el-form-item label="开门条件">
      <el-select v-model="deviceModel.open_door_type" placeholder="请选择" size="small">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="成功文本">
      <el-input v-model="deviceModel.success_msg" type="text" autocomplete="off" size="small"></el-input>
    </el-form-item>
    <el-form-item label="失败文本">
      <el-input v-model="deviceModel.fail_msg" type="text" autocomplete="off" size="small"></el-input>
    </el-form-item>
    <el-form-item label="">
      <el-button size="small" type="success" @click="changeDeviceInfo">保存</el-button>
      <el-button size="small" @click="restoreDeviceInfo">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import Message from '@/components/messages'

  export default {
    name: "DeviceConfig",
    props: {
      device: {
        device_sn: '',
        device_name: '',
        open_door_type: '',
        success_msg: '',
        fail_msg: ''
      }
    },
    data() {
      return {
        options1: [{
          value: 0,
          label: '人脸'
        }, {
          value: 1,
          label: '身份证'
        }, {
          value: 2,
          label: '工号'
        }, {
          value: 3,
          label: '人脸+身份证'
        }, {
          value: 4,
          label: '人脸+工号'
        }],
        deviceModel:''
      }
    },
    methods: {
      changeDeviceInfo() {
        this.$post('/device/change_info',{
          device_sn: this.deviceModel.device_sn,
          device_name: this.deviceModel.device_name,
          open_door_type: this.deviceModel.open_door_type,
          success_msg: this.deviceModel.success_msg,
          fail_msg: this.deviceModel.fail_msg
        }).then(result=>{
          Message.success(result.message)
          this.deviceList.find(d=>d.device_sn===this.device.device_sn).device_name=this.deviceModel.device_name
        })
      },
      restoreDeviceInfo() {
        this.deviceModel=Object.assign({},this.device)
      },
    },
    watch :{
      'device': function(newVal, oldVal){//监听device变化
        this.deviceModel=Object.assign({},this.device)//深度拷贝对象。如果直接赋值，传递的是引用，修改会连父组件都修改
      }
    },
    computed: {
      'deviceList': function () {
        return this.$store.getters['device/getDeviceList']
      }
    }
  }
</script>

<style scoped>
  .el-form-item .el-input {
    width: 400px;
  }

  /deep/ .el-input--suffix .el-input__inner {
    width: 400px;
  }
</style>
