<template>
    <div class='my'>
        <div class="header">
            <div class="bg"></div>
            <div class="conter">
                <div class="top">
                    <div>
                        <img :src="personal.avatar" alt="" @click="setUser">
                        <img src="@/assets/images/my-img/crown.png" alt="" class="crown">
                    </div>
                    <span class="tel">{{personal.nickname}}<img src="@/assets/images/my-img/open.png" alt=""></span>
                    <span @click="$router.push('/curriculum')">去约课</span>
                </div>
                <ul>
                    <li @click="$router.push('/myFeature')">
                        <span>{{num}}</span>
                        <span>我的特色课</span>
                        <span>已购特色课程的学习</span>
                    </li>
                    <li @click="$router.push('/oneToOne')">
                        <span>0</span>
                        <span>一对一辅导</span>
                        <span>我的一对一老师辅导</span>
                    </li>
                    <li @click="$router.push('/surplus')">
                        <span>0.00</span>
                        <span>剩余学习币</span>
                        <span>查看剩余学习币</span>
                    </li>
                </ul>
            </div>
        </div>
        <div class="adv">
            <div>
                <ul>
                    <li><van-icon name="envelop-o" /></li>
                    <li>
                        <p>邀请好友注册APP，享多重好礼</p>
                        <p>限时特惠，多邀多得</p>
                    </li>
                    <li><van-icon name="arrow" /></li>
                </ul>
            </div>
        </div>
        <div class="course">
            <ul>
                <li class="border-bottom">
                    <p>课程相关</p>
                    <div>
                        <div @click="$router.push('/follow')">
                            <img src="@/assets/images/my-img/1-1.png" alt="">
                            <span>关注的老师</span>
                        </div>
                        <div @click="my_collect">
                            <img src="@/assets/images/my-img/1-2.png" alt="">
                            <span>我的收藏</span>
                        </div>
                    </div>
                </li>
                <li class="border-bottom">
                    <p>订单相关</p>
                    <div>
                        <div>
                            <img src="@/assets/images/my-img/2-1.png" alt="">
                            <span @click="$router.push('/myorder')">课程订单</span>
                        </div>
                        <div>
                            <img src="@/assets/images/my-img/2-1.png" alt="">
                            <span>会员订单</span>
                        </div>
                         <div>
                            <img src="@/assets/images/my-img/2-1.png" alt="">
                            <span>约课订单</span>
                        </div>
                    </div>
                </li>
                <li class="border-bottom">
                    <p>我的账户</p>
                    <div>
                        <div @click="discount">
                            <img src="@/assets/images/my-img/3-1.png" alt="">
                            <span>优惠券</span>
                        </div>
                        <div @click="$router.push('/study')">
                            <img src="@/assets/images/my-img/3-2.png" alt="">
                            <span>学习卡</span>
                        </div>
                        <div>
                            <img src="@/assets/images/my-img/3-3.png" alt="">
                            <span @click="$router.push('/vip')">会员</span>
                        </div>
                    </div>
                </li>
                <li>
                    <p>自助服务</p>
                    <div>
                        <div @click="$router.push('/myMessage')">
                            <img src="@/assets/images/my-img/4-1.png" alt="">
                            <span>我的消息</span>
                        </div>
                        <div @click="$router.push('/feedback')">
                            <img src="@/assets/images/my-img/4-2.png" alt="">
                            <span>意见反馈</span>
                        </div>
                        <div>
                            <img src="@/assets/images/my-img/4-3.png" alt="">
                            <span>在线服务</span>
                        </div>
                        <div @click="reset">
                            <img src="@/assets/images/my-img/4-4.png" alt="">
                            <span>设置</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import {Personal,myStudy} from '@/utils/api/index'
export default {
    data() {
        return {
            tel:Number,
            personal:{},
            obj:{},
            num:0
        };
    },
    created() {
        Personal().then(res=>{
            this.personal = res
        })
        myStudy().then(res=>{
            console.log(res);
             res.data.typeNum.forEach(item=>{
                 this.num +=item.num
            })
        })
    },
    methods: {
        // 跳转优惠券页面
        discount() {
            this.$router.push({path:'/discount'})
        },
        // 跳转设置页面
        reset(){
            this.$router.push({path:'/reset'})
        },
        // 用户信息
        setUser(){
            this.$store.commit('setUser',this.personal)
            this.$router.push('/setUser')
        },
        // 我的收藏
        my_collect() {
            this.$router.push({path:'/collect'})
        }
    },
    // 我的页面鉴权
    // beforeRouteEnter (to, from, next) {
    //     if(localStorage.getItem('token')){
    //         next()
    //     }else {
    //         next('/login')
    //     }
    // }
}
</script>

