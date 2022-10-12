<template>
  <div class="main-wrap">
    <!-- <div> 
      <ul class="ulul">
        <li 
          v-for="(item,index) in menu"
          :key="index"
          :class="{active : ( isActive == item.value ? true : false )}"
          @click="isActive = item.value;currentComp = item.comp"
          >
          {{item.name}}
        </li>
      </ul>
    </div>
    <div>
      <test1 :is="currentComp"></test1>
    </div> -->
    <el-tabs v-model="editableTabsValue" type="card" class="test-card">
      <el-tab-pane
        class="test-tabs-wrap"
        :key="item.name"
        v-for="(item, index) in editableTabs"
        :label="item.title"
        :name="item.name"
      >
        <!-- {{ item.content }} -->
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
          title: "一键创建",
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