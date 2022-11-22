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
        <div v-if="!(scope.row.index == rowIndex && scope.column.index == columnIndex)">
            <el-tag v-if="scope.row[col.colums_key]!=='' && scope.row[col.colums_key]!==null"  size="mini" :type="tagType">{{ scope.row[col.colums_key] }}</el-tag>
            <span v-else>-</span>
        </div>
        
    </div>
    <!-- 通过code映射，以文案的形式展示tag -->
    <!-- <div v-else-if="componentType == 'tagCodeConfirm'">
        <el-select
        v-if="scope.row.index == rowIndex && scope.column.index == columnIndex"
        v-model="scope.row[col.colums_key]"
        @change="inputBlur(scope.row)"
        size="mini"
        :placeholder="scope.row[col.colums_key]">
            <el-option v-for="item in (col.options)" :key="item.value" :label="item.label" :value="item.label">
            </el-option>
        </el-select>
        <div v-if="!(scope.row.index == rowIndex && scope.column.index == columnIndex)">
            <el-tag size="mini" :type="tagType">
                {{ tagCode == item.value? item.label: "" }}
                </el-tag>
        </div>
    </div> -->
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
        <div v-else-if="scope.row[col.colums_key]!=='' && scope.row[col.colums_key]!==null">
            <span v-for="(item, index) in (col.options)" :key="index">
            {{ scope.row[col.colums_key] == item.value? item.label: "" }}
            </span>
        </div>
        <span v-else>-</span>
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
            type:Number,
            require:true,
        },
        columnIndex:{
            type:Number,
            require:true,
        },
        tagType:{
            type:String,
            require:false,
            default:'primary'
        }

    },
    components: {
        
    },
    computed:{
        tagCode(){
            for(var item in this.col.options){
                if(this.scope.row[this.col.colums_key] != null){                    
                    return scope.row[col.colums_key] == item.value? item.value: null 
                }
            }
        }
    },
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