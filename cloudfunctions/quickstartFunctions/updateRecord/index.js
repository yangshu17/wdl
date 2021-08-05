const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

// 修改数据库信息云函数入口函数
exports.main = async (event, context) => {
  try {
    await db.collection('goods').where({
      _id: event.data._id
    })
      .update({
        data: {
          name: event.data.name,
          tip: event.data.tip,
          price: event.data.price,
          image: event.data.image
        }
      })
    return {
      success: true,
      data: event.data
    }
  } catch (e) {
    return {
      success: false,
      errMsg: e
    }
  }
}