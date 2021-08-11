const cloud = require("wx-server-sdk");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV,
});
const db = cloud.database();

// 查询数据库集合云函数入口函数
exports.main = async (event, context) => {
    // 返回数据库查询结果
    //  查询条件， db.command.gt()：大于，gte()：大于等于,lt()：小于, lte()：小于等于,eq()：等于
    return await db.collection('order').where({
        date: db.command.gte(event.data.time)
    }).orderBy('time', 'asc').get()
};
