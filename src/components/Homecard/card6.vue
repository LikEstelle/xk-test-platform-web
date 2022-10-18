<template>
  <div style="height:290px;overflow: auto;" v-infinite-scroll="test">
    <div v-for="item in items" :key="item.text" class="tool">
      <el-link :underline="false" :href="item.path" style="font-size:16px;color:blue">
        <svg-icon :icon-class="item.icon" class="icon"></svg-icon>
        {{item.text }}
      </el-link>
      <!-- <router-link 
    to="/testflow/testreport"
      >{{item.text}}</router-link>-->
      <p class="describe">{{item.describe }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"]),
  },
  data() {
    return {
      items: [
        {
          text: "新人手册",
          describe: "客资，营销，寻客宝，订单常规接口&OpenAPI接口",
          icon: "card1-1",
          path: "http://bable.weimob.com/pages/viewpage.action?pageId=18640320",
        },
        {
          text: "邮箱",
          describe: "客资，营销，寻客宝，订单常规接口&OpenAPI接口",
          icon: "card1-1",
          path: "https://mail.weimob.com/",
        },
        {
          text: "萌管家",
          describe: "客资，营销，寻客宝，订单常规接口&OpenAPI接口",
          icon: "card1-1",
          path: "http://i.weimob.com/home",
        },
        {
          text: "萌学堂",
          describe: "客资，营销，寻客宝，订单常规接口&OpenAPI接口",
          icon: "card1-1",
          path: "https://university.weimob.com/auth/login?redir=%252F",
        },
        {
          text: "LDAP账号-修改密码",
          describe: "客资，营销，寻客宝，订单常规接口&OpenAPI接口",
          icon: "card1-1",
          path: "http://cas.hsmob.com/#/change_pwd",
        },
        {
          text: "LDAP账号-重置密码",
          describe: "客资，营销，寻客宝，订单常规接口&OpenAPI接口",
          icon: "card1-1",
          path: "http://cas.hsmob.com/#/forget_pwd",
        },
        
        
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.describe {
  font-size: 5px;
}
.tool {
  border: 1px;
  margin: 20px 0 0 0;
}
</style>
 