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
  //求数据差集
  arrayIntersect(a, b) {
    let arr1 = a.concat();
    let arr2 = b.concat();
    let diff = [];
    let tmp = arr2;

    arr1.forEach(function (val1, i) {
      if (arr2.indexOf(val1) < 0) {
        diff.push(val1);
      } else {
        tmp.splice(tmp.indexOf(val1), 1);
      }
    });

    return diff.concat(tmp);
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
  formatDate(value) {
    return moment(value).format('YYYY-MM-DD HH:mm:ss');
  },
  dataURLtoBlob(dataurl) {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type: mime});
  },
  uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      let r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    })
  }
}

export default u
