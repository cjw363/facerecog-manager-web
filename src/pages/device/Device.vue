<template>
  <el-container>
    <el-aside width="250px">
      <DeviceTree/>
    </el-aside>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>

</template>

<script>
  import DeviceTree from './DeviceTree'

  export default {
    name: "Device",
    components: {
      DeviceTree
    },
    created(){
      this.$router.push("/device/device_tbl")
    }
  }
</script>

<style scoped>
  .el-tree {
    height: 100%;
    border-right: solid 1px #e6e6e6;
  }

  .el-main {
    padding: 20px;
  }

</style>
