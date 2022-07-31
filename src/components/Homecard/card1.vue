<template>
  <div>
    <div v-for="item in items" :key="item.text" class="tool">
    <el-link :underline="false"
    :href="item.path"
    ><svg-icon :icon-class="item.icon" className="icon"></svg-icon>{{item.text }}</el-link>
    <!-- <router-link 
    to="/testflow/testreport"
    >{{item.text}}</router-link> -->
    <p class='describe'>{{item.describe }}</p>
    
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
      // cardsData: [
      //   { id: 1, title: "常用工具", type: "card1" },
      //   { id: 2 },
      //   { id: 3 },
      //   { id: 4 },
      //   { id: 5 },
      //   { id: 6 },
      // ],
       items: [
        { text: '接口测试执行' ,describe:'客资，营销，寻客宝，订单常规接口&OpenAPI接口',icon:'card1-1',path:"#/testflow/testsuite"},
        { text: '接口测试报告' ,describe:'测试报告展示，接口异步执行',icon:'card1-2',path:"#/testflow/testreport"},
        { text: '数据构造' ,describe:'快速创建大量测试数据，增加测试效率',icon:'card1-3',path:"#/create/create"},
        { text: '场景构造' ,describe:'提供各种实际场景，提升测试覆盖率',icon:'card1-3',path:"#/scene/scene"}
      ]
    };
  },
};
</script>

<style lang="scss" scoped>
.describe{
  font-size:5px;
}
.tool{
  border:1px ;
  margin:20px 0 0 0;
}

</style>
 