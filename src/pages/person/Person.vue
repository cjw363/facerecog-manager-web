<template>
  <el-container v-if="reFresh">
    <el-aside width="250px">
      <PersonTree/>
    </el-aside>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
  import PersonTree from './PersonTree'

  export default {
    name: "Person",
    components: {
      PersonTree
    },
    created() {
      this.$router.push("/person/person_tbl")
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
        reloadPerson: this.reload
      }
    },
    watch: {
      "$route": function () {
        if (this.$route.path === '/person/person')
          this.$router.push("/person/person_tbl")
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
