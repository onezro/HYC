<template>
  <div class="login-container">
    <div class="box">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
        auto-complete="on"
        label-position="left"
      >
        <div class="title-container">
          <h3 class="title">{{ $t("login.title") }}</h3>
        </div>

        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.employeeName"
            placeholder="用户名"
            name="username"
            type="text"
            tabindex="1"
            auto-complete="on"
          />
        </el-form-item>

        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.docManagerUser"
            :type="passwordType"
            placeholder="密码"
            name="password"
            tabindex="2"
            auto-complete="on"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon
              :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
            />
          </span>
        </el-form-item>

        <el-form-item label-width="120px"  :label="$t('login.language')" class="item">
          <el-radio-group v-model="resource" @change="onRadioChange">
            <el-radio
              v-for="radio in radioArr"
              :key="radio.value"
              :label="radio.value"
              :style="{
                color: radioColor,
                fontWeight: 'bold',
                fontSize: '16px',
              }"
              >{{ radio.label }}</el-radio
            >
            <!-- <el-radio label="English" :style="{color:radioColor,fontWeight: 'bold'}"></el-radio>
           <el-radio label="Tiếng Việt" :style="{color:radioColor,fontWeight: 'bold'}"></el-radio> -->
          </el-radio-group>
        </el-form-item>

        <el-button
          :loading="loading"
          type="primary"
          style="width: 100%; margin-bottom: 30px"
          @click.native.prevent="handleLogin"
          >{{ $t("login.title") }}</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import getPageTitle from "@/utils/get-page-title";
import { findEmployeeRoles, info } from "@/api/index";
export default {
  name: "Login",
  data() {
    return {
      // loginForm: {
      //   username: "111",
      //   password: "123456",
      // },
      radioColor: "#fff",
      radioArr: [
        {
          label: "中文",
          value: "zh",
        },
        {
          label: "English",
          value: "en",
        },
        {
          label: "Tiếng Việt",
          value: "vi",
        },
      ],
      resource: "",
      loginForm: {
        employeeName: "10001",
        docManagerUser: "123456",
      },
      loginRules: {
        employeeName: [{ required: true, trigger: "blur" }],
        docManagerUser: [{ required: true, trigger: "blur" }],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  mounted() {
    this.resource =
      localStorage.getItem("locale") || navigator.language.substring(0, 2);
    // console.log(this.resource);
    // localStorage.setItem("locale",this.resource);
    // this.$i18n.locale = this.resource;
  },
  methods: {
    ...mapMutations(["SET_ROUTE", "SET_NAMEID"]),
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    onRadioChange(item) {
      // console.log( document.title);
      localStorage.setItem("locale", item);
      // document.title = getPageTitle(to.meta.title);
      this.$i18n.locale = item;
      // console.log( item);
      document.title = getPageTitle("");
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then((data) => {
              // console.log(navigator.language);
              // info(this.loginForm.employeeName).then(({ data }) => {
              //   // console.log(data.EmployeeId);
              //   findEmployeeRoles(data.EmployeeId).then((res) => {
              //     // console.log(data.content);
              //     let a = [];
              //     res.data.content.forEach((item) => {
              //       a.push(item.xyRoleId);
              //     });

              //     a = a.join(",");
              //     //  console.log(a);
              //     localStorage.setItem("employeeId", a);
              this.$router.push({ path: "/" });
              this.loading = false;
              //   });
              // });

              // console.log(this.loginForm.employeeName);
            })
            .catch((data) => {
              console.log(data);
              this.$message({
                type: "error",
                message: data,
              });
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    dataPro(data) {
      let item = [];
      data.map((list, i) => {
        let newData = {};
        newData.path = list.path;
        newData.title = list.title;
        newData.name = list.xyClientMenuName;
        newData.component = list.component;
        // console.log(list.childs);
        newData.children = list.childs ? this.dataPro(list.childs) : []; //如果还有子集，就再次调用自己
        item.push(newData);
      });
      return item;
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .item .el-form-item__label {
    padding-left: 15px;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background: $bg;
  background-image: url("../../assets/bj.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
  // .box {
  // }
  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 20px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    margin-top: 150px;
    // background: #fff;
    background: rgba(0, 0, 0, 0.2);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(8px);
    border-radius: 25px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
