<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>设备管理</el-breadcrumb-item>
      <el-breadcrumb-item>设备详情</el-breadcrumb-item>
      <el-breadcrumb-item>{{device.device_name}}</el-breadcrumb-item>
    </el-breadcrumb>

    <template>
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="first">
          <DeviceInfo :device="device"/>
        </el-tab-pane>
        <el-tab-pane label="功能配置" name="second">
          <DeviceConfig :device="device"/>
        </el-tab-pane>
        <el-tab-pane label="已授权人员" name="third">
          <DeviceGrantPerson :device="device"/>
        </el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>

<script>
  import DeviceInfo from './tabs/DeviceInfo'
  import DeviceConfig from './tabs/DeviceConfig'
  import DeviceGrantPerson from './tabs/DeviceGrantPerson'

  export default {
    name: "DeviceDetail",
    data() {
      return {
        activeName: 'first',
        device: {}
      }
    },
    components: {
      DeviceInfo,
      DeviceConfig,
      DeviceGrantPerson
    },
    methods: {
      get() {
        this.$post('/device/detail', {
          device_sn: this.$route.query.device_sn
        }).then(result => {
          this.device = result.data
        })
      }
    },
    created() {
      this.get();
    },
    watch: {
      "$route": "get"
    }
  }
</script>

<style scoped>

</style>
