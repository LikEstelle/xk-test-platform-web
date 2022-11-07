<template>
  <div class="main-wrap">
    <el-tabs v-model="editableTabsValue" type="card" class="test-card">
      <el-tab-pane
        class="test-tabs-wrap"
        :key="item.name"
        v-for="item in editableTabs"
        :label="item.title"
        :name="item.name"
      >
        <a :is="item.content"></a>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
// 引入组件
import Package from "./package";
import Plug from "./plug";
import Creation from "./creation";
export default {
  data() {
    return {
      editableTabsValue: "1",
      editableTabs: [
        {
          title: "购买套餐",
          name: "1",
          content: "Package",
        },
        {
          title: "购买插件",
          name: "2",
          content: "Plug",
        },
        {
          title: "一键创建企业及权限",
          name: "3",
          content: "Creation",
        },
      ],
      tabIndex: 2,
    };
  },
  // 注册组件
  components: {
    Package,
    Plug,
    Creation,
  },
};
</script>
<style lang="scss">
// 样式
.ulul {
  overflow: hidden;
  li {
    list-style: none;
    float: left;
    margin-left: 20px;
    font-size: 20px;
    border-width: 2px;
    padding: 10px;
    border-collapse: collapse;
  }
  li.active {
    border: 1px solid white;
  }
}
.test-tabs-wrap {
  background-color: #f5f5f5;
  padding: 16px;
}

.main-wrap {
  .el-tabs__header {
    margin: 0;
  }
  .el-tabs__item{
    width:200px;
    font-size:15px;
    text-align:center;
    margin:auto;
  }
}
.test-card{
  padding:10px;
}
</style>