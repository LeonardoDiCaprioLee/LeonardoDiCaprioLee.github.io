import server from '../server/http';
import { promises } from 'fs';

// 获取数据
// const getBanners = async function() {
//     var {data} = await server.get('/small4/banner/list')
//     return Promise.resolve(data.data);
// }
// import {getBanners} from ''
// getBanners().then(res=>{
//      this.list = res
// })


// 获取我的课程订单
const getMyorder =async function (params){
    let {data} = await server.post('/api/app/myOrder',{...params});
    return Promise.resolve(data)
}

// 课程数据
const courseBasis = async function(str){
    let { data } = await server.get(`/api/app/courseBasis?${str}`);
    return Promise.resolve(data)
}
// 详情数据
const courseInfo = async function(id){
    let { data } = await server.get(`/api/app/courseInfo/basis_id=${id}`);
    return Promise.resolve(data)
}
// 课程收藏
const collect = async function(id){
    let { data } = await server.post(`/api/app/collect`,{ type:1,course_basis_id:id });
    return Promise.resolve(data)
}
// 取消收藏
const cancelCollect = async function(id){
    console.log(id)
    let { data } = await server.post(`/api/app/collect/cancel/227/1`,{ collect_id:id });
    return Promise.resolve(data)
}
// 立即报名
const shopInfo = async function(id){
    let { data } = await server.post(`/api/app/order/shopInfo`,{shop_id: 183, type: 3, user_coupon_id: 0, address_id: "", product_number: 1});
    return Promise.resolve(data)
}
// 提交报名订单
const downOrder = async function(obj){
    let { data } = await server.post(`/api/app/order/downOrder`,{shop_id: obj.id, type: obj.course_type, user_coupon_id: 0, address_id: "", product_number: 1});
    return Promise.resolve(data)
}
// 取消收藏
const collectcancel = async function(id){
    let { data } = await server.post(`/api/app/collect/cancel/227/1`,{collect_id:id});
    return Promise.resolve(data)
}
// http://120.53.31.103:84/api/app/courseChapter
// 获取课程大纲
const courseChapter = async function(id){
    let { data } = await server.post(`http://120.53.31.103:84/api/app/courseChapter`,{id});
    return Promise.resolve(data)
}
// 获取分类接口
const courseClassify = async function(id){
    let { data } = await server.get(`/api/app/courseClassify`);
    return Promise.resolve(data)
}

// 首页轮播图
const getBanners = async function () {
    // let list = [
    //     {
    //         banner_img: "https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/2019MGNW3BtiS91569839576.jpg",
    //         link_content: "https://www.365msmk.com/oto/2",
    //         link_type: 0
    //     },
    //     {
    //         banner_img: "https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/2019LnKumseuhw1569839569.jpg",
    //         link_content: "",
    //         link_type: 0,
    //     },
    //     {
    //         banner_img: "https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/20193KAjU2cB6h1569839562.jpg",
    //         link_content: "",
    //         link_type: 0,
    //     },
    //     {
    //         banner_img: "https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/20197Cxc53hktC1569839552.jpg",
    //         link_content: "",
    //         link_type: 0,
    //     }
    // ]
    var { data } = await server.get('/api/app/banner')
    // console.log(data)
    // 因为请求不到数据自己模拟数据
    return data
}

// 首页轮播图

// 获取首页列表
const get_indexlist=async function(){
    var {data} = await server.get('/api/app/recommend/appIndex');
    // console.log(data)
    return data
}
// 获取首页列表

// const getCurrData = async () => {
//     const data =  await server.get('https://new-api.meiqia.com/visit/get_base_config?ent_id=149768');
//     console.log(data)
// }



// const login = async function () {
//     var { data } = await server.get('/small4/banner/list')
// const login = async function() {
//     var {data} = await server.get('/small4/banner/list',{limit : 10})

// }
// 登录接口
const logins = async function(obj) {
    var {data} = await server.post('/api/app/login?mobile='+obj.mobile+'&password='+obj.password+'&type='+obj.type)
    return Promise.resolve(data);
}
// 注册接口
const BindingNumber = async function(obj) {
    var {data} = await server.post('/api/app/smsCode?mobile='+obj.mobile+'&sms_type='+obj.sms_type)
    return Promise.resolve(data.data);
}
// 修改密码接口
const ResetPasss = async function(obj) {
    var {data} = await server.post('/api/app/password')

    return Promise.resolve(data.data);
}
// 个人信息接口
const Personal = async function() {
    var {data} = await server.get('/api/app/userInfo')
    return Promise.resolve(data.data);
}
// 个人信息修改接口
const resetPersonal = async function(i) {
    var {data} = await server.put('/api/app/user',i)
    return Promise.resolve(data);
}
// 头像修改接口
const photo = async function(i) {
    var data = await server.post('/api/app/public/img',i)
    console.log(data);
    return Promise.resolve(data);
}
// 选择年纪和学科得数据
const ageDis = async function() {
    var {data} = await server.get('/api/app/module/attribute/1')
    return Promise.resolve(data);
}
// 获取城市列表数据
const city = async function() {
    var {data} = await server.get('/api/app/sonArea/320100')
    return Promise.resolve(data.data);
}

// 首页列表数据详情
const indexdettails =async function(id){
    var {data}=await server.get(`/api/app/teacher/${id}`)
    console.log(data)
    return data
}

// 首页我的关注 
const Collect = async function(obj) {
    var {data} = await server.get('/api/app/collect?page=1&limit=10&type=2')
    return Promise.resolve(data.data);
}

// index关注
const indexgz= async function(id){
    var {data}=await server.get(`/api/app/teacher/collect/${id}`)
    console.log(id)
    return data
}

// 我的特色课
const myStudy= async function(){
    var {data}=await server.get('/api/app/myStudy/2?')
    return data
}
// 立即学习接口
const myStudyCourse= async function(id){
    console.log(id);
    var {data}=await server.get(`/api/app/myStudy/course/${id}`)
    console.log(data);
    return data
}



export {
    getBanners, 
    // getCurrData,
    logins,
    get_indexlist,
    indexdettails,
    courseBasis,
    BindingNumber,
    ResetPasss,
    Personal,
    resetPersonal,
    ageDis,
    city,
    Collect,
    indexgz,
    photo,
    courseInfo,
    collect,
    cancelCollect,
    downOrder,
    myStudy,
    shopInfo,
    courseChapter,
    collectcancel,
    myStudyCourse,
    getMyorder,
    courseClassify
}
