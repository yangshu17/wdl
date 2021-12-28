// pages/newIndex/components/actList/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    list: [
      {
        name: "预约",
        icon: "clock-o",
        urlName: "orderList",
      },
      {
        name: "记账",
        icon: "balance-o",
        urlName: "order",
      },
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    click(e) {
      let name = e.currentTarget.dataset.item.urlName;
      if (name !== "orderList") {
        wx.showToast({
          title: '暂未开发',
          duration: 1000,
          icon: 'none'
        })
        return;
      }
      wx.$jumpPage({
        name: wx.$pathname[name],
      });
    },
  },
});
