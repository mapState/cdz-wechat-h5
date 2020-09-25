<template>
  <div class="main">
    <img src="../../static/img/ad.png" alt="推广" class="adImg" />
    <div class="loginBox">
      <div class="loginText">注册</div>
      <div class="inputBox">
        <div class="inputIcon">
          <img src="../../static/img/name.png" alt="姓名" class="nameIcon" />
          <div class="line"></div>
        </div>
        <van-field v-model="name" label placeholder="姓名" type="tel" />
      </div>
      <div class="inputBox">
        <div class="inputIcon">
          <img src="../../static/img/phone.png" alt="手机号码" class="phoneIcon" />
          <div class="line"></div>
        </div>
        <van-field v-model="phone" label placeholder="手机号码" type="tel" />
      </div>
      <div class="inputBox">
        <div class="inputIcon">
          <img src="../../static/img/yzm.png" alt="验证码" class="yzmIcon" />
          <div class="line"></div>
        </div>
        <van-field v-model="code" label placeholder="验证码" type="tel">
          <template #button>
            <!-- <van-button size="small" type="primary">发送验证码</van-button> -->
            <div class="codeBtn" v-if="time<=0" @click="getCode">获取验证码</div>
            <div class="time" v-else>{{time}}s</div>
          </template>
        </van-field>
      </div>
      <div class="inputBox">
        <div class="inputIcon">
          <img src="../../static/img/pwd.png" alt="密码" class="pwdIcon" />
          <div class="line"></div>
        </div>
        <van-field v-model="password" label placeholder="登入密码" type="password" />
      </div>
      <div class="inputBox bnone">
        <div class="inputIcon">
          <img src="../../static/img/cf.png" alt="密码" class="qrIcon" />
          <div class="line"></div>
        </div>
        <van-field v-model="confirm_password" label placeholder="确认密码" type="password" />
      </div>
    </div>
    <div class="registeredBtn" @click="submit">注 册</div>
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
      confirm_password: "",
      isAgree: true,
      code: "",
      name: "",
      time: 0,
      timer: null,
    };
  },
  mounted() {},
  destroyed() {
    this.tim && clearTimeout(this.timer);
  },
  methods: {
    submit() {
      if (this.name == "") {
        this.$toast("姓名不能为空");
        return;
      } else if (this.phone == "") {
        this.$toast("手机号不能为空");
        return;
      } else if (this.code == "") {
        this.$toast("验证码不能为空");
        return;
      } else if (this.password == "") {
        this.$toast("密码不能为空");
        return;
      } else if (this.confirm_password == "") {
        this.$toast("确认密码不能为空");
        return;
      } else if (this.confirm_password !== this.password) {
        this.$toast("两个密码不一致");
        return;
      }
      this.register();
    },
    //注册啦
    register() {
      this.$toast.loading({
        message: "注册中...",
        forbidClick: true,
      })
      this.axios
        .post("agent/recommender_register", {
          wxapp_id: siteinfo.uniacid,
          name: this.name,
          phone: this.phone,
          code: this.code,
          password: this.password,
          confirm_password: this.confirm_password,
          type: "recommender_register",
        })
        .then((res) => {
          this.$toast.success("注册成功");
          this.$router.push({path:'/login'})
        });
    },
    readPact() {},
    getCode() {
      if (this.phone.trim() == "") {
        this.$toast("手机号不能为空");
        return;
      }
      this.getCodeByPhone();
    },
    getCodeByPhone() {
      this.axios
        .post("agent/send_sms", {
          wxapp_id: siteinfo.uniacid,
          phone: this.phone,
          type: "recommender_register",
        })
        .then((res) => {
          console.log(res);
          this.$toast.success("发送成功");
          this.time = 60;
          this.countdown();
        });
    },
    countdown() {
      if (this.time > 0) {
        this.time--;
        this.timer = setTimeout(() => {
          this.countdown();
        }, 1000);
      } else {
        clearTimeout(this.timer);
      }
    },
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
  min-height: 338px;
  background: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 3px 15px 0px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  overflow: hidden;
  margin-bottom: 32px;
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
  padding-bottom: 4px;
  margin-bottom: 8px;
}
.bnone {
  border-bottom: none;
}
.inputIcon {
  width: 25px;
  display: flex;
  align-items: center;
  position: relative;
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
.qrIcon {
  width: 17px;
  height: 16.5px;
}
.nameIcon {
  width: 17.5px;
  height: 18.5px;
}
.phoneIcon {
  width: 14px;
  height: 19px;
}
.yzmIcon {
  width: 15px;
  height: 17.5px;
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
  transform: translateX(-50%);
  bottom: 54px; */
  margin-top: 32px;
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
  height:12px;
  background-color: #ff7f00;
  border-radius: 50%;
}
.xy {
  font-size: 12px;
  color: #333333;
}
.xy span {
  color: rgba(255, 127, 0, 1);
}
.codeBtn {
  width: 74px;
  height: 32px;
  line-height: 32px;
  background: #f2f2f2;
  border-radius: 3px;
  color: #333333;
  font-size: 13px;
  text-align: center;
}
.time {
  height: 32px;
  line-height: 32px;
}
</style>>

