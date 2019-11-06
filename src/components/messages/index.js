import {Loading, Message, MessageBox} from 'element-ui';

let loadingInstance;
let loadingCount = 0;
const m = {
  info(msg) {
    Message({
      showClose: true,
      message: msg,
      type: 'info'
    });
  },
  error(msg) {
    Message({
      showClose: true,
      message: msg,
      type: 'error'
    });
  },
  success(msg) {
    Message({
      showClose: true,
      message: msg,
      type: 'success'
    });
  },
  warning(msg) {
    Message({
      showClose: true,
      message: msg,
      type: 'warning'
    });
  },
  alert(msg) {
    return new Promise((resolve, reject) => {
      MessageBox.alert(msg, '提示', {
        showConfirmButton: false,
        showCancelButton: false,
        closeOnClickModal: true,
        type: 'warning'
      }).then(() => {
      }).catch(() => {
      });
    })
  },
  confirm(msg) {
    return new Promise((resolve, reject) => {
      MessageBox.confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        resolve()
      })
        .catch(() => {
          // reject()
        });
    })
  },
  prompt(msg) {
    return new Promise((resolve, reject) => {
      MessageBox.prompt(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({value}) => {
        resolve(value)
      }).catch(() => {
        reject()
      });
    })
  },
  showLoading(text='') {
    if (loadingCount === 0) {
      loadingInstance = Loading.service(
        {
          lock: false,
          background: 'rgba(0, 0, 0, 0.1)',
          fullscreen: true,
          text:text
        });
    }
    loadingCount++
  },
  closeLoading() {
    if (loadingCount <= 0) return
    loadingCount--
    loadingCount === 0 && loadingInstance.close();
  }
}

export default m;
