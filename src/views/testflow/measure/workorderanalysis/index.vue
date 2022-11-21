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
                <el-dialog title="设置列表展示字段" :visible.sync="dialogFormVisible" append-to-body width="500px">
                    <div v-for="item in workorder_colums_setting" :key="item.colums_key">
                        <el-checkbox v-model="item.is_show" @change="editTableColums()">{{item.colums_name}}</el-checkbox>
                    </div>
                    <!-- <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                    </div> -->
                </el-dialog>
                <el-button slot="reference" icon="el-icon-setting" circle size="mini"></el-button>
            </el-popover>
        </div>
    </div>
    <!-- <div class="table_container" :style="{'--tableHeight':tableHeight}"> -->
    <el-table :key="refreshTable" :data="workorderTableData" style="width: 100%" @cell-click="cellClick" :row-class-name="tableRowClassName"
            :cell-class-name="tableCellClassName" :cell-style="cellStyle" ref="multipleTable" class="table_container" :style="{'--tableHeight':tableHeight}" >
        <el-table-column v-for="(col,index) in workorder_colums" :key="index" align="center"
        :prop="col.colums_key" :label="col.colums_name" :width="col.colums_width" show-overflow-tooltip :fixed="col.isfixed" :sortable="col.issortable">
            <template slot-scope="scope">
                <!-- 以tag形式展示数据，聚焦后下拉框选择 -->
                <tableEdit v-if="col.colums_key == 'is_problem'" :scope="scope" :col="col" :inputBlur="inputBlur" :componentType="'tag'"
                            :columnIndex="columnIndex" :rowIndex="rowIndex" :tagType="'primary'"></tableEdit>
                <tableEdit v-else-if="col.colums_key == 'type'" :scope="scope" :col="col" :inputBlur="inputBlur" :componentType="'tag'"
                            :columnIndex="columnIndex" :rowIndex="rowIndex" :tagType="'warning'"></tableEdit>
                <tableEdit v-else-if="col.colums_key == 'problem_side'" :scope="scope" :col="col" :inputBlur="inputBlur" :componentType="'tag'"
                            :columnIndex="columnIndex" :rowIndex="rowIndex" :tagType="'success'"></tableEdit>
                <tableEdit v-else-if="col.colums_key == 'module'" :scope="scope" :col="col" :inputBlur="inputBlur" :componentType="'tag'"
                            :columnIndex="columnIndex" :rowIndex="rowIndex" :tagType="'info'"></tableEdit>
                
                <!-- 以span标签展示数据，获取到的是code展示对应的文案，聚焦后下拉框选择 -->
                <tableEdit v-else-if="col.colums_key == 'is_solved' && scope.row[col.colums_key]!==''" :scope="scope" :col="col" :inputBlur="inputBlur" :componentType="'span'"
                            :columnIndex="columnIndex" :rowIndex="rowIndex"></tableEdit>
                <tableEdit v-else-if="col.colums_key == 'is_repeat' && scope.row[col.colums_key]!==''" :scope="scope" :col="col" :inputBlur="inputBlur" :componentType="'span'"
                            :columnIndex="columnIndex" :rowIndex="rowIndex"></tableEdit>
                <tableEdit v-else-if="col.colums_key == 'is_convert_demand' && scope.row[col.colums_key]!==''" :scope="scope" :col="col" :inputBlur="inputBlur" :componentType="'span'"
                            :columnIndex="columnIndex" :rowIndex="rowIndex"></tableEdit>
                <tableEdit v-else-if="col.colums_key == 'follow_result' && scope.row[col.colums_key]!==''" :scope="scope" :col="col" :inputBlur="inputBlur" :componentType="'span'"
                            :columnIndex="columnIndex" :rowIndex="rowIndex" :tagType="'primary'"></tableEdit>          
                <tableEdit v-else-if="col.colums_key == 'is_adopted'" :scope="scope" :col="col" :inputBlur="inputBlur" :componentType="'span'"
                            :columnIndex="columnIndex" :rowIndex="rowIndex" :tagType="'primary'"></tableEdit>

                <!-- 标题带url -->
                <a v-else-if="col.colums_key == 'title'" :href="scope.row['url']" target="_blank" class="buttonText" style="color: #409EFF">{{scope.row[col.colums_key]}}</a>
                <!-- 不可编辑的字段 -->
                <span v-else-if="col.colums_key == 'create_time'">{{scope.row[col.colums_key]}}</span>

                <!-- 其余字段可以编辑，有焦点时可以input,失去焦点时可以编辑 -->
                <fy-tooltip v-else :tipContent="scope.row[col.colums_key]">
                    <el-input
                        v-if="scope.row.index == rowIndex && scope.column.index == columnIndex"
                        v-model="scope.row[col.colums_key]"
                        @blur="inputBlur(scope.row)"
                        size="mini"
                    ></el-input>
                    <span v-else-if="scope.row[col.colums_key] != ''">{{scope.row[col.colums_key]}}</span>
                    <span v-else>-</span>
                </fy-tooltip>
                <span v-if="(scope.row[col.colums_key] == '' || scope.row[col.colums_key] == null)&& scope.row[col.colums_key]!=0 && !(scope.row.index == rowIndex && scope.column.index == columnIndex)">-</span>
            </template>
        </el-table-column>
    </el-table>
    <!-- </div> -->
    <div class="page_container">
        <el-pagination
        background
        layout="slot, ->, prev, pager, next,jumper"
        :total="total_count"
        @current-change="handleCurrentChange"
        :current-page="current_page">
        <span>共计：{{total_count}}条</span>
        </el-pagination>
    </div>
  </div>
