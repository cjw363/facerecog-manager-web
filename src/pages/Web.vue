<template>
  <el-container>
    <el-header>
      <el-row :gutter="0">
        <el-col :xs="8" :sm="6" :md="6" :lg="5" :xl="5">人脸识别管理系统</el-col>
        <el-col :xs="4" :sm="9" :md="9" :lg="13" :xl="13">
          <div style="height: 60px;"></div>
        </el-col>
        <el-col :xs="5" :sm="4" :md="4" :lg="3" :xl="3"><a href="#">xx , 你好</a></el-col>
        <el-col :xs="4" :sm="3" :md="3" :lg="2" :xl="2"><a href="#">修改密码</a></el-col>
        <el-col :xs="3" :sm="2" :md="2" :lg="1" :xl="1"><a href="#">注销</a></el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="250px">
        <el-menu style="height: 100%;"
                 :default-active="this.$router.path"
                 class="el-menu-vertical-demo"
                 router>
          <NavMenu :menuData="menuData.childs"></NavMenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import {menuData} from '@/components/menu/MenuDB'
  import NavMenu from '@/components/menu/NavMenu'

  export default {
    name: "Web",
    data() {
      return {
        menuData: menuData,
        props: {
          menuData: {
            type: Array
          }
        }
      }
    },
    components: {
      NavMenu
    },
    created(){
      this.$router.push("/device/device")
    }
  }
</script>

<style scoped>
  .el-header {
    background-color: #409EFF;
  }

  .el-col {
    color: white;
    line-height: 60px;
    font-weight: 500;
    font-size: 18px;
  }

  .el-header a {
    color: white;
    font-size: 16px;
  }

  .el-main {
    padding: 0;
  }
</style>

<style>

</style>
