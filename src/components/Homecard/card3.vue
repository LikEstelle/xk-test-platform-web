<template>
  <div style="height:290px;overflow: auto;" v-infinite-scroll="test">
    <div v-for="item in items" :key="item.text" class="tool">
      <el-link :underline="false" @click="get_new_window(item.path)" style="font-size:16px;color:blue">
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
          text: "微盟质量开放平台",
          describe: "客资，营销，寻客宝，订单常规接口&OpenAPI接口",
          icon: "card1-1",
          path: "http://stt.weimobqa.com/casemanage/dashboard/ongoingproject",
        },
        {
          text: "微盟运维管理平台OMS",
          describe: "客资，营销，寻客宝，订单常规接口&OpenAPI接口",
          icon: "card1-1",
          path: "https://oms.hsmob.com/navigators-index",
        },
        {
          text: "QA DBA平台",
          describe: "客资，营销，寻客宝，订单常规接口&OpenAPI接口",
          icon: "card1-1",
          path: "http://qa.dba.internal.weimob.com/login",
        },
        {
          text: "性能压测平台",
          describe: "客资，营销，寻客宝，订单常规接口&OpenAPI接口",
          icon: "card1-1",
          path: "http://perftest.internal.hsmob.com/performance/apimanage",
        },
        {
          text: "研发效能平台",
          describe: "客资，营销，寻客宝，订单常规接口&OpenAPI接口",
          icon: "card1-1",
          path: "http://atlas.internal.hsmob.com/tt/appcenter/projects/managed",
        },
        {
          text: "YAPI接口管理平台",
          describe: "客资，营销，寻客宝，订单常规接口&OpenAPI接口",
          icon: "card1-1",
          path: "http://yapi.internal.weimob.com/group/3493",
        },
        {
          text: "gaia平台-代码覆盖率统计",
          describe: "客资，营销，寻客宝，订单常规接口&OpenAPI接口",
          icon: "card1-1",
          path: "http://gaia.internal.weimobqa.com/group/330",
        },
        {
          text: "cat日志系统-报错告警大盘",
          describe: "客资，营销，寻客宝，订单常规接口&OpenAPI接口",
          icon: "card1-1",
          path: "http://cat.internal.weimobqa.com/cat/r/top?ticket=d538a19f-0914-4e9f-8571-21bb7438dfb5",
        },
        {
          text: "k8s日志系统",
          describe: "客资，营销，寻客宝，订单常规接口&OpenAPI接口",
          icon: "card1-1",
          path: "http://k8slog-qa.hsmob.com/login",
        },
        {
          text: "qa客服系统",
          describe: "客资，营销，寻客宝，订单常规接口&OpenAPI接口",
          icon: "card1-1",
          path: "http://cs.qa.hsmob.com/auth/login",
        },
        {
          text: "微盟职位内推平台",
          describe: "客资，营销，寻客宝，订单常规接口&OpenAPI接口",
          icon: "card1-1",
          path: "https://job.weimob.com/interview/interviewManage",
        },
        {
          text: "组件中心",
          describe: "客资，营销，寻客宝，订单常规接口&OpenAPI接口",
          icon: "card1-1",
          path: "http://pt.hsmob.com/app/chub/chubbasis/componentCenter",
        },
        
      ],
    };
  },
  methods:{
    get_new_window(url) {
        window.open(url);
    },
  }
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
 