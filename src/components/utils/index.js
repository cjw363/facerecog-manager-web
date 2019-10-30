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
  }
}

export default u
