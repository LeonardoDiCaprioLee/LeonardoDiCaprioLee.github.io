<template>
  <div class="order">
    <div class="title">
      <p style="display: flex; justify-content: space-between">
        <span>{{ info.title }}</span>
        <span>{{ info.sales_num }}</span>
      </p>
      <p>共{{ info.course_type }}课时</p>
    </div>

    <div class="coupon">
        <p>优惠券</p>
        <p>无可用</p>
    </div>

    <div class="more">
        <p>
            <span>商品金额</span>
            <span>0</span>
        </p>
        <p>
            <span>优惠券金额</span>
            <span>0</span>
        </p>
        <p>
            <span>合计</span>
            <span>0</span>            
        </p>
    </div>
    <van-submit-bar :price="0" button-text="提交订单" @submit="onSubmit" />
  </div>
</template>

<script>
import { downOrder } from "../../utils/api/index";
export default {
  data() {
    return {
      info: {},
      obj : {},
    };
  },
  methods: {
      async onSubmit(){
          let res = await downOrder(this.obj);
          this.$toast.success(res.msg);
          this.$router.go(-1)
      }
  },
  computed: {},
  filters: {},
  components: {},
  directives: {},
  mounted() {
    this.info = this.$route.query.res.data.info;
    this.obj = this.$route.query.obj;
    console.log(this.info,this.obj)
  },
};
</script>

<style lang="scss" scoped>
.order {
  width: 100%;
  height: 100%;
  font-size: 0.22rem;
  padding: 0.2rem;
  border-radius: 0.2rem;
  .title {
      border-radius: 0.2rem;
    background: white;
    p:nth-of-type(1) {
      padding: 0.2rem;
      span:nth-of-type(2){
          color: red;
          font-size: 0.3rem;
      }
    }
    p:nth-of-type(2) {
      padding: 0.3rem 0.2rem;
    }
  }
  .coupon{
      display: flex;
      justify-content: space-between;
      padding: 0.3rem;
      background: white;
      margin-top: 0.2rem;
      border-radius: 0.2rem;
  }
  .more{
      margin-top: 0.2rem;
      padding: 0.3rem;
      border-radius: 0.2rem;
      background: white;
      p{
          margin: 0.1rem 0;
          width: 100%;
          display: flex;
          justify-content: space-between;
      }
  }
}
</style>