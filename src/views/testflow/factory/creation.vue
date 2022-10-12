<template>
  <div>
    <el-form ref="form" :model="sizeForm" label-width="100px" size="medium">
      <el-form-item label="手机号">
        <el-input v-model="sizeForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="创建企业名称">
        <el-input v-model="sizeForm.enterprise_name"></el-input>
      </el-form-item>
       <el-form-item label="用户姓名">
        <el-input v-model="sizeForm.name"></el-input>
      </el-form-item>
      <el-form-item label="插件">
        <el-select v-model="sizeForm.pack_id" placeholder="请选择活动区域">
          <el-option
            v-for="(item,index) in pack"
            :key="item.index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="套餐">
        <el-select v-model="sizeForm.plugin_id" placeholder="请选择活动区域">
          <el-option
            v-for="(item,index) in plugin"
            :key="item.index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { BuyRights } from "@/api/testflow";

export default {
  data() {
    return {
      sizeForm: {
        phone: "",
        enterprise_name: "",
        name: "",
        pack_id: "",
        plugin_id: "",
      },
      plugin: [
        {
          value: "941",
          label: "高级版CRM",
        },
        {
          value: "940",
          label: "基础版CRM",
        },
        {
          value: "991",
          label: "日领取额度包",
        },
        {
          value: "994",
          label: "寻客宝日监控包",
        },
        {
          value: "989",
          label: "寻客宝坐席插件(新)",
        },
        {
          value: "944",
          label: "呼叫坐席",
        },
        {
          value: "933",
          label: "营销助手",
        },
        {
          value: "927",
          label: "广告助手",
        },
        {
          value: "918",
          label: "客情雷达",
        },
        {
          value: "670",
          label: "短信群发",
        },
        {
          value: "829",
          label: "AI外呼坐席",
        },
      ],
      pack: [
        {
          value: "393",
          label: "免费版",
        },
        {
          value: "303",
          label: "试用版",
        },
        {
          value: "527",
          label: "智享版",
        },
        {
          value: "3717",
          label: "京东云试用版",
        },
        {
          value: "3715",
          label: "营销版",
        },
        {
          value: "3716",
          label: "电销专业版",
        },
        {
          value: "3787",
          label: "获客版",
        },
        {
          value: "3861",
          label: "新免费版",
        },
        {
          value: "3865",
          label: "个人免费版",
        },
      ],
    };
  },
  methods: {
    onSubmit() {
      this.Buy()
      console.log("submit!");
    },
    async Buy() {
      var params = {
        phone_num:this.sizeForm.phone,
        enterprise_name:this.sizeForm.enterprise_name,
        name:this.sizeForm.name,
        pack_id:this.sizeForm.pack_id,
        plugin_id:this.sizeForm.plugin_id,
      };
      let result = await BuyRights(params);
      if (result.code == 200) {
        this.opensuccess()
      }
    },
    opensuccess() {
        this.$message({
          showClose: true,
          message: '购买插件成功',
          type: 'success'
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
