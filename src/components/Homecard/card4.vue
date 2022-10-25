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
          text: "寻客宝套餐权益",
          describe: "客资，营销，寻客宝，订单常规接口&OpenAPI接口",
          icon: "card1-1",
          path: "https://docs.qq.com/sheet/DQkl1a05Bd0V1SWVU?tab=lault7",
        },
        {
          text: "寻客宝高级搜索字段表",
          describe: "客资，营销，寻客宝，订单常规接口&OpenAPI接口",
          icon: "card1-1",
          path: "https://docs.qq.com/sheet/DQkl1a05Bd0V1SWVU?tab=lault7",
        },
        {
          text: "寻客宝各类权益账号",
          describe: "客资，营销，寻客宝，订单常规接口&OpenAPI接口",
          icon: "card1-1",
          path: "https://docs.qq.com/sheet/DVm9Xa21xeGlJWm9J?tab=BB08J2",
        },
        {
          text: "游客蒙版文案汇总",
          describe: "客资，营销，寻客宝，订单常规接口&OpenAPI接口",
          icon: "card1-1",
          path: "https://docs.qq.com/sheet/DQlFpeld5bG1PdVJH?tab=BB08J2",
        },
        {
          text: "寻客宝-工具需求",
          describe: "客资，营销，寻客宝，订单常规接口&OpenAPI接口",
          icon: "card1-1",
          path: "https://docs.qq.com/sheet/DRWFHdnp3cFdLVldr?tab=BB08J2",
        },
        {
          text: "寻客宝-存在对应数据维度的企业",
          describe: "客资，营销，寻客宝，订单常规接口&OpenAPI接口",
          icon: "card1-1",
          path: "https://docs.qq.com/sheet/DRVpVU21sREpFcXRz?tab=BB08J2",
        },
        {
          text: "客资初始化字段说明",
          describe: "客资，营销，寻客宝，订单常规接口&OpenAPI接口",
          icon: "card1-1",
          path: "https://docs.qq.com/sheet/DR090ZlpFbm9Db2FE?tab=cgpb6z",
        },
        {
          text: "客资套餐具体拦截权限",
          describe: "客资，营销，寻客宝，订单常规接口&OpenAPI接口",
          icon: "card1-1",
          path: "https://docs.qq.com/sheet/DT3dSaVhiS3J3VGlL?tab=68gidf",
        },
        {
          text: "寻客宝代码覆盖率分析",
          describe: "客资，营销，寻客宝，订单常规接口&OpenAPI接口",
          icon: "card1-1",
          path: "https://doc.weixin.qq.com/txdoc/apply_page?k=AAUAFAedAAoX1hyaHwAMoAuAaLAKc",
        },
        {
          text: "单接口",
          describe: "客资，营销，寻客宝，订单常规接口&OpenAPI接口",
          icon: "card1-1",
          path: "https://docs.qq.com/sheet/DRVdJTkxIWEhNS3FS",
        },
        {
          text: "呼叫中心报销文档",
          describe: "客资，营销，寻客宝，订单常规接口&OpenAPI接口",
          icon: "card1-1",
          path: "https://docs.qq.com/sheet/DUFB3bFpxd214U2NX",
        },
        {
          text: "EP",
          describe: "客资，营销，寻客宝，订单常规接口&OpenAPI接口",
          icon: "card1-1",
          path: "https://cas.hsmob.com/cas/login/?service=http%3A%2F%2Fep.internal.hsmob.com%2Fapp%2Fops%2Fsaas.xiaoke-zq-xkb-server%2Fcode%2Freleases%2F38971%2FQA#/",
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


 