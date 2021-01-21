<template>
  <div class="myFeature">
    <van-sticky>
      <van-nav-bar title="我的特色课" left-arrow @click-left="onClickLeft" />
      <van-tabs v-model="active" class="border-bottom"  line-width="20px" @click="tab">
        <van-tab v-for="(item,index) in myStudyTitle" :key="index" :title="item.name+'  ('+item.num+')'" :name="item.type"></van-tab>
      </van-tabs>
    </van-sticky>
    <div class="myFeature_list">
        <ul>
          <li v-for="(item,index) in myStudyList" :key="index" @click="myStudyListId(item.course_id)"> 
            <p>{{item.title}}</p>
            <p><img src="@/assets/images/my-feature/time.png" alt=""><span>{{item.start_play_date | time}}~{{item.end_play_date | time}}</span>|<span>共{{item.section_num}}课时</span></p>
            <p>已学习0%</p>
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
import { myStudy,myStudyCourse } from "@/utils/api/index";
export default {
  data() {
    return {
      myStudyTitle:[],  // 标题
      myStudyList:[],   // 数据
      myStudyList2:[],   // 数据
      active:2,
      num:1
    };
  },
  async created() {
    let data = await myStudy()
    if(data.code==200) {
      this.myStudyTitle = data.data.typeNum
      this.myStudyList2 = data.data.courseList
      this.myStudyList = this.myStudyList2.filter(res=>{
        return res.course_type == 2||4
      })
    }
  },
  mounted() {},
  methods: {
      onClickLeft() {
          this.$router.go(-1)
      },
      tab() {
        if(this.active == 2) {
            this.myStudyList = this.myStudyList2.filter(res=>{
              return res.course_type == 2||4
            })
        } else if(this.active == 5) {
            this.myStudyList = this.myStudyList2.filter(res=>{
              return res.course_type == 5
            })
        } else if(this.active == 7) {
            this.myStudyList = this.myStudyList2.filter(res=>{
              return res.course_type == 7
            })
        }else if(this.active == 10) {
            this.myStudyList = this.myStudyList2.filter(res=>{
              return res.course_type == 10
            })
        }
      },
      myStudyListId(id) { // 课程id
        myStudyCourse(id).then(async res=>{
        })
      }
  },
  filters:{
      time(val) {
        var date = new Date(val * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let MM = date.getMonth() + 1;
        let d = date.getDate();
        d = d < 10 ? "0" + d : d;
        let h = date.getHours();
        h = h < 10 ? "0" + h : h;
        let m = date.getMinutes();
        m = m < 10 ? "0" + m : m;
        let s = date.getSeconds();
        s = s < 10 ? "0" + s : s;
        return " " + MM + "月" + d + "日 " + h + ":" + m + " "
      }
  }
};
</script>

<style lang="scss" scoped>
  .myFeature{
    width: 100%;
      background-color: #fff;
    .myFeature_list{
      width: 100%;
      ul{
        width: 100%;
        padding: 0 0.3rem;
        li{
          width: 100%;
          margin-top: 0.2rem;
          height: 3rem;
          box-shadow: 0 0 10px -7px;
          padding: 0.5rem 0.2rem;
          p:nth-child(1){
            font-size: 0.35rem;
          }
          p:nth-child(2){
            display: flex;
            margin-top: 0.2rem;
            font-size: 0.22rem;
            color: #999;
            img{
              width: 0.26rem;
              height: 0.26rem;
            }
            span{
              margin: 0 0.1rem;
            }
          }
          p:nth-child(3){
            font-size: 0.22rem;
            margin-top: 0.8rem;
            color: #999;
          }
        }
      }
    }
  }
</style>
