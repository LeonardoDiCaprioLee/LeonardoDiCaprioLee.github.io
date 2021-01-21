<template>
    <div class='collect'>
        <van-nav-bar title="我的收藏" left-arrow @click-left="onClickLeft"/>
        <ul>
            <li class="border-bottom" v-for="(item,index) in collectList" :key="index" @click="collectDetail()">
                <p><img :src="item.teachersAvatar" alt=""></p>
                <div>
                    <div>
                        <p class="title"><span>券</span><span>{{item.title}}</span></p>
                        <p class="gray">{{item.section_num}}人已报名</p>
                    </div>
                    <p class="red">￥{{item.price}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import {Collect} from '@/utils/api/index'
export default {
    data() {
        return {
            collectList:[]
        };
    },
    mounted() {
        Collect({
            page:1,
            limit:10,
            type:1
        }).then(res=>{
            this.collectList = res.list
        })
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1)
        },
        collectDetail() {
            // this.$router.push({path:'/detail',})
        }
    },
};
</script>

<style lang='scss' scoped>
    .collect{
        width: 100%;
        height: calc(100% - 1rem);
        background-color: #fff;
        ul{
            width: 100%;
            padding: 0 0.3rem;
            li{
                width: 100%;
                height: 2rem;
                display: flex;
                padding: 0.3rem 0;
                >p{
                    width: 30%;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                >div{
                    width: 70%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    padding-left: 0.2rem;
                    div{
                        width: 100%;
                        height: 60%;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                        .title{
                            font-size: 0.32rem;
                            font-weight: bold;
                            span:nth-child(1){
                                padding: 0.03rem 0.05rem;
                                border: 1px solid orangered;
                                color: orangered;
                                border-radius: 0.05rem;
                                margin-right: 0.1rem;
                            }
                        }
                        .gray{
                            font-size: 0.26rem;
                            color: #999;
                        }
                    }
                    p{
                        width: 100%;
                    }
                    .red{
                        font-size: 0.3rem;
                        color: red;
                    }
                }
            }
        }
    }
</style>
