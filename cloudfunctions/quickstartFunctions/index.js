const getOpenId = require("./getOpenId/index");
const getMiniProgramCode = require("./getMiniProgramCode/index");
const selectRecord = require("./selectRecord/index");
const updateRecord = require("./updateRecord/index");
const createData = require("./createData/index");
const addGood = require("./addGood/index");

const addOrder = require("./order/add");
const updataOrder = require("./order/update");
const getList = require("./order/getList");

const getUser = require("./user/get");
const addUser = require("./user/add");
const updateUser = require("./user/update");

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    // 获取openid
    case "getOpenId":
      return await getOpenId.main(event, context);
    // 上传图片？
    case "getMiniProgramCode":
      return await getMiniProgramCode.main(event, context);

    // 查——商品
    case "selectRecord":
      return await selectRecord.main(event, context);
    // 改——商品
    case "updateRecord":
      return await updateRecord.main(event, context);
    // 创建——商品
    case "createData":
      return await createData.main(event, context);
    // 添加——商品
    case "addGood":
      return await addGood.main(event, context);

    // 查——预约
    case "getList":
      return await getList.main(event, context);
    // 更新——预约
    case "updataOrder":
      return await updataOrder.main(event, context);
    // 添加——预约
    case "addOrder":
      return await addOrder.main(event, context);

    // 查询——用户
    case "getUser":
      return await getUser.main(event, context);
    // 添加——用户
    case "addUser":
      return await addUser.main(event, context);
    // 更新——用户
    case "updateUser":
      return await updateUser.main(event, context);
  }
};
