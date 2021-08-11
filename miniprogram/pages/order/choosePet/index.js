// pages/order/choosePet/index.js
import {petType} from './constants'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[
      '小型犬',
      '中型犬',
      '大型犬',
      '猫咪'
    ],
    chooseIdx: 0,
    petList:petType['小型犬']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  changePet(item) {
    let idx = item.currentTarget.dataset.item || 0
    this.setData({
      chooseIdx: idx,
      petList: petType[this.data.dataList[idx]]
    })
    console.log(petType[this.data.dataList[idx]])
  },

  choosePet (item) {
    let data = item.currentTarget.dataset.data
    console.log(data.name)
    let pages = getCurrentPages()
    let prevPage = pages[pages.length - 2];
    prevPage.setData({
      petName: data.name, // 修改上一页的属性值；
      isChoosePet: true
    })
    wx.navigateBack({
      delta: 1
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