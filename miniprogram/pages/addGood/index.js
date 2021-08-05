// miniprogram/pages/addGood/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    tip: '',
    price: '',
    image: '',
    _id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = JSON.parse(options.data)
    console.log(data)
    this.setData({
      name: data.name,
      tip: data.tip,
      price: data.price,
      image: data.image,
      _id: data._id
    })
  },

  uploadImg() {
    wx.showLoading({
      title: '',
    })
    // 让用户选择一张图片
    wx.chooseImage({
      count: 1,
      success: chooseResult => {
        // 将图片上传至云存储空间
        wx.cloud.uploadFile({
          // 指定上传到的云路径
          cloudPath: `photo${Date.now()}.png`,
          // 指定要上传的文件的小程序临时文件路径
          filePath: chooseResult.tempFilePaths[0],
          config: {
            env: this.data.envId
          }
        }).then(res => {
          console.log('上传成功', res)
          this.setData({
            image: res.fileID
          })
          wx.hideLoading()
        }).catch((e) => {
          console.log(e)
          wx.hideLoading()
        })
      },
    })
  },

  bindinput(e) {
    if (e.target.dataset.type === 'name') {
      this.setData({
        name: e.detail.value
      })
    }
    if (e.target.dataset.type === 'tip') {
      this.setData({
        tip: e.detail.value
      })
    }
    if (e.target.dataset.type === 'price') {
      this.setData({
        price: e.detail.value
      })
    }
  },

  subMit() {
    let { name, tip, price, image } = this.data
    if (name === '') {
      wx.showToast({
        title: '请输入商品名称',
        duration: 1000
      })
      return
    }
    if (tip === '') {
      wx.showToast({
        title: '请输入商品描述',
        icon: 'none',
        duration: 1000
      })
      return
    }
    if (price === '') {
      wx.showToast({
        title: '请输入商品价格',
        icon: 'none',
        duration: 1000
      })
      return
    }
    if (image === '') {
      wx.showToast({
        title: '请上传商品封面图',
        icon: 'none',
        duration: 1000
      })
      return
    }
    if (this.data._id !== '') {
      this.updateGood()
    } else{
      this.addGood()
    }
  },

  updateGood(){
    wx.showLoading({
      title: '',
    })
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.envId
      },
      data: {
        type: 'updateRecord',
        data: {
          name: this.data.name,
          tip: this.data.tip,
          price: this.data.price,
          image: this.data.image,
          _id: this.data._id
        }
      }
    }).then((resp) => {
      wx.navigateBack({
        delta: 1
      })
      wx.hideLoading()
    }).catch((e) => {
      console.log(e)
      wx.hideLoading()
    })
  },

  addGood () {
    wx.showLoading({
      title: '',
    })
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      data: {
        type: 'addGood',
        data: {
          name: this.data.name,
          tip: this.data.tip,
          price: this.data.price,
          image: this.data.image
        }
      }
    }).then((resp) => {
        wx.hideLoading()
        wx.navigateBack({
          delta: 1
        })
    }).catch((e) => {
        console.log(e)
        wx.hideLoading()
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