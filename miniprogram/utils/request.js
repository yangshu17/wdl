// import SD_ACCOUNT from '../miniprogram_npm/sd-miniprogram-account/index'
// import { BASE_URL, THIRD_TYPE } from '../config/constants'
// import code from '../config/code'

// const account = SD_ACCOUNT.account({ thirdType: THIRD_TYPE })
// // 是否console
// const logFlag = true
// // log
// const log = (...arg) => { logFlag && console.log('request debug => ', ...arg) }
// // 过期天数
// let onRreshToken = false
// const expireDay = 6
// // 前端通过时间来判断token是否过期
// const webTokenExpire = () => {
//   return !getTimeStamp() || ((new Date().valueOf() - Number(getTimeStamp())) > (1000 * 3600 * 24 * expireDay))
// }
// // methods list
// const methods = ['OPTIONS', 'GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'TRACE', 'CONNECT']
// const request = {}

// // axios判断规则
// function isAbsoluteURL (url) {
//   // eslint-disable-next-line
//   return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url)
// }

// // 获取token
// function getToken () {
//   const userInfo = wx.getStorageSync('userInfo') || {}
//   return userInfo.sdToken || ''
// }

// // 获取时间戳
// function getTimeStamp () {
//   const userInfo = wx.getStorageSync('userInfo') || {}
//   return userInfo.timeStamp || ''
// }

// function cookie () {
//   const isCannry = wx.getStorageSync('isCannry') || false
//   let cookie = {
//     cookie: ''
//   }
//   if (isCannry) {
//     cookie = {
//       cookie: 'thor_api=canary'
//     }
//   }
//   return cookie
// }

// request.needLogin = {}
// methods.forEach(method => {
//   const methodsName = method.toLowerCase()
//   request[methodsName] = function (url, data = {}, header = {}, dataType, responseType) {
//     const fullUrl = isAbsoluteURL(url) ? url : BASE_URL + url
//     const dataProcessed = {
//       AuthorizationV2: getToken(),
//       ...data,
//       thirdType: THIRD_TYPE
//     }
//     const headerProcessed = {
//       'Content-Type': 'application/x-www-form-urlencoded',
//       ...header,
//       ...cookie()
//     }
//     return new Promise((resolve, reject) => {
//       const requestObj = {
//         url: fullUrl,
//         data: dataProcessed,
//         header: headerProcessed,
//         method,
//         dataType,
//         responseType,
//         success (res, statusCode) {
//           try {
//             // 兼容后端特殊字符
//             res.data = typeof res.data === 'string' ? JSON.parse(res.data.replace(/\s*/g, '')) : res.data
//           } catch (e) {
//             console.log(e)
//           }
//           if (+res.data.code === code.SUCCESS) {
//             resolve(res.data, statusCode)
//           } else {
//             reject(res.data, statusCode)
//           }
//         },
//         fail (res, statusCode) {
//           reject(res, statusCode)
//         }
//       }
//       wx.request(requestObj)
//     })
//   }
//   request.needLogin[methodsName] = function (url, data = {}, header = {}, dataType, responseType) {
//     return new Promise((resolve, reject) => {
//       // 请求func
//       const fetchFunc = (succCb = () => {}, failCb) => {
//         request[methodsName](url, data, header, dataType, responseType).then((...args) => {
//           succCb && succCb()
//           resolve(...args)
//         }).catch((...args) => { failCb ? failCb(...args) : reject(...args) }) // eslint-disable-line
//       }
//       // 判断当前刷新token的状态
//       const checkRefreshStatus = () => {
//         if (onRreshToken) {
//           wx.$event.addListener('endPending', fetchFunc)
//           return true
//         } else {
//           onRreshToken = true
//           return false
//         }
//       }
//       // 刷新token
//       const refreshTokenFunc = () => {
//         if (checkRefreshStatus()) return
//         account.refreshToken().then(() => {
//           log('刷新token成功 重新执行', url)
//           fetchFunc(() => {
//             onRreshToken = false
//             wx.$event.onEvent('endPending')
//           })
//         }).catch(e => {
//           log('刷新token失败 尝试隐式注册', e)
//           // 尝试隐式注册
//           hideRegisterFunc()
//         })
//       }
//       // 隐式注册
//       const hideRegisterFunc = () => {
//         account.logoutLocally()
//         account.hideLogin({ needRegister: true }).then(() => {
//           log('隐式注册成功 重新执行')
//           fetchFunc(() => {
//             onRreshToken = false
//             wx.$event.onEvent('endPending')
//           })
//         }).catch(e => {
//           log('隐式注册失败', e)
//           reject(e)
//         })
//       }
//       let token = getToken()
//       // 无token 进入队列
//       // 场景1: 新用户之前没token，隐式注册没回来
//       // 场景2: 新用户之前没token，隐式注册回来了
//       if (!token) {
//         log('token为空，进入队列', url, data)
//         if (!global.pending) {
//           fetchFunc()
//         } else {
//           wx.$event.addListener('hideRegisterEnd', () => {
//             log('隐式注册成功 重复执行', url, data)
//             fetchFunc()
//           })
//         }
//         return
//       }
//       // token过期和请求回来token过期同逻辑
//       if (webTokenExpire()) {
//         refreshTokenFunc()
//         return
//       }
//       // 正在刷token 直接监听endPending
//       if (onRreshToken) {
//         wx.$event.addListener('endPending', () => {
//           log('重复执行', url, data)
//           fetchFunc()
//         })
//         return
//       }
//       // 发请求
//       fetchFunc(() => {}, (data) => {
//         if (data) {
//           if (+data.code === code.USER_ACCOUNT_TOKEN_EXPIRED) {
//             log(`code为${data.code}，刷新token`)
//             refreshTokenFunc()
//           } else if (+data.code === code.USER_ACCOUNT_NO_LOGIN) {
//             log(`code为${data.code}，隐式注册`)
//             hideRegisterFunc()
//           } else {
//             reject(data)
//           }
//         } else {
//           reject() // eslint-disable-line
//         }
//       })
//     })
//   }
// })

// export default request
