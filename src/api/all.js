import request from "@/utils/request";

export function PCBAHisControl(data) {
  return request({
    url: "/HYCAPI/PCBAHisControl",
    method: "post",
    data
  });
}
//工单实时查询
// export function XY_PCBAHisQTYControl(data) {
//   return request({
//     url: "/XingYuAPI/XY_PCBAHisQTYControl",
//     method: "post",
//     data
//   });
// }

// export function XY_PCBAHisYieldControl(data) {
//   return request({
//     url: "/XingYuAPI/XY_PCBAHisYieldControl",
//     method: "post",
//     data
//   });
// }

// export function XY_OEE_InquiryControl(data) {
//   return request({
//     url: "/XingYuAPI/XY_OEE_InquiryControl",
//     method: "post",
//     data
//   });
// }

// //OE类型
// export function XY_OEE_LevelType(data) {
//   return request({
//     url: "/XingYuAPI/XY_OEE_LevelTypeControl",
//     method: "post",
//     data
//   });
// }

// //OE参数
// export function XY_OEE_LevelCode(data) {
//   return request({
//     url: "/XingYuAPI/XY_OEE_LevelCodeControl",
//     method: "post",
//     data
//   });
// }

// //OE日历
// export function XY_OEE_Calendar(data) {
//   return request({
//     url: "/XingYuAPI/XY_OEE_CalendarControl",
//     method: "post",
//     data
//   });
// }
//线体停机
export function LineStop(data) {
  return request({
    url: "/HYCAPI/HYC_Time_LineStop",
    method: "post",
    data,
  });
}

//工单产品基础信息
export function BasicData(data) {
  return request({
    url: "/HYCAPI/HYC_Time_BasicData",
    method: "post",
    data,
  });
}
//工单停机
export function OrderStop(data) {
  return request({
    url: "/HYCAPI/HYC_Time_OrderStop",
    method: "post",
    data,
  });
}
//产品停机
export function ProductStop(data) {
  return request({
    url: "/HYCAPI/HYC_Time_ProductStop",
    method: "post",
    data,
  });
}

//pcb
export function PcbStopdd(data) {
  return request({
    url: "/HYCAPI/PcbStopdd",
    method: "post",
    data,
  });
}

export function GetPcbStopList(data) {
  return request({
    url: "/HYCAPI/GetPcbStopList",
    method: "post",
    data,
  });
}
export function UpdatePcbStop(data) {
  return request({
    url: "/HYCAPI/UpdatePcbStop",
    method: "post",
    data,
  });
}

export function DeletPcbStop(data) {
  return request({
    url: "/HYCAPI/DeletPcbStop",
    method: "post",
    data,
  });
}

//生命周期
export function ProductCycle(data) {
  return request({
    url: "/HYCAPI/HYC_Time_ProductCycle",
    method: "post",
    data,
  });
}
//工序节拍
export function ProductRouting(data) {
  return request({
    url: "/HYCAPI/HYC_Time_ProductRouting",
    method: "post",
    data,
  });
}

export function McSetting(data) {
  return request({
    url: "/HYCAPI/HYC_Time_McSetting",
    method: "post",
    data,
  });
}
//补站
export function AddMissSN(data) {
  return request({
    url: "/HYCAPI/HYC_Prod_AddMissSN",
    method: "post",
    data,
  });
}

//漏站查询
export function MissSNs(data) {
  return request({
    url: "/HYCAPI/HYC_Prod_MissSNs",
    method: "post",
    data,
  });
}
///HYCAPI/HYC_Time_McSetting/GetMCDeviceList
export function GetMCDeviceList(data) {
  return request({
    url: "/HYCAPI/GetMCDeviceList",
    method: "post",
    data: {
      id: "",
      deviceName: "",
      deviceCode: "",
      deviceEnable: "",
      parentLevel: "",
      childLevel: "",
      productionLine: "",
      createuid: "",
      createtime: "2024-05-30T07:27:41.222Z",
      updateuid: "",
      updatetime: "2024-05-30T07:27:41.222Z",
      ext: "",
      status: "",
      operationType: "",
      list: [
        {
          id: "string",
          deviceName: "string",
          deviceCode: "string",
          deviceEnable: "string",
          parentLevel: "string",
          childLevel: "string",
          productionLine: "string",
          createuid: "string",
          createtime: "2024-05-30T07:27:41.223Z",
          updateuid: "string",
          updatetime: "2024-05-30T07:27:41.223Z",
          ext: "string",
          status: "string",
        },
      ],
    },
  });
}
export function DeletMCDevice(data) {
  return request({
    url: "/HYCAPI/DeletMCDevice",
    method: "post",
    data,
  });
}

