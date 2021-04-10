
import axios from 'axios'
export const $getJson = (url) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: url,
      dataType: "json",
      crossDomain: true,
      cache: false
    }).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}