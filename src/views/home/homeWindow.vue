<template>
  <div class="test2-wrap" style="width:99%">
    <el-card
      class="card-item"
      :key="item.id"
      v-for="(item, index) in cardsData"
    >
      <div slot="header" class="clearfix">
        <span>{{ item.title }}</span>
        <!-- <el-button style="float: right; padding: 3px 0" type="text"
          >更多</el-button
        > -->
      </div>
      <div :is="item.type"></div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import card1 from "../../components/Homecard/card1";
import card2 from "../../components/Homecard/card2";
import card3 from "../../components/Homecard/card3";
import card4 from "../../components/Homecard/card4";
import card5 from "../../components/Homecard/card5";
import card6 from "../../components/Homecard/card6";




export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"]),
  },
  components: { card1,card2,card3,card4,card5,card6 },
  data() {
    return {
      cardsData: [
        { id: 1, title: "销氪网址", type: "card1" },
        { id: 2 ,title: "工作必备", type: "card2" },
        { id: 3 ,title: "微盟平台", type: "card3"},
        { id: 4 ,title: "销氪文档", type: "card4"},
        { id: 5 ,title: "提单流程", type: "card5"},
        { id: 6 ,title: "个人助手", type: "card6"},
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.test2-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .card-item {
    flex: 1;
    max-width: calc((100% - 16px) / 3);
    min-width: calc((100% - 16px) / 3);
    height: 400px;
    padding: 20px;
    border-radius: 30px;
    margin-bottom: 20px;
    /* 外部/全局/white */
    background: #ffffff;
  }
}
</style>
