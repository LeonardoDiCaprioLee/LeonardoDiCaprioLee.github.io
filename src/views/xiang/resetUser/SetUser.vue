<template>
  <div class="setUser">
    <van-nav-bar title="标题" left-arrow @click-left="onClickLeft" />
    <div class="contentUser">
      <ul>
        <!-- 头像 -->
        <li class="border-bottom">
          <span>头像</span>
          <p @click="resetPhoto">
            <span><img :src="obj.avatar" alt=""/>
            </span><van-icon size="20" name="arrow" />
          </p>
        </li>
        <!-- 姓名 -->
        <li class="border-bottom">
          <span>姓名</span>
          <p @click="resetnickname">
            <span>{{ obj.nickname }}</span
            ><van-icon size="20" name="arrow" />
          </p>
        </li>
        <!-- 手机号 -->
        <li class="border-bottom">
          <span>手机号</span>
          <p>
            <span>{{ obj.mobile }}</span
            ><van-icon/>
          </p>
        </li>
        <!-- 性别 -->
        <li class="border-bottom">
          <span>性别</span>
          <p @click="sex(obj.sex)">
            <span>{{ obj.sex == 0 ? "男" : "女" }}</span
            ><van-icon size="20" name="arrow" />
          </p>
        </li>
        <!-- 出生日期 -->
        <li class="border-bottom">
          <span>出生日期</span>
          <p>
            <van-cell
              :title="obj.birthday"
              :value="message.date"
              @click="show = true"
            /><van-calendar
              v-model="show"
              @confirm="onConfirm"
              :min-date="minDate"
              :max-date="maxDate"
            /><van-icon size="20" name="arrow" />
          </p>
        </li>
        <!-- 所在城市 -->
        <li class="border-bottom">
          <span>所在城市</span>
          <p @click="showPopup" class="city"><span>{{obj.province_name}}-{{obj.city_name}}-{{obj.district_name}}</span><van-icon size="20" name="arrow" /></p>
        </li>
        <li class="border-bottom">
          <span>年级</span>
          <p @click="showGrade"><span>请选择年级</span><van-icon size="20" name="arrow" /></p>
        </li>
        <li>
          <span>学科</span>
            <p @click="content = true">
                <span v-if="message.content==''">请选择学科</span>
                <span v-else>
                    <span v-for="(item,index) in message.content" :key="index">{{item.name}}</span>
                </span>
                <van-icon size="20" name="arrow" />
            </p>
        </li>
      </ul>
    </div>
    <!-- 地址弹框 -->
    <van-popup v-model="show2"
      position="bottom" >
      <van-area
        :area-list="areaList"
        @confirm="city"
        @cancel="cancel"
        :columns-placeholder="['请选择', '请选择', '请选择']"
    /></van-popup>
    <!-- 头像弹框 -->
    <van-popup v-model="photoShow" position="bottom" class="photo">
      <p class="border-bottom">拍张</p>
      <p class="border-bottom" @click="gotoPhoto">
        <input type="file" accept="image/*" @change="handleFile" class="hiddenInput" style="display: none;"/>从相册中添加图片</p>
      <p>取消</p>
    </van-popup>
    <!-- <van-cell v-model="photoShow" value="1" position="bottom" :style="{ height: '30%' }" > -->
    <!-- 年级选择框 -->
    <van-popup v-model="gradeShow" position="bottom" >
      <van-area :title="name" :area-list="grade" 
        @confirm="addGrade" :columns-num="1" item-height="0.5rem"/>
    </van-popup>
    <!-- 学科选择 -->
    <van-popup v-model="content" class="contentList">
      <p>学科选择</p>
      <ul>
        <li
          v-for="(item, index) in contentList"
          :key="index"
          @click="contentListClick(item)"
          :class="item.type==true?'bgColor':''"
        >
          {{ item.name }}
        </li>
      </ul>
      <button @click="ok">确认</button>
    </van-popup>
  </div>
</template>

<script>
import sj from "@/assets/js/site";
import {Personal,ageDis,city,resetPersonal,photo} from '@/utils/api/index'

