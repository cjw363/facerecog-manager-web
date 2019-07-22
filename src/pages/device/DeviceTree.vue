<template>
  <el-tree :data="items"
           accordion
           highlight-current
           :props="defaultProps"
           @node-click="onNodeClick"
           @node-expand="onHandleExpand"
           node-key="device_id"
           :default-expanded-keys="[-2]"
           ref="tree">
      <span class="custom-tree-node" slot-scope="{ node, data }">
            <span v-if="data.online===1" class="circle"></span>
            <span>{{ data.device_name }}</span>
      </span>
  </el-tree>
</template>

<script>
  export default {
    name: "DeviceTree",
    data() {
      return {
        items: [{
          device_id: -1,
          device_name: '未激活设备',
          children: []
        }, {
          device_id: -2,
          device_name: '已激活设备',
          children: []
        }],
        defaultProps: {
          children: 'children',
          label: 'device_name'
        },
      }
    },
    methods: {
      onNodeClick(data) {
        if (data.device_id > 0)
          this.$router.push({
            path: "/device/device_detail",
            query: {
              device_sn: data.status === 0 ? data.device_name : data.device_sn
            },
          })
      },
      onHandleExpand(data, node, tree) {
      }
    },
    created() {
      this.$get('/device/all_list').then(result => {
        this.items[0].children = result.data[0].list;
        this.items[1].children = result.data[1].list;

        this.$store.commit('device/setDeviceList', this.items[1].children)
      })
    }
  }
</script>

<style scoped>
  /deep/ .el-tree-node__content {
    height: 36px;
  }

  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 14px;
  }
</style>
