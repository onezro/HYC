<template>
  <div>
    <div>{{ $t("login.title") }}</div>
    <el-select
      v-model="languageValue"
      @change="changeLanguage"
      placeholder="请选择"
    >
      <el-option
        v-for="item in languageOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <!-- <button @click="switchLang('en')">English</button>
    <button @click="switchLang('zh')">中文</button> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      languageValue: "",
      languageOptions: [],
    };
  },
  created() {
    //最开始请求的时候看缓存是什么状态
    if (this.$i18n.locale == "zh") {
      this.languageValue = "中文简体";
      this.languageOptions = [{ value: "en", label: "English" }];
    } else {
      this.languageValue = "English";
      this.languageOptions = [{ value: "zh", label: "中文简体" }];
    }
  },
  methods: {
    // 多语言切换

    switchLang(lang) {
      this.$i18n.locale = lang; // 切换语言
    },
    changeLanguage(type) {
      console.log(type);
      // 此处做了语言选择记录，存在localStorage中，这里的作用只有一个当我重新请求页面
      //的时候先取localStorage的记录值
      localStorage.setItem("locale", type);
      this.$i18n.locale = type; // 修改页面需要显示的语言
      if (this.$i18n.locale == "zh") {
        this.languageValue = "中文简体";
        this.languageOptions = [{ value: "en", label: "English" }];
      } else {
        this.languageValue = "English";
        this.languageOptions = [{ value: "zh", label: "中文简体" }];
      }
    },
  },
};
</script>
