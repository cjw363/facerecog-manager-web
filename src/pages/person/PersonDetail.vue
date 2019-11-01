<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 15px;">

      <el-breadcrumb-item>人员管理</el-breadcrumb-item>
      <el-breadcrumb-item>人员详情</el-breadcrumb-item>
      <el-breadcrumb-item>{{person.person_name}}</el-breadcrumb-item>
    </el-breadcrumb>

    <template>
      <el-tabs type="card" v-model="activeName">
        <el-tab-pane label="基本信息" name="first">
          <PersonInfo :person="person"/>
        </el-tab-pane>
        <el-tab-pane label="授权设备" name="second">
          <PersonGrantDevice :person="person"/>
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
    data() {
      return {
        activeName: 'first',
        person: {},
      }
    },
    components:{
      PersonInfo,
      PersonGrantDevice
    },
    methods: {
      get() {
        this.$post('/person/detail', {
          person_id: this.$route.query.person_id
        }).then(result => {
          this.person = result.data
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
