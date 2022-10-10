<template>
    <el-cascader :props="props"></el-cascader>
</template>
<script>
let id = 0;
// import SqlEditor from "@/components/SqlEditor.vue";
import sqlFormatter from "sql-formatter";
import { Test } from "@/api/testflow";
import { Loading } from "element-ui";

export default {
    data() {
      return {
        props: {
          lazy: true,
          lazyLoad (node, resolve) {
            const { level } = node;
            setTimeout(() => {
              const nodes = Array.from({ length: level + 1 })
                .map(item => ({
                  value: ++id,
                  label: `选项${id}`,
                  leaf: level >= 2
                }));
              // 通过调用resolve将子节点数据返回，通知组件数据加载完成
              resolve(nodes);
            }, 1000);
          }
        }
      };
    }
  };
</script>

<style lang="scss" scoped>
.mintable {
  border: 1px;
  margin: 20px 0 0 10;
}
</style>
