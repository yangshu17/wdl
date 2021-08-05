// miniprogram/pages/main/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  getData() {
    wx.showLoading({
      title: '',
    })
    wx.cloud.callFunction({
        name: 'quickstartFunctions',
        // config: {
        //   env: this.data.envId
        // },
        data: {
          type: 'selectRecord'
        }
      }).then((resp) => {
        this.setData({
          goodsList: resp.result.data
        })
      wx.hideLoading()
    }).catch((e) => {
        console.log(e)
        this.initData()
        wx.hideLoading()
    })
  },

  initData() {
    wx.showLoading({
      title: '',
    })
    wx.cloud.callFunction({
        name: 'quickstartFunctions',
        data: {
          type: 'createData'
        }
      }).then((resp) => {
        this.getData()
      wx.hideLoading()
    }).catch((e) => {
        console.log(e)
        wx.hideLoading()
    })
  },

  toAddGoodPage() {
    wx.navigateTo({
      url: `/pages/addGood/index`,
    })
  },

  toPage(item){
    let data = JSON.stringify(item.currentTarget.dataset.item)
    wx.navigateTo({
      url: `/pages/addGood/index?data=${data}`,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getData()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})