<template>
  <div class="main">
    <img src="../../static/img/ad.png" alt="推广" class="adImg" />
    <div class="loginBox">
      <div class="loginText">登入</div>
      <div class="inputBox">
        <div class="inputIcon pd17">
          <img src="../../static/img/phone.png" alt="手机号码" class="phoneIcon" />
          <div class="line"></div>
        </div>
        <van-field v-model="phone" label placeholder="手机号码" type="tel" />
      </div>
      <div class="inputBox">
        <div class="inputIcon pd17">
          <img src="../../static/img/pwd.png" alt="密码" class="pwdIcon" />
          <div class="line"></div>
        </div>
        <van-field v-model="password" label placeholder="登入密码" type="password" />
      </div>
    </div>
    <div class="registeredBtn" @click="goRegister">注 册</div>
    <div class="loginBtn" @click="submit">登 入</div>
    <div class="pact" @click="isAgree=!isAgree">
      <div class="radio">
        <div class="redDot" v-show="isAgree"></div>
      </div>
      <div class="xy">
        同意并阅读
        <span @click.stop="readPact">《橙店长推广协议》</span>
      </div>
    </div>
  </div>
</template>
<script>
import siteinfo from "@/common/siteinfo.js";
export default {
  name: "Home",
  data() {
    return {
      phone: "",
      password: "",
      isAgree: true,
    };
  },
  mounted() {},
  methods: {
    readPact(){

    },
    goRegister(){
      this.$router.push({name:'register'})
    },
    submit(){
      if(this.phone==''){
        this.$toast("手机号不能为空");
        return
      }else if(this.password==''){
        this.$toast("密码不能为空");
        return
      }else if(!this.isAgree){
        this.$toast("请同意并阅读推广协议");
        return
      }
      this.login()
    },
    login(){
      this.axios
        .post('agent/recommender_login',{
          wxapp_id:siteinfo.uniacid,
          phone:this.phone,
          password:this.password
        }).then(res=>{
           this.$toast.success("登入成功");
          console.log(res.data)        
          this.$cookie.set('rid', res.data.recommender_id, 1);
          this.$cookie.set('token', res.data.token, 1);
          this.$router.replace('/promoterList')
        })
    }
  },
};
</script>
<style scoped>
.adImg {
  width: 375px;
  height: 125px;
  margin-bottom: 11px;
}
.loginBox {
  width: 345px;
  height: 190px;
  background: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 3px 15px 0px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  overflow: hidden;
}
.loginText {
  font-weight: 700;
  color: #f03216;
  font-size: 18px;
  opacity: 0.72;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 22.5px;
}
.inputBox {
  width: 316px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  margin-bottom: 8px;
}
.inputIcon {
  display: flex;
  justify-content: center;
  position: relative;
}
.pd17 {
  padding-right: 8.5px;
}
.pd14 {
  padding-right: 7px;
}
.line {
  position: absolute;
  width: 1px;
  height: 12.5px;
  background-color: #ddd;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
.phoneIcon {
  width: 14px;
  height: 19px;
}
.pwdIcon {
  width: 15.5px;
  height: 18.5px;
}
.input {
  flex: 1;
}
.registeredBtn {
  /* position: fixed;
  left: 50%;
  transform: translateX(-50%); */
  margin-top: 92px;
  margin-left: auto;
  margin-right: auto;
  bottom: 141px;
  width: 345px;
  height: 44px;
  background: linear-gradient(
    rgba(255, 127, 0, 0.33) 0%,
    rgba(253, 153, 55, 0.33) 100%
  );
  border-radius: 5px;
  text-align: center;
  font-size: 17px;
  font-weight: 700;
  color: #fe8711;
  line-height: 44px;
}
.loginBtn {
  /* position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 77px; */
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  width: 345px;
  height: 44px;
  background: linear-gradient(#ff7f00 0%, #fd9937 100%);
  border-radius: 5px;
  text-align: center;
  font-size: 17px;
  font-weight: 700;
  color: #ffffff;
  line-height: 44px;
}
.pact {
  /* position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 25px; */
  margin-top: 12px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.radio {
  width: 17px;
  height: 17px;
  background-color: #fff;
  border-radius: 50%;
  border: 1px solid #ff7f00;
  display: flex;
  align-items: center;
  justify-content: center;
}
.redDot {
  width:12px;
  height: 12px;
  background-color: #ff7f00;
  border-radius: 50%;
}
.xy {
  font-size: 12px;
  color: #333333;
  display: flex;
  align-items: center;
}
.xy span {
  color: rgba(255, 127, 0, 1);
}
</style>>

