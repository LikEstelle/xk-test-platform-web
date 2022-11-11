<template>
  <div>
    <!-- //分页器封装文件 -->
    <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      :page-sizes="[10, 20, 30,40,50,100]"
      layout="total, sizes, prev, pager, next, jumper"
      :current-page.sync="pageNum"
      :page-size="pageSize"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "Paging",
  data() {
    return {
      pageNum: 1, //当前页数为第一页
    };
  },
  //子组件接收父组件的值
  props: {
    total: {
      //总数据条数
      required: false, //是否必填
      default: 0, //默认值为0
    },
    pageSize: {
      required: false, //是否必填
      default: 10, //默认显示10条
    },
  },
  watch: {
    //监听页数变化
    pageNum(val) {
      if (typeof val === "number") {
        console.log("w_pageNum", val);
        this.pageNum = val;
      }
    },
  },
  // 事件方法
  methods: {
    // 每页展示几条变化
    sizeChange(val) {
      //子组件向父组件传值
      this.$emit("sizeChange", val);
    },
    // 页码变化
    currentChange(val) {
      //子组件向父组件传值
      this.$emit("currentChange", val);
    },
  },
};
</script>

