<template>
  <router-view/>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  .el-container, .el-main, el-aside {
    height: 100%;
    padding: 0;
    margin: 0;
  }

  .el-pagination {
    margin-top: 10px;
  }

  .el-breadcrumb {
    margin-bottom: 15px;
  }

  * {
    margin: 0;
    padding: 0;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }

  html, body {
    height: 100%;
    width: 100%;
  }

  a:hover, a:visited, a:active, a:focus, a:-webkit-any-link {
    text-decoration: none;
  }

  .box {
    text-align: center;
  }

  .image {
    width: 148px;
    height: 148px;
  }

  .image_tbl {
    width: 90px;
    height: 90px;
  }

  .circle {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: #4cae4c;
    margin-right: 5px;
  }

  .el-container::-webkit-scrollbar, .el-main::-webkit-scrollbar, .el-aside::-webkit-scrollbar { /*滚动条整体样式*/
    width: 12px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
  }

  .el-container::-webkit-scrollbar-thumb, .el-main::-webkit-scrollbar-thumb, .el-aside::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
    border-radius: 12px;
    background: #CCCCCC;
  }

  .el-container::-webkit-scrollbar-track, .el-main::-webkit-scrollbar-track, .el-aside::-webkit-scrollbar-track { /*滚动条里面轨道*/
    border-radius: 12px;
    background: #E1E1E1;
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
