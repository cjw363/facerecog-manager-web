<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 15px;">
      <el-breadcrumb-item>人员管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加人员</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form label-width="120px" :model="model" :rules="rules" ref="uploadForm">

      <el-form-item label="姓名" prop="person_name">
        <el-input v-model="model.person_name" type="text" autocomplete="off" placeholder="请输入姓名" size="small"></el-input>
      </el-form-item>
      <el-form-item label="工号" prop="emp_number">
        <el-input v-model="model.emp_number" type="text" autocomplete="off" placeholder="请输入工号" size="small"></el-input>
      </el-form-item>
      <el-form-item label="请选择图片">
        <el-upload class="avatar-uploader"
                   :action="action"
                   :show-file-list="true"
                   :http-request="myUpload"
                   :auto-upload="false"
                   :on-change="onChange"
                   :before-upload="beforeUpload"
                   ref="upload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="onClickUpload()" size="medium">添加</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="请将头像位于框中"
               :visible.sync="visible"
               @opened="opened"
               @closed="closed"
               width="650px">
      <el-row>
        <el-col :span="16">
          <div class="cropper-container">
            <img>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="cropper-preview"></div>
        </el-col>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="onClickCropper">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import Message from '@/components/messages'
  import Cropper from 'cropperjs'
  import 'cropperjs/dist/cropper.css'//很重要

  export default {
    name: "PersonAdd",
    inject:['reloadPerson'],
    data() {
      return {
        model: {
          person_name: '',
          emp_number: ''
        },
        rules: {
          person_name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ]
        },
        action: "/person/add",
        imageUrl: '',
        file: '',
        replace: false,
        uploadBlob: '',
        visible: false,
      }
    },
    methods: {
      onChange(file, fileList) {
        this.$refs.upload.clearFiles();
        const isSuppType = file.raw.type.indexOf("image") !== -1;
        const isLt3M = file.raw.size / 1024 / 1024 < 3;

        if (!isSuppType) {
          this.$message.error('不支持该格式');
          return;
        }
        if (!isLt3M) {
          this.$message.error('图片不能超过3M');
          return;
        }

        this.file = file;
        this.visible = true;
      },
      beforeUpload(file) {
        const isLt = this.uploadBlob.size / 1024 < 65;
        if (!isLt) this.$message.error('图片过大');

        return isLt;
      },
      onClickUpload() {
        this.$refs.uploadForm.validate((isValid) => {
          if (isValid) {
            if (this.$refs.upload.uploadFiles.length <= 0) {
              this.$message.error('请先选择图片');
              return;
            } else if (this.$refs.upload.uploadFiles.length > 1) {
              this.$message.error('图片数量过多');
              return;
            }
            this.$refs.upload.submit();
          }
        });
      },
      myUpload() {
        let model = this.$refs.uploadForm.model;
        let file = this.uploadBlob;

        Message.showLoading("上传中");
        let formData = new FormData();
        formData.append("person_name", model.person_name);
        formData.append("emp_number", model.emp_number);
        formData.append("file", file);

        this.$axios.post('/person/add', formData, {
          //添加请求头
          headers: {"Content-Type": "multipart/form-data"},
          //添加上传进度监听事件
          onUploadProgress: e => {
            let completeProgress = ((e.loaded / e.total * 100) | 0) + "%";
            console.log(completeProgress)
          }
        })
          .then(response => {
            Message.closeLoading();
            Message.alert(response.data.message)

            this.reloadPerson();
            this.$router.push('/person/person_add')
          })
          .catch(error => {
            Message.closeLoading();
          });
      },
      onClickCropper() {
        let canvas = this.cropper.getCroppedCanvas({
          width: 480,
          height: 480,
          minWidth: 240,
          minHeight: 240,
          maxWidth: 480,
          maxHeight: 480,
          fillColor: '#000',
          imageSmoothingEnabled: false,//如果图像被设置为平滑(true，默认)
          imageSmoothingQuality: 'high'//设置图像的质量
        });

        let fileSize = this.file.raw.size / 1024;
        let quality;
        if (fileSize > 2048) quality = 0.6;
        else if (fileSize > 1024 && fileSize < 2048) quality = 0.7;
        else if (fileSize > 65 && fileSize < 1024) quality = 0.75;
        else quality = 0.9;

        let base64url = canvas.toDataURL('image/jpeg', quality);
        this.$refs.upload.uploadFiles[0] = this.file;
        this.uploadBlob = this.$utils.dataURLtoBlob(base64url);//生成base64格式的blob
        this.visible = false;
        this.imageUrl = base64url;
      },
      opened() {
        if (this.replace) {
          this.cropper.replace(URL.createObjectURL(this.file.raw))
        } else {
          const img = document.getElementsByClassName('cropper-container')[0].children[0];
          img.src = URL.createObjectURL(this.file.raw);
          this.cropper = new Cropper(img, {
            aspectRatio: 1,
            viewMode: 0,
            preview: ".cropper-preview"
          });

          this.replace = true;
        }
      },
      closed() {
        this.visible = false;
        this.file = '';
      },
    }
  }
</script>

<style scoped>
  .el-input {
    width: 400px;
  }

  /deep/ .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  /deep/ .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
</style>
