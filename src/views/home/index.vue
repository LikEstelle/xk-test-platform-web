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
import homeWindow from "./homeWindow";
import mobileManagement from "./mobileManagement";
import test2Window from "./test2Window";
import test3 from "./test3";
import test4 from "./test4";

export default {
  data() {
    return {
      // 当前选中的组件
      // currentComp: "homeWindow",
      // 当前选中的li标签
      // isActive: "1",
      // menu: [
      //   {
      //     // li标签的内容
      //     name: "会员管理",
      //     // 当前li标签是否选中的标识
      //     value: "1",
      //     // 点击当前li标签，要显示的组件
      //     comp: "homeWindow",
      //   },
      //   {
      //     name: "场馆管理",
      //     value: "2",
      //     comp: "test1Window",
      //   },
      //   {
      //     name: "品牌管理",
      //     value: "3",
      //     comp: "test2Window",
      //   },
      // ],
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
          content: "test3",
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
    test2Window,
    test3,
    test4
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