<template>
  <div class="detials">
    <div>
      <van-nav-bar
        title="课程详情"
        right-text="分享"
        left-arrow
        @click-left="$router.go(-1)"
        @click-right="share"
      />
      <img :src="detailsData.cover_img" alt="" class="cover_img" />
      <!-- 课程标题 -->
      <div style="padding: 0.2rem; background: white">
        <b>{{ detailsData.title }}</b> <br /><br />
        <p style="display: flex; justify-content: space-between; width: 100%">
          <span
            >共{{ detailsData.total_periods }}课时 |
            {{ detailsData.sales_num }}人已报名</span
          >
          <!-- 收藏按钮 -->
          <van-icon
            name="star-o"
            @click="clickCollection"
            v-show="detileInfo.is_collect == 0"
          />
          <van-icon name="star" @click="clickCollection" v-show="detileInfo.is_collect >= 1" />
        </p>

        <br /><br />
        <span style="font-size: 0.12rem">
          开课时间：{{
            new Date(detailsData.start_play_date)
              .toLocaleString()
              .replace("下午", "")
          }}
          -
          {{
            new Date(detailsData.end_play_date)
              .toLocaleString()
              .replace("下午", "")
          }}
        </span>
        <br /><br />
        <p style="font-size: 0.36rem">
          <span v-show="detailsData.price > 0" style="color: orange"
            >$ {{ detailsData.price }}</span
          >
          <span v-show="detailsData.price <= 0" style="color: #e60012"
            >免费</span
          >
        </p>
        <br />
      </div>

      <!-- 服务 -->
      <div class="sales">
        <span>服务: {{ detailsData.sales_num }}</span>
        <p>详情 <van-icon name="arrow" /></p>
      </div>
      <!-- 教学团队 -->
      <div class="tea">
        <p class="taem" style="font-weight: 700">教学团队</p>
        <div class="teacherList">
          <div v-for="(item, index) in detailsData.teachers_list" :key="index">
            <div
              style="border-radius: 50%"
              @click="
                $router.push({ path: '/Detailspage', query: { id: item } })
              "
            >
              <img
                :src="item.teacher_avatar"
                alt=""
                style="width: 1rem; height: 1rem"
              />
            </div>
            <p>{{ item.teacher_name }}</p>
          </div>
        </div>
      </div>
      <!-- 课程大纲... -->
      <van-tabs v-model="active" scrollspy sticky style="margin-bottom: 0.3rem">
        <van-tab
          v-for="(item, index) in courseTitle"
          :title="item.name"
          :key="index"
        >
          <div style="background: ; padding: 0.4rem 0.2rem; width: 100%">
            <p style="font-weight: 700; margin-bottom: 0.2rem">
              {{ item.name }}
            </p>
            <div
              style="margin-left: 0.4rem; background: white; padding: 0.2rem"
              v-if="item.name == '课程介绍'"
              v-html="item.course_details"
            ></div>
            <!-- 课程大纲 -->
            <div v-if="item.name == '课程大纲'" style="background: white">
              {{ item.title }}
            </div>

            <div
              v-if="item.name == '课程评价'"
              style="
                margin-top: 0.3rem;
                background: white;
                padding-bottom: 1rem;
              "
            >
              <img
                style="width: 100%"
                src="@/assets/img/jie/WeChat8bfa94ee0474b67df86b21c98ade9da0.png"
                alt=""
              />
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>

    <van-submit-bar v-if="detileInfo.is_buy == 0" button-text="立即报名" @submit="onSubmit" />
    <van-submit-bar v-else button-text="立即学习" @submit="onSubmit2" />
    <!-- 分享 -->
    <van-overlay :show="show1" @click="unshow">
      <div class="wrapper" @click="unshow">
        <div class="block">
          <p
            style="
              text-align: center;
              margin-top: 0.2rem;
              color: red;
              font-size: 0.3rem;
            "
          >
            快来扫一扫分享给好友吧！
          </p>
          <qriously
            style="margin-left: 25%; margin-top: 20%"
            :value="initQCode"
            :size="138"
          />
        </div>
      </div>
    </van-overlay>

    <!-- 分享 -->
  </div>
</template>

