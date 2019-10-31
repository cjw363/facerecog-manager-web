<template>
  <div>
    <el-form label-width="150px" :model="personModel" ref="perBaseInfoForm" :rules="rules">
      <el-form-item label="人员ID">
        <span>{{person.person_id}}</span>
      </el-form-item>
      <el-form-item label="注册时间">
        <span>{{person.add_time|formatDate}}</span>
      </el-form-item>
      <el-form-item label="姓名" prop="person_name">
        <el-input v-bind:value="person.person_name" v-model="personModel.person_name" type="text" autocomplete="off" size="small"></el-input>
      </el-form-item>
      <el-form-item label="工号">
        <el-input :value="person.emp_number" v-model="personModel.emp_number" type="text" autocomplete="off" size="small"></el-input>
      </el-form-item>
      <el-form-item label="底库图片">
        <el-upload class="avatar-uploader"
                   :action="action"
                   :show-file-list="true"
                   :http-request="myUpload"
                   :auto-upload="false"
                   :on-change="onChange"
                   :before-upload="beforeUpload"
                   ref="upload">
          <img v-if="imageUrl" :src="imageUrl" class="image avatar">
        </el-upload>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" size="small" @click="onClickUpload()">保存</el-button>
        <el-button type="danger" size="small" @click="deletePerson()">删除</el-button>
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
    name: "PersonInfo",
    inject: ['reloadPerson'],
    props: {
      person: {
        type: Object,
        default: () => ({}),
        person_id: '',
        add_time: '',
        person_name: '',
        emp_number: '',
        base_image: ''
      }
    },
    data() {
      return {
        personModel: '',
        rules: {
          person_name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ]
        },
        action: "/person/update_info",
        imageUrl: '',
        file: '',
        replace: false,
        uploadBlob: '',
        visible: false,
      }
    },
    methods: {
      deletePerson() {
        Message.confirm("确定删除该人员？").then(() => {
          this.$post('/person/delete',{
            person_id: this.person.person_id
          }).then(result=>{
            Message.success(result.message)
            this.reloadPerson()
            this.$router.push("/person/person_tbl")
          })
        });
      },
      myUpload() {
        let model = this.$refs.perBaseInfoForm.model;
        let file = this.uploadBlob;

        Message.showLoading("上传中");
        let formData = new FormData();
        formData.append("person_id", this.person.person_id);
        formData.append("person_name", model.person_name);
        formData.append("emp_number", model.emp_number);
        formData.append("file", file);

        this.$axios.post('/person/update_img_info', formData, {
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

            this.personList.find(p => p.person_id === this.person.person_id).person_name = this.personModel.person_name
          })
          .catch(error => {
            Message.closeLoading();
          });
      },
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
        this.$refs.perBaseInfoForm.validate((isValid) => {
          if (isValid) {
            if (this.$refs.upload.uploadFiles.length < 1) {
              var model = this.$refs.perBaseInfoForm.model;

              this.$post('/person/update_info', {
                person_id: this.person.person_id,
                person_name: model.person_name,
                emp_number: model.emp_number
              }).then(result => {
                this.$message.success(result.message);

                this.personList.find(p => p.person_id === this.person.person_id).person_name = this.personModel.person_name
              })
            } else if (this.$refs.upload.uploadFiles.length > 1) {
              this.$message.error('请选择图片');
            } else
              this.$refs.upload.submit();
          }
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
      }
    },
    watch: {
      'person': function (newVal, oldVal) {//监听device变化
        this.personModel = Object.assign({}, this.person)
        this.imageUrl = 'data:image/jpeg;base64,' + this.person.base_image
      }
    },
    computed: {
      'personList': function () {
        return this.$store.getters['person/getPersonList']
      }
    }
  }
</script>

<style scoped>
  .el-form-item .el-input {
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
