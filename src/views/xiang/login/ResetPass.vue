<template>
    <div class='resetpass'>
        <van-nav-bar
        title="设置密码"
        right-text="跳过"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
        />
        <div class="password">
            <p>
                <input type="password" v-model="pass" placeholder="请设置登录密码" @blur="inpu">
                <input type="password" v-model="pass2" placeholder="请在此输入密码" @blur="inpu">
                <span v-show="show == false">两次密码不一致</span>
                <button @click="submit">提交</button>
            </p>
        </div>
    </div>
</template>

<script>
import { ResetPasss } from '@/utils/api/index'
export default {
    data() {
        return {
            pass:'',
            pass2:'',
            show:true
        };
    },
    mounted() {
        ResetPasss().then(res=>{
        })
    },
    methods: {
        onClickLeft(){
            this.$router.go(-1)
        },
        onClickRight() {
            this.$router.push({path:'/userinfo'})
        },
        submit() {
            localStorage.setItem('pass',this.pass)
            if(this.pass!=''&&this.pass2!=''){
                if(this.pass ==this.pass2){
                    this.$router.push({path:'/userinfo'})
                    this.show = true
                }
            } else {
                this.$toast.fail('密码不能为空');
            }
        },
        inpu(){
            if(this.pass !=this.pass2){
                this.show = false
            } else {
                this.show = true
            }
        }
    },
};
</script>

<style lang='scss' scoped>
    .resetpass{
        width: 100%;
        height: 100%;
        
        .password{
            width: 100%;
            height: calc(100% - 1.1rem);
            background-color: #fff;
            margin-top: 0.1rem;
            p{
                display: flex;
                flex-direction: column;
                padding: 0 0.3rem;
                input{
                    border: none;
                    border-bottom: 1px solid gray;
                    outline: none;
                    width: 100%;
                    height: 1rem;
                    font-size: 0.3rem;
                    margin-top: 0.2rem;
                    color: #999;
                }
                button{
                    width: 100%;
                    height: 1rem;
                    background-color: orangered;
                    border: none;
                    outline: none;
                    font-size: 0.4rem;
                    color: #fff;
                    border-radius: 0.1rem;
                    margin-top: 0.5rem;
                }
                span{
                    font-size: 0.26rem;
                    margin-top: 0.3rem;
                }
            }
        }
    }
</style>
