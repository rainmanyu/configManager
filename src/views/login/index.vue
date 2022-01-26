<template>
  <div class="container">
    <div class="main flex-row">
      <section class="login-window">
        <h2 class="txt">Login</h2>
        <div v-if="loginType == 'account'" class="input-row">
          <img class="icon" src="@assets/images/login/user.png" />
          <input
            class="input"
            v-model="account"
            placeholder="Please input username"
            :readonly="readonlyInput"
            @focus="cancelReadOnly()"
          />
        </div>
        <div v-if="loginType == 'account'" class="input-row">
          <img class="icon" src="@assets/images/login/lock2.png" />
          <input
            class="input"
            v-model="password"
            placeholder="Please input password"
            type="password"
            :readonly="readonlyInput"
            @focus="cancelReadOnly()"
          />
        </div>
        <div class="login-btn" @click="handleLogin">Login</div>
      </section>
    </div>
  </div>
</template>
<script>
import verficodeView from "@/components/verficode.vue";
export default {
  components: { verficodeView },
  data() {
    return {
      ramdoCode: "", //随机验证码
      isRembPsd: false, //记住密码
      loginType: "account", //登录方式phone:手机号 account:'账号密码'
      getCodeTxt: "",
      account: "", //账号
      mobile: "",
      password: "",
      interval: null,
      readonlyInput: true,
    };
  },
  created() {
    let isRembPsd = localStorage.getItem("isRembPsd") || false;
    this.isRembPsd = isRembPsd === "true" ? true : false;
    this.account = this.isRembPsd ? localStorage.getItem("account") : "";
    this.password = this.isRembPsd ? localStorage.getItem("password") : "";
  },
  computed: {
    setRemPsdIcon() {
      //Remember password
      return this.isRembPsd
        ? require("@assets/images/login/checked_active.png")
        : require("@assets/images/login/checked_normal.png");
    },
    setLoginTypeIcon() {
      return this.loginType == "account"
        ? require("@assets/images/login/phone.png")
        : require("@assets/images/login/lock.png");
    },
  },
  methods: {
    async handleLogin() {
      if (!this.checkParamsLegal()) return;

      let params = {}; //登录接口参数
      if (this.loginType == "account") {
        params = {
          type: 1,
          account: this.account,
          password: this.password,
        };
      }

      try {
        await this.$store.dispatch("user/login", {
          params: params,
        });
        if (this.loginType == "account") {
          localStorage.setItem("account", this.isRembPsd ? this.account : "");
          localStorage.setItem("password", this.isRembPsd ? this.password : "");
        }

          this.$router.replace("/home/index");
          this.$notify({
            title:'Login successfully',
            message:'Welcome back!',
            type:'success',
            duration:3000
          })
      } catch (err) {
        console.log(err);
      }
    },
    //检查参数是否合法
    checkParamsLegal() {
      if (this.loginType == "account") {
        if (!this.account) {
          this.showMsg("Please input the username!");
          return false;
        } else if (!this.password) {
          this.showMsg("Please input the password!");
          return false;
        }

        return true;
      }
    },
    showMsg(msg) {
      this.$message({
        type: "warning",
        message: msg,
        duration: 3000,
      });
    },
    cancelReadOnly() {
      this.readonlyInput = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  min-width: 1200px;
  overflow: auto;
  height: 100%;
  min-height: 675px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: url("~@assets/images/login/bodybg.png") no-repeat;
  background-size: 100% 100%;
  &::after {
    display: block;
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 85%;
    height: 80%;
    min-height: 600px;
    z-index: 9;
    border-radius: 15px;
    background: #c1e1eb;
  }
  &::before {
    display: block;
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateX(20px) translateY(-50%)
      translateY(20px);
    width: 85%;
    height: 80%;
    min-height: 600px;
    z-index: 9;
    border-radius: 15px;
    background: #72c0d7;
  }
}
.main {
  width: 85%;
  height: 80%;
  min-height: 600px;
  z-index: 10;
  border-radius: 15px;
  background: url("~@assets/images/login/mainbg.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
  left: -20px;
  top: -20px;
  justify-content: center;
}
.title-box {
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    font-size: 36px;
    font-weight: 900;
    letter-spacing: 2px;
  }
  .subtitle {
    font-weight: 500;
    font-size: 25px;
    margin-top: 40px;
    letter-spacing: 5px;
  }
  .english {
    font-size: 13px;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #f7f7f7;
  }
}
.login-window {
  margin-left: 260px;
  width: 350px;
  height: 486px;
  //height: 530px;
  border-radius: 10px;
  background: rgba($color: #fff, $alpha: 0.15);
  box-shadow: 0 0 5px 1px rgba($color: #000000, $alpha: 0.04);
  display: flex;
  flex-direction: column;
  align-items: center;

  .txt {
    width: 100%;
    color: white;
    font-size: 46px;
    margin-top: 50px;
    margin-bottom: 40px;
    padding-left: 30px;
    box-sizing: border-box;
    font-weight: normal;
  }
  // .txt2 {
  //   width: 100%;
  //   color: white;
  //   font-size: 16px;
  //   margin-top: 15px;
  //   padding-left: 30px;
  //   box-sizing: border-box;
  //   margin-bottom: 30px;
  //   font-weight: normal;
  //   letter-spacing: 1px;
  // }
  .input-row {
    width: 290px;
    height: 45px;
    border-radius: 6px;
    background: #fff;
    box-shadow: 0 0 2px 1px rgba($color: #000000, $alpha: 0.02);
    display: flex;
    align-items: center;
    padding: 4px 8px;
    box-sizing: border-box;
    margin-bottom: 15px;
    .icon {
      width: 18px;
      height: auto;
      flex-shrink: 0;
      margin-right: 8px;
    }
  }
  .verif-view {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 290px;
    height: 45px;

    .input-panel {
      height: 100%;
      width: 155px;
      display: flex;
      align-items: center;
      border-radius: 6px;
      background: #fff;
      box-shadow: 0 0 2px 1px rgba($color: #000000, $alpha: 0.02);
      padding: 4px 8px;
      box-sizing: border-box;
      .icon {
        width: 18px;
        height: auto;
        flex-shrink: 0;
        margin-right: 8px;
      }
    }
    .code-panel {
      width: 125px;
      height: 100%;
      border-radius: 6px;
      background: #fff;
      box-shadow: 0 0 2px 1px rgba($color: #000000, $alpha: 0.02);
      // padding: 4px 8px;
      overflow: hidden;
      box-sizing: border-box;
      font-size: 28px;
      color: #999;
      display: flex;
      justify-content: center;
      align-items: center;
      letter-spacing: 1px;
      position: relative;
      cursor: pointer;
      &::after {
        display: block;
        content: "";
        position: absolute;
        left: 50%;
        top: 60%;
        transform: translate(-50%, -50%);
        height: 1px;
        width: 55%;
        background-color: #777;
        z-index: 11;
      }
      &.get-code-btn {
        background-color: #2cadae;
        color: #fff;
        text-decoration: none;
        font-size: 16px;
        white-space: nowrap;
        overflow: hidden;
        &:hover {
          background-color: rgba($color: #46bbbb, $alpha: 1);
        }
        &::after {
          display: none;
        }
      }
    }
  }
}
.input {
  flex: 1;
  width: 0px;
  height: 100%;
  background: none;
  outline: none;
  border: none;
  font-size: 15px;
}
.login-btn {
  width: 290px;
  height: 45px;
  line-height: 45px;
  text-align: center;
  color: #fff;
  background-color: #2cadae;
  //background-color: #40a6db;;
  font-size: 20px;
  border-radius: 6px;
  box-shadow: 0 0 2px 1px rgba($color: #000000, $alpha: 0.02);
  margin-top: 20px;
  font-size: 17px;
  cursor: pointer;
  letter-spacing: 6px;
  &:hover {
    background-color: rgba($color: #46bbbb, $alpha: 1);
  }
}
.opt-bar {
  justify-content: space-between;
  width: 280px;
  margin-top: 10px;
  .panel {
    min-width: 40%;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    line-height: 45px;
    padding-left: 10px;
    box-sizing: border-box;
    cursor: pointer;
    .icon {
      width: 18px;
      height: auto;
      margin-right: 6px;
    }
    .icon2 {
      width: 14px;
    }
    ._txt {
      color: #fff;
      font-size: 16px;
    }
  }
}
</style>
