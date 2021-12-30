// components/tabBar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    active: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event) {
      if (this.data.active === event.detail) return 
      if (event.detail === 1) {
        wx.$jumpPage({
          name: wx.$pathname.mine,
        });
      } else {
        // wx.redirectTo({
        //   url: `/${wx.$pathname.newIndex}`,
        // });
        wx.navigateBack({
          delta: 2
        })
        // this.setData({
        //   active: event.detail,
        // });
      }
    },
  },
});
