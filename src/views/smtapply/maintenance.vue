<template>
  <div class="traceability" id="fullDiv8">
    <div v-loading="iframeloading"></div>
    <iframe
      class="iframe"
      id="ifra"
      style="border: none"
      v-bind:src="reportUrl"
    ></iframe>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";
export default {
  data() {
    return {
      iframeloading: true,
      reportUrl: "http://172.20.99.27:8080/xymes/jsp/index.jsp",
    };
  },
  mounted() {
    // const childView = document.getElementById("fullDiv8"); //获取到子页面
    // window.onmessage = (e) => {
    //   let data = getToken();
    //     console.log(data);
    //   //对象数据需序列化后才能被完整接收，否则接收的数据仅会展示[Object Object]
    //   childView.contentWindow.postMessage(data, "*");
    // };
    const iframe = document.querySelector("#ifra");
    // 处理兼容行问题
    if (iframe.attachEvent) {
      iframe.attachEvent("onload", () => {
        this.iframeloading = false;
        // iframe加载完毕以后执行操作
        console.log("iframe已加载完毕");
      });
    } else {
      iframe.onload = () => {
        this.iframeloading = false;
        // iframe加载完毕以后执行操作
        console.log("iframe已加载完毕");
      };
    }
  },
};
</script>

<style lang="scss" scoped>
.traceability {
  width: 100%;
  height: calc(100vh - 110px);
  .iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
