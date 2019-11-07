<template>
  <el-container>
    <el-header>人脸识别系统</el-header>
    <el-main>
      <el-form class="demo-ruleForm register-container" :model="registerModel" :rules="registerRules"
               ref="registerForm">
        <p class="title">管理员注册</p>
        <el-form-item prop="name">
          <el-input v-model="registerModel.name" type="text" autocomplete="off" placeholder="请输入账号"
                    clearable></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="registerModel.password" type="password" autocomplete="off"
                    placeholder="请输入密码" clearable id="password"></el-input>
        </el-form-item>
        <el-form-item prop="passwordConfirm">
          <el-input v-model="registerModel.passwordConfirm" type="password" autocomplete="off"
                    placeholder="请再次输入密码" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="onClickRegister('registerForm')">注册
          </el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    name: "Register",
    data() {
      let checkInput = function (rule, value, callback) {
        let pattern = /^[0-9a-zA-Z]{4,12}$/;
        if (!pattern.test(value)) {
          callback(new Error("需要4个字符以上，并且只能是数字或者字母组成"));
        } else callback()
      };
      let checkPsConf = function (rule, value, callback) {

        let password = document.querySelector('#password').value
        if (password !== value)
          callback(new Error("两次输入的密码不一致"));
        else callback()
      };

      return {
        registerModel: {
          name: '',
          password: '',
          passwordConfirm: ''
        },
        registerRules: {
          name: [
            {required: true, message: '请输入账号', trigger: 'blur'},
            {validator: checkInput, trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {validator: checkInput, trigger: 'blur'}
          ],
          passwordConfirm: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {validator: checkPsConf, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      onClickRegister(formName) {
        this.$refs[formName].validate((isValid) => {
          let model = this.$refs[formName].model;
          if (isValid) {
            this.$post('/user/register', {
              name: model.name,
              password: model.password
            }).then(data => {
              this.$router.push("/login");
            })
          }
        });

      }
    }
  }
</script>

<style scoped>
  .el-header {
    margin-top: 100px;
    color: #222222;
    text-align: center;
    line-height: 60px;
    font-size: 26px;
  }

  .register-container {
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: auto;
    width: 350px;
    padding: 25px 35px 15px;
    background: white;
    filter: alpha(opacity:90);
    opacity: 0.9;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .register-container .title {
    margin: 0 auto 25px;
    text-align: center;
    color: #222222;
    font-size: 17px;
  }

  .el-button {
    width: 100%;
  }

  a {
    color: #222222;
    text-decoration: none;
  }

</style>
