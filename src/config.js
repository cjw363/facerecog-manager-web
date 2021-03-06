import moment from 'moment'
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import qs from 'qs'
import Vuex from 'vuex'
import utils from './components/utils'

Vue.config.productionTip = false // 阻止启动生产消息，常用作指令。

Vue.use(Vuex)
Vue.use(ElementUI)
Vue.prototype.$qs = qs
Vue.prototype.$utils = utils


Vue.filter('formatDate', function (value, formatString) {
  formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
  return moment(value).format(formatString);
})
