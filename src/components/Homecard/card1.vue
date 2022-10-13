<template>
  <div style="height:290px;overflow: auto;" v-infinite-scroll="test">
    <div v-for="item in items" :key="item.text" class="tool">
      <el-link :underline="false" :href="item.path" style="font-size:16px">
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
          text: "QA销氪CRM-PC端",
          describe: "客资，营销，寻客宝，订单常规接口&OpenAPI接口",
          icon: "card1-1",
          path: "https://sales-qa.xiaoke.cn/xk/auth/login",
        },
        {
          text: "PL销氪CRM-PC端",
          describe: "测试报告展示，接口异步执行",
          icon: "card1-2",
          path: "https://sales-pl.xiaoke.cn/xk/auth/login",
        },
        {
          text: "OL销氪CRM-PC端",
          describe: "数据报表数据对比",
          icon: "card1-2",
          path: "https://www.xiaoke.cn/xk/auth/login",
        },
        {
          text: "QA 新云后台-PC端",
          describe: "快速创建大量测试数据，增加测试效率",
          icon: "card1-3",
          path: "http://account.saas.weimobqa.com/login.html",
        },
        {
          text: "OL 新云后台-PC端",
          describe: "提供各种实际场景，提升测试覆盖率",
          icon: "card1-3",
          path: "https://account.weimob.com/login.html",
        },
        {
          text: "QA 销氪官网-PC端",
          describe: "提供各种实际场景，提升测试覆盖率",
          icon: "card1-3",
          path: "https://sales-qa.xiaoke.cn/",
        },
        {
          text: "OL 销氪官网-PC端",
          describe: "提供各种实际场景，提升测试覆盖率",
          icon: "card1-3",
          path: "https://www.xiaoke.cn/",
        },
        {
          text: "QA 销氪官网-移动端",
          describe: "提供各种实际场景，提升测试覆盖率",
          icon: "card1-3",
          path: "https://5g-qa.xiaoke.cn/",
        },
        {
          text: "OL 销氪官网-移动端",
          describe: "提供各种实际场景，提升测试覆盖率",
          icon: "card1-3",
          path: "https://5g.xiaoke.cn/",
        },
        {
          text: "QA 运营后台-PC端",
          describe: "提供各种实际场景，提升测试覆盖率",
          icon: "card1-3",
          path: "http://admin-qa.xiaoke.cn/auth/login",
        },
        {
          text: "OL 运营后台-PC端",
          describe: "提供各种实际场景，提升测试覆盖率",
          icon: "card1-3",
          path: "http://scloud-admin.hsmob.com/auth/login",
        },
        {
          text: "栗子官网",
          describe: "提供各种实际场景，提升测试覆盖率",
          icon: "card1-3",
          path: "https://sandbox.clues.cn/customer",
        },
        {
          text: "QA 京东云",
          describe: "提供各种实际场景，提升测试覆盖率",
          icon: "card1-3",
          path: "https://m-qa.xiaoke.cn/jdcloud/log",
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
 