import Vue from 'vue'
import axios from 'axios'
import qs from 'qs';

axios.defaults.baseURL = 'http://127.0.0.1:9090/cpfr/' // 设置axios的基础请求路径
// axios.defaults.baseURL = 'http://132.232.108.138/cpfr' // 设置axios的基础请求路径
axios.defaults.timeout = 5000 // 设置axios的请求时间
axios.defaults.withCredentials=true; // 允许携带cookie 解决不同端口cookie失效问题
axios.defaults.headers={
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/x-www-form-urlencoded',
};

axios.load = async function (url) {
  const resp = await axios.get(url);
  return resp.data;
}

axios.interceptors.request.use(function (config) {
  //在发送请求之前做一些事情
  return config;
}, function (error) {
  // 请求错误做一些事情
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  //对响应数据做一些处理
  return response;
}, function (error) {
  // 对响应失败做一些处理
  return Promise.reject(error);
});

export function axiosGet(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, qs.stringify(params))
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}

//post封装
export function axiosPost(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(params))
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}

Vue.prototype.$axios = axios;// 将axios添加到 Vue的原型，这样一切vue实例都可以使用该对象
Vue.prototype.$get = axiosGet;
Vue.prototype.$post = axiosPost;

