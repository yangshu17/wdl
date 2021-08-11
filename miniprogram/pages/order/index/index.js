// pages/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isChoosePet: false,
    petName: '',
    dataList:[
      '洗澡',
      '美容',
    ],
    chooseIdx: 0,
    servList: [
      {
        name : '普洗',
        isChoose: false
      },
      {
        name :'精洗',
        isChoose: false
      },
      {
        name :'刷牙',
        isChoose: false
      },
      {
        name :'开结30分钟',
        isChoose: false
      },
      {
        name :'开结60分钟',
        isChoose: false
      },
      {
        name :'药浴',
        isChoose: false
      },
      {
        name :'剃小脚',
        isChoose: false
      },
      {
        name :'体内驱虫',
        isChoose: false
      },
      {
        name :'体外驱虫',
        isChoose: false
      },
    ],
    userServList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 选择宠物页
  toChoosePetPage() {
    wx.$jumpPage({
      name: wx.$pathname.choosePet
    })
  },

  changeType(item) {
    let idx = item.currentTarget.dataset.item || 0
    this.setData({
      chooseIdx: idx
    })
  },

  changeUserServList (item) {
    let idx = item.currentTarget.dataset.item || 0
    if (!this.data.userServList.includes(this.data.servList[idx].name)) {
      this.data.servList[idx].isChoose = true
      this.setData({
        userServList: [...this.data.userServList, this.data.servList[idx].name],
        servList: this.data.servList
      })
    } else {
      let deleteIdx = this.data.userServList.findIndex(item => item === this.data.servList[idx].name)
      this.data.userServList.splice(deleteIdx, 1)
      this.data.servList[idx].isChoose = false
      this.setData({
        userServList: this.data.userServList,
        servList: this.data.servList
      })
    }
  },

  subMit () {
    let {petName, dataList, chooseIdx, userServList } = this.data
    let type = dataList[chooseIdx]
    if (petName === '') {
      wx.showToast({
        title: '请添加宠物',
        duration: 1000,
        icon: 'none'
      })
      return
    }
    if (userServList.length === 0 || userServList === ''){
      wx.showToast({
        title: '请至少选择一项服务',
        duration: 1000,
        icon: 'none'
      })
      return
    }
    wx.$jumpPage({
      name: wx.$pathname.chooseTime,
      query: {
        petName,
        type,
        userServList
      }
    })
    console.log(petName, type, JSON.stringify(userServList), JSON.stringify(userServList).length)
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
    this.data.servList.forEach(item => {
      item.isChoose = false
    })
    this.setData({
      userServList: [],
      servList: this.data.servList
    })
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