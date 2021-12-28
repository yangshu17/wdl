import request from "../utils/index";

// 查询
export const getUser = (data) => {
  return request("getUser", data);
};

// 更新
export const updateUser = (data) => {
  return request("updateUser", data);
};

// 添加
export const addUser = (data) => {
  return request("addUser", data);
};
