const getOpenId = require('./getOpenId/index')
const getMiniProgramCode = require('./getMiniProgramCode/index')
const selectRecord = require('./selectRecord/index')
const updateRecord = require('./updateRecord/index')
const createData = require('./createData/index')
const addGood = require('./addGood/index')


// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    // 获取openid
    case 'getOpenId':
      return await getOpenId.main(event, context)
    // 上传图片？
    case 'getMiniProgramCode':
      return await getMiniProgramCode.main(event, context)
      
    // 查
    case 'selectRecord':
      return await selectRecord.main(event, context)
    // 改
    case 'updateRecord':
      return await updateRecord.main(event, context)

    // 创建
    case 'createData':
      return await createData.main(event, context)
    // 添加
    case 'addGood':
      return await addGood.main(event, context)
  }
}