<script>
import {
  courseBasis,
  courseInfo,
  collect,
  cancelCollect,
  shopInfo,
  courseChapter,
  collectcancel,
} from "../../utils/api/index";
export default {
  data() {
    return {
      // 详情数据
      detailsData: {},
      scroll: 0,
      active: 0,
      course: [],
      courseTitle: [
        {
          name: "课程介绍",
        },
        { name: "课程大纲" },
        { name: "课程评价" },
      ],
      activeNames: [1],
      colleFlag: false,
      show1: false,
      initQCode: "http://localhost:8080/#/details?item=67",
      show1:false,
      initQCode: 'http://localhost:8080/#/details?item=67',
      detileInfo : {}
    };
  },
  methods: {
    //   立即报名方法
    enlist() {
      //   如果用户没有登录 那么进行提示
      // console.log(!this.detailsData.has_buy)
      if (this.$store.state.token == "") {
        this.$toast.loading({
          message: "正在跳转登录页面...",
          forbidClick: true,
          duration: 100,
        });
        return this.$router.push("/login");
      }
      if (!this.detailsData.has_buy) {
        //   如果已经报名提示用户已经报名
        return this.$toast.success("你已经报名该课程啦！");
      }
      //   如果登录成功 那么就进行报名操作
      this.$toast.loading({
        message: "正在报名...",
        forbidClick: true,
      });

      this.$toast.success("报名成功");

      // 改变是否购买的状态
      this.detailsData.has_buy = false;
    },
    // 详情数据
    async detailsDatas() {
      let res = await courseBasis();
      let data = res.data.list.filter((item) => {
        return item.course_classify_id == this.$route.query.item;
      });
      this.detailsData = data[0];
      // console.log(this.detailsData);
    },
    async courseInfoData() {
      // console.log(this.detailsData.teachers_list[0].course_basis_id);
      let res = await courseInfo(
        this.detailsData.teachers_list[0].course_basis_id
      );
      // console.log(res)
      this.courseTitle[0].course_details = res.data.info.course_details;
      this.courseTitle[1].title = res.data.info.title;
      this.detileInfo = res.data.info;
      // console.log(res);
      // console.log(this.courseTitle);
    },
    // 点击收藏按钮
    async clickCollection() {
      if (this.detileInfo.is_collect > 0) {
        // 取消收藏
        let res = await collectcancel(this.detileInfo.collect_id);
        console.log(res)
        this.$toast.success("取消收藏成功");
       
      } else {
        let res = await collect(
          this.detailsData.teachers_list[0].course_basis_id
        );
        console.log(res)
        if (res.code == 200) {
          this.$toast.success(res.msg);
        }
      }
    },
    // 立即报名
    async onSubmit() {
      let res = await shopInfo(this.detailsData.course_type);
      let obj = {
        course_type : this.detailsData.course_type,
        id : this.detailsData.id
      }
      console.log(obj)
      this.$router.push({
        path: "/order",
        query: { res, courseTitle: this.courseTitle ,obj},
      });
    },
    onSubmit2() {
      this.$router.push("/myFeature")
    },
    share() {
      // console.log('分享')
      // console.log(this.$router.history.current.fullPath)
      this.show1 = true;
      this.initQCode =
        "http://localhost:8080/#" + this.$router.history.current.fullPath;
      // console.log(this.initQCode)
    },
    unshow() {
      // console.log(this.show1)
      this.show1 = false;
    },
  },
  computed: {},
  filters: {},
  components: {},
  directives: {},
  async mounted() {
    await this.detailsDatas();
    this.courseInfoData();

    // console.log(this.$route.query)
    // console.log(this.detailsData.teachers_list[0].teacher_name)
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.detials {
  width: 100%;
  height: 100%;
  font-size: 0.22rem;
  .cover_img {
    width: 100%;
  }
  .sales {
    display: flex;
    justify-content: space-between;
    padding: 0rem 0.256rem;
    align-items: center;
    margin: 0.256rem 0rem 0rem;
    background: white;
    height: 0.99rem;
  }
  .tea {
    margin: 0.16rem 0 0;
    padding: 0.08rem 0.16rem 0rem;
    background: white;
    .taem {
      margin: 0.4rem 0rem;
    }
  }
  .teacherList {
    display: flex;
    margin: 0.2rem 0rem;
    height: 1.86rem;
    div {
      margin-left: 0.2rem;
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      img {
        border-radius: 50%;
        margin-bottom: 0.2rem;
      }
    }
  }
}
.van-tab__pane {
  background: white;
  margin-bottom: 0.4rem;
  padding-top: 0.4rem;
  p:nth-of-type(1) {
    font-size: 0.36rem;
  }
  div > div {
    padding: 0.4rem;
  }
}
.van-submit-bar__button {
  width: 100%;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 5rem;
  height: 5rem;
  background-color: #fff;
}
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    width: 5rem;
    height: 5rem;
    background-color: #fff;
  
    
  }
</style>