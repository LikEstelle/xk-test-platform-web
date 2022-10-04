<template>
  <el-table
    :data="tableData.filter((data) =>!search || data.description.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%"
  >
    <!-- <el-table-column label="序号" width="150" type="index"> </el-table-column> -->
    <!-- <el-table-column label="脚本ID" prop="id" min-width=30> </el-table-column> -->
    <el-table-column label="脚本名称" prop="name"> </el-table-column>
    <el-table-column label="脚本描述" prop="description" min-width=80> </el-table-column>
    <el-table-column label="代码" prop="code_info" min-width=150> </el-table-column>
    <el-table-column label="脚本类型" prop="type" min-width=80>
    </el-table-column>
    <el-table-column label="所属" prop="business_type" min-width=80> </el-table-column>
    <el-table-column align="right">
      <template slot="header" slot-scope="scope">
        <el-input v-model="search" size="medium" placeholder="脚本描述关键字搜索" />
      </template>
      <template slot-scope="scope">
        <el-button
          size="medium"
          type="primary"
          min-width=80
          @click="handleVisible(scope.row)"
          >执行</el-button
        >
        <el-dialog :visible.sync="dialogFormVisible" center>
          <el-form :model="form">
            <el-form-item
              label="自定义报告名称"
              :label-width="formLabelWidth"
            >
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer" >
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button
              type="primary"
              @click="
                handleEdit(form.name), (dialogFormVisible = false)">确 定</el-button>
          </div>
        </el-dialog>
      </template>
    </el-table-column>
  </el-table>
</template>




<script>
import { getTestsuitlist, Testsuite } from "@/api/testflow";

export default {
  data() {
    return {
      tableData: [],
      search: "",
      dialogFormVisible: false,
      form: {
        name: "",
      },
      formLabelWidth: "120px",
    };
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
