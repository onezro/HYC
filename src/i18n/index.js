import Vue from "vue";
import VueI18n from "vue-i18n";
import locale from "element-ui/lib/locale";
Vue.use(VueI18n);
// 引入自定义的各个语言配置文件
import zh from "./config/zh";
import en from "./config/en";
import vi from "./config/vi";

//element-ui自带多语言配置
import zhLocale from "element-ui/lib/locale/lang/zh-CN";
import enLocale from "element-ui/lib/locale/lang/en";
import viLocale from "element-ui/lib/locale/lang/vi";

const messages = {
  en: {
    ...en,
    ...enLocale,
  },
  zh: {
    ...zh,
    ...zhLocale,
  },
  vi: {
    ...vi,
    ...viLocale,
  },
};
// 创建vue-i18n实例i18n
const i18n = new VueI18n({
  // 设置默认语言
  locale: localStorage.getItem("locale") || navigator.language.substring(0, 2), // 语言标识,页面对应显示相同的语言
  // 添加多语言（每一个语言标示对应一个语言文件）
  messages: messages,
});
// 非 vue 文件中使用这个方法
const translate = (localeKey) => {
  const locale = localStorage.getItem("language") || navigator.language.substring(0, 2);
  const hasKey = i18n.te(localeKey, locale); // 使用i18n的 te 方法来检查是否能够匹配到对应键值
  const translatedStr = i18n.t(localeKey);
  if (hasKey) {
    return translatedStr;
  }
  return localeKey;
};

locale.i18n((key, value) => i18n.t(key, value)); //为了实现element插件的多语言切换
// 暴露i18n
export { i18n, translate };
