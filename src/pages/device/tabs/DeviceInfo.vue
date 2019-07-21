<template>
  <el-form label-width="130px">
    <el-form-item label="设备sn编号">
      <span>{{device.device_sn}}</span>
    </el-form-item>
    <el-form-item label="在线状态">
      <span v-if="device.online===1">在线</span>
      <span v-if="device.online===0">离线</span>
    </el-form-item>
    <el-form-item label="授权码">
      <span>{{device.arcface_appid}}</span>
    </el-form-item>
    <el-form-item label="注册时间">
      <span>{{device.register_time|formatDate}}</span>
    </el-form-item>
    <el-form-item label="激活时间">
      <span>{{device.activate_time|formatDate}}</span>
    </el-form-item>
    <el-form-item label="最后一次上线时间">
      <span>{{device.last_online_time|formatDate}}</span>
    </el-form-item>
    <el-form-item label="最后一次下线时间">
      <span>{{device.last_offline_time|formatDate}}</span>
    </el-form-item>
    <el-form-item label="同步成功">
      <span>{{device.sync_success}}</span>
    </el-form-item>
    <el-form-item label="同步失败">
      <span>{{device.sync_fail}}</span>
    </el-form-item>
    <el-form-item label="未同步">
      <span>{{device.without_sync}}</span>
    </el-form-item>
    <el-form-item label="当前app版本">
      <span>{{device.app_version}}</span>
      <el-button size="small" type="success" @click="checkUpdate">更新</el-button>
    </el-form-item>
    <el-form-item label="操作">
      <el-button size="small" type="danger" @click="deleteDevice">删除</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import Message from '@/components/messages'

  export default {
    name: "DeviceInfo",
    inject: ['reloadDevice'],//注入重载device的方法
    props: {
      device: {
        type: Object,
        default: () => ({}),
        device_sn: '',
        device_id: '',
        online: '',
        arcface_appid: '',
        register_time: '',
        activate_time: '',
        last_online_time: '',
        last_offline_time: '',
        sync_success: '',
        sync_fail: '',
        without_sync: '',
        app_version: ''
      }
    },
    methods: {
      checkUpdate() {
        this.$post('/device/check_update', {
          device_sn: this.device.device_sn,
        }).then(result => {
          if (result.code === 105) {
            Message.info(result.message)
          } else
            Message.info("未发现新版本")
        })
      },
      deleteDevice() {
        Message.confirm("注意: 删除设备会删除该设备信息以及相关权限数据,确定要删除该设备吗").then(() => {
          this.$post('/device/delete', {
            device_id: this.device.device_id
          }).then(result => {
            Message.info(result.message)
            this.reloadDevice()
          })
        })
      }
    }
  }
</script>

<style scoped>

</style>
