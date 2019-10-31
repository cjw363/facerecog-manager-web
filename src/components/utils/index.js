import moment from 'moment'
const u = {
  removeArrMinusOne(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === -1) {
        arr.splice(i, 1);
        i--;
      }
    }
    return arr;
  },
  arrayRemoveObj(_arr, _obj) {
    let length = _arr.length;
    for (let i = 0; i < length; i++) {
      if (_arr[i] === _obj) {
        if (i === 0) {
          _arr.shift(); //删除并返回数组的第一个元素
          return;
        } else if (i === length - 1) {
          _arr.pop();  //删除并返回数组的最后一个元素
          return;
        } else {
          _arr.splice(i, 1); //删除下标为i的元素
          return;
        }
      }
    }
  },
  stampToDate(timestamp) {
    let unixtimestamp = new Date(timestamp * 1000);
    let year = 1900 + unixtimestamp.getYear();
    let month = "0" + (unixtimestamp.getMonth() + 1);
    let date = "0" + unixtimestamp.getDate();
    let hour = "0" + unixtimestamp.getHours();
    let minute = "0" + unixtimestamp.getMinutes();
    let second = "0" + unixtimestamp.getSeconds();
    return year + "-" + month.substring(month.length - 2, month.length) + "-" + date.substring(date.length - 2, date.length)
      + " " + hour.substring(hour.length - 2, hour.length) + ":"
      + minute.substring(minute.length - 2, minute.length) + ":"
      + second.substring(second.length - 2, second.length);
  },
  dateToStamp(stringTime) {
    return Date.parse(new Date(stringTime)) / 1000;
  },
  formatDate(value){
    return moment(value).format('YYYY-MM-DD HH:mm:ss');
  }
}

export default u