//获取线体
export function GetProductionLineList() {
  return request({
    url: "/HYCAPI/GetProductionLineList",
    method: "post",
    data: {
      id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      version: 0,
      forceDirty: true,
      archivedDate: "2024-05-28T05:19:33.085Z",
      bulkVersion: 0,
      creationDate: "2024-05-28T05:19:33.085Z",
      direction: 0,
      isArchived: true,
      manualRuleState: 0,
      mediatorName: "string",
      modificationDate: "2024-05-28T05:19:33.085Z",
      name: "string",
      permissions: "string",
      rootId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      useRecipeToVerifyOrder: true,
      archivedBy_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      areaIndex: 0,
      area_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      createdBy_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      lineSPU_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      modifiedBy_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      resourceBase_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    },
  });
}
//获取设备
export function GetEquipmentList(data) {
  return request({
    url: "/HYCAPI/GetEquipmentList",
    method: "post",
    data,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    // contentType: "application/json",
    // dataType: "json",
  });
}

//保存
export function MCDeviceAdd(data) {
  return request({
    url: "/HYCAPI/MCDeviceAdd",
    method: "post",
    data,
  });
}
///HYCAPI/UpdateMCDevice
export function UpdateMCDevice(data) {
  return request({
    url: "/HYCAPI/UpdateMCDevice",
    method: "post",
    data,
  });
}
//参数获取
export function GetParameterSettingsList(data) {
  return request({
    url: "/HYCAPI/GetParameterSettingsList",
    method: "post",
    data,
  });
}
//参数修改
export function DeletParameterSettings(data) {
  return request({
    url: "/HYCAPI/DeletParameterSettings",
    method: "post",
    data,
  });
}
//参数获取
export function UpdateParameterSettings(data) {
  return request({
    url: "/HYCAPI/UpdateParameterSettings",
    method: "post",
    data,
  });
}
//参数修改
export function ParameterSettingsAdd(data) {
  return request({
    url: "/HYCAPI/ParameterSettingsAdd",
    method: "post",
    data,
  });
}
//参数查询
export function GetMcSettingList(data) {
  return request({
    url: "/HYCAPI/GetMcSettingList",
    method: "post",
    data,
  });
}

///HYCAPI/MCMcSettingAdd
export function MCMcSettingAdd(data) {
  return request({
    url: "/HYCAPI/MCMcSettingAdd",
    method: "post",
    data,
  });
}
export function UpdateMcSetting(data) {
  return request({
    url: "/HYCAPI/UpdateMcSetting",
    method: "post",
    data,
  });
}

export function DeletSeettingDevice(data) {
  return request({
    url: "/HYCAPI/DeletSeettingDevice",
    method: "post",
    data,
  });
}

export function GetGoldSampleAddList(data) {
  return request({
    url: "/HYCAPI/GetGoldSampleAddList",
    method: "post",
    data,
  });
}

export function GoldSampleAdd(data) {
  return request({
    url: "/HYCAPI/GoldSampleAdd",
    method: "post",
    data,
  });
}

export function UpdateGoldSample(data) {
  return request({
    url: "/HYCAPI/UpdateGoldSample",
    method: "post",
    data,
  });
}
export function DeletGoldSample(data) {
  return request({
    url: "/HYCAPI/DeletGoldSample",
    method: "post",
    data,
  });
}

export function SteelMeshListdd(data) {
  return request({
    url: "/HYCAPI/SteelMeshListdd",
    method: "post",
    data,
  });
}
///HYCAPI/GeSteelMeshList
export function GeSteelMeshList(data) {
  return request({
    url: "/HYCAPI/GeSteelMeshList",
    method: "post",
    data,
  });
}

export function UpdateSteelMesh(data) {
  return request({
    url: "/HYCAPI/UpdateSteelMesh",
    method: "post",
    data,
  });
}

export function DeletSteelMesh(data) {
  return request({
    url: "/HYCAPI/DeletSteelMesh",
    method: "post",
    data,
  });
}

//OEE 
export function XY_OEE_LevelCodeControl(data) {
  return request({
    url: "/XingYuAPI/XY_OEE_LevelCodeControl",
    method: "post",
    data,
  });
}

export function XY_OEE_Calendar(data) {
  return request({
    url: "/XingYuAPI/XY_OEE_CalendarControl",
    method: "post",
    data,
  });
}

export function OEE_Time_ProductCycleControl(data) {
  return request({
    url: "/XingYuAPI/OEE_Time_ProductCycle",
    method: "post",
    data,
  });
}

export function Prod_FCTInquiry(data) {
  return request({
    url: "/XingYuAPI/Prod_FCTInquiry",
    method: "post",
    data,
  });
}