export default {
  data() {
    return {
      obj: {},
      message: {
        date: null,
        content: [],
      },
      minDate: new Date(2000, 0, 1),
      maxDate: new Date(),
      show: false,
      show2: false,
      areaList: sj,
      time:{},
      // 地址
      ctObj:{
          city_id: '',
          city_name: '',
          district_id: '',
          district_name: '',
          province_id: '',
          province_name: ''
        },
      // 地址隐藏显示
      photoShow:false,
      // 年级
      grade:{
        province_list:{
          1:"初一",
          2:"初二",
          3:"初三",
          4:"高一",
          5:"高二",
          6:"高三",
        }
      },
      // 年级隐藏显示
      gradeShow:false,
      name:'',
      // 学科
      contentList: [
        { 
            name: "语文",
            type:false
        },
        { 
            name: "数学",
            type:false
        },
        { 
            name: "英语",
            type:false
        },
        { 
            name: "物理",
            type:false
        },
        { 
            name: "化学",
            type:false
        },
        { 
            name: "生物",
            type:false
        },
        { 
            name: "政治",
            type:false
        },
        { 
            name: "历史",
            type:false
        },
        { 
            name: "地理",
            type:false
        },
      ],
      // 学科隐藏显示
      content: false,
      userInfo:{avatar:''}
    };
  },
  created(){
    // 调用个人信心接口函数
    this.myUser()
    ageDis().then(res=>{
    })
    city().then(res=>{
    })
  },
  methods: {
    // 个人信心数据
    myUser() {
    // 个人信息数据接口
      Personal().then(res=>{
        this.obj  = res
      })
    },
    // 回到上一层
    onClickLeft() {
      this.$router.go(-1);
    },
    // 跳转修改性别路由
    sex() {
      this.$router.push({ path: "/sex",query:{readios:this.obj.sex}});
    },
    // 跳转修改姓名路由
    resetnickname(){
      this.$router.push({ path: "/resetNikename",query:{nicknames:this.obj.nickname}});
    },
    // 出生日期解析
    formatDate(date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    // 点击确定，添加出生日期
    onConfirm(date) {
      this.show = false;
      this.time = this.formatDate(date)
      resetPersonal({birthday:this.time}).then(res=>{
        this.myUser()
      })
    },
    // 修改城市
    city(val) {
      this.ctObj.city_id= val[1].code,
      this.ctObj.city_name= val[1].name,
      this.ctObj.district_id= val[2].code,
      this.ctObj.district_name= val[2].name,
      this.ctObj.province_id= val[0].code,
      this.ctObj.province_name= val[0].name
      resetPersonal(this.ctObj).then(res=>{
        this.myUser()
      })
      
      this.show2 = false
    },
    // 显示隐藏城市
    showPopup() {
      this.show2 = true;
    },
    // 取消隐藏城市
    cancel() {
      this.show2 = false
    },
    // 修改头像框弹出
    resetPhoto() {
      this.photoShow = true
    },
    // 相册中选择相片
    gotoPhoto() {
      this.$el.querySelector('.hiddenInput').click()
    },
    // 修改头像
    handleFile(e) {
      this.photoShow = false
      // 将本地图片转换为线上图片
      let formDate = new FormData()
      formDate.append("file",e.target.files[0])
      photo(formDate).then(async res=>{
        await resetPersonal({avatar:res.data.data.path}).then(async r=>{
          await this.myUser()
        })
      })
    },
    // 年级弹出框
    showGrade() {
      this.gradeShow = true
    },
    addGrade(val) {
      this.name = val.name
      this.gradeShow = false
    },
    // 学科确认
    ok() {
        this.contentList.filter(item=>{
            if(item.type == true){
                this.message.content.push(item);
            }
        })
        this.content = false;
    },
    // 选中学科背景变色
    contentListClick(item) {
        item.type = !item.type
        if(item.type==true){
        }
    },
  },
};
</script>

<style lang="scss" scoped>
.setUser {
  width: 100%;
  height: 100%;
  .contentUser {
    width: 100%;
    padding: 0 0.3rem;
    background-color: #fff;
    margin-top: 0.1rem;
    ul {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      li {
        width: 100%;
        height: 1.2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        > span {
          font-size: 0.3rem;
        }
        p {
          width: 50%;
          height: 1.2rem;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          span {
            font-size: 0.26rem;
            color: #999;
            img {
              width: 0.8rem;
              height: 0.8rem;
              border-radius: 50%;
            }
          }
          i {
            width: 0.4rem;
            height: 0.4rem;
            color: #999;
          }
        }
        .city{
          width: 80%;
        }
      }
    }
  }
  // 修改头像
  .photo{
    width: 100%;
    height: 3rem;
    p{
      text-align: center;
      height: 1rem;
      line-height: 1rem;
      font-size: 0.3rem;
    }
  }
  // 学科
  .contentList {
    width: 90%;
    padding: 0 0.3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      text-align: center;
      font-size: 0.4rem;
      padding: 0.5rem 0;
      input{
        outline: none;
        display: none;
      }
      .hiddenInput{
        display: none;
      }
    }
    ul {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      li {
        width: 30%;
        height: 0.7rem;
        font-size: 0.4rem;
        background-color: #eee;
        padding: 0.2rem 0;
        margin: 0.2rem 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .bgColor{
          background-color: orangered;
          color: #fff;
      }
    }
    button {
      width: 2.3rem;
      height: 0.8rem;
      background-color: orangered;
      font-size: 0.26rem;
      margin: 0.5rem;
      border: none;
      color: #fff;
      border-radius: 0.1rem;
    }
  }
}
</style>
