<template>
  <div class="wrapper">
    <div class="header">
      <div class="avatarBox">
        <img
          src="https://hbimg.huabanimg.com/27f36dc631515bf5dbadb934e84fa9635c4f83f3bd4fc-b99WxO_fw658/format/webp"
          alt
        />
        <span>{{list.name}}</span>
      </div>
      <div class="countBox">
        <span class="count">{{list.code}}</span>
        <span class="countText">我的推广码</span>
      </div>
      <div class="countBox">
        <span class="count">{{list.agents&&list.agents.length||0}}</span>
        <span class="countText">推荐店铺总数</span>
      </div>
    </div>
    <div class="title">推广店铺列表</div>
    <div class="list" v-if="list.agents&&list.agents.length.length>0">
      <div class="listItem" v-for="(item,index) in list.agents" :key="index">
        <img
          src="https://hbimg.huabanimg.com/27f36dc631515bf5dbadb934e84fa9635c4f83f3bd4fc-b99WxO_fw658/format/webp"
          alt
        />
        <div class="info">
          <div class="name1">{{item.name}}</div>
          <div class="name2">{{item.owner}}</div>
        </div>
        <div class="info rightCount">
          <div class="name1">成交数：{{item.order_count}}</div>
          <div class="name2">{{item.created_at}}</div>
        </div>
      </div>
    </div>
    <van-empty description="没有数据" v-else />
  </div>
</template>
<script>
import siteinfo from "@/common/siteinfo.js"; 
export default {
  data(){
    return{
      info:{},
      list:[]
    }
  },
  mounted(){
    this.hasToken()
  },
  methods:{
    hasToken(){
      let token = this.$cookie.get('token')
      if(token){
        //this.getUserInfo(token)
        this.getList(token)
      }else{
        this.$toast("请先登录");
        this.$router.push({path: '/login', replace: true})
      }
    },
    getUserInfo(token){
      this.axios.get('agent/recommender',{
        params:{
          wxapp_id:siteinfo.uniacid,
          token
        }
      }).then(res=>{
        this.info=res.data
        console.log(res.data)
      })
    },
    getList(token){
      this.axios.get('agent/recommender_agent',{
        params:{
          wxapp_id:siteinfo.uniacid,
          token
        }
      }).then(res=>{
        this.list=res.data
        console.log(res.data)
      })
    }
  }
};
</script>
<style>
.wrapper {
  font-size: 12px;
}
.header {
  width: 100%;
  height: 105px;
  background: #ff7f01;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 22px;
}
.avatarBox {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.avatarBox img {
  width: 44px;
  height: 44px;
  background: #ffffff;
  border: 1px solid #ffffff;
  border-radius: 50%;
  margin-bottom: 10px;
}
.avatarBox span {
  font-weight: 500;
  color: #ffffff;
  font-size: 14px;
}
.countBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ffffff;
}
.count {
  font-size: 16px;
  margin-bottom: 10px;
  font-weight: 700;
}
.countText {
  font-size: 12px;
}
.title {
  font-size: 16px;
  color: #333333;
  font-weight: 500;
  margin-left: 15px;
}
.list {
  width: 345px;
  min-height: 311px;
  background: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 3px 15px 0px rgba(0, 0, 0, 0.1);
  margin: 21px auto;
}
.listItem {
  position: relative;
  width: 100%;
  height: 70px;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
}
.listItem img {
  width: 36px;
  height: 36px;
  margin-left: 15px;
  border-radius: 50%;
}
.info {
  height: 36px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 11px;
}
.name1 {
  font-size: 14px;
  color: #000000;
}
.name2 {
  font-size: 12px;
  color: #666666;
}
.rightCount {
  position: absolute;
  right: 17px;
  top: 50%;
  transform: translateY(-50%);
}
</style>