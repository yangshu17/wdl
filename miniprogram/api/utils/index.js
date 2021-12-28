// import request from '../../utils/request'

export default (type, data) => {
  wx.showLoading({
    title: "",
  });
  return new Promise((resolve, reject) => {
    let user = wx.getStorageSync("userInfo") || {}
    wx.cloud
      .callFunction({
        name: "quickstartFunctions",
        data: {
          token: user.userId,
          type,
          data,
        },
      })
      .then((res) => {
        wx.hideLoading();
        resolve(res);
      })
      .catch((err) => {
        wx.hideLoading();
        reject(err);
      });
  });
};
