<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>设备管理</el-breadcrumb-item>
      <el-breadcrumb-item>设备详情</el-breadcrumb-item>
      <el-breadcrumb-item>{{device.device_name}}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form label-width="170px" :model="model" :rules="rule" ref="form">
      <el-form-item label="设备sn编号">
        <span>{{device.device_sn}}</span>
      </el-form-item>
      <el-form-item label="ARCFACE_APPID" prop="arcface_appid">
        <el-input v-model="model.arcface_appid" type="text" autocomplete="off" size="small"></el-input>
      </el-form-item>
      <el-form-item label="ARCFACE_SDKKEY" prop="arcface_sdkkey">
        <el-input v-model="model.arcface_sdkkey" type="text" autocomplete="off" size="small"></el-input>
      </el-form-item>
      <el-form-item label="ARCFACE_ACTIVEKEY">
        <el-input v-model="model.arcface_activekey" type="text" autocomplete="off" size="small"></el-input>
      </el-form-item>
      <el-form-item label="BAIDU_TTS_APPID">
        <el-input v-model="model.baidu_tts_appid" type="text" autocomplete="off" size="small"></el-input>
      </el-form-item>
      <el-form-item label="BAIDU_TTS_APPKEY">
        <el-input v-model="model.baidu_tts_appkey" type="text" autocomplete="off" size="small"></el-input>
      </el-form-item>
      <el-form-item label="BAIDU_TTS_SECRETKEY">
        <el-input v-model="model.baidu_tts_secretkey" type="text" autocomplete="off" size="small"></el-input>
      </el-form-item>
      <el-form-item label="注册时间">
        <span>{{device.register_time|formatDate}}</span>
      </el-form-item>
      <el-form-item label="在线状态">
        <span v-if="device.online===1">在线</span>
        <span v-if="device.online===0">离线</span>
      </el-form-item>
      <el-form-item label="激活状态">
        <span v-if="device.status===1">已激活</span>
        <div v-if="device.status===0">
          <span>未激活</span>
          <el-button type="primary" round id="btn_active" @click="onClick" size="small">激活</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import Message from '@/components/messages'

  export default {
    name: "DeviceInactDetail",
    inject: ['reloadDevice'],//注入重载device的方法
    data() {
      return {
        device:'',
        model: {
          arcface_appid: '',
          arcface_sdkkey: '',
          arcface_activekey: '',
          baidu_tts_appid: '',
          baidu_tts_appkey: '',
          baidu_tts_secretkey: ''
        },
        rule: {
          arcface_appid: [
            {required: true, message: '请填入授权码', trigger: 'blur'}
          ],
          arcface_sdkkey: [
            {required: true, message: '请填入授权码', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      get() {
        this.$post('/device/inact_detail', {
          device_sn: this.$route.query.device_sn
        }).then(result => {
          this.device = result.data
          this.model.arcface_appid=this.device.arcface_appid
          this.model.arcface_sdkkey=this.device.arcface_sdkkey
        })
      },
      onClick(){
        this.$refs.form.validate((valid) => {
          if (!valid) return;
          this.$post('/device/activate',{
            device_sn: this.$route.query.device_sn,
            arcface_appid: this.model.arcface_appid,
            arcface_sdkkey: this.model.arcface_sdkkey,
            arcface_activekey: this.model.arcface_activekey,
            baidu_tts_appid: this.model.baidu_tts_appid,
            baidu_tts_appkey: this.model.baidu_tts_appkey,
            baidu_tts_secretkey: this.model.baidu_tts_secretkey
          }).then(result=>{
            Message.success(result.message)
            this.reloadDevice()
          })
        });
      }
    },
    created() {
      this.get();
    },
    watch: {
      "$route": "get"
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
