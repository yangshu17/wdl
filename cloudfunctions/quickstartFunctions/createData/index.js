const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

// 创建集合云函数入口函数
exports.main = async (event, context) => {
  try {
    // 创建集合
   await db.createCollection('goods')
   await db.collection('goods').add({
    // data 字段表示需新增的 JSON 数据
    data: {
      name: '商品1',
      tip: '这是一个很好的商品1',
      price: 199,
      image: 'cloud://ty-movie-z29f5.7479-ty-movie-z29f5-1256830142/my-photo.png'
    }
  })
  await db.collection('goods').add({
    // data 字段表示需新增的 JSON 数据
    data: {
      name: '商品2',
      tip: '这是一个很好的商品2',
      price: 19,
      image: 'cloud://ty-movie-z29f5.7479-ty-movie-z29f5-1256830142/code.png'
    }
  })
  return {
    success: true
  }
  } catch (e) {
    // 这里catch到的是该collection已经存在，从业务逻辑上来说是运行成功的，所以catch返回success给前端，避免工具在前端抛出异常
    return {
      success: true,
      data: 'create collection success'
    }
  }
}