export default {
  // makeFormData: (obj, form_data) => {
  //   var data = []
  //   if (obj instanceof File) {
  //     data.push({key: '', value: obj})
  //   } else if (obj instanceof Array) {
  //     for (let j = 0, len = obj.length; j < len; j++) {
  //       let arr = makeFormData(obj[j]);
  //       for (let k = 0, l = arr.length; k < l; k++) {
  //         var key = !!form_data ? j + arr[k].key : '[' + j + ']' + arr[k].key
  //         data.push({key: key, value: arr[k].value})
  //       }
  //     }
  //   } else if (typeof obj === 'object') {
  //     for (let j in obj) {
  //       let arr = makeFormData(obj[j])
  //       for (let k = 0, l = arr.length; k < l; k++) {
  //         var key = !!form_data ? j + arr[k].key : '[' + j + ']' + arr[k].key
  //         data.push({key: key, value: arr[k].value})
  //       }
  //     }
  //   } else {
  //     data.push({key: '', value: obj})
  //   }
  //   if (!!form_data) {
  //     // 封装
  //     for (var i = 0, x = data.length; i < x; i++) {
  //       form_data.append(data[i].key, data[i].value)
  //     }
  //   } else {
  //     return data
  //   }
  // }
}
