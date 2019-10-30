<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 15px;">

      <el-breadcrumb-item>人员管理</el-breadcrumb-item>
      <el-breadcrumb-item>人员详情</el-breadcrumb-item>
      <el-breadcrumb-item>{{data.person_name}}</el-breadcrumb-item>
    </el-breadcrumb>

    <template>
      <el-tabs type="card" v-model="activeName">
        <el-tab-pane label="基本信息" name="first">
          <PersonInfo/>
        </el-tab-pane>
        <el-tab-pane label="授权设备" name="second">
          <PersonGrantDevice/>
        </el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>

<script>
  import PersonInfo from './tabs/PersonInfo'
  import PersonGrantDevice from './tabs/PersonGrantDevice'

  export default {
    name: "PersonDetail",
    components:{
      PersonInfo,
      PersonGrantDevice
    }

  }
</script>

<style scoped>

</style>
