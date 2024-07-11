import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import addRoute from './modules/addroute'
import tagsView from './modules/tagsView' // 新增tagsView


Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
      showNotice:false
  },
  mutations:{
    Set_ShowNotice(state){
      state.showNotice=!state.showNotice
      // console.log(state.showNotice);
    }
  },
  modules: {
    app,
    settings,
    user,
    addRoute,
    tagsView 
  },
  getters
})

export default store
