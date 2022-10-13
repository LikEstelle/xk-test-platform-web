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
          text: "销氪需求文档nos平台",
          describe: "客资，营销，寻客宝，订单常规接口&OpenAPI接口",
          icon: "card1-1",
          path: "https://nos.hsmob.com/apps/external/23",
        },
        {
          text: "TAPD",
          describe: "测试报告展示，接口异步执行",
          icon: "card1-2",
          path: "https://www.tapd.cn/my_dashboard/index",
        },
        {
          text: "销氪业务测试wiki",
          describe: "数据报表数据对比",
          icon: "card1-2",
          path: "http://bable.weimob.com/pages/viewpage.action?pageId=15241162",
        },
        {
          text: "QA Android包下载",
          describe: "数据报表数据对比",
          icon: "card1-2",
          path: "http://3g.vd.cn/testappcode/android_md_version_list.html",
        },
        {
          text: "GitLab",
          describe: "数据报表数据对比",
          icon: "card1-2",
          path: "https://stash.weimob.com/",
        },
        {
          text: "调用链查询",
          describe: "数据报表数据对比",
          icon: "card1-2",
          path: "http://apm.qa.internal.hsmob.com/#/",
        },
        {
          text: "客服系统-工单系统-线上",
          describe: "数据报表数据对比",
          icon: "card1-2",
          path: "https://cs.hsmob.com/workorder/list",
        },
        {
          text: "ES",
          describe: "数据报表数据对比",
          icon: "card1-2",
          path: "http://es-ezdccbdh.internal.kibana.tencentelasticsearch.com:5601/login?next=%2Fapp%2Fkibana#/dev_tools/console?_g=()",
        },
        {
          text: "OL 短信验证码查询",
          describe: "数据报表数据对比",
          icon: "card1-2",
          path: "http://ms.hsmob.com/#/",
        },
        {
          text: "QA 短信验证码查询",
          describe: "数据报表数据对比",
          icon: "card1-2",
          path: "http://ms.qa.hsmob.com/#/",
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
 