const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 创建集合云函数入口函数
exports.main = async (event, context) => {
  try {
    // 创建集合
   await db.collection('order').add({
    // data 字段表示需新增的 JSON 数据
    data: {
        petName: event.data.petName,
        petImg: event.data.petImg,
        type: event.data.type,
        userServList: event.data.userServList,
        time: event.data.time,
        beauter: event.data.beauter,
        date: event.data.date,
    }
  })
  return {
    success: true,
  }
  } catch (e) {
    // 这里catch到的是该collection已经存在，从业务逻辑上来说是运行成功的，所以catch返回success给前端，避免工具在前端抛出异常
    return {
      success: true,
      data: 'create collection success'
    }
  }
}