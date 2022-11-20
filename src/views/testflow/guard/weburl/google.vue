<!-- web-页面详情检测 -->
<template>
  <div class="my_center">
    <div class="my_center_left">
      <el-form
        :model="dynamicValidateForm"
        ref="dynamicValidateForm"
        label-width="100px"
        class="demo-dynamic"
      >
        <el-form-item
          class="div_input"
          prop="pid"
          label="PID"
          :rules="{
      required: true, message: 'PID不能为空', trigger: 'blur'
    }"
        >
          <el-input v-model="dynamicValidateForm.pid"></el-input>
        </el-form-item>
        <el-form-item
          class="div_input"
          prop="phone"
          label="手机号"
          :rules="{
      required: true, message: '手机号不能为空', trigger: 'blur'
    }"
        >
          <el-input v-model="dynamicValidateForm.phone"></el-input>
        </el-form-item>
        <el-form-item
          class="div_input"
          v-for="(domain, index) in dynamicValidateForm.url"
          :label="'Url' + index"
          :key="domain.key"
          :prop="'url.' + index + '.value'"
          :rules="{
      required: true, message: '域名不能为空', trigger: 'blur'
    }"
        >
          <el-input v-model="domain.value"></el-input>
          <el-button @click.prevent="removeDomain(domain)">删除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
          <el-button @click="addDomain">新增域名</el-button>
          <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="div_table">
      <div>
        <el-table
          :data="tableData"
          style="width: 100%"
          :default-sort="{prop: 'date', order: 'descending'}"
        >
          <el-table-column prop="date" label="日期" sortable width="180"></el-table-column>
          <el-table-column prop="name" label="url" sortable width="180"></el-table-column>
          <el-table-column prop="address" label="report" :formatter="formatter"></el-table-column>
        </el-table>
      </div>
      <div v-if="this.total" class="pagingBox">
        <Paging
          :pageNum="this.gather.pageNum"
          :total="this.total"
          :pageSize="this.gather.pageSize"
          @sizeChange="sizeChange"
          @currentChange="currentChange"
        ></Paging>
      </div>
    </div>
  </div>
</template>


<script>
import { Pagetime } from "@/api/testflow";
import Paging from "@/views/common/components/pagination.vue"; //引入封装的分页器文件

export default {
  data() {
    return {
      dynamicValidateForm: {
        url: [
          {
            value: "",
          },
        ],
        pid: "",
        phone: "",
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      // currentPage: 1,
      total: 1000,
      // page_size: 10,
      gather: {
        pageNum: 1, //默认第一页
        pageSize: 10, //一页展示10条
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.dynamicValidateForm);
          var data = this.dynamicValidateForm;
          this.getPagetime(data);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.url.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.url.splice(index, 1);
      }
    },
    addDomain() {
      this.dynamicValidateForm.url.push({
        value: "",
        // key: Date.now(),
      });
    },
    getPagetime(data) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      Pagetime(data)
        .then((result) => {
          if (result.code == 200) {
            this.tableData = result.data.data;
          }
        })
        .finally((req) => {
          loading.close();
        });
    },
    formatter(row, column) {
      return row.address;
    },
    // 点击页码及上一页下一页按钮操作
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
  },
  components: {
    Paging,
  },
};
</script>

<style lang="scss" scoped>
.my_center {
  position: relative;
  display: flex;
  width: 621rpx;
  height: 88rpx;
  margin: auto;
  margin-top: 40rpx;
}
.my_center_left {
  width: 600px;
  height: 88rpx;
  height:100%;
  margin:auto;
  padding:10px;
}

.div_input {
  width: 500px;
}
.div_table{
  width: 50%;
  text-align: center;
  margin:auto;
  padding:10px;
}
.pagingBox {
  text-align: right;
  margin:20px;
}
</style>