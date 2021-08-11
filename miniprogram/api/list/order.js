import request from '../utils/index'

// 查询
export const getList = (data) => {
  return request('getList', data)
}

// 更新
export const updataOrder = (data) => {
  return request('updataOrder', data)
}

// 添加
export const addOrder = (data) => {
  return request('addOrder', data)
}




