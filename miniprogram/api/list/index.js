import request from '../utils/index'

// 查询商品列表
export const selectRecord = (data) => {
  return request('selectRecord', data)
}

// 新建数据库
export const createData = (data) => {
  return request('createData', data)
}

// 更新商品信息
export const updateRecord = (data) => {
  return request('updateRecord', data)
}

// 更新商品信息
export const addGood = (data) => {
  return request('addGood', data)
}




