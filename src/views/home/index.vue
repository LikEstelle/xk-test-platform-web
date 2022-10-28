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
import homeWindow from "./homeWindow";
import mobileManagement from "./mobileManagement";
import qualityStandard from "./qualityStandard";

export default {
  data() {
    return {
      editableTabsValue: "1",
      editableTabs: [
        {
          title: "新人必备",
          name: "1",
          content: "homeWindow",
        },
        {
          title: "质量规范",
          name: "3",
          content: "qualityStandard",
        },
        {
          title: "设备管理",
          name: "4",
          content: "mobileManagement",
        },
      ],
      tabIndex: 2,
    };
  },
  // 注册组件
  components: {
    homeWindow,
    mobileManagement,
    qualityStandard,
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