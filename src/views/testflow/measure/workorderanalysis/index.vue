<!-- 工单分析页面 -->
<template>
  <div class="index_container" :style="{'--rightWidth':rightWidth}">
      <div class="query-criteria-container">
        <div class="filtes_group">
            <div class="first_filters">
                <el-input class="search_input" placeholder="请输入内容" prefix-icon="el-icon-search" v-model="search_input_text" clearable size="mini"></el-input>
                <div v-for="item in firstVisibleList" :key="item.id">
                    <text-select v-if="item.visible == true" :title="item.filter_name" :option="item.options"/>    
                </div>
                <el-popover
                    placement="bottom"
                    :width="80"
                    trigger="click"
                    v-model="addFilterPopoverVisible"
                    content=""
                    popper-class="add_filter_button_group">
                    <div v-for="item in workorderFilters" :key="item.id">
                        <el-button v-if="item.isFixedDisplay == false" type="text" @click="item.visible = true;addFilterPopoverVisible = false" size="mini">{{item.filter_name}}</el-button>
                    </div>
                    <el-button slot="reference" size="mini" icon="el-icon-plus" plain ></el-button>
                </el-popover>
            </div>
            <div class="second_filters" v-if="filterVisibleCount > 5">
                <div v-for="item in secondVisibleList" :key="item.id">
                    <text-select v-if="item.visible == true" :title="item.filter_name" :option="item.options"/>    
                </div>
            </div>
        </div>
        
        
        <div class="setting_icon">
            <el-popover
                placement="bottom"
                trigger="click"
                v-model="settingPopoverVisible"
                width="160"
                >
                <el-button type="text" @click="dialogFormVisible = true" size="mini">设置列表字段</el-button>
                <el-dialog title="收货地址" :visible.sync="dialogFormVisible" append-to-body>
                    <el-form :model="form">
                        <el-form-item label="活动名称" :label-width="formLabelWidth">
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="活动区域" :label-width="formLabelWidth">
                        <el-select v-model="form.region" placeholder="请选择活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                    </div>
                </el-dialog>
                <el-button slot="reference" icon="el-icon-setting" circle size="mini"></el-button>
            </el-popover>
        </div>
    </div>
    <div class="table_container" :style="{'--tableHeight':tableHeight}">
        <el-table :data="workorderTableData" style="width: 100%" @cell-click="cellClick" :row-class-name="tableRowClassName"
                :cell-class-name="tableCellClassName">
            <el-table-column v-for="(col,index) in workorder_colums" :key="index" align="center"
            :prop="col.colums_key" :label="col.colums_name" :width="col.colums_width" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-tag v-if="col.colums_key == 'is_problem' && scope.row[col.colums_key]!==''" size="mini">{{ scope.row[col.colums_key] }}</el-tag>
                    <el-tag v-else-if="col.colums_key == 'type' && scope.row[col.colums_key]!==''" size="mini" type="warning">{{ scope.row[col.colums_key] }}</el-tag>
                    <el-tag v-else-if="col.colums_key == 'problem_side' && scope.row[col.colums_key]!==''" size="mini" type="success">{{ scope.row[col.colums_key] }}</el-tag>
                    <el-tag v-else-if="col.colums_key == 'module' && scope.row[col.colums_key]!==''" size="mini" type="info">{{ scope.row[col.colums_key] }}</el-tag>
                    <!-- 标题带url -->
                    <!-- <span v-else-if="col.colums_key == 'title'">{{scope.row['url']}}</span> -->
                    <a v-else-if="col.colums_key == 'title'" :href="scope.row['url']" target="_blank" class="buttonText">{{scope.row[col.colums_key]}}</a>
                    <!-- 不可编辑的字段 -->
                    <span v-else-if="col.colums_key == 'create_time'">{{scope.row[col.colums_key]}}</span>
                    <!-- 其余字段可以编辑，有焦点时可以input -->
                    <div v-else>
                        <el-input
                            v-if="scope.row.index == rowIndex && scope.column.index == columnIndex"
                            v-model="scope.row[col.colums_key]"
                            @blur="inputBlur(scope.row)"
                            size="mini"
                        ></el-input>
                        <span v-else>{{scope.row[col.colums_key]}}</span>
                    </div>
                    <span v-if="scope.row[col.colums_key] == '' && !(scope.row.index == rowIndex && scope.column.index == columnIndex)">-</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div class="page_container">
        <el-pagination
        background
        layout=" ->, prev, pager, next"
        :total="total_count"
        @current-change="handleCurrentChange"
        :current-page="current_page">
        </el-pagination>
    </div>
  </div>
