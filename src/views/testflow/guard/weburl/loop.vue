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
        prop="try_count" 
        label="循环次数"
        :rules="{required:true,message: '循环次数不能为空'}"
        >
          <el-input v-model="dynamicValidateForm.try_count"></el-input>
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
    <div class="my_center_right" >
      <el-table  style="width: 100%;margin-bottom: 20px;" border 
          :data="tableData">
        <el-table-column type="expand" >
          <template slot-scope="scope">
            <el-table  :data="scope.row.page_time" stripe style="width: 100%" border >
              <el-table-column  prop="getResponseTime" label="页面响应时间" width="180"></el-table-column>
              <el-table-column prop="getRedirectTime" label="重定向时间" width="180"></el-table-column>
              <el-table-column prop="getDomainLookupTime" label="DNS解析时间"></el-table-column>
              <el-table-column prop="getDomLoadingTime" label="页面渲染时间"></el-table-column>
              <el-table-column prop="getNavigationTime" label="白屏等待时间"></el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column label="被测页面Url" prop="url" min-width="150px"></el-table-column>
        <el-table-column label="页面平均响应时间" prop="avg.responseTime" min-width="150px"></el-table-column>
        <el-table-column label="重定平均向时间" prop="avg.redirectTime" min-width="150px"></el-table-column>
        <el-table-column label="DNS平均解析时间" prop="avg.domainLookupTime" min-width="150px"></el-table-column>
        <el-table-column label="页面平均渲染时间" prop="avg.domLoadingTime" min-width="150px"></el-table-column>
        <el-table-column label="白屏平均等待时间" prop="avg.navigationTime" min-width="150px"></el-table-column>
      </el-table>
    </div>
  </div>
</template>


<script>

import { Pagetime } from "@/api/testflow";

export default {
  data() {
    return {
      dynamicValidateForm: {
        url: [
          {
            value: "",
          },
        ],
        try_count: "",
      },
      tableData:[],
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.dynamicValidateForm);
          var data = this.dynamicValidateForm
          this.getPagetime(data)
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
      Pagetime(data).then((result)=> {
          if (result.code == 200) {
            console.log("111"+result)
            this.tableData=result.data.data
            console.log("222"+this.tableData)
          }
      }).finally((req)=>{
        loading.close();
      })
    },
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
}
.my_center_middle {
  width: 207rpx;
  height: 88rpx;
  background-color: yellow;
}
.my_center_right {
  width: 207rpx;
  height: 88rpx;
}
.div_input {
  width: 500px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>