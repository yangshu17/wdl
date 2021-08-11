const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

// 修改数据库信息云函数入口函数
exports.main = async (event, context) => {
  try {
    await db.collection('order').where({
      _id: event.data._id
    })
      .update({
        data: {
            petName: event.data.petName,
            petImg: event.data.petImg,
            type: event.data.type,
            userServList: event.data.userServList,
            time: event.data.time,
            beauter: event.data.image,
            date: event.data.date,
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