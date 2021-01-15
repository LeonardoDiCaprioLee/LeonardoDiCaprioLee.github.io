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


// 首页轮播图
const getBanners = async function () {
    let list = [
        {
            banner_img: "https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/2019MGNW3BtiS91569839576.jpg",
            link_content: "https://www.365msmk.com/oto/2",
            link_type: 0
        },
        {
            banner_img: "https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/2019LnKumseuhw1569839569.jpg",
            link_content: "",
            link_type: 0,
        },
        {
            banner_img: "https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/20193KAjU2cB6h1569839562.jpg",
            link_content: "",
            link_type: 0,
        },
        {
            banner_img: "https://msmk2019.oss-cn-shanghai.aliyuncs.com/uploads/image/20197Cxc53hktC1569839552.jpg",
            link_content: "",
            link_type: 0,
        }
    ]
    // var { data } = await server.get('https://www.365msmk.com/api/app/banner?')
    // 因为请求不到数据自己模拟数据
    return list
}

// 首页轮播图



const getCurrData = async () => {
    const data =  await server.get('https://new-api.meiqia.com/visit/get_base_config?ent_id=149768');
    console.log(data)
}


export {
    getBanners,
    getCurrData
}