</template>
<script >
import { mapGetters } from 'vuex'
import Select from '@/components/Select/index.vue'
import filters from '@/store/workorder/filters'
import { getWorkOrderData } from '@/api/tool'
export default {
    data() {
      return{
            windowHeight:'',
            indexHeight:'',
            windowWidth:'',
            refreshKey:1,
            workorderFilters: filters,

            addFilterPopoverVisible: false,
            settingPopoverVisible: false,
            dialogFormVisible: false,

            workorder_colums:[
                {
                    colums_key:'title',
                    colums_name:'标题',
                    colums_width:'230px'
                },
                {
                    colums_key:'create_time',
                    colums_name:'创建时间',
                    colums_width:'180px'
                },
                {
                    colums_key:'is_problem',
                    colums_name:'是否是问题',
                    colums_width:'100px'
                },{
                    colums_key:'type',
                    colums_name:'问题类型',
                    colums_width:'100px'
                },{
                    colums_key:'reason',
                    colums_name:'问题原因',
                    colums_width:'180px'
                },{
                    colums_key:'repair_method',
                    colums_name:'修复方案',
                    colums_width:'180px'
                },{
                    colums_key:'problem_side',
                    colums_name:'问题产生端',
                    colums_width:'100px'
                },{
                    colums_key:'module',
                    colums_name:'所属模块',
                    colums_width:'100px'
                },{
                    colums_key:'repairer',
                    colums_name:'工单修复人',
                    colums_width:'100px'
                }
            ],
            workorderTableData:[],
            rowIndex: -1, //行索引
	        columnIndex: -1, //列索引
            tableHeight:'100px',

            current_page:1,
            total_count:0,

            form: {
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
            },
            formLabelWidth: '120px',

            search_input_text:'',
            

      }
    },
    props:[],
    components: {
        'text-select':Select,
    },
    created() {
    },
    computed:{
        ...mapGetters([
            'sidebar',
        ]),
        // 右侧自适应宽度，根据左侧菜单栏收缩/展开动态变化
        rightWidth(){
            let leftWidth = this.sidebar.opened ? '210' : '54';
            return (this.windowWidth-leftWidth)+'px'
        },
        filterVisibleList(){
			return this.workorderFilters.filter((item) => {
				return item.visible == true
			})
		},
        firstVisibleList(){
            return this.filterVisibleList.slice(0,5)
        },
        secondVisibleList(){
            return this.filterVisibleList.slice(5,this.filterVisibleList.length)
        },
        filterVisibleCount(){
            return this.filterVisibleList.length
        }
    },
    mounted() {
        //浏览器可见区域高度
        this.windowHeight = document.body.clientHeight;
        this.indexHeight = this.windowHeight + 'px';
        // 浏览器可见区域宽度  
        this.windowWidth = document.body.clientWidth;

        //立即执行
        window.onresize = () => {
        return (() => {
            this.windowHeight = document.body.clientHeight;
            this.indexHeight = this.windowHeight + 'px';
            this.windowWidth = document.body.clientWidth;
        })();
        };

        this.getWorkOrderList();
    },
    watch:{
        //监听页面高度变化
        indexHeight(val){
            this.indexHeight = val;
        },
        filterVisibleCount(val){
            if(val>5){
                this.tableHeight = '140px'
            }else{
                this.tableHeight = '100px'
            }
        }
    },
    methods:{
        async getWorkOrderList(){
            let response = await getWorkOrderData(this.current_page,10);
            if(response.code == 200){
                this.total_count = response['data']['total'];
                var responseList = response['data']['list'];
                // 将返回的list内的数据转换成workorderTableData
                for(var item in responseList){
                    var workorderItem = {
                        title: responseList[item]['title'],
                        url: responseList[item]['url'],
                        create_time: responseList[item]['create_time'],
                        is_problem: responseList[item]['is_problem'],
                        type: responseList[item]['type'],
                        reason: responseList[item]['reason'],
                        repair_method: responseList[item]['repair_method'],
                        problem_side: responseList[item]['problem_side'],
                        module: responseList[item]['module'],
                        repairer: responseList[item]['repairer']
                    }
                    this.workorderTableData.push(workorderItem);
                }
            }
        },
        //获取工单列表当前页的数据
        async handleCurrentChange(val){
            this.current_page = val;
            this.workorderTableData = [];
            await this.getWorkOrderList();
        },
        tableRowClassName({ row, rowIndex }) {
	      // 把每一行的索引放到row里
	      row.index = rowIndex;
	    },
	    tableCellClassName({ column, columnIndex }) {
	      // 把每一列的索引放到column里
	      column.index = columnIndex;
	    },
	    cellClick(row, column) {
	      this.rowIndex = row.index;
	      this.columnIndex = column.index;
	    },
	    // 失去焦点
	    inputBlur(rowData) {
	      this.rowIndex = -1;
	      this.columnIndex = -1;
          console.log(rowData);
	    },
    }
  };
</script>
<style lang='scss'>
$indexH: var(--indexHeight);
$rightW: var(--rightWidth);
$tableH: var(--tableHeight);
.index_container{
    height: calc(100vh - 60px);
    width: #{$rightW};
    background-color: #F3F4F6;
    position: fixed;
    .query-criteria-container{
        height: var(filterHeight);
        width: calc(100% - 20px);
        display: flex;
        flex-direction: row;
        align-items: center;
        // justify-content:space-between;
        
        .filtes_group{
            display: flex;
            flex-direction: column;
            .first_filters,.second_filters{
                display: flex;
                flex-direction: row;
                align-items: center;
                margin: 10px 10px;
                min-width: 1000px;
            }
        }

        .search_input{
            width: 200px;
            margin-right: 20px;
        }
        
        .setting_icon{
            margin-left:auto;
            margin-right: 10px;
        }
    }
    .table_container{
        width: calc(100% - 20px);
        height: calc(100% - #{$tableH});
        background-color: #ffffff;
        border-radius: 5px;
        margin: 0px 10px;
        min-width: 1300px;
    }
    .page_container{
        padding: 10px;
    }
}
.el-popover{
        display: flex;
        flex-direction: column;
        min-width: 100px;
    }
</style>