<template>
  <div>
    <!-- <el-button @click="resetDateFilter">清除日期过滤器</el-button> -->
    <el-button @click="clearFilter">重置</el-button>
    <el-table ref="filterTable" :data="tableData" style="width: 100%" >
      <el-table-column prop="id" label="报告ID" width="150"> </el-table-column>
      <el-table-column
        prop="create_time"
        label="日期"
        sortable
        column-key="create_time"
      
      >
      </el-table-column>
      <el-table-column prop="system_name" label="报告名称">
      </el-table-column>
      <el-table-column
        prop="free_name"
        label="自定义报告名称"
        :formatter="formatter"
       
      >
      </el-table-column>
      <el-table-column
        prop="tag"
        label="标签"
        :filters="[
          { text: 'success', value: 'success' },
          { text: 'fail', value: 'fail' },
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.tag === 'success' ? 'primary' : 'success'"
            disable-transitions
            >{{ scope.row.tag }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column label="报告详情" prop="url" >
        <template slot-scope="{row}">
          <el-link :href="row.url" target="_blank" type="primary">report</el-link>
        </template>
      </el-table-column>
    </el-table>
         

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[10, 20, 50]"
      :page-size="pageSize"
      :page-count="5"
      layout="prev, pager, next, jumper,->,sizes,total"
      :total="total"
      style="margin-top:30px;textAlign:center"
      >
    </el-pagination>
  </div>
</template>

<script>
import { Testreport} from "@/api/testflow";

export default {
  data() {
    return {
      tableData: [],
      drawer: false,
      report:{
        id:1,

      },
      pageNum:1,
      pageSize:3,
      total:80

    };
  },
  mounted() {
    this.getPageList();
  },
  methods: {
    // resetDateFilter() {
    //   console.log(this.$refs);
    //   this.$refs.filterTable.clearFilter("date");
    // },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    formatter(row, column) {
      return row.free_name;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    // filterHandler(value, row, column) {
    //   const property = column["property"];
    //   return row[property] === value;
    // },
    async getPageList(){
      const pageNum=this.pageNum
      const pageSize=this.pageSize
      let result = await Testreport(pageNum,pageSize);
      if (result.code == 200) {
        this.tableData = result.data.list;
        this.total = result.data.total;

      }
    },
    handleSizeChange(pageSize){
      this.pageSize=pageSize
      this.getPageList()

    },
    handleCurrentChange(pageNum){
      tthis.pageNum=pageNum
      this.getPageList()
    }
  },
};
</script>
<style scoped>
</style>