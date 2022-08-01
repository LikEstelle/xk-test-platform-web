<template>
  <div>
    <!-- <el-button @click="resetDateFilter">清除日期过滤器</el-button> -->
    <!-- <el-button @click="clearFilter">重置</el-button> -->
    <el-table ref="filterTable" :data="tableData" style="width: 100%" align=center>
      <el-table-column prop="id" label="报告ID"  align=left min-width=40> </el-table-column>
      <el-table-column
        prop="create_time"
        label="日期"
        sortable
        column-key="create_time"
        align=left
        min-width=100
      >
      </el-table-column>
      <el-table-column prop="system_name" label="报告名称" show-overflow-tooltip=true min-width=100>
      </el-table-column>
      <el-table-column
        prop="free_name"
        label="自定义报告名称"
        :formatter="formatter"
        align=left
        show-overflow-tooltip=true
        min-width=100
      >
      </el-table-column>
      <el-table-column
        prop="tag"
        label="标签"
        :filters="[
          { text: '订单', value: '订单' },
          { text: '销氪', value: '销氪' },
          { text: '营销', value: '营销' },
          { text: '寻客宝', value: '寻客宝' },
          { text: '客资', value: '客资' },
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
        align=left
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.tag === 'success' ? 'primary' : 'success'"
            disable-transitions
            >{{ scope.row.tag }}</el-tag
          >
        </template>
      </el-table-column>
       <el-table-column prop="case_count" label="count" min-width=50>
      </el-table-column>
      <el-table-column prop="success_count" label="success" min-width=50>
      </el-table-column>
      <el-table-column prop="fail_count" label="fail" min-width=50>
      </el-table-column>
       <el-table-column prop="broken_count" label="broken" min-width=50>
      </el-table-column>
      <el-table-column label="报告详情" prop="url" min-width=50>
        <template slot-scope="{row}" >
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
      pageSize:10,
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
      // const page_number=this.pageNum
      // const page_size=this.pageSize
      var params = {
        page_size: this.pageSize ,page_number:this.pageNum
      };
      let result = await Testreport(params);
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
      this.pageNum=pageNum
      this.getPageList()
    }
  },
};
</script>
<style scoped>
</style>