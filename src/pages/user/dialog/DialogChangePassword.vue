<template>
  <el-dialog title="修改密码"
             :visible.sync="visible"
             width="600px">
    <el-form :model="model" label-width="25%" :rules="rules" ref="ref">
      <el-form-item label="旧密码" prop="old_password">
        <el-input v-model="model.old_password" type="password" autocomplete="off"
                  placeholder="请输入旧密码" size="small" style="width: 75%;"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="new_password">
        <el-input v-model="model.new_password" type="password" autocomplete="off"
                  placeholder="请输入新密码" size="small" style="width: 75%;"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false" size="small">取消</el-button>
      <el-button type="primary" @click="changePassword" size="small">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: "DialogChangePassword",
    data() {
      return {
        visible: false,
        model: {
          old_password: '',
          new_password: ''
        },
        rules: {
          old_password: [
            {required: true, message: '请输入旧密码', trigger: 'blur'}
          ],
          new_password: [
            {required: true, message: '请输入新密码', trigger: 'blur'}
          ]
        },
      }
    },
    methods: {
      changePassword() {
        this.$refs.ref.validate((valid) => {
          if (valid) {
            this.$post('/user/change_password', {
              old_password: this.model.old_password,
              new_password: this.model.new_password
            }).then(result => {
              this.$message.success(result.message)
              this.visible = false
            })
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
