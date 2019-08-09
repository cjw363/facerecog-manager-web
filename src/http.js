import Vue from 'vue'
import axios from 'axios'
import qs from 'qs';
import router from './router'
import {Loading} from 'element-ui';
import Message from './components/messages';

axios.defaults.baseURL = 'http://127.0.0.1:9090/cpfr/' // 设置axios的基础请求路径
// axios.defaults.baseURL = 'http://152.136.134.235:9090/cpfr' // 设置axios的基础请求路径
axios.defaults.timeout = 30000 // 设置axios的请求时间
axios.defaults.withCredentials = true; // 允许携带cookie 解决不同端口cookie失效问题
axios.defaults.headers = {
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/x-www-form-urlencoded',
};

axios.load = async function (url) {
  const resp = await axios.get(url);
  return resp.data;
}

let loadingInstance;
let loadingCount = 0;

axios.interceptors.request.use((config) => {
  //在发送请求之前做一些事情
  showLoading();
  return config;
}, function (error) {
  // 请求错误做一些事情
  return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
  //对响应数据做一些处理
  closeLoading();
  if (0 !== response.data.code) {
    if (102 === response.data.code) {
      router.push("/login")
      Message.warning(response.data.message + ",请重新登录")
    } else
      Message.alert(response.data.message)
  }
  return response;
}, (error) => {
  // 对响应失败做一些处理
  closeLoading();
  Message.alert(error)
  return Promise.reject(error);
});

export function showLoading() {
  if (loadingCount === 0) {
    loadingInstance = Loading.service(
      {
        lock: false,
        background: 'rgba(0, 0, 0, 0.1)',
        fullscreen: true
      });
  }
  loadingCount++
}

export function closeLoading() {
  if (loadingCount <= 0) return
  loadingCount--
  loadingCount === 0 && loadingInstance.close();
}

export function axiosGet(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(response => {
      0 === response.data.code && resolve(response.data);
    })
      .catch(err => {
      })
  })
}

//post封装
export function axiosPost(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(params))
      .then(response => {
        0 === response.data.code && resolve(response.data);
      }, err => {
      })
  })
}

Vue.prototype.$axios = axios;// 将axios添加到 Vue的原型，这样一切vue实例都可以使用该对象
Vue.prototype.$get = axiosGet;
Vue.prototype.$post = axiosPost;

