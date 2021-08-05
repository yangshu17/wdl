// import request from '../../utils/request'

export default(type, data) => {
  wx.showLoading({
    title: '',
  })
  return new Promise((resolve, reject) => {
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      data: {
        type,
        data
      }
    }).then((res) => {
      wx.hideLoading()
      resolve(res)
    }).catch((err) => {
      wx.hideLoading()
      reject(err)
    })
  })
}

