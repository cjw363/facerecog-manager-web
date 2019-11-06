<template>
  <el-form label-width="120px">
    <el-form-item label="组ID">
      <span>{{group.group_id}}</span>
    </el-form-item>
    <el-form-item label="组名">
      <el-input v-model="groupModel.group_name" v-bind:value="group.group_name" type="text" autocomplete="off" size="small"></el-input>
    </el-form-item>
    <el-form-item label="创建时间">
      <span>{{group.create_time|formatDate}}</span>
    </el-form-item>
    <el-form-item label="操作">
      <el-button size="small" type="success" @click="updateGroupInfo">保存</el-button>
      <el-button size="small" type="danger" @click="deleteGroup">删除</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import Message from '@/components/messages'

  export default {
    name: "GroupInfo",
    inject: ['reloadGroup'],
    props: {
      group: {}
    },
    data() {
      return {
        groupModel: ''
      }
    },
    methods: {
      updateGroupInfo() {
        this.$post('/group/update_info', {
          group_id: this.group.group_id,
          group_name: this.groupModel.group_name
        }).then(result => {
          this.$message.success(result.message)

          this.groupList.find(g => g.group_id === this.group.group_id).group_name = this.groupModel.group_name
        })
      },
      deleteGroup() {
        Message.confirm("确定删除该组？").then(() => {
          this.$post('/group/delete', {
            group_id: this.group.group_id
          }).then(result => {
            Message.success(result.message)
            this.reloadGroup()
            this.$router.push("/group/group_tbl")
          })
        });
      }
    },
    watch: {
      'group': function (newVal, oldVal) {
        this.groupModel = Object.assign({}, this.group)
      }
    },
    computed: {
      'groupList': function () {
        return this.$store.getters['group/getGroupList']
      }
    }
  }
</script>

<style scoped>
  .el-form-item .el-input {
    width: 400px;
  }

  /deep/ .el-input--suffix .el-input__inner {
    width: 400px;
  }
</style>
