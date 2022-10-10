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
import { getTestsuitlist, Testsuite } from "@/api/testflow";
import caseEntry from "./caseEntry.vue";


export default {
  data() {
    return {
      editableTabsValue: "1",
      editableTabs: [
        {
          title: "用例",
          name: "1",
          content: "caseEntry",
        },
        {
          title: "用例集",
          name: "2",
          content: "test1Window",
        },
        {
          title: "单接口",
          name: "3",
          content: "test2Window",
        },
      ],
    }
  },
  components: {
    caseEntry,
  },
  mounted() {
    this.getPageList();
  },
  methods: {
    open(id) {
      this.$notify({
        title: "脚本ID:"+id,
        message: "执行成功,请等待执行完成!",
        type: "success",
      });
    },
    handleVisible(row){
      this.dialogFormVisible = true;
      this.currentRow = row;
    },
    async getPageList() {
      let result = await getTestsuitlist();
      if (result.code == 200) {
        for (var i=0;i<result.data.list.length;i++){
          var item = result.data.list[i];
          if(item.type == 1){
            item.type="OpenApi脚本"
          }
          if(item.type == 2){
            item.type="客资PC脚本"
          }
        }
      }
      this.tableData = result.data.list;
      console.log(this.tableData)
    },
    async handleEdit(name) {
      const rowId= this.currentRow.id;
      var params = {
        test_id: rowId ,free_name:name
      };
      this.form.name=''
      let testsuite_result = await Testsuite(params);
      console.log(testsuite_result);
      if (testsuite_result.code == 200) {
        this.open(rowId)
      }
    },
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