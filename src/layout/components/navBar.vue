<template>
  <div class="navbar">
    <div class="main">
      <img class="icon" src="@/assets/images/layout/gzt.png" />
      <h3 class="text">Site Management</h3>
    </div>
    <div class="right">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{ nickname }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="item  in dropdownMenu"
            :key="item.title"
            :command="item"
            >{{ item.title }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      dropdownMenu: [
        {
          title: "exit",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["cur_routes", "nickname"]),
  },
  watch: {},
  methods: {
    
    handleCommand(item) {
      if (item.title == "exit") {
        //exit
        this.outLogin();
      } else if (item.title == "personnel") {
        //
        this.$router.push('/person/center')
      }
    },
    //退出登录清除数据
    outLogin() {
      this.$store.dispatch("user/resetToken");
      this.$store.commit("user/RESET_STATE");
      this.$store.commit("user/SET_ISOUTLOGIN", true);
      this.$store.commit("user/SET_ISLOGIN", false);
      this.$router.replace("/login");
    },
  },
};
</script>
<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 66px;
  min-height: 66px;
  display: flex;
  justify-content: space-between;
  padding: 0px 30px;
  box-sizing: border-box;
  .main {
    height: 100%;
    flex: 1;
    width: 0;
    display: flex;
    align-items: center;
    .icon {
      width: 40px;
      height: 40px;
    }
    .text {
      font-size: 32px;
      font-weight: bold;
      color: #41a5e0;
      display: flex;
      align-items: center;
      margin-left: 20px;
      height: 100%;
    }
    ::v-deep .el-breadcrumb {
      font-size: 16px;
    }
  }
  .right {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    .el-dropdown-link {
      cursor: pointer;
      white-space: nowrap;
      color: #333;
      font-size: 15px;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }
    &::v-deep .el-dropdown {
      display: block;
      font-size: 15px !important;
    }
  }
}
.identity-wrap {
  display: flex;
  align-items: center;
  .icon {
    width: 33px;
    height: auto;
    margin-right: 5px;
  }
}
.msg-wrap {
  margin-right: 20px;
  .icon {
    width: 33px;
    height: auto;
    margin-right: 5px;
  }
  & > span {
    font-size: 15px;
    color: #333;
  }
}
</style>
