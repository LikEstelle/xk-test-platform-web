<template src="./template.html"></template>
<style src="./style.css"></style>

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
          text: "QA 销氪WMS-PC端",
          describe: "客资，营销，寻客宝，订单常规接口&OpenAPI接口",
          icon: "card1-1",
          path: "http://agency-qa.xiaoke.cn/login",
        },
        {
          text: "OL 销氪WMS-PC端",
          describe: "客资，营销，寻客宝，订单常规接口&OpenAPI接口",
          icon: "card1-1",
          path: "http://agentcrm.weimobqa.com/login",
        },
        {
          text: "阿尔法",
          describe: "微盟集团内部系统，可配置商品和插件的售卖方案，以及进行集团不同产品线的线索分发",
          icon: "card1-1",
          path: "http://pubser-qa.weimobqa.com/goods/x-cloud",
        },
        {
          text: "涅槃",
          describe: "微盟集团内部的crm系统，给微盟的售前、售后团队使用的系统，销氪的直销销售目前在使用涅槃系统提单",
          icon: "card1-1",
          path: "http://crm.qa.hsmob.com/#/auth/login",
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


 