<!-- 线索构造工具首页 -->
<template>
  <div class="index-bg">
    <el-row :gutter="20" >
      <el-col :span="10">
        <div class="form-container">
          <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="起始手机号" prop="phone">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="录入方式" prop="entryMethod">
              <el-select v-model="form.entryMethod" placeholder="请选择录入方式" @change="get_channel(form.entryMethod)">
                <el-option
                  v-for="item in entryMethodOptions"
                  :key="item.id"
                  :label="item.entryMethod"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="推广渠道" prop="channel">
              <el-select v-model="form.channel" placeholder="请选择推广渠道">
                <el-option
                  v-for="item in channelOptions"
                  :key="item.channelId"
                  :label="item.channelName"
                  :value="item.channelId">
                </el-option>
              </el-select>
            </el-form-item>
            <div v-if="form.channel ===31 || form.channel===32 ||form.channel===33">
            </div>
            <div v-else>
              <el-form-item label="创建企业" prop="isCreateCompany">
                <el-radio-group v-model="form.isCreateCompany">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
            <div v-if="form.isCreateCompany===1 ||form.channel ===31 ||form.channel === 32 || form.channel===33">
              <el-form-item label="企业名称" prop="companyName">
                <el-input v-model="form.companyName"></el-input>
              </el-form-item>
            </div>
            <div v-if="form.isCreateCompany===1 ||form.channel === 31||form.channel===32">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username"></el-input>
              </el-form-item>
            </div>
            <div v-if="form.isCreateCompany===1">
              <el-form-item label="地区" prop="address">
                <el-cascader
                  v-model="form.address"
                  :options="areaOptions"
                  :props="{ expandTrigger: 'hover' ,value:'areaCode', label:'areaName'}"
                  @change="handleChange"
                  filterable
                  placeholder="请选择企业所在地区">
                </el-cascader>
              </el-form-item>
            </div>
            
            <el-form-item>
              <el-button type="primary" @click="onSubmit">立即构造</el-button>
              <el-button @click="addClues">添加到待构造线索池</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      
      <el-col :span="14">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="card_title">待构造线索池</span>
            <span style="padding-left:30px;font-size:13px">起始手机号：{{this.request_data['start_phone']}}</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="batchSubmit">批量构造线索</el-button>
          </div>
          <el-table :data="tableData" style="width: 100%" max-height="440" >
            <el-table-column prop="entryMethod" label="录入方式" width="100" :show-overflow-tooltip='true'>
              <template v-slot='scope'>
                <span>{{scope.row.entryMethod || '-'}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="channelName" label="推广渠道" width="100" :show-overflow-tooltip='true'>
              <template v-slot='scope'>
                <span>{{scope.row.channelName || '-'}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="isCreateCompany" label="创建企业" width="80" >
              <template v-slot='scope'>
                <span>{{scope.row.isCreateCompany || '-'}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="username" label="用户名" width="100" :show-overflow-tooltip='true'>
              <template v-slot='scope'>
                <span>{{scope.row.username || '-'}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="companyName" label="企业名" width="150" :show-overflow-tooltip='true'>
              <template v-slot='scope'>
                <span>{{scope.row.companyName || '-'}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="address" label="地区" width="150" :show-overflow-tooltip='true'>
              <template v-slot='scope'>
                <span>{{scope.row.address || '-'}}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <div class="result_container" v-if="isShowResult">
      <el-card class="box-card-result">
          <div slot="header" class="clearfix-result">
            <span class="card_title">线索构造结果</span>
            <span style="padding-left:30px;font-size:13px"><font color='blue'>成功：{{this.success_count}}条</font></span>
            <span style="padding-left:30px;font-size:13px;"><font color='red'>失败：{{this.fail_count}}条</font></span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text" @click="batchSubmit">批量构造线索</el-button> -->
          </div>
          <el-table :data="resultTableData" style="width: 100%" max-height="600" >
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="phone" label="手机号" width="120" :show-overflow-tooltip='true'>
              <template v-slot='scope'>
                <span>{{scope.row.phone || '-'}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="entryMethod" label="录入方式" width="120" :show-overflow-tooltip='true'>
              <template v-slot='scope'>
                <span>{{scope.row.entryMethod || '-'}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="channelName" label="推广渠道" width="120" :show-overflow-tooltip='true'>
              <template v-slot='scope'>
                <span>{{scope.row.channelName || '-'}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="channel" label="渠道标识" width="80" :show-overflow-tooltip='true'>
              <template v-slot='scope'>
                <span>{{scope.row.channel || '-'}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="isCreateCompany" label="创建企业" width="100" >
              <template v-slot='scope'>
                <span>{{scope.row.isCreateCompany?'是':'否' || '-'}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="username" label="用户名" width="120" :show-overflow-tooltip='true'>
              <template v-slot='scope'>
                <span>{{scope.row.username || '-'}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="companyName" label="企业名" width="120" :show-overflow-tooltip='true'>
              <template v-slot='scope'>
                <span>{{scope.row.companyName || '-'}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="address" label="地区" width="150" :show-overflow-tooltip='true'>
              <template v-slot='scope'>
                <span>{{scope.row.address || '-'}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="isSuccess" label="状态" width="80" :show-overflow-tooltip='true'>
              <template v-slot='scope'>
                <el-tag v-if="scope.row.isSuccess==1||scope.row.isSuccess=='1'">成功</el-tag>
                <el-tag v-else type="danger">失败</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="failReason" label="失败原因" :show-overflow-tooltip='true'>
              <template v-slot='scope'>
                <span>{{scope.row.failReason || '-'}}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
    </div>
  </div>
</template>
<script >
import {areaMap} from '@/store/areaMap'
import clueApi from '@/api/toolClueConstruct'
export default {
    data() {
      return{
        form: {
          phone: '',
          entryMethod: '',
          channel:'',
          isCreateCompany: '',
          companyName: '',
          username: '',
          address: []
        },
        entryMethodOptions:[],
        channelOptions:[],
        areaOptions:areaMap,
        request_data:{
          start_phone:'',
          clueChannelList:[],
        },
        isNeedStartPhone:1,
        response_data:{},
        rules: {
          phone: [
            { required: true, message: '请输入起始手机号', trigger: 'blur' },
            { pattern:/^1[3456789]\d{9}$/, message: '请输入正确的11位手机号码', trigger: 'blur' }
          ],
          entryMethod: [
            { required: true, message: '请选择录入方式', trigger: 'blur' }
          ],
          channel: [
            { required: true, message: '请选择推广渠道', trigger: 'blur' }
          ],
          companyName: [
            {  required: true, message: '请输入公司名称', trigger: 'blur' }
          ],
          username: [
            { required: true, message: '请输入联系人姓名', trigger: 'blur' }
          ],
          isCreateCompany: [
            { required: true, message: '请选择是否创建企业', trigger: 'change' }
          ],
          address:[
            {required:true,message:'请选择地区',trigger:'change'}
          ]
        },
        tableData:[],
        isShowResult:false,
        success_count:0,
        fail_count:0,
        resultTableData:[],
    }},
    props:[],
    components: {
    },
    created() {
    },
    methods:{
      onSubmit() {
        console.log('submit!');
        console.log(this.form);
        this.isNeedStartPhone = 1;
        this.request_data = {
          start_phone:'',
          clueChannelList:[],
        };
        console.log('request_data',this.request_data);
        this.formatRequestData(this.form);
        this.submitClueConstruct(this.request_data);
        this.form = {
          phone: '',
          entryMethod: '',
          channel:'',
          isCreateCompany: '',
          companyName: '',
          username: '',
          address: []
        };
        // 调用请求执行线索构造任务接口，每次执行完，清空构造线索池，即this.request_data以及缓存
      },
      batchSubmit(){
        console.log('batch submit!');
        console.log('request_data',this.request_data);
        this.submitClueConstruct(this.request_data);
        // this.request_data
        // 调用请求执行线索构造任务接口，每次执行完，清空构造线索池，即this.request_data以及缓存
      },
      addClues(){
        var params = JSON.parse(sessionStorage.getItem('requestData'))
        console.log('parmas',params);
        if(params === null){
          // 缓存为空，首次添加线索
          this.isNeedStartPhone = 1;
        }else{
          // 缓存不为空，但起始手机号字段为空，添加进起始手机号
          if(params.start_phone === ''){
            this.isNeedStartPhone =1;
          }else{
            this.isNeedStartPhone =0;
          }
          // 缓存不为空，将缓存的值给request_data
          this.request_data = params
        }
        console.log('isNeedStartPhone',this.isNeedStartPhone);
        this.formatRequestData(this.form);
        // console.log(this.form);
        // console.log(this.tableData);
        // console.log(this.channelOptions);
        var tableI = {
          username: this.form.username,
          companyName:this.form.companyName,
          isCreateCompany:this.form.isCreateCompany?'是':'否',
          entryMethod:this.entryMethodOptions[this.form.entryMethod-1].entryMethod
        }
        for(var i=0; i<this.channelOptions.length;i++){
          if(this.form.channel=== this.channelOptions[i].channelId){
            tableI['channelName'] = this.channelOptions[i].channelName
          }
        }
        if(this.form.address.length!==0){
          var province
          var city
          var area
          var province_id = this.form.address[0];
          var city_id = this.form.address[1];
          var area_id = this.form.address[2];
          areaMap.forEach( function (item, index, areaMap) {
            console.log(item);
            if(item.areaCode == province_id){
              province = item.areaName;
              console.log(province);
              let cityMap = item.children;
              cityMap.forEach(function(citem,cindex,cityMap){
                if(citem.areaCode == city_id){
                  city = citem.areaName;
                  let aMap = citem.children;
                  aMap.forEach(function(aitem,aindex,aMap){
                    if(aitem.areaCode == area_id){
                      area = aitem.areaName;
                    }
                  })
                }
              })
            }
          } )
          tableI['address'] = province+'/'+city+'/'+area    
        }else{
          tableI['address'] = ''
        }
        this.tableData.push(tableI);
        this.form = {
          phone: '',
          entryMethod: '',
          channel:'',
          isCreateCompany: '',
          companyName: '',
          username: '',
          address: []
        };
        sessionStorage.setItem('requestData',JSON.stringify(this.request_data));
        console.log('缓存内的requestData',JSON.parse(sessionStorage.getItem('requestData')));
        console.log('this.request_data',this.request_data);

        // this.request_data = this.request_data_null;
      },
      formatRequestData(formData){
        if(this.isNeedStartPhone === 1){
          // 首次添加到构造线索池子/直接提交构造请求
          this.request_data['start_phone'] = formData['phone'];
        }  
        var clueChannel = {}
        clueChannel['entryMethod_id'] = formData['entryMethod'];
        clueChannel['channelId'] = formData['channel'];
        clueChannel['isCreateCompany'] = formData['isCreateCompany'];
        clueChannel['companyName'] = formData['companyName'];
        clueChannel['username'] = formData['username'];
        console.log(formData.address.length);
        if(formData.address.length!==0){
          var address = {}
          address['province'] = formData.address[0];
          address['city'] = formData.address[1];
          address['area'] = formData.address[2];
          clueChannel['address'] = address;
        }
        
        this.request_data['clueChannelList'].push(clueChannel);
        console.log(this.request_data);
      },
      get_channel(entryMethodId){
        var i = entryMethodId - 1
        this.channelOptions = this.entryMethodOptions[i].childrenChannel
        this.form.channel = ''
      },
      get_clue_channel(){
        // console.log('mounted调用接口');
        var headers = {
          Authorization: 'Token be37aa38a1d4c178ab1177670a22fd36c2ed38da'
        }
        var params = {}
        // 调接口获取clue——channel
        clueApi.getClueChannel(headers,params).then(
          resp =>{
            let{code,msg,data} = resp;
            if(code==='0'){
              data.pop();
              this.entryMethodOptions = data;
            }else{
              this.$message.error({
                                message:msg,
                                center:true
                            });
            }
          }
        )
      },
      submitClueConstruct(requestData){
        console.log('submit clue construct');
        var headers = {
          Authorization: 'Token be37aa38a1d4c178ab1177670a22fd36c2ed38da'
        }
        var params = requestData
        clueApi.postClueConstruct(headers,params).then(
          resp =>{
            let{code,msg,data} = resp;
            if(code==='0'){
              this.success_count = data['success_count'];
              this.fail_count = data['fail_count'];
              this.resultTableData = data['clueList'];
              this.isShowResult = true;
              this.$message.success({
                                message:msg,
                                center:true
                            });
              this.response_data = data;
            }else{
              this.$message.error({
                                message:msg,
                                center:true
                            });
            }
            // 待构造线索池置空
            this.request_data = {
                start_phone:'',
                clueChannelList:[],
              };
              // 待构造线索池展示的数据置空
            this.tableData = [];
            // 缓存的待构造线索池置空
            sessionStorage.setItem('requestData',JSON.stringify(this.request_data));
          }
        )
      }
    },
    mounted() {
      this.get_clue_channel();
    },
  };
</script>
<style lang='scss'>
.index-bg {
  margin-top: 20px;
  .form-container{
    background-color: #f6f6fa;
    height: 100%;
    padding: 20px;
    border-radius: 5px;
  }
  .card_title{
    font-weight: 600;
  }
}
  .bg-purple {
    background: #d3dce6;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>