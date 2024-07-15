import request from "@/utils/cpkRequest";
//获取属性
export function GetAttribute(data) {
    return request({
      url: "/api/GetAttribute",
      method: "post",
      data
    });
  }

//添加属性
export function AddAttribute(data) {
    return request({
      url: "/api/AddAttribute",
      method: "post",
      data
    });
  }

//删除属性
export function DeleteAttribute(data) {
    return request({
      url: "/api/DeleteAttribute",
      method: "post",
      data
    });
  }

//更新属性
export function UpdateAttribute(data) {
    return request({
      url: "/api/UpdateAttribute",
      method: "post",
      data
    });
  }