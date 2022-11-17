<!-- 测试页面 -->
<template>
  <div>
    <!-- 接口模块 -->
    <el-col :span="4" class="left-tree">
      <module-tree
        title="接口模块"
        :treeData="treeData"
        :currentModule="searchForm.moduleId"
        @clickModule="clickModule($event)"
        @appendModule="appendModule($event)"
        @removeModule="removeModule(arguments)"
        @dragNode="dragNode(arguments)"
      />
    </el-col>
    <!--接口列表-->
    <el-col :span="20" class="right-table">
      <el-table size="small" :data="apiListData" v-loading="loading" element-loading-text="拼命加载中">
        <el-table-column prop="num" label="NO" width="60px" />
        <el-table-column prop="name" label="接口名称" min-width="180" />
        <el-table-column prop="path" label="接口地址" min-width="150" />
        <el-table-column prop="moduleName" label="所属模块" />
        <el-table-column prop="username" label="创建人" />
        <el-table-column prop="updateTime" label="更新时间" width="150" />
        <el-table-column fixed="right" align="operation" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="editApi(scope.row)">编辑</el-button>
            <el-button type="text" size="mini" @click="deleteApi(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <Paging
        :pageNum="this.gather.pageNum"
        :total="this.total"
        :pageSize="this.gather.pageSize"
        @sizeChange="sizeChange"
        @currentChange="currentChange"
      ></Paging>
    </el-col>
    <!-- 添加模块弹窗 -->
    <module-append
      :title="title"
      :show.sync="moduleVisible"
      :moduleForm="moduleForm"
      @closeDialog="closeDialog"
      @submitModule="submitModule($event)"
    />
  </div>
</template>

<script>
import ModuleTree from "@/views/common/module/moduleTree.vue"; //引入封装的分页器文件
import ModuleAppend from "@/views/common/module/moduleAppend.vue"; //引入封装的分页器文件
import Paging from "@/views/common/components/pagination.vue"; //引入封装的分页器文件

import { Module } from "@/api/testflow";

export default {
  data() {
    return {
      loading: false,
      apiListData: [],
      title: "添加接口模块",
      moduleVisible: false,
      treeData: [],
      searchForm: {
        page: 1,
        limit: 10,
        condition: "",
        moduleId: "",
      },
      moduleForm: {
        name: "",
        parentId: "",
        parentName: "",
        data: "",
      },
      test_save_datd: {
        children: null,
        createTime: 1668065597629,
        createUser: "a4c938fc-54f0-11ec-99dc-5254001b4hhh",
        id: "44724904-5bde-475a-b6c2-d913ac6ad480",
        label: "1",
        moduleType: "api_module",
        name: "1",
        parentId: "0",
        projectId: "a4c938fc-54f0-11ec-99dc-5254001909io",
        updateTime: "1668065597629",
        updateUser: "a4c938fc-54f0-11ec-99dc-5254001b4hhh",
      },
      total: 1000,
      // page_size: 10,
      gather: {
        pageNum: 1, //默认第一页
        pageSize: 10, //一页展示10条
      },
    };
  },

  components: {
    ModuleTree,
    ModuleAppend,
    Paging,
  },

  // computed: {},

  mounted() {
    this.getTree()
  },

  methods: {
    clickModule(data) {
      console.log("点击模块了");
      this.searchForm.moduleId = data.id;
      this.getdata(this.searchForm);
    },
    removeModule(args) {
      let node = args[0];
      let data = args[1];
      let url = "/autotest/module/delete";
      this.$post(url, data, (response) => {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex((d) => d.id === data.id);
        children.splice(index, 1);
        this.$message.success("模块删除成功");
      });
    },
    dragNode(args) {
      let dragNode = args[0];
      let newParent = args[1];
      let url = "/autotest/module/save";
      let moduleForm = dragNode.data;
      moduleForm.parentId = newParent;
      this.$post(url, moduleForm, (response) => {
        this.$message.success("更改成功");
      });
    },
    appendModule(data) {
      console.log("添加模块了");
      if (data) {
        this.moduleForm.parentId = data.id;
        this.moduleForm.parentName = data.label;
        this.moduleForm.data = data;
      } else {
        this.moduleForm.parentId = 0;
        this.moduleForm.parentName = "根节点";
        this.moduleForm.data = "";
      }
      this.moduleVisible = true;
    },
    closeDialog() {
      this.moduleVisible = false;
    },
    submitModule(moduleForm) {
      console.log("submitModule");
      // moduleForm.projectId = this.$store.state.projectId;
      moduleForm.projectId = "a4c938fc-54f0-11ec-99dc-5254001909io";
      moduleForm.moduleType = "api_module";
      const newChild = this.test_save_datd;
      this.treeData.push(newChild);
      this.moduleVisible = false;
      this.moduleForm.name = "";
      console.log("submitModule-1");
      // let url = "/autotest/module/save";
      // this.$post(url, moduleForm, (response) => {
      //   const newChild = response.data;
      //   if (moduleForm.parentId === 0) {
      //     this.treeData.push(newChild);
      //   } else {
      //     if (!this.moduleForm.data.children) {
      //       this.$set(this.moduleForm.data, "children", []);
      //     }
      //     this.moduleForm.data.children.push(newChild);
      //   }
      //   this.moduleVisible = false;
      //   this.moduleForm.name = "";
      //   console.log("submitModule-1")
      // });
    },
    currentChange(val) {
      console.log(111);
      this.gather.pageNum = val;
      // this.getFactoryListAsync(); //调用接口方法
    },
    //每页展示几条按钮操作
    sizeChange(val) {
      this.gather.pageSize = val;
      // this.getFactoryListAsync(); //调用接口方法
    },
    //获取左侧树数据
    async getTree() {
      console.log("get tree data");
      var module_type=0
       let result=await Module({module_type})
        if (result.code ==200){
          console.log("getTree",result.data)
          this.tree = result.data.list
        }
    },
  },
};
</script>
<style scoped>
.left-tree {
  padding-right: 5px;
  border-right: 1px solid rgb(219, 219, 219);
}
.right-table {
  padding-left: 5px;
}
</style>