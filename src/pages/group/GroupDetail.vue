<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 15px;">
      <el-breadcrumb-item>分组管理</el-breadcrumb-item>
      <el-breadcrumb-item>组别列表</el-breadcrumb-item>
      <el-breadcrumb-item>{{group.group_name}}</el-breadcrumb-item>
    </el-breadcrumb>

    <template>
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="first">
          <GroupInfo :group="group"/>
        </el-tab-pane>
        <el-tab-pane label="人员列表" name="second">
          <GroupPersonTbl :group="group"/>
        </el-tab-pane>
        <el-tab-pane label="设备列表" name="third">
          <GroupDeviceTbl :group="group"/>
        </el-tab-pane>
        <el-tab-pane label="分配权限" name="fourth">
        </el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>

<script>
  import GroupInfo from './tabs/GroupInfo'
  import GroupPersonTbl from './tabs/GroupPersonTbl'
  import GroupDeviceTbl from './tabs/GroupDeviceTbl'

  export default {
    name: "GroupDetail",
    components: {
      GroupInfo,
      GroupPersonTbl,
      GroupDeviceTbl
    },
    data() {
      return {
        activeName: 'first',
        group: {},
      }
    },
    methods: {
      get() {
        this.$post('/group/detail', {
          group_id: this.$route.query.group_id
        }).then(result => {
          this.group = result.data
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
