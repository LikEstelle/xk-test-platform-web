<template>
  <div class="test2-wrap">
    <el-card
      class="card-item"
      :key="item.id"
      v-for="(item, index) in cardsData"
    >
      <div slot="header" class="clearfix">
        <span>{{ item.title }}</span>
        <el-button style="float: right; padding: 3px 0" type="text"
          >更多</el-button
        >
      </div>
      <div :is="item.type"></div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import card1 from "./components/card1";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"]),
  },
  components: { card1 },
  data() {
    return {
      cardsData: [
        { id: 1, title: "常用工具", type: "card1" },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
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
    height: 452px;
    padding: 20px;
    border-radius: 4px;
    margin-bottom: 16px;
    /* 外部/全局/white */
    background: #ffffff;
  }
}
</style>
