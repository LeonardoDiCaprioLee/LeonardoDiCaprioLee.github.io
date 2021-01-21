<template>
  <div class="currSelect">
    <van-tabs v-model="activeName" line-height="0px" @click="tabClick">
      <van-tab
        :name="item.activeName"
        v-for="item in selectData"
        :key="item.id"
      >
        <template #title>
          {{ item.title }}
          <van-icon name="arrow-down" v-show="!item.flag" />
          <van-icon name="arrow-up" v-show="item.flag" />
        </template>
        <template>
          <!-- 分类 -->
          <div
            v-show="item.flag && activeName == 'classify'"
            class="classify border-top"
          >
            <div
              class="tmk-item border-bottom"
              v-for="(item, cIndex) in classify"
              :key="cIndex"
            >
              <p class="grade">{{ item.name }}</p>
              <div class="grades">
                <div
                  v-for="(items, index) in item.grades"
                  :key="index"
                  :class="
                    items.flag == true ? 'gradeBg gradeItem' : 'gradeItem'
                  "
                  @click="chooseDiv(items, cIndex)"
                >
                  {{ items.classGrades }}
                </div>
              </div>
            </div>
            <div class="search-btn">
              <button @click="reset">重置</button>
              <button @click="submit">确定</button>
            </div>
          </div>
          <!-- 排序 -->
          <div
            class="sort border-top"
            v-show="item.flag && activeName == 'sort'"
          >
            <div
              v-for="(item, index) in sortData"
              :key="index"
              :class="
                item.sort_flag
                  ? 'sortData border-top sortColor'
                  : 'sortData border-top'
              "
              @click="chooseSort(item)"
            >
              {{ item.name }}
            </div>
          </div>
          <!-- 筛选课 -->
          <div class="screen  border-top" v-show="item.flag && activeName == 'screen'">
            <div
              v-for="(item, index) in screenData"
              :key="index"
              :class="item.screen_flag ? 'screenList screenColor' : 'screenList'"
              @click="chooseScreen(item)"
            >
              {{ item.name }}
            </div>
          </div>
        </template>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import eventBus from "./eventBus"
import { courseClassify,courseBasis } from "../../utils/api/index"
export default {
  data() {
    return {
      // 默认访问的下拉列表
      activeName: "classify",
      // 模拟选择的数据
      selectData: [
        {
          id: 1,
          title: "分类",
          // 访问的activeName
          activeName: "classify",
          // 是否显示下拉的状态值
          flag: false,
        },
        {
          id: 2,
          title: "排序",
          activeName: "sort",
          flag: true,
        },
        {
          id: 3,
          title: "筛选",
          activeName: "screen",
          flag: false,
        },
      ],
      // 分类数据
      classify: [
        {
          name: "年级",
          grades: [
            {
              classGrades: "初一",
              flag: false,
            },
            {
              classGrades: "初二",
              flag: false,
            },
            {
              classGrades: "初三",
              flag: false,
            },
            {
              classGrades: "高一",
              flag: false,
            },
            {
              classGrades: "高二",
              flag: false,
            },
          ],
        },
        {
          name: "学科",
          grades: [
            {
              classGrades: "语文",
              flag: false,
            },
            {
              classGrades: "数学",
              flag: false,
            },
            {
              classGrades: "英语",
              flag: false,
            },
            {
              classGrades: "化学",
              flag: false,
            },
            {
              classGrades: "物理",
              flag: false,
            },
          ],
        },
      ],
      // 排序数据
      sortData: [
        {
          name: "综合排序",
          sort_flag: false,
        },
        {
          name: "最新",
          sort_flag: false,
        },
        {
          name: "最热",
          sort_flag: false,
        },
        {
          name: "价格从低到高",
          sort_flag: false,
        },
        {
          name: "价格从高到低",
          sort_flag: false,
        },
      ],
      // 筛选数据
      screenData: [],
      // 选择分类的数组
      chooseGrades : [],
    };
  },
  methods: {
    // tabs点击触发事件
    tabClick(name, title) {
      // 获取到对应的下标
      const index = this.selectData.findIndex((item) => {
        return item.activeName == name;
      });
      // 将数组中对应下标数组中的flag取反
      this.selectData[index].flag = !this.selectData[index].flag;
      for(let i = 0; i < this.selectData.length; i++){
        if(i == index){
          continue;
        }
        this.selectData[i].flag = false;
      }
      this.activeName = this.selectData[index].activeName;
    },
    // 分类下拉选择
    chooseDiv(items, cIndex) {
      // 获取它是年级还是学科的数据
      let obj = this.classify[cIndex];
      // 将选中的push到数组中用于筛选
      // for(let key in items){
      //   this.chooseGrades[key] = items[key]
      // }
      if(this.chooseGrades.length >= 2){
        this.chooseGrades.shift();
      }
      this.chooseGrades.push(items.classGrades)
      // 排他将其余的flag设置为false
      obj.grades.forEach((item) => {
        item.flag = false;
      });
      // 将对应的flag设置为true
      items.flag = true;
    },
    // 选择排序方式
    chooseSort(item, name) {
      // 排他
      this.sortData.forEach((item) => {
        item.sort_flag = false;
      });
      // 将sort排序框隐藏
      this.selectData[1].flag = false;
      // 将当前的flag值设置为true
      item.sort_flag = true;
      this.activeName = "";
    },
    // 筛选数据选择
    async chooseScreen(item){
      // 排他
      this.screenData.forEach(item => {
        item.screen_flag = false;
      })
      // 当前设置为true
      item.screen_flag = true;
      let res = await courseBasis(`course_type=${item.id}`);
      this.$store.commit("currs",res.data.list)
      // 隐藏筛选框
      this.selectData[2].flag = false;
      this.activeName = "";
    },
    // 提交分类数据
    submit() {
      const index = this.selectData.findIndex((item) => {
        return item.activeName == this.activeName;
      });
      this.selectData[index].flag = false;
      this.activeName = "";

      // 将选中的数组通过vuex给传到兄弟组件中
      this.$store.commit("chooseGrades",this.chooseGrades)
    },
    // 清空样式
    reset() {
      // 将年级和学科的状态都设置为false
      for (let i = 0; i < this.classify.length; i++) {
        this.classify[i].grades.forEach((item) => {
          item.flag = false;
        });
      }
      this.chooseGrades = [];
      // 将选中的数组通过vuex给传到兄弟组件中
      this.$store.commit("chooseGrades",this.chooseGrades)
    },
  },
  computed: {},
  filters: {},
  components: {},
  directives: {},
  async mounted() {
    let res = await courseClassify();
    this.screenData = res.data.appCourseType;
  },
};
</script>

