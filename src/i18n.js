import Vue from 'vue'  
import VueI18n from 'vue-i18n'  
import ElementUI from 'element-ui'  
// import locale from 'element-ui/lib/locale';
import 'element-ui/lib/theme-chalk/index.css'  
import axios from 'axios'  
  
Vue.use(VueI18n)  
Vue.use(ElementUI, { i18n: (key, value) => i18n.t(key, value) })
  
const messages = {}  
  
function loadLocaleMessages() {  
  return axios.all([  
    axios.get('../en.json'),  
    axios.get('../zh.json')  
  ]).then(axios.spread((enResponse, zhResponse) => {  
    messages['en'] = enResponse.data  
    messages['zh'] = zhResponse.data  
  }))  
}  
  
const i18n = new VueI18n({  
  locale: 'zh', // 设置默认语言  
  fallbackLocale: 'zh', // 设置回退语言  
  messages, // 初始为空，稍后将通过loadLocaleMessages填充  
})  
  
// 加载语言文件  

loadLocaleMessages().then(() => {  
    // 设置全局的本地化信息  
    Object.keys(messages).forEach(lang => {  
      i18n.setLocaleMessage(lang, messages[lang])  
    })  

  })  
    
  export default i18n