// import { APP_API } from 'api'
// import * as types from './mutation-types'
import api from 'src/api/app/index'
export default {
  // 异步操作
  // APP_API.getAllMessages(messages => {
  //   commit(types.RECEIVE_ALL, {
  //     messages
  //   })
  // })
  getUserInfo ({commit}) {
    return new Promise((resolve, reject) => {
      api.getUserInfo().then(res => {
        commit('MT_GETUSERINFO', res)
        resolve(res)
      }, err => {
        reject(err)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
