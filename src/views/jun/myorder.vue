<template>
  <div>
    <van-tabs v-model="active">
      <van-tab title="全部订单" style="margin-bottom:0.5rem;">
        <div class="mydiv" v-for="(item,index) in arr" :key="index">
          <div >
            <p style="font-size:0.3rem;margin-top:0.2rem;">
              <span style="padding-left:0.2rem;">
                订单编号:{{item.order_number}}
                <span
                  style="float:right;color:red;padding-right:0.2rem;"
                >交易完成</span>
              </span>
            </p>
            
            <p style="font-size:0.3rem;padding-left:0.2rem;margin-top:0.2rem;">{{item.title}}</p>
            <p style="font-size:0.3rem;padding-left:0.2rem;margin-top:0.2rem;">下单时间:{{timestampToTime(item.created_at)}}</p>
            <p style="font-size:0.3rem;padding-left:0.2rem;margin-top:0.2rem;">实付款:{{item.ship_price}}</p>
          </div>
        </div>
      </van-tab>
      <van-tab style="margin-bottom:0.5rem;" title="待支付">
         <div class="mydiv" v-for="(item,index) in arr" :key="index">
          <div >
            <p style="font-size:0.3rem;margin-top:0.2rem;">
              <span style="padding-left:0.2rem;">
                订单编号:{{item.order_number}}
                <span
                  style="float:right;color:red;padding-right:0.2rem;"
                >待支付</span>
              </span>
            </p>
            
            <p style="font-size:0.3rem;padding-left:0.2rem;margin-top:0.2rem;">{{item.title}}</p>
            <p style="font-size:0.3rem;padding-left:0.2rem;margin-top:0.2rem;">下单时间:{{timestampToTime(item.created_at)}}</p>
            <p style="font-size:0.3rem;padding-left:0.2rem;margin-top:0.2rem;">实付款:{{item.ship_price}}</p>
          </div>
        </div>
      </van-tab>
      <van-tab style="margin-bottom:0.5rem;" title="交易完成"> <div class="mydiv" v-for="(item,index) in arr" :key="index">
          <div >
            <p style="font-size:0.3rem;margin-top:0.2rem;">
              <span style="padding-left:0.2rem;">
                订单编号:{{item.order_number}}
                <span
                  style="float:right;color:red;padding-right:0.2rem;"
                >交易完成</span>
              </span>
            </p>
            
            <p style="font-size:0.3rem;padding-left:0.2rem;margin-top:0.2rem;">{{item.title}}</p>
            <p style="font-size:0.3rem;padding-left:0.2rem;margin-top:0.2rem;">下单时间:{{timestampToTime(item.created_at)}}</p>
            <p style="font-size:0.3rem;padding-left:0.2rem;margin-top:0.2rem;">实付款:{{item.ship_price}}</p>
          </div>
        </div></van-tab>
      <van-tab style="margin-bottom:0.5rem;" title="交易关闭"> <div class="mydiv" v-for="(item,index) in arr" :key="index">
          <div >
            <p style="font-size:0.3rem;margin-top:0.2rem;">
              <span style="padding-left:0.2rem;">
                订单编号:{{item.order_number}}
                <span
                  style="float:right;color:red;padding-right:0.2rem;"
                >交易关闭</span>
              </span>
            </p>
            
            <p style="font-size:0.3rem;padding-left:0.2rem;margin-top:0.2rem;">{{item.title}}</p>
            <p style="font-size:0.3rem;padding-left:0.2rem;margin-top:0.2rem;">下单时间:{{timestampToTime(item.created_at)}}</p>
            <p style="font-size:0.3rem;padding-left:0.2rem;margin-top:0.2rem;">实付款:{{item.ship_price}}</p>
          </div>
        </div></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getMyorder } from "../../utils/api/index.js";
export default {
  name: "",
  props: {},
  data() {
    return {
      active: "0",
      order: [{ page: 1, limit: 10, order_status: 0, order_type: "2" }],
      arr: []
    };
  },
  mounted() {
    // http://120.53.31.103:84/api/app/myOrder
    // 获取全部订单
    getMyorder().then(res => {
      this.arr = res.data.list;
    });
  },
  components: {},
  computed: {},
  methods: {
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
  },
  watch:{
    active(e){
      if(e==0){
        this.order={ page: 1, limit: 10, order_status: 0, order_type: "2" }
         getMyorder(this.order).then(res => {
      this.arr = res.data.list;
    });
      }
      if(e==1){
        this.order={page: 1, limit: 10, order_status: 1, pay_status: 1, order_type: "2"}
         getMyorder(this.order).then(res => {
      this.arr = res.data.list;
    });
      }
      if(e==2){
        this.order={page: 1, limit: 10, order_status: 2, order_type: "2"}
         getMyorder(this.order).then(res => {
      this.arr = res.data.list;
    });
      }
      if(e==3){
        this.order={page: 1, limit: 10, order_status: 3, order_type: "2"}
         getMyorder(this.order).then(res => {
      this.arr = res.data.list;
    });
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.mydiv {
  width: 100%;
  height: 4rem;
  // background: #0088dd;
  float: left;
  display: flex;
  justify-content: space-around;
  align-items: center;
  

  div {
    width: 95%;
    height: 3rem;
    background: white;
    float: left;
    border-radius: 0.1rem;
  }
}
</style>
