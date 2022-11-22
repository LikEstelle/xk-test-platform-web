<template>
  <div>
    <el-form ref="form" :model="sizeForm" label-width="80px" size="medium">
      <el-form-item label="PID" class="div_input">
        <el-input v-model="sizeForm.pid" placeholder="请输入pid" clearable></el-input>
      </el-form-item>
      <el-form-item label="插件">
        <el-select v-model="sizeForm.plugin_id" placeholder="请选插件">
          <el-option
            v-for="item in options"
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
import { BuyPlugin } from "@/api/testflow";

export default {
  data() {
    return {
      sizeForm: {
        pid: "",
        plugin_id: "",
      },
      options: [
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
    };
  },
  methods: {
    onSubmit() {
      this.Buy()
    },
    async Buy() {
      var params = {
        plugin_id:this.sizeForm.plugin_id,
        pid:this.sizeForm.pid,
      };
      let result = await BuyPlugin(params);
      if (result.code == 200) {
        this.$message({
          message:result.data.msg,
          type:'success'
        })
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.div_input{
  width:500px;
}
</style>
