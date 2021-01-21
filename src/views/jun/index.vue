<template>
  <div>
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item,index) in banner" :key="index">
        <img :src="item.banner_img" style="width:100%;height:4rem" alt />
      </van-swipe-item>
    </van-swipe>
    <!-- 轮播图 -->
    <!-- 小框框 -->
    <div class="index-kinds">
      <ul>
        <li @click="jump_router">
          <img src="@/assets/img/jun/l.png" alt />
          <p style="font-size:0.2rem">特色课</p>
        </li>
        <li @click="jump_router">
          <img src="@/assets/img/jun/lv.png" alt />
          <p style="font-size:0.2rem">一对一辅导</p>
        </li>
        <li @click="jump_rili">
          <img src="@/assets/img/jun/h.png" alt />
          <p style="font-size:0.2rem">学习日历</p>
        </li>
      </ul>
    </div>
    <!-- 小框框 -->
    <div v-for="(item,index) in arr" :key="index">
      <!-- title -->
      <p class="op-title" v-for="(item1,index1) in item" :key="index1">{{item1.name}}</p>
      <!-- title -->
      <!-- 老师分类 -->
      <div
        v-show="item.channel_info.type==3"
        class="oto-content"
        v-for="(item2,index2) in item.list"
        :key="index2"
        @click="jump_router(item2)"
      >
        <div class="oc-item">
          <img class :src="item2.teacher_avatar" alt />
          <ul>
            <li>{{item2.teacher_name}}</li>
            <li style="margin-top:0.2rem;color:#b7b7b7;">{{item2.introduction}}</li>
          </ul>
        </div>
      </div>
      <!-- 老师分类 -->
      <!-- 方盒子 -->
      <div
        class="box-f"
        v-for="(item3,index3) in item.list"
        v-show="item.channel_info.type==6"
        :key="index3+'.'"
        @click="$router.push({path:'/Detailspag',query:{item3}})"
      >
        <div class="box-f-z">
          <img :src="item3.thumb_img" alt />
          <ul>
            <li>{{item3.title}}</li>
            <li
              style="text-overflow:ellipsis;overflow:hidden;white-space:nowrap;color:gray"
            >{{item3.description}}</li>
            <li style="color:gray">
              <span>
                <van-icon name="eye-o" />
                {{item3.click_rate}}
              </span>
              <span style="margin-left:0.1rem;">{{timestampToTime(item3.created_at)}}</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 方盒子 -->
    </div>
    <div style="width:100%;height:1rem;margin-top:1rem"></div>
    <!-- 登录弹框 -->
    <van-popup class="van-popup-show" v-model="show">
      <p class="show-x" @click="show=false">X</p>
      <p style="margin-top:5.5rem;font-size:0.4rem;text-align:center;font-weight:bold;">赶紧登陆一下吧</p>
      <p style="font-size:0.24rem;text-align:center;margin-top:0.32rem;">立即预约一对一辅导,浏览更多视频课程~</p>
      <van-button style="width:80%;" @click="$router.push('/login')">立即登录</van-button>
    </van-popup>
    <!-- 登录弹框 -->
  </div>
</template>

<script>
// 引入请求数据
import { getBanners, get_indexlist } from "../../utils/api/index.js";
// 引入公共css
// import "@/assets/css/jun.scss";
// 引用主页面数据
import arr from "./arr.js";

// 引入公共组件
import pubox from "@/components/currenItem.vue";
export default {
  name: "",
  props: {},
  data() {
    return {
      // 轮播图
      banner: [],
      arr: [],
      show: false,
      flag: 0
    };
  },
  mounted() {
    // 定时器token过期
    // this.signout();
    // 定时器token过期
    // 获取首页轮播图banner
    getBanners().then(res => {
      this.banner = res.data;
      // console.log(res);
    });

    // 获取list列表数据
    get_indexlist().then(res => {
      // 获取自己模拟的数据
      // this.arr = arr[0].data;
      // console.log(res)
      this.arr = res.data;
    });
  },
  components: {
    pubox
  },
  computed: {},

  methods: {
    // 跳转路由
    jump_router(item) {
      if (this.$store.state.token != "") {
        this.$router.push({ path: "/Detailspage", query: { id: item } });
        this.show = false;
      } else {
        this.show = true;
      }
    },
    // 跳转日历
    log() {
      this.$router.push("/login");
    },
    jump_rili() {
      if (this.$store.state.token != "") {
        this.$router.push("/calendar");
        this.show = false;
      } else {
        this.show = true;
      }
    },
    signout() {
      setTimeout(() => {
        var token = localStorage.getItem("token");
        localStorage.removeItem("token");
        this.log();
      }, 3000000);
    },
    timestampToTime(timestamp) {
      var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      // let Y = date.getFullYear() + '-';
      // let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      // let D = date.getDate() + ' ';
      // let h = date.getHours() + ':';
      // let m = date.getMinutes() + ':';
      // let s = date.getSeconds();
      // return Y+this.padLeftZero(M)+this.padLeftZero(D)+this.padLeftZero(h)+this.padLeftZero(m)+this.padLeftZero(s);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
    }
  }
};
</script>

<style scoped>
</style>
