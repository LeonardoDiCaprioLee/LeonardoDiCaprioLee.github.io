import Vue from 'vue'
import Vuex from 'vuex'

import persist from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 分类数据筛选
    chooseGrades: '',
    teach:[],
    loding:false,
    user:{},
    mobile_nikename:{},
    currs : [],
  },
  mutations: {
    out(state) { // 退出登录
      localStorage.setItem('token', '')
    },
    // 分类数据筛选
    chooseGrades(state, arr) {
      state.chooseGrades = arr;
      console.log(state.chooseGrades)
    },
    // 用户信息存储
    setUser(state,i){
      state.user = i
    },
    set_teacher(state, v) {
      // console.log(v)
      let flag = false;
      state.teach.forEach(item => {
        console.log(item)
        console.log(item.teacher_name.indexOf(v.teacher_name))
        if(item.teacher_name.indexOf(v.teacher_name) > -1){
          console.log('哈哈')
        } 
      })
      console.log("执行了")
      state.teach.push(v)
    },
    currs(state,arr){
      state.currs = arr;
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    persist()
  ]
})
