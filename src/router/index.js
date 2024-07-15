import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

export const constantRoutes = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path*",
        component: () => import("@/views/redirect/index"),
      },
    ],
  },

  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "*",
    component: () => import("@/views/404"),
    hidden: true,
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard"),
        meta: { title: "router.dashboard", affix: true },
      },
    ],
  },
  {
    path: "/permissions",
    component: Layout,
    // redirect: "/system/role",
    name: "permissions",
    meta: { title: "router.permissions" },
    children: [
      {
        path: "role",
        name: "Role",
        component: () => import("@/views/permissions/role"),
        meta: { title: "router.role" },
      },
      {
        path: "meun",
        name: "Meun",
        component: () => import("@/views/permissions/meun"),
        meta: { title: "router.menu" },
      },
      {
        path: "employee",
        name: "Employee",
        component: () => import("@/views/permissions/employee"),
        meta: { title: "router.employee" },
      },
    ],
  },
  // {
  //   path: "/parameterSet",
  //   component: Layout,
  //   // redirect: "/system/role",
  //   name: "parameterSet",
  //   meta: { title: "router.parameterSet" },
  //   children:[

  //     //Unlock
  //     {
  //       path: "pcbaUnlock",
  //       name: "PcbaUnlock",
  //       component: () => import("@/views/parameterSet/pcbaUnlock"),
  //       meta: { title: 'router.pcbaUnlock'},
  //     },
  //     //plateConfiguration
  //     {
  //       path: "plateConfiguration",
  //       name: "PlateConfiguration",
  //       component: () => import("@/views/parameterSet/plateConfiguration"),
  //       meta: { title: 'router.plateConfiguration'},
  //     },
  //     {
  //       path: "pluginConfigure",
  //       name: "PluginConfigure",
  //       component: () => import("@/views/parameterSet/pluginConfigure"),
  //       meta: { title: 'router.pluginConfigure'},
  //     },
  //     // {
  //     //   path: "masterControl",
  //     //   name: "masterControl",
  //     //   component: () => import("@/views/parameterSet/masterControl"),
  //     //   meta: { title: 'router.masterControl'},
  //     // },
  //   ]
  // },
  {
    path: "/deviceShareFiles",
    component: Layout,
    name: "deviceShareFiles",
    meta: { title: "router.deviceParam" },
    children: [
      {
        path: "deviceParam",
        name: "deviceParam",
        component: () => import("@/views/deviceShareFiles"),
        meta: { title: "router.deviceParam" },
      },
    ],
  },
  {
    path: "/PCBUnlock",
    component: Layout,
    name: "PCBUnlock",
    meta: { title: "router.pcbaUnlock" },
    children: [
      {
        path: "pcbaUnlock",
        name: "pcbaUnlock",
        component: () => import("@/views/PCBUnlock"),
        meta: { title: "router.pcbaUnlock" },
      },
    ],
  },
  {
    path: "/masterControl",
    component: Layout,
    // redirect: "/system/role",
    name: "masterControl",
    meta: { title: "router.masterControl" },
    children: [
      {
        path: "orderProductStop",
        name: "orderProductStop",
        component: () => import("@/views/masterControl/orderProductStop"),
        meta: { title: "router.orderProductStop" },
      },
      // {
      //   path: "pcbaUnlock",
      //   name: "PcbaUnlock",
      //   component: () => import("@/views/parameterSet/pcbaUnlock"),
      //   meta: { title: "router.pcbaUnlock" },
      // },
      //plateConfiguration
      {
        path: "plateConfiguration",
        name: "PlateConfiguration",
        component: () => import("@/views/parameterSet/plateConfiguration"),
        meta: { title: "router.plateConfiguration" },
      },

      {
        path: "operationTime",
        name: "OperationTime",
        component: () => import("@/views/parameterSet/operationTime"),
        meta: { title: "router.operationTime" },
      },
      {
        path: "pcbonlineTime",
        name: "pcbonlineTime",
        component: () => import("@/views/masterControl/pcbonlineTime"),
        meta: { title: "router.pcbonlineTime" },
      },
      {
        path: "stencilTime",
        name: "StencilTime",
        component: () => import("@/views/parameterSet/stencilTime"),
        meta: { title: "router.stencilTime" },
      },
      // {
      //   path: "paramData",
      //   name: "paramData",
      //   component: () => import("@/views/parameterSet/paramData"),
      //   meta: { title: "router.paramData" },
      // },
      // {Stencil time
      //   path: "parameterEnable",
      //   name: "parameterEnable",
      //   component: () => import("@/views/masterControl/parameterEnable"),
      //   meta: { title: "router.parameterEnable" },
      // },
    ],
  },

  {
    path: "/featureSetting",
    component: Layout,
    // redirect: "/system/role",
    name: "featureSetting",
    meta: { title: "router.featureSetting" },
    children: [
      {
        path: "feature",
        name: "feature",
        component: () => import("@/views/featureSetting/feature"),
        meta: { title: "router.feature" },
      },
    ],
  },
  // {
  //   path: "/projectLibrary",
  //   component: Layout,
  //   redirect: "/projectLibrary/projectList",
  //   name: "projectLibrary",
  //   meta: { title: "router.projectLibrary" },
  //   children: [
     
  //   ],
  // },
  {
    path: "/basicCPK",
    component: Layout,
    redirect: "/basicCPK/sampleInform",
    name: "BasicCPK",
    meta: { title: "router.basicCPK" },
    children: [
      {
        path: "projectList",
        name: "projectList",
        component: () => import("@/views/projectLibrary/projectList"),
        meta: { title: "router.projectList" },
      },
      {
        path: "createCPK",
        name: "createCPK",
        component: () => import("@/views/projectLibrary/createCPK"),
        meta: { title: "router.createCPK" },
      },
      {
        path: "sampleInform",
        name: "SampleInform",
        component: () => import("@/views/basicCPK/sampleInform"),
        meta: { title: "router.sampleInform" },
      },
      {
        path: "attributeInform",
        name: "attributeInform",
        component: () => import("@/views/basicCPK/attributeInform"),
        meta: { title: "router.attributeInform" },
      },
      {
        path: "spiAlertSetting",
        name: "spiAlertSetting",
        component: () => import("@/views/basicCPK/spiAlertSetting"),
        meta: { title: "router.spiAlertSetting" },
      },
      {
        path: "aoiAlertSetting",
        name: "aoiAlertSetting",
        component: () => import("@/views/basicCPK/aoiAlertSetting"),
        meta: { title: "router.aoiAlertSetting" },
      },
      {
        path: "defectSetting",
        name: "defectSetting",
        component: () => import("@/views/basicCPK/defectSetting"),
        meta: { title: "router.defectSetting" },
      },
      {
        path: "restStart",
        name: "restStart",
        component: () => import("@/views/basicCPK/restStart"),
        meta: { title: "router.restStart" },
      },
    ],
  },
  // {
  //   path: "/finishProduct",
  //   component: Layout,
  //   redirect: "/finishProduct",
  //   meta: { title: "成品入库" },
  //   children:[
  //     {
  //       path: "inboundInspec",
  //       name: "inboundInspec",
  //       component: () => import("@/views/finishProduct/inboundInspec"),
  //       meta: { title: "入库检验" },
  //     },
  //     {
  //       path: "inboundRecord",
  //       name: "inboundRecord",
  //       component: () => import("@/views/finishProduct/inboundRecord"),
  //       meta: { title: "包装记录" },
  //     },
  //     // {
  //     //   path: "reportWork",
  //     //   name: "reportWork",
  //     //   component: () => import("@/views/wmsInMain/reportWork"),
  //     //   meta: { title: "报工记录" },
  //     // },
  //     // {
  //     //   path: "semiFinished",
  //     //   name: "semiFinished",
  //     //   component: () => import("@/views/wmsInMain/semiFinished"),
  //     //   meta: { title: "半成品工单" },
  //     // },
  //   ]
  // },

  // {
  //   path: "/fixture",
  //   component: Layout,
  //   redirect: "/fixture",
  //   meta: { title: "治具房" },
  //   children:[
  //     {
  //       path: "fixtureType",
  //       name: "fixtureType",
  //       component: () => import("@/views/fixture/fixtureType"),
  //       meta: { title: "治具类型" },
  //     },

  //     {
  //       path: "fixtureEntry",
  //       name: "fixtureEntry",
  //       component: () => import("@/views/fixture/fixtureEntry"),
  //       meta: { title: "治具录入" },
  //     },
  //     {
  //       path: "fixtureProduct",
  //       name: "fixtureProduct",
  //       component: () => import("@/views/fixture/fixtureProduct"),
  //       meta: { title: "产品消耗" },
  //     },
  //     {
  //       path: "fixtureIssue",
  //       name: "fixtureIssue",
  //       component: () => import("@/views/fixture/fixtureIssue"),
  //       meta: { title: "fixtureIssue" },
  //     },
  //   ]
  // },
  // {
  //   path: "/wms",
  //   component: Layout,
  //   redirect: "/wms",
  //   children: [
  //     {
  //       path: "moisture",
  //       name: "moisture",
  //       component: () => import("@/views/wms/moisture"),
  //       meta: { title: "湿敏元器件" },
  //     },
  //   ],
  // },
  // {
  //   path: "/assemble",
  //   component: Layout,
  //   name:'assemble',
  //   children: [
  //     {
  //       path: "assembleIssue",
  //       name: "assembleIssue",
  //       component: () => import("@/views/assemble/assembleIssue"),
  //       meta: { title: "组装配置" },
  //     },
  //   ],
  // },
  // {
  //   path: "/assembleapply",
  //   component: Layout,
  //   redirect: "/assembleapply",
  //   children: [
  //     {
  //       path: "assembleapply",
  //       name: "Assembleapply",
  //       component: () => import("@/views/assembleapply"),
  //       meta: { title: "组装应用" },
  //     },
  //   ],
  // },

  {
    path: "/report",
    component: Layout,
    redirect: "/report",
    meta: { title: 'router.reportCenter' },
    children: [
      {
        path: "smt_traceability ",
        name: "smt_traceability ",
        component: () => import("@/views/report/smt_traceability"),
        meta: { title: "router.smt_traceability" },
      },
      {
        path: "smt_throwing",
        name: "smt_throwing",
        component: () => import("@/views/report/smt_throwing"),
        meta: { title: "router.smt_throwing" },
      },
      {
        path: "smt_iot ",
        name: "smt_iot ",
        component: () => import("@/views/report/smt_iot"),
        meta: { title: "router.smt_iot" },
      },
      {
        path: "smt_status",
        name: "smt_status",
        component: () => import("@/views/report/smt_status"),
        meta: { title: "router.smt_status" },
      },
      {
        path: "device_performance",
        name: "device_performance",
        component: () => import("@/views/report/device_performance"),
        meta: { title: "router.device_performance" },
      },
      {
        path: "realTime_orders",
        name: "realTime_orders",
        component: () => import("@/views/report/realTime_orders"),
        meta: { title: "router.realTime_orders" },
      },
      {
        path: "ticket_Quality",
        name: "ticket_Quality",
        component: () => import("@/views/report/ticket_Quality"),
        meta: { title: "router.ticket_Quality" },
      },
  
      {
        path: "quatrace",
        name: "quatrace",
        component: () => import("@/views/report/quatrace"),
        meta: { title: "router.quatrace" },
      },
    ],
  },
  {
    path: "/kanban",
    component: Layout,
    redirect: "/kanban",
    meta: { title: "router.kanban" },
    children: [
        {
        path: "oee",
        name: "OEE",
        component: () => import("@/views/kanban/oee"),
        meta: { title: "OEE" }
      },{
        path: "calendars",
        name: "calendars",
        component: () => import("@/views/oee/calendars"),
        meta: { title: "router.calendars" }
      },{
        path: "abnormal",
        name: "abnormal",
        component: () => import("@/views/oee/abnormal"),
        meta: { title: "router.abnormal" }
      },{
        path: "Maintenance",
        name: "Maintenance",
        component: () => import("@/views/oee/Maintenance"),
        meta: { title: "router.Maintenance" }
      },{
        path: "parameterSettings",
        name: "parameterSettings",
        component: () => import("@/views/oee/parameterSettings"),
        meta: { title: "router.parameterSettings" }
      }

      // {
      //   path: "smt_gpm",
      //   name: "smt_gpm",
      //   component: () => import("@/views/kanban/smt_gpm"),
      //   meta: { title: "SMT GPM Dashboard" }
      // },
      // {
      //   path: "smt_lot",
      //   name: "smt_lot",
      //   component: () => import("@/views/kanban/smt_lot"),
      //   meta: { title: "SMT IoT Dashboard" }
      // },
      // {
      //   path: "wh_main",
      //   name: "wh_main",
      //   component: () => import("@/views/kanban/wh_main"),
      //   meta: { title: "WH Main Dashboard" }
      // },
      // {
      //   path: "humiture",
      //   name: "humiture",
      //   component: () => import("@/views/kanban/humiture"),
      //   meta: { title: "humiture" }
      // },
      // {
      //   path: "dip_main",
      //   name: "dip_main",
      //   component: () => import("@/views/kanban/dip_main"),
      //   meta: { title: "DIP Main Dashboard" }
      // },
      // {
      //   path: "assembly_main",
      //   name: "assembly_main",
      //   component: () => import("@/views/kanban"),
      //   meta: { title: "Assembly Main Dashboard" }
      // }

    ],
  },
  // {
  //   path: "/scheduling",
  //   component: Layout,
  //   redirect: "/scheduling",
  //   children: [
  //     {
  //       path: "scheduling",
  //       name: "Scheduling",
  //       component: () => import("@/views/scheduling"),
  //       meta: { title: "排程" },
  //     },
  //   ],
  // },

  // {
  //   path: "/pp",
  //   component: Layout,
  //   redirect: "/pp",
  //   children: [
  //     {
  //       path: "pp",
  //       name: "Pp",
  //       component: () => import("@/views/pp"),
  //       meta: { title: "PP" },
  //     },
  //   ],
  // },
  // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
];
export const error404 = { path: "*", redirect: "/404", hidden: true };
const createRouter = () =>
  new Router({
    mode: "history", // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
