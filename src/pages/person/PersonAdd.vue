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
    <DialogCropper :imageUrl="imageUrl" :file="file" :replace="replace" :uploadBlob="uploadBlob" :visible="visible"/>
  </div>
</template>

<script>
  import DialogCropper from './dialog/DialogCropper'
  import Message from '@/components/messages'

  export default {
    name: "PersonAdd",
    components: {
      DialogCropper
    },
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

        $.ajax({
          type: "POST",
          url: "${pageContext.request.contextPath}/person/add",
          contentType: false,//必须false才会自动加上正确的Content-Type
          processData: false,//必须false才会避开jQuery对 formdata 的默认处理
          data: formData,
          beforeSend: function (xhr) {//setRequestHeader
          },
          xhr: function () { //获取ajaxSettings中的xhr对象，为它的upload属性绑定progress事件的处理函数
            xhr = $.ajaxSettings.xhr();
            if (xhr.upload) { //检查upload属性是否存在
              //绑定progress事件的回调函数
              xhr.upload.addEventListener('progress', function (e) {
                l(Math.round(((e.loaded / e.total) || 0) * 100));
              }, false);
            }
            return xhr; //xhr对象返回给jQuery使用
          },
          success: function (result) {
            Message.success(result.message);
            if (0 === result.code) {
            }
          },
          error: function (error) {
            Message.alert(error.statusText);
          },
          complete: function (xhr, textStatus) {
            Message.closeLoading();
          }
        });
      }
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

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
