<template>
  <el-container :style="background">
    <el-header>人脸识别系统</el-header>
    <el-main>
      <el-form class="demo-ruleForm login-container" :model="loginModel" :rules="loginRules" ref="loginForm">
        <p class="title">管理员登录</p>
        <el-form-item prop="name">
          <el-input v-model="loginModel.name" type="text" autocomplete="off" placeholder="请输入账号"
                    clearable></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginModel.password" type="password" autocomplete="off" placeholder="请输入密码" @keyup.enter.native="onClickLogin('loginForm')"
                    clearable></el-input>
        </el-form-item>
<!--        <el-form-item>
          <el-dropdown trigger="click" style="float: right;" @command="handleCommand">
                          <span class="el-dropdown-link" style="cursor:default;">
                            {{dropdownTitle}}<i class="el-icon-sort el-icon&#45;&#45;right"></i>
                          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="zh_CN">
                中文
              </el-dropdown-item>
              <el-dropdown-item command="en_US">
                英文
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" v-on:click="onClickLogin('loginForm')">登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-main>
    <!--<el-footer>许可证编号：<a href="http://beian.miitbeian.gov.cn">粤ICP备19097013号</a></el-footer>-->
  </el-container>
</template>

<script>
  export default {
    name: 'Login',
    data: () => {
      let checkInput = function (rule, value, callback) {
        let pattern = /^[0-9a-zA-Z]{4,12}$/;
        if (!pattern.test(value)) {
          callback(new Error("需要4个字符以上，并且只能是数字或者字母组成"));
        } else callback()
      };

      return {
        loginModel: {
          name: '',
          password: ''
        },
        loginRules: {
          name: [
            {required: true, message: '请输入账号', trigger: 'blur'},
            {validator: checkInput, trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {validator: checkInput, trigger: 'blur'}
          ]
        },
        dropdownTitle: '中文',
        background: {
          backgroundImage: "url(" + require("../assets/images/background.jpg") + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%"
        },
      }
    },
    methods: {
      onClickLogin(formName) {
        this.$refs[formName].validate((isValid) => {
          let model = this.$refs[formName].model;
          if (isValid) {
            this.$post('/user/login', {
              name: model.name,
              password: model.password
            }).then(result => {
              this.$store.commit('user/setUser', result.data)
              this.$router.push("/web");
            })
          }
        });
      },
      handleCommand(command) {
      }
    }
  }
</script>

<style scoped>
  .el-header {
    margin-top: 100px;
    color: #fff;
    text-align: center;
    line-height: 60px;
    font-size: 26px;
  }

  .el-footer{
    text-align: center;
  }

  .login-container {
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

  .login-container .title {
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

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
</style>
