import axios from 'axios';
// import Vue from 'vue'

// import loading from "@/components"
// Vue.use(loading)
import '@/store/index.js'

import {Guid} from './guid'
import store from '../../store';
const server = axios.create({
    baseURL: "http://120.53.31.103:84",
    timeout: 10000 // 请求超时的时间
})


// 请求拦截
server.interceptors.request.use(config => {
    if(config.url.split("?")[0] !== "/api/app/courseBasis"){
        store.state.loding=true
    }
    config.headers = {
        deviceType: "H5"
    }
    let ID = Guid.NewGuid().ToString('D')
    window.sessionStorage.setItem('DeviceID',ID)
    if (localStorage.getItem('token')) {
        config.headers = {
            DeviceType: 'H5',
            DeviceID: window.sessionStorage.getItem('DeviceID',ID),
            Authorization:`Bearer ${localStorage.getItem('token')}`
        }
    }
    return config
}, err => {
    console.log(err);
})

// 响应拦截
// res 服务器返回的数据信息
server.interceptors.response.use(res => {

    store.state.loding=false;

    if(res.data.msg == '登录超时，请重新登录'){
        localStorage.setItem('token','')
        this.$router.push({path:'/login'})}

    if (res.data == '无效token') {
        alert('token无效，请重新登录')
    } else {

        // Vue.$loading.hide()

        return res
    }
}, err => {
    // 只是作为参考的例子 具体情况要看服务器真实的返回数据

    switch (err.code) {
        case 500: console.log('服务器错误'); break;
        case 404: console.log('页面找不到了'); break;
        default:
            return Promise.reject(err)
            break;
    }
})

export default server;