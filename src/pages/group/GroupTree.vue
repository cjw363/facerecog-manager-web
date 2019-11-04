<template>
  <div>
    <div class="tree-header-item" @click="addGroup()">
      <i class="el-icon-circle-plus-outline"></i>
      <span>添加组别</span>
    </div>
    <el-tree :data="items"
             :props="defaultProps"
             @node-click="onNodeClick"
             @node-expand="onHandleExpand"
             node-key="group_id"
             :default-expanded-keys="[-1]"
             highlight-current
             ref="tree"></el-tree>
  </div>
</template>

<script>
  import Message from '@/components/messages'

  export default {
    name: "GroupTree",
    inject: ['reloadGroup'],
    data() {
      return {
        items: [{
          group_id: -1,
          group_name: '组别列表',
          children: []
        }],
        defaultProps: {
          children: 'children',
          label: 'group_name'
        },
      }
    },
    methods: {
      onNodeClick(data) {
        if (data.group_id !== -1) {
          this.$router.push({
            path: '/group/group_detail',
            query: {
              group_id: data.group_id
            },
          })
        }
      },
      onHandleExpand(data, node, tree) {
      },
      addGroup() {
        Message.prompt('添加组别').then(value => {
          if (value.trim()) {
            this.$post('/group/add', {
              group_name: value.trim()
            }).then(result => {
              this.reloadGroup()
            })
          }
        })
      },
    },
    created() {
      this.$get('/group/list').then(result => {
        this.items[0].children = result.data.list;

        this.$store.commit('group/setGroupList', this.items[0].children)
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
