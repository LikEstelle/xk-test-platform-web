<!-- 文案title+选择框组件 -->
<template>
  <div class="timepick-width-prepend">
        <el-button type="default" class="prepend-text" size="mini">{{title}}</el-button>
        <el-select class="behind-select"  v-model="value" placeholder="请选择" size="mini" clearable filterable>
            <el-option
            class="select_option"
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
    </div>
</template>
<script >
export default {
    data() {
      return{
         options: this.option,
          value: "",

      }
    },
    props:{
        title:{
            type:String,
            required:true,
            default:'筛选'
        },
        option:{
          type:Object,
          required:true
        }
    },
    components: {},
    created() {
    },
    mounted() {
    },
    methods:{
    }
  };
</script>
<style lang='scss'>
.timepick-width-prepend {
    display: flex;
    align-items: center;
    margin-right: 20px;
    .prepend-text {
        background: #F5F7FA;
        color: #909399;
        border-right: none;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        font-weight: 600;
        padding-inline: 4px;
        cursor: default;
        :focus, :hover {
        border-color: #DCDFE6!important;
        }
    }
    .prepend-text:focus, .prepend-text:hover {
        border-color: #DCDFE6!important;
    }

    .el-input__inner {
        border-top-left-radius: 0!important;
        border-bottom-left-radius: 0!important;
    }
    .behind-select{
        width: 110px;   //设置宽度
        text-align: start;
    }
    

}
</style>
<style scoped>
.select_option{
      height: 25px;
      line-height: 25px;
      font-size: 12px;
    }
 </style>