<template>
  <el-form label-width="200px">
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
      <el-button size="small" type="success" @click="">更新</el-button>
    </el-form-item>
    <el-form-item label="操作">
      <el-button size="small" type="danger" @click="">删除</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: "DeviceInfo",
    props: {
      device: {
        type: Object,
        default: () => ({}),
        device_sn: '',
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
    }
  }
</script>

<style scoped>

</style>