<style lang="scss" scoped>
.currSelect {
  position: relative;
  .van-tab {
    font-size: 0.3rem;
  }
  // 分类
  .classify {
    margin-top: 0.4rem;
    padding: 0px 0px 0.2rem 0.3rem;
    position: absolute;
    background: white;
    z-index: 10;
    transform: translate(0px -329px);
    .grade {
      height: 0.76rem;
      font-size: 0.24rem;
      padding: 0.32rem 0px 0px;
    }
    // 分类-年级
    .grades {
      display: flex;
      flex-wrap: wrap;
      padding-bottom: 0.2rem;
      .gradeItem {
        width: 1.38rem;
        height: 0.66rem;
        background: #f5f5f5;
        text-align: center;
        line-height: 0.66rem;
        color: #646464;
        font-size: 0.26rem;
        margin: 0px 0.4rem 0.14rem 0px;
      }
    }
    .search-btn {
      width: 7.2rem;
      height: 1.26rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      button {
        width: 3.3396rem;
        height: 0.66rem;
        font-size: 0.2rem;
        background: transparent;
        border: 0.02rem solid #000;
        border-radius: 0.1rem;
      }
      button:nth-of-type(2) {
        background: #eb6100;
        color: white;
        border: none;
      }
    }
  }

  .van-tabs{
    padding-bottom: 0.4rem;
  }
  // 排序
  .sort {
       margin-top: 0.4rem;
    position: absolute;
    z-index: 10;
    background: white;
    .sortData {
      width: 7.5rem;
      height: 1.04rem;
      font-size: 0.28rem;
      text-align: center;
      line-height: 1.04rem;
    }
  }
  // 筛选数据
  .screen {
    display: flex;
       margin-top: 0.4rem;
    flex-wrap: wrap;
    padding: 0.4rem 0px 0px 0.3rem;
    position: absolute;
    background: white;
    z-index: 10;
    .screenList {
      font-size: 0.26rem;
      width: 1.38rem;
      height: 0.66rem;
      background: #f5f5f5;
      margin: 0px 0.4rem 0.14rem 0px;
      text-align: center;
      line-height: 0.66rem;
    }
  }
}

.gradeBg {
  color: #eb6100 !important;
  background: #ebeefe !important;
}
.sortColor {
  color: #eb6100 !important;
}
.screenColor {
  background: #ebeefe !important;
  color: #EB6100 !important;
}
.border-top::after {
  content: "";
  position: absolute;
  width: 200%;
  height: 1px;
  background-color: #f5f5f5;
  transform: scale(0.5);
  top: 0;
  left: -50%;
}
</style>