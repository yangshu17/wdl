const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()

// 修改数据库信息云函数入口函数
exports.main = async (event, context) => {
  try {
    await db.collection('userInfo').where({
      _id: event.data._id
    })
      .update({
        data: {
            avatarUrl: event.data.avatarUrl,
            city: event.data.city,
            country: event.data.country,
            gender: event.data.gender,
            language: event.data.language,
            nickName: event.data.nickName,
            province: event.data.province,
            session_key: event.data.session_key,
            userId: event.data.userId,
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