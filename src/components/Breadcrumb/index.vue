<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          class="no-redirect"
          >{{ $t(item.meta.title) }}</span
        >
        <a class="atext" v-else @click.prevent="handleLink(item)">{{
          $t(item.meta.title)
        }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from "path-to-regexp";

export default {
  data() {
    return {
      levelList: null,
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      let matched = this.$route.matched.filter(
        (item) => item.meta && item.meta.title
      );
      const first = matched[0];

      if (!this.isDashboard(first)) {
        matched = [
          { path: "/dashboard", meta: { title: "router.dashboard" } },
        ].concat(matched);
      }

      this.levelList = matched.filter(
        (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
      );
    },
    isDashboard(route) {
      const name = route && route.name;
      if (!name) {
        return false;
      }
      return (
        name.trim().toLocaleLowerCase() === "Dashboard".toLocaleLowerCase()
      );
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route;
      var toPath = pathToRegexp.compile(path);
      return toPath(params);
    },
    handleLink(item) {
      const { redirect, path } = item;
      if (redirect) {
        this.$router.push(redirect);
        return;
      }
      this.$router.push(this.pathCompile(path));
    },
  },
};
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
  color: #fff;
  // .el-breadcrumb__inner {
  //   color: #fff;
  //   &:hover {
  //     color: #eeeeee;
  //   }
  // }

  // ::deep(.el-breadcrumb__item):not(:last-child) .el-breadcrumb__inner {
  //   color: #fff;
  //   // font-size: 14px;
  //   // &:hover {
  //   //   color: #ffcd50;
  //   // }
  // }

  // ::deep(.el-breadcrumb__item):last-child .el-breadcrumb__inner {
  //   color: #fff;
  // }
  .atext{
     color: #ffffff;
     &:hover{
        color: #000;
        // scale: (2);
     }
  }
  .no-redirect {
    color: #d4d4d4d2;
    cursor: text;
  }
}
</style>
