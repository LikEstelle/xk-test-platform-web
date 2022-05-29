<template>
  <el-table
    :data="tableData.filter(data => !search || data.description.toLowerCase().includes(search.toLowerCase()))"
    style="width: 98%">
    <el-table-column
      label="序号"
      width="150"
      type="index">
    </el-table-column>
    <el-table-column
      label="脚本ID"
      prop="id">
    </el-table-column>
    <el-table-column
      label="脚本描述"
      prop="description">
    </el-table-column>
    <el-table-column
      label="1_open_api  2_客资PC"
      prop="type">
    </el-table-column>

    <el-table-column
      align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="medium"
          placeholder="输入关键字搜索"/>
      </template>

      <template slot-scope="scope">
        <el-button
          size="medium"
          type="primary"
          @click="handleEdit(scope.$index, scope.row)">执行</el-button>
      </template>
    </el-table-column>

  </el-table>
</template>



<script>
import { getTestsuitlist,Testsuite } from '@/api/testflow'

  export default {
    data() {
      return {
        tableData:[],
        search: ''
      }
    },
    mounted(){
        this.getPageList();
    },
    methods: {
      async getPageList(){
        let result=await getTestsuitlist();
        if(result.code == 200){
            this.tableData=result.data;
        }
      },
      async handleEdit(index, row) {
        let testsuite_result=await Testsuite(row.id);
        console.log(testsuite_result);
        if(testsuite_result.code == 200){
            alert("ID"+row.id+" 执行成功,请等待执行完成!")
        }

      },
    },
  }
</script>