</template>
<script >
import { mapGetters } from 'vuex'
import Select from '@/components/Select/index.vue'
import tableEditComponent from './tableEditComponent.vue'
import filters from '@/store/workorder/filters'
import tableDefaultColumsSettingData from '@/store/workorder/tableDefaultColums'
import { getWorkOrderData, editWorkOrderData } from '@/api/tool'
export default {
    data() {
      return{
            windowHeight:'',
            indexHeight:'',
            windowWidth:'',
            refreshKey:1,
            refreshTable: 0,
            
            workorderFilters: filters,

            addFilterPopoverVisible: false,
            settingPopoverVisible: false,
            dialogFormVisible: false,

            workorder_colums_setting: tableDefaultColumsSettingData,

            workorderTableData:[],
            tableHeight:'100px',
            rowIndex: -1, //输入框出现的行索引
	        columnIndex: -1, //输入框出现的列索引
            
            current_page:1,
            total_count:0,

            search_input_text:'',
            workorder_colums_count:0,
            

      }
    },
    props:[],
    components: {
        'text-select':Select,
        'tableEdit': tableEditComponent,
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
        },
        workorder_colums(){
            // 获取缓存的表格展示列设置
            var session_setting = JSON.parse(sessionStorage.getItem('table_colums_setting'));
            if(session_setting!=null){
                this.workorder_colums_setting = session_setting
            }
            let colums = this.workorder_colums_setting.filter((item) => {
                return item.is_show == true
            })

            this.workorder_colums_count = colums.length
            return colums
        },
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
        },
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
                        id: responseList[item]['id'],
                        title: responseList[item]['title'],
                        url: responseList[item]['url'],
                        create_time: responseList[item]['create_time'],
                        is_problem: responseList[item]['is_problem'],
                        type: responseList[item]['type'],
                        reason: responseList[item]['reason'],
                        repair_method: responseList[item]['repair_method'],
                        problem_side: responseList[item]['problem_side'],
                        module: responseList[item]['module'],
                        repairer: responseList[item]['repairer'],
                        is_solved: responseList[item]['is_solved'],
                        is_repeat: responseList[item]['is_repeat'],
                        replay: responseList[item]['replay'],
                        follower: responseList[item]['follower'],
                        follow_result: responseList[item]['follow_result'],
                        is_convert_demand: responseList[item]['is_convert_demand'],
                        demand_confirmer: responseList[item]['demand_confirmer'],
                        is_adopted: responseList[item]['is_adopted'],

                    }
                    this.workorderTableData.push(workorderItem);
                }
                this.$nextTick(() => {
                    this.$ref.multipleTable.doLayout();
                });
            }
        },
        //翻页   获取工单列表当前页的数据
        async handleCurrentChange(val){
            // 取消定位编辑框
            this.rowIndex = -1;
	        this.columnIndex = -1;
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
	    // 失去焦点 编辑数据
	    inputBlur(rowData) {
	      this.rowIndex = -1;
	      this.columnIndex = -1;
          var id = rowData.id
          var editData = {
            is_problem: rowData.is_problem,
            type: rowData.type,
            reason: rowData.reason,
            repair_method: rowData.repair_method,
            problem_side: rowData.problem_side,
            module: rowData.module,
            repairer: rowData.repairer,
            is_solved: rowData.is_solved,
            is_repeat: rowData.is_repeat,
            replay: rowData.replay,
            follower: rowData.follower,
            follow_result: rowData.follow_result,
            is_convert_demand: rowData.is_convert_demand,
            demand_confirmer: rowData.demand_confirmer,
            is_adopted: rowData.is_adopted,

        }
        editWorkOrderData(id, editData).then(response=>{
              let {msg,code,data} = response;
              if(code == 200){
                  console.log('编辑成功');
              }else{
                  this.$message.error({
                                message:msg,
                                center:true
                            });
              }
          })
	    },
        editTableColums(){
            // 设置更改时，缓存表格展示列设置
            sessionStorage.setItem('table_colums_setting',JSON.stringify(this.workorder_colums_setting));
            // 配置变化时，重新渲染表格
            this.refreshTable++;
        },
        //设置hover样式，hover出现小手
        cellStyle(data){
            // 创建时间列除外
            if(data.column.property!='create_time'){
                return "cursor:pointer;"
            }
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
 .el-table{
      height: 100%;
      .el-table__body-wrapper{
          overflow: auto;
          height: calc(100% - 85px);
          &::-webkit-scrollbar {
            width: 0px;           /* 纵向滚动条 宽度 */ 
            height: 8px;           /* 横向滚动条 高度 */
            // display: none;
          }
          ::-webkit-scrollbar-button{
            width: 10px;          /* 横向滚动条 宽度 */
            height: 0px;         /* 纵向滚动条 高度 */
            border-radius: 10px;
          }
          /* Track */
          &::-webkit-scrollbar-track {
              background: rgba(223, 219, 219, 0.2);
              border-radius: 8px;
              width: 8px;
          }
          /* Handle */
          &::-webkit-scrollbar-thumb {
              background: rgb(202, 203, 204);
              border-radius: 8px;
          }
      }
      .cell.el-tooltip{
        text-align: center;
      }
  }

</style>
