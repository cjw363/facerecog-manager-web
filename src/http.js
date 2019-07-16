import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:9090/' // 设置axios的基础请求路径
// axios.defaults.baseURL = 'http://132.232.108.138/cpfr' // 设置axios的基础请求路径
axios.defaults.timeout = 2000 // 设置axios的请求时间

axios.loadData = async function (url) {
  const resp = await axios.get(url);
  return resp.data;
}

Vue.prototype.$axios = axios;// 将axios添加到 Vue的原型，这样一切vue实例都可以使用该对象

