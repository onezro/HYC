<template>
  <div class="navbar">
    <hamburger
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <template>
        <!-- <message  class="right-menu-item hover-effect"/> -->

        <!-- 全屏显示 -->
        <el-dropdown @command="handleCommand">
          <Lang class="right-menu-item hover-effect" />

          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="zh">中文</el-dropdown-item>
            <el-dropdown-item command="en">English</el-dropdown-item>
            <el-dropdown-item command="vi">Tiếng Việt</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <screenfull id="screenfull" class="right-menu-item hover-effect" />
      </template>
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <!-- <div class="user-avatar"> <i class="el-icon-s-custom"  style="width:40px;height:40px"></i></div> -->
          <!-- el-icon-user -->
          <i class="el-icon-user-solid" style="color: #fff"></i>
          <!-- <img src="../../assets/profile.jpg" class="user-avatar" /> -->
          <span style="color: #fff">{{name}}</span>
          <!-- <i class="el-icon-caret-bottom" /> -->
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item> {{ $t("router.dashboard") }} </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">{{ $t("login.signOut") }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import Screenfull from "@/components/Screenfull";
import Message from "@/components/Message";
import Lang from "@/components/lang";
import getPageTitle from "@/utils/get-page-title";
import { getToken } from "@/utils/auth";
export default {
  data() {
    return {
      visible: false,
      intervalId: null,
      name:getToken()
    };
  },
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull,
    Message,
    Lang,
  },
  computed: {
    ...mapGetters(["sidebar", "avatar"]),
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
    handleCommand(command) {
      localStorage.setItem("locale", command);
      // document.title = getPageTitle(to.meta.title);
      this.$i18n.locale = command;
      // console.log( item);
      document.title = getPageTitle("");
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: rgb(3, 89, 129);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .item {
    margin-top: -9px;
    margin-right: 30px;
  }
  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 20px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 10px;
      // line-height: 50px;

      .avatar-wrapper {
        display: flex;
        gap: 5px;
        align-items: center;

        .user-avatar {
          cursor: pointer;
          width: 35px;
          height: 35px;
          border-radius: 999px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
