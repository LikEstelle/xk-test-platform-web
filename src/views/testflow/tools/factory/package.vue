<template>
  <div>
    <el-form ref="form" :model="sizeForm" label-width="80px" size="medium">
      <el-form-item label="PID" class="div_input">
        <el-input v-model="sizeForm.name" placeholder="请输入pid" clearable=true></el-input>
      </el-form-item>
      <el-form-item label="套餐">
        <el-select v-model="sizeForm.region" placeholder="请选择套餐">
          <el-option
            v-for="(item,index) in options"
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
import { BuyPack } from "@/api/testflow";

export default {
  data() {
    return {
      sizeForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      options: [
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
        pack_id:this.sizeForm.region,
        pid:this.sizeForm.name,
      };
      let result = await BuyPack(params);
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

<style lang="scss">
.div_input{
  width:500px;
}
</style>
