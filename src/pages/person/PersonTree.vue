<template>
  <div>
    <div class="tree-header-item" @click="addPerson()">
      <i class="el-icon-circle-plus-outline"></i>
      <span>添加人员</span>
    </div>
    <el-tree
      :data="items"
      highlight-current
      :props="defaultProps"
      @node-click="onNodeClick"
      @node-expand="onHandleExpand"
      node-key="person_id"
      :default-expanded-keys="[-1]"
      ref="tree"></el-tree>
  </div>
</template>

<script>
  export default {
    name: "PersonTree",
    data() {
      return {
        items: [{
          person_id: -1,
          person_name: '人员列表',
          children: []
        }],
        defaultProps: {
          children: 'children',
          label: 'person_name'
        },
      }
    },
    methods: {
      onNodeClick(data) {
        if (data.person_id !== -1) {
          this.$router.push({
            path: '/person/person_detail',
            query: {
              person_id: data.person_id
            },
          })
        }
      },
      onHandleExpand(data, node, tree) {
      },
      addPerson() {
        this.$router.push('/person/person_add')
      },
    },
    created() {
      this.$get('/person/list').then(result => {
        this.items[0].children = result.data.list;

        this.$store.commit('person/setPersonList', this.items[0].children)
      })
    },
  }
</script>

<style scoped>
  /deep/ .el-tree-node__content {
    height: 36px;
  }

  .tree-header-item {
    height: 36px;
    line-height: 36px;
    padding-left: 6px;
    cursor: pointer;
  }

  .tree-header-item:hover {
    background-color: #F5F7FA;
  }

  .tree-header-item i, .tree-header-item span {
    color: #606266;
    font-size: 14px;
  }
</style>
