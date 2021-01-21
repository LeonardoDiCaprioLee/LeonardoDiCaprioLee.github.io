<template>
  <div class="follow">
    <van-nav-bar title="我的关注" left-arrow @click-left="$router.go(-1)" />
    <div class="content">
        <ul>
          <li v-for="(item,index) in list" :key="index">
            <p><img :src="item.avatar" alt=""></p>
            <div>
              <p>
                <span class="title">{{item.teacher_name}}</span>
                <span class="or">已关注</span>
              </p>
              <p>
                <span class="itemList">{{item.introduction}}</span>
                <!-- <span>32岁</span> -->
                <!-- <span>10年教龄</span> -->
              </p>
            </div>
            <p><button @click="gotoDetail(item)">查看详情</button></p>
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
import {Collect} from '@/utils/api/index'
export default {
  data() {
    return {
      list:[]
    };
  },
  methods: {
    gotoDetail(item) {
this.$router.push({ path: "/Detailspage", query: { id: item } });
    }
  },
  computed: {},
  filters: {},
  components: {},
  directives: {},
  mounted() {
    Collect({
      page:1,
      limit:10,
      type:2
    }).then(res=>{
      this.list = res.list
    })
  },
};
</script>

<style lang="scss" scoped>
  .follow{
    width: 100%;
    height: 100%;
    .content{
      width: 100%;
      height: calc(100% - 1rem);
      padding: 0 0.3rem;
      background-color: #fff;
      ul{
        width: 100%;
        padding-top: 0.2rem;
        li{
          width: 100%;
          height: 1.5rem;
          border-radius: 0.1rem;
          box-shadow: 0 0 10px -9px;
          display: flex;
          align-items: center;
          margin-bottom: 0.2rem;
          >p{
              width: 30%;
              display: flex;
              justify-content: center;
              align-items: center;
            img{
              width: 1rem;
              height: 1rem;
              border-radius: 50%;
            }
            button{
              width: 80%;
              height: 0.5rem;
              font-size: 0.26rem;
              border-radius: 0.1rem;
              border: none;
              outline: none;
              color: #fff;
              background-color: orangered;
            }
          }
          div{
            width: 40%;
            height: 1rem;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            p{
              width: 100%;
              display: flex;
              span{
                font-size: 0.26rem;
                margin-right: 0.2rem;
              }
              .itemList{
                width: 2.1rem;
                 white-space:nowrap;
                 overflow:hidden;
                 text-overflow:ellipsis;
              }
              .or{
                color: orangered;
              }
              .title{
                font-size: 0.32rem;
                font-weight: bold;
              }
            }
            p:nth-child(2){
              color: #999;
            }
          }
        }
      }
    }
  }
</style>