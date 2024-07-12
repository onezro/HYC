import request from "@/utils/mjsRequest";

export function ListConfiguration(data) {
  return request({
    url: "/api/Configuration/ListConfiguration",
    method: "post",
    data,
  });
}

export function DelectConfiguration(data) {
    return request({
      url: "/api/Configuration/DelectConfiguration",
      method: "post",
      data,
    });
  }

  export function UpdateConfiguration(data) {
    return request({
      url: "/api/Configuration/UpdateConfiguration",
      method: "post",
      data,
    });
  }

  export function SaveConfiguration(data) {
    return request({
      url: "/api/Configuration/SaveConfiguration",
      method: "post",
      data,
    });
  }

