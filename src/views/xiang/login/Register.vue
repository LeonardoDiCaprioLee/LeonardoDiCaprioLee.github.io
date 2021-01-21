<template>
    <div class='register'>
        <p class="header"><van-icon name="arrow-left" size="20"/></p>
        <div class="content">
            <img src="@/assets/images/login-img/logo.png" alt="">
            <div class="one">
                <van-icon name="friends-o" size="30"/>
                <p class="border-bottom">
                    <input type="text" v-model="obj.mobile" placeholder="请输入手机号">
                    <button @click="test" v-if="show == true">获取验证码</button>
                    <button v-else class="gray">{{outTime}}s</button>
                </p>
            </div>
            <div class="tow">
                <van-icon name="friends-o"  size="30"/>
                <p class="border-bottom">
                    <input type="text" v-model="obj.sms_code" placeholder="请输入验证码">
                </p>
            </div>
            <div class="log_btn">
                <button @click="login">登录</button>
            </div>
            <div class="back">
                <span>*未注册的手机号将自动注册</span>
                <span @click="password">密码登录</span>
            </div>
            <div class="or">
                <span class="border-bottom wid"></span>
                <span>第三方登录</span>
                <span class="border-bottom wid"></span>
            </div>
            <ul>
                <li>
                    <button>
                    <div></div>
                    <img src="@/assets/images/login-img/weixin.jpg" alt=""></button>
                    <span>微信登录</span>
                </li>
                <li>
                    <button>
                    <div></div>
                    <img src="@/assets/images/login-img/QQ.jpg" alt=""></button>
                    <span>QQ登录</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import {BindingNumber} from '@/utils/api/index'
export default {
    data() {
        return {
            tel:'',
            passTest:'',
            show:true,
            outTime:60,
            obj:{
                mobile:'',
                sms_type:'login',
                client:1,
                type:2
            }
        };
    },
    mounted() {
         BindingNumber(this.obj).then(res=>{
            })
    },
    methods: {
        password(){
            this.$router.push({path:'/login'})
        },
        test(){
            BindingNumber(this.obj).then(res=>{
            })
            // if(this.tel != '') {
            //     this.show = false;
            //     let arr = [1,2,3,4,5,6,7,8,9,0]
            //     let num = ''
            //     for(var i=0;i<4;i++){
            //         num+=parseInt(Math.random()*arr.length)
            //     }
            //     setTimeout(()=>{
            //         this.passTest = num 
            //     }, 5000)
            //     setInterval(()=>{
            //         if(this.passTest==''){
            //             this.outTime > 0 ? this.outTime-- : this.outTime = 0
            //         }else {
            //             return 
            //         }
            //     }, 1000)
            // }
        },
        login() {
            if(this.tel != '' && this.passTest != ''){
                this.$store.commit('login',this.tel)
                // this.$router.push({path:'/resetpass'})
            } else {
                this.$toast.fail('手机号验证码不能为空');
            }
        },
    },
};
</script>

<style lang='scss' scoped>
    .register{
        width: 100%;
        height: 100%;
        background-color: #fff;
        .header{
            width: 100%;
            height: 1rem;
            display: flex;
            align-items: center;
            i{
                margin-left: 0.3rem;
            }
        }
        .content{
            width: 100%;
            height: 100%;
            padding: 0 0.8rem;
            text-align: center;
            >img{
                width: 80%;
                margin-top: 1rem;
            }
            >div{
                width: 100%;
                height: 1rem;
                display: flex;
                align-items: center;
                i{
                    color: orangered;
                }
                p{
                    width: 100%;
                    display: flex;
                    height: 1rem;
                    align-items: center;
                    justify-content: space-between;
                    input{
                        width: 3rem;
                        outline: none;
                        font-size: 0.3rem;
                        border: none;
                    }
                    button{
                        width: 2rem;
                        height: 0.6rem;
                        font-size: 0.28rem;
                        outline: none;
                        border: none;
                        background-color: orangered;
                        border-radius: 0.1rem;
                        color: #fff;
                    }
                    .gray{
                        background-color: #eee;
                        color: orangered;
                    }
                }
            }
            .one{
                margin-top: 0.5rem;
            }
            .tow{
                margin-top: 0.3rem;
            }
            .log_btn{
                width: 100%;
                height: 1rem;
                margin-top: 1rem;
                button{
                    width: 100%;
                    height: 1rem;
                    background-color: orangered;
                    font-size: 0.4rem;
                    color: #fff;
                    outline: none;
                    border: none;
                    border-radius: 0.1rem;
                }
            }
            .back{
                width: 100%;
                height: 1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                span{
                    color: #999;
                    font-size: 0.24rem;
                }
            }
            .or{
                width: 100%;
                height: 1rem;
                display: flex;
                justify-content: space-between;
                margin-top: 0.5rem;
                span{
                    font-size: 0.26rem;
                    color: #999;
                }
                .wid{
                    width: 30%;
                }
            }
            ul{
                width: 100%;
                height: 1.5rem;
                display: flex;
                justify-content: center;
                margin-top: 0.3rem;
                li{
                    height: 1.5rem;
                    margin: 0 0.5rem;
                    font-size: 0.26rem;
                    color: #999;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    button{
                        width: 1rem;
                        height: 1rem;
                        border: 1px solid rgb(228, 228, 228);
                        border-radius: 50%;
                        background-color: #fff;
                        img{
                            width: 60%;
                            height: 60%;
                            opacity: 0.3;
                        }

                    }
                }
            }
        }
    }
</style>