<style lang='scss' scoped>
    .my{
        width: 100%;
        height: calc(100% - 1rem);
        overflow-y: scroll;
        background-color: #f0f2f5;
        .header{
            width: 100%;
            height: 4.35rem;
            position: relative;
            background: url(../../../assets/images/my-img/my-top.png) no-repeat;
            background-size: 100%;
            background-color: #fff;
            .conter{
                width: 6.9rem;
                height: 3.45rem;
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                border-radius: 0.1rem;
                box-shadow: 0 0 10px -9px;
                background-color: #fff;

                .top{
                    width: 100%;
                    height: 1.83rem;
                    position: relative;
                    display: flex;
                    align-items: center;
                    >div{
                        width: 1.25rem;
                        height: 1.25rem;
                        border-radius: 50%;
                        margin-left: 0.3rem;
                        margin-right: 0.25rem;
                        position: relative;
                        background-color: #bdcdf1;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        img:first-child{
                            width: 1.18rem;
                            height: 1.18rem;
                            border-radius: 50%;
                        }
                        .crown{
                            width: 0.4rem;
                            height: 0.4rem;
                            position: absolute;
                            top: -0.1rem;
                            left: 0.95rem;
                        }
                    }
                    .tel{
                        font-size: 0.32rem;
                        img{
                            width: 0.3rem;
                            height: 0.3rem;
                            margin-left: 0.2rem;
                        }
                    }
                    span:nth-child(3){
                        width: 1.2rem;
                        height: 0.5rem;
                        background-color: #eb6100;
                        font-size: 0.24rem;
                        position: absolute;
                        top: 50%;
                        transform: translateY(-50%);
                        right: 0;
                        border-top-left-radius: 0.2rem;
                        border-bottom-left-radius: 0.2rem;
                        text-align: center;
                        line-height: 0.5rem;
                        color: #fff;
                    }
                }
                ul{
                    width: 100%;
                    height: 1.62rem;
                    display: flex;
                    li{
                        flex: 1;
                        height: 100%;
                        span{
                            width: 2.2768rem;
                            display: block;
                            text-align: center;
                        }
                        span:nth-child(1){
                            height: 0.68rem;
                            font-size: 0.5rem;
                            color: #eb6100;
                            line-height: 0.68rem;
                        }
                        span:nth-child(2){
                            height: 0.28rem;
                            font-size: 0.28rem;
                            margin-bottom: 0.12rem;
                        }
                        span:nth-child(3){
                            font-size: 0.22rem;
                            color: #b7b7b7;
                        }
                    }
                }
            }
        }
        .adv{
            width: 100%;
            height: 1.18rem;
            padding: 0.3rem 0.3rem 0;
            background-color: #fff;

            div{
                width: 100%;
                height: 100%;
                height: 0.8796rem;
                background: linear-gradient(-90deg,#f2995a,#eb6100);
                border-radius: 0.5rem;
                ul{
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    position: relative;
                    li:nth-child(1){
                        font-size: 0.4rem;
                        color: #fff;
                        margin: 0 0.25rem 0 0.3rem;
                    }
                    li:nth-child(2){
                        width: 70%;
                        height: 70%;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                        font-size: 0.24rem;
                        color: #fff;
                    }   
                    li:nth-child(3){
                        width: .5rem;
                        height: 0.5rem;
                        position: absolute;
                        right: 0.2rem;
                        top: 50%;
                        transform: translateY(-50%);
                        font-size: 0.5rem;
                        color: #fff;
                    }
                }
            }
        }
        .course{
            width: 100%;
            padding: 0 0.3rem;
            background-color: #fff;
            margin-bottom: 0.6rem;
            ul{
                width: 100%;
                li{
                    width: 100%;
                    padding: 0.4rem 0;
                    >p{
                        width: 100%;
                        height: 0.32rem;
                        font-size: 0.32rem;
                    }
                    >div{
                        width: 100%;
                        height: 1.2rem;
                        display: flex;
                        div{
                            width: 25%;
                            height: 100%;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: flex-end;
                            img{
                                width: 0.44rem;
                                height: 0.44rem;
                                font-size: 0.2rem;
                            }
                            span{
                                font-size: 0.24rem;
                                margin-top: 0.2rem;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
