import dateTrans from "../../../utils/deteTrans";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // orderList :[],
    todayDate: "",
    tomorrowDate: "",
    isToday: true,
    todayList: [],
    tomList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setDate();
  },

  setDate() {
    let date = new Date();
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

  // getTime(date) {
  //   return dateTrans(date)
  // },

  getList() {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    today = today.getTime();
    wx.$api
      .getList({
        time: today,
      })
      .then((res) => {
        let todayList = [];
        let tomList = [];
        res.result.data.forEach((item) => {
          if (item.date > today + 24 * 60 * 60 * 1000) {
            tomList.push(item);
          } else {
            todayList.push(item);
          }
        });
        this.setData({
          todayList,
          tomList,
        });
      })
      .catch((e) => {
        console.log(222, e);
      });
  },

  toPage() {
    wx.$jumpPage({
      name: wx.$pathname.order,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getList();
  },

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
