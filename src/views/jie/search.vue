<template>
  <div>
    <van-search
      v-model="searchVal"
      show-action
      placeholder="请输入内容"
      @cancel="onCancel"
      shape="round"
      @input="inputVal"
      :clearable="false"
    >
      <!-- 清除左侧搜索按钮 -->
      <template #left-icon>
        <span></span>
      </template>
      <!-- 右侧文字 -->
      <template #action>
        <div @click="onCancel">{{ searchRight }}</div>
      </template>
    </van-search>
    <div class="oldSearch">
      <!-- 头部 -->
      <p>
        <span> 历史搜索 </span>
        <van-icon name="delete-o" @click="clear" />
      </p>
      <!-- 渲染历史搜索 -->
      <div class="old">
        <span
          class="searchItem"
          v-for="(item, index) in oldSearchArr"
          :key="index"
          @click="goCurrs(item)"
          >{{ item }} <i @click.stop="delItem(index)">x</i></span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchVal: "",
      // 搜索过的记录
      oldSearchArr: JSON.parse(window.localStorage.getItem("search")) || [],
      //   搜索框右侧数据
      searchRight: "取消",
    };
  },
  methods: {
    // 输入内容
    inputVal() {
      if (this.searchVal.length > 0) {
        this.searchRight = "搜索";
      } else {
        this.searchRight = "取消";
      }
    },
    // 点击右侧
    onCancel() {
      if (this.searchRight == "取消") {
        // 将vuex中的数据进行替换
        this.$store.commit("chooseGrades", []);
        return this.$router.go(-1);
      } else if (this.searchRight == "搜索") {
        // 如果是搜索按钮那么将当前搜索的内容保存到数组中
        if (this.oldSearchArr.indexOf(this.searchVal) == -1) {
          if (this.oldSearchArr.length >= 8) {
            this.oldSearchArr.pop();
            this.oldSearchArr.unshift(this.searchVal);
          } else {
            this.oldSearchArr.unshift(this.searchVal);
          }
        }
        // 将新的数组保存到本地
        window.localStorage.setItem(
          "search",
          JSON.stringify(this.oldSearchArr)
        );
        // 将vuex中的数据进行替换
        this.$store.commit("chooseGrades", [this.searchVal]);
        // 跳转路由
        this.$router.push({path:"/curriculum",query:{name:this.searchVal}});
      }
    },
    // 点击历史搜索
    goCurrs(item) {
      // 将vuex中的数据进行替换
      this.$store.commit("chooseGrades", [item]);
      // 跳转路由
      this.$router.push({path:"/curriculum",query:{name:item}});
    },
    // 删除该条搜索记录
    delItem(index) {
      this.$dialog
        .confirm({
          message: "确定删除该条记录嘛?",
        })
        .then(() => {
          this.oldSearchArr.splice(index, 1);
          window.localStorage.setItem(
            "search",
            JSON.stringify(this.oldSearchArr)
          );
        })
        .catch(() => {
          // on cancel
        });
    },
    // 清空搜索记录
    clear() {
      this.oldSearchArr = [];
      // 将新的数组保存到本地
        window.localStorage.setItem(
          "search",
          JSON.stringify(this.oldSearchArr)
        );
    },
  },
  computed: {},
  filters: {},
  components: {},
  directives: {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
.oldSearch {
  display: flex;
  flex-direction: column;
  font-size: 0.22rem;
  p {
    padding: 0.2rem 0.2rem;
    display: flex;
    justify-content: space-between;
  }
  .old {
    margin-top: 0.4rem;
    display: flex;
    flex-wrap: wrap;
  }
  .searchItem {
    display: block;
    border-radius: 0.6rem;
    padding: 0.3rem 0.6rem;
    margin-left: 0.3rem;
    position: relative;
    margin-bottom: 0.2rem;
    background: #ededed;
    i {
      display: inline-block;
      color: white;
      background: grey;
      line-height: 0.3rem;
      width: 0.3rem;
      height: 0.3rem;
      text-align: center;
      position: absolute;
      right: 0.3rem;
      top: 0.1rem;
      border-radius: 50%;
    }
  }
}
</style>