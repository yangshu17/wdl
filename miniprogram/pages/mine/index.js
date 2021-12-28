// pages/mine/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isAuth: wx.getStorageSync("userInfo").nickName,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  getUserNumber(e) {
    console.log(111, e);
  },

  getUserInfo(e) {
    let info = e.detail.userInfo;
    wx.$api
      .updateUser({
        ...info,
        ...wx.getStorageSync("userInfo"),
      })
      .then((res) => {
        console.log(6666, res);
        wx.setStorageSync("userInfo", {
          ...info,
          ...wx.getStorageSync("userInfo"),
        });
        this.setData({
          isAuth: true,
        });
      });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
