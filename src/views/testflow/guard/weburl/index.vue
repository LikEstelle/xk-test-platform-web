<template>
  <div class="my_center">
    <div class="my_center_left">
      <el-form
        :model="dynamicValidateForm"
        ref="dynamicValidateForm"
        label-width="100px"
        class="demo-dynamic"
      >
        <el-form-item class="div_input" prop="try_count" label="循环次数">
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
    <div class="my_center_right">
      <el-table  style="width: 100%;margin-bottom: 20px;" border v-for="(item, index) in tableData"
          :key="item.index"
          :data="tableData">
        <el-table-column type="expand">
          <template slot-scope="props">
            <!-- <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="所属店铺">
                <span>{{ props.row.shop }}</span>
              </el-form-item>
              <el-form-item label="商品 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="店铺 ID">
                <span>{{ props.row.shopId }}</span>
              </el-form-item>
              <el-form-item label="商品分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.desc }}</span>
              </el-form-item>
            </el-form>-->
            <el-table :data="tableData.page_time" stripe style="width: 100%" border >
              <el-table-column prop="page_time.getResponseTime" label="页面响应时间" width="180"></el-table-column>
              <el-table-column prop="page_time.getRedirectTime" label="重定向时间" width="180"></el-table-column>
              <el-table-column prop="page_time.getDomainLookupTime" label="DNS解析时间"></el-table-column>
              <el-table-column prop="page_time.getDomLoadingTime" label="页面渲染时间"></el-table-column>
              <el-table-column prop="page_time.getNavigationTime" label="白屏等待时间"></el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column label="被测页面Url" prop="item.url" min-width="150px"></el-table-column>
        <el-table-column label="页面平均响应时间" prop="item.avg.responseTime" min-width="150px"></el-table-column>
        <el-table-column label="重定平均向时间" prop="item.avg.redirectTime" min-width="150px"></el-table-column>
        <el-table-column label="DNS平均解析时间" prop="item.avg.domainLookupTime" min-width="150px"></el-table-column>
        <el-table-column label="页面平均渲染时间" prop="item.avg.domLoadingTime" min-width="150px"></el-table-column>
        <el-table-column label="白屏平均等待时间" prop="item.avg.navigationTime" min-width="150px"></el-table-column>
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
    //   tableData: [
    //     {
    //       id: "http://172.19.10.68:9531/#/testflow/guard/weburl",
    //       name: "17",
    //       category: "90",
    //       desc: "20",
    //       address: "100",
    //       shop: "160",
    //       key: {
    //          date:"20" 
    //       },
    //     },
    //     {
    //       id: "12987123",
    //       name: "好滋好味鸡蛋仔",
    //       category: "江浙小吃、小吃零食",
    //       desc: "荷兰优质淡奶，奶香浓而不腻",
    //       address: "上海市普陀区真北路",
    //       shop: "王小虎夫妻店",
    //       shopId: "10333",
    //     },
    //     {
    //       id: "12987125",
    //       name: "好滋好味鸡蛋仔",
    //       category: "江浙小吃、小吃零食",
    //       desc: "荷兰优质淡奶，奶香浓而不腻",
    //       address: "上海市普陀区真北路",
    //       shop: "王小虎夫妻店",
    //       shopId: "10333",
    //     },
    //     {
    //       id: "12987126",
    //       name: "好滋好味鸡蛋仔",
    //       category: "江浙小吃、小吃零食",
    //       desc: "荷兰优质淡奶，奶香浓而不腻",
    //       address: "上海市普陀区真北路",
    //       shop: "王小虎夫妻店",
    //       shopId: "10333",
    //     },
    //   ],
      tableData:[],
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
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
    async getPagetime(data) {
      let result = await Pagetime(data);
      if (result.code == 200) {
        console.log(result)
        this.tableData=result.data.data
      }
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