import moment from 'moment'
import Vue from 'vue'

Vue.filter('formatDate', function (value, formatString) {
  formatString = formatString || 'YYYY-MM-DD HH:mm';
  return moment(value).format(formatString);
})
