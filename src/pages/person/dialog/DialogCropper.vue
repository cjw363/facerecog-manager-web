<template>
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
</template>

<script>
  import Cropper from 'cropperjs'
  import 'cropperjs/dist/cropper.css'//很重要

  export default {
    name: "DialogCropper",
    props: {
      imageUrl: '',
      visible: false,
      file: '',
      replace: false,
      uploadBlob: ''
    },
    data() {
      return {
        cropper: ''
      }
    },
    methods: {
      onClickCropper() {
        const cropper = new Cropper(document.getElementsByClassName('cropper-container')[0].children[0], {});
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
        this.uploadBlob = this.dataURLtoBlob(base64url);//生成base64格式的blob
        this.visible = false;
        this.imageUrl = base64url;
      },
      opened() {
        if (this.replace) {
          this.cropper.replace(URL.createObjectURL(this.file.raw))
        } else {
          const img = document.getElementsByClassName('cropper-container')[0].children[0];
          img.src=URL.createObjectURL(this.file.raw);
            this.cropper = new Cropper(img, {
              aspectRatio: 1,
              viewMode: 0,
              preview: ".cropper-preview"
            });

          // this.replace = true;
        }
      },
      closed() {
        // this.file = '';
      },
      dataURLtoBlob(dataurl) {
        let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type: mime});
      }
    }
  }
</script>

<style scoped>
  .cropper-container {
    width: 100%;
  }

  .cropper-preview {
    margin-left: 5px;
    width: 100%;
    height: 200px;
    background-color: black;
    overflow: hidden;
  }
</style>
