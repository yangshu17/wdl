// appid
export const APP_ID = "wxf8580a2747e8ab39";
// 版本号
export const APP_VERSION = "0.0.1";

// pathname 根据实际页面配置来写
export const PATHNAME_MAP = {
  index: "pages/index/index", // 首页
  newIndex: "pages/newIndex/index", // 新首页
  mine: "pages/mine/index", // 我的
  addGood: "pages/addGood/index", // 添加商品页面
  order: "pages/order/index/index", // 预约首页
  orderList: "pages/order/orderList/index", // 预约列表
  choosePet: "pages/order/choosePet/index", // 添加宠物
  chooseTime: "pages/order/chooseTime/index", // 选择时间
};

// 正则
export const rules = {
  // 中文姓名
  verifyName: /^[\u4E00-\u9FA5]{2,4}$/,
  // 身份证号
  verifyIdcard: /^[1-9]\d{13,16}([0-9]|X|x)$/,
  // 手机号码
  verifyPhone: /^1\d{10}$/,
};
