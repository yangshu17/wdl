// pages/order/chooseTime/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    petName: "",
    type: "",
    userServList: ["洗澡", "美容"],
    chooseIdx: 0,
    // 美容师列表
    beautList: [
      {
        name: "于洋",
        level: "A级",
        img: "",
      },
      {
        name: "李明市",
        level: "中级",
        img: "",
      },
    ],
    beautIdx: 0,
    isToday: true,
    todayDate: "",
    tomorrowDate: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      petName: options.petName,
      type: options.type,
      userServList: options.userServList.split(",") || [],
    });

    this.setDate();
  },

  setDate() {
    let date = new Date();
    // let year = date.getFullYear();  // 获取完整的年份(4位,1970)
    let month = date.getMonth() + 1; // 获取月份(0-11,0代表1月,用的时候记得加上1)
    let day = date.getDate();
    let day1 = day + 1;
    month = month > 9 ? month : `0${month}`;
    day = day > 9 ? day : `0${day}`;
    day1 = day1 > 9 ? day1 : `0${day1}`;
    this.setData({
      todayDate: `${month}.${day}`,
      tomorrowDate: `${month}.${day1}`,
    });
  },

  clickDate(item) {
    this.setData({
      isToday: item.currentTarget.dataset.status,
    });
  },

  clickPoint(item) {
    this.setData({
      chooseIdx: item.currentTarget.dataset.item,
    });
  },

  clickBeaut(item) {
    let data = item.currentTarget.dataset;
    console.log(data);
    this.setData({
      beautIdx: data.idx,
    });
  },

  subMit() {
    let {
      petName,
      type,
      userServList,
      chooseIdx,
      beautList,
      beautIdx,
      isToday,
    } = this.data;
    let point = chooseIdx + 9;
    console.log(
      petName,
      type,
      userServList,
      isToday,
      point,
      beautList[beautIdx]
    );
    let today = Date.parse(new Date());
    let tom = Date.parse(new Date()) + 24 * 60 * 60 * 1000;
    wx.$api
      .addOrder({
        petName,
        petImg: "",
        type,
        userServList,
        time: point,
        beauter: beautList[beautIdx],
        date: isToday ? today : tom,
      })
      .then((res) => {
        console.log(123, res);
        wx.navigateBack({
          delta: 2
        })
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
