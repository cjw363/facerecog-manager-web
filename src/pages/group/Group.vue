<template>
  <el-container v-if="reFresh">
    <el-aside width="250px">
      <GroupTree/>
    </el-aside>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
  import GroupTree from './GroupTree'

  export default {
    name: "Group",
    components: {
      GroupTree
    },
    created() {
      this.$router.push("/group/group_tbl")
    },
    data() {
      return {
        reFresh: true
      }
    },
    methods: {
      async reload() {
        this.reFresh = false
        await this.$nextTick()
        this.reFresh = true
      }
    },
    provide() {
      return {
        reloadGroup: this.reload
      }
    },
    watch: {
      "$route": function () {
        if (this.$route.path === '/group/group')
          this.$router.push("/group/group_tbl")
      }
    }
  }
</script>

<style scoped>
  .el-aside {
    border-right: solid 1px #e6e6e6;
  }

  .el-main {
    padding: 20px;
  }
</style>
