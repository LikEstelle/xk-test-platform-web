<!-- 表格编辑组件 -->
<template>
  <div v-if="componentType == 'tag'">
        <el-select
        v-if="scope.row.index == rowIndex && scope.column.index == columnIndex"
        v-model="scope.row[col.colums_key]"
        @change="inputBlur(scope.row)"
        size="mini"
        :placeholder="scope.row[col.colums_key]">
            <el-option v-for="item in (col.options)" :key="item.value" :label="item.label" :value="item.label">
            </el-option>
        </el-select>
        <el-tag v-if="!(scope.row.index == rowIndex && scope.column.index == columnIndex)" size="mini" :type="tagType">{{ scope.row[col.colums_key] }}</el-tag>
    </div>
    <div v-else-if="componentType == 'span'">
        <el-select
        v-if="scope.row.index == rowIndex && scope.column.index == columnIndex"
        v-model="scope.row[col.colums_key]"
        @change="inputBlur(scope.row)"
        size="mini"
        :placeholder="scope.row[col.colums_key]">
            <el-option v-for="item in (col.options)" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
        </el-select>
        <div v-if="!(scope.row.index == rowIndex && scope.column.index == columnIndex)">
            <span v-for="(item, index) in (col.options)" :key="index">
            {{ scope.row[col.colums_key] == item.value? item.label: "" }}
            </span>
        </div>
    </div>
</template>
<script >
export default {
    data() {
      return{
      }
    },
    props:{
        scope:{
            type:Object,
            require:true,
        },
        col:{
            type:Object,
            require:true,
        },
        inputBlur:{
            type: Function,
            require:true,
        },
        componentType:{
            type:String,
            require:true
        },
        rowIndex:{
            type:String,
            require,
        },
        columnIndex:{
            type:String,
            require:true,
        },
        tagType:{
            type:String,
            require:false,
            default:'primary'
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
</style>