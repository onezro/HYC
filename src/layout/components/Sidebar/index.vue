<template>
  <div :class="{ 'has-logo': showLogo }">
      <!-- <div class="text"><img src="../../../assets/logo-white.svg" width="160" alt=""></div> -->
    <!-- <logo v-if="true" :collapse="isCollapse" /> -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters(["sidebar"]),
    routes() {
      // console.log(this.$router.options.routes);
      return this.$router.options.routes;
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
};
</script>
<style lang="scss">
.el-submenu .el-menu-item {
  height: 42px;
  line-height: 42px;
  padding: 0 45px;
  min-width: 210px;
  font-size: 13px;
 
}
// .el-menu-item.is-active {
  // background-color: rgb(3, 89, 129) !important;
  // color: #fff;
  // span {
  //   display: block;
  //   width: 210px;
  //   // color: #fff !important;
  //   background-color: rgb(3, 89, 129) !important;
  // }
// }

// :deep(.is-active) {
//     background-color: red !important;
// }
</style>
