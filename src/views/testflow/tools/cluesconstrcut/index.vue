<!-- 线索构造工具首页 -->
<template>
  <div class="index-bg">
    <el-row :gutter="20" >
      
      <el-col :span="8">
        <div class="form-container">
          <el-form ref="form" :model="form" label-width="90px">
            <el-form-item label="起始手机号">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="录入方式">
              <el-select v-model="form.entryMethod" placeholder="请选择录入方式" @change="get_channel(form.entryMethod)">
                <el-option
                  v-for="item in response"
                  :key="item.id"
                  :label="item.entryMethod"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="推广渠道">
              <el-select v-model="form.channel" placeholder="请选择推广渠道">
                <el-option
                  v-for="item in channelOptions"
                  :key="item.channelId"
                  :label="item.channelName"
                  :value="item.channelId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="创建企业">
              <el-radio-group v-model="form.isCreateCompany">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="企业名称">
              <el-input v-model="form.companyName"></el-input>
            </el-form-item>
            <el-form-item label="用户名">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="地区">
              <el-cascader
                v-model="form.address"
                :options="areaOptions"
                :props="{ expandTrigger: 'hover' ,value:'areaCode', label:'areaName'}"
                @change="handleChange"
                filterable
                placeholder="请选择企业所在地区">
              </el-cascader>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">立即构造</el-button>
              <el-button @click="addClues">添加到待构造线索池</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      
      <el-col :span="16"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
  </div>
</template>
<script >
import {areaMap} from '@/store/areaMap'
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
        entryMethodOptions:[{
          value:12,
          label:'黄金糕'
        },
        {
          value:13,
          label:'双皮奶'
        }],
        channelOptions:[
          {
          value:15,
          label:'hahaha'
        },
        {
          value:16,
          label:'hehehe'
        }
        ],
        areaOptions:areaMap,
        response:[
        {
            "id": 1,
            "entryMethod": "应用市场",
            "childrenChannel": [
                {
                    "channelId": 1,
                    "channelName": "小米",
                    "channel": "xiaomi",
                    "channelCode": "10074",
                    "owning": "app"
                },
                {
                    "channelId": 2,
                    "channelName": "官网app",
                    "channel": "bendi",
                    "channelCode": "10052",
                    "owning": "app"
                },
                {
                    "channelId": 3,
                    "channelName": "华为",
                    "channel": "huawei",
                    "channelCode": "10060",
                    "owning": "app"
                },
                {
                    "channelId": 4,
                    "channelName": "应用宝cpd",
                    "channel": "yybcpd",
                    "channelCode": "10068",
                    "owning": "app"
                },
                {
                    "channelId": 5,
                    "channelName": "应用宝",
                    "channel": "yyb",
                    "channelCode": "10068",
                    "owning": "app"
                },
                {
                    "channelId": 6,
                    "channelName": "百度手机助手",
                    "channel": "baidusz",
                    "channelCode": "10072",
                    "owning": "app"
                },
                {
                    "channelId": 7,
                    "channelName": "360手机助手",
                    "channel": "qihusz",
                    "channelCode": "10052",
                    "owning": "app"
                },
                {
                    "channelId": 8,
                    "channelName": "oppo",
                    "channel": "oppo",
                    "channelCode": "10056",
                    "owning": "app"
                },
                {
                    "channelId": 9,
                    "channelName": "vivo",
                    "channel": "vivo",
                    "channelCode": "10058",
                    "owning": "app"
                },
                {
                    "channelId": 10,
                    "channelName": "魅族",
                    "channel": "meizu",
                    "channelCode": "10076",
                    "owning": "app"
                },
                {
                    "channelId": 11,
                    "channelName": "阿里应用商店",
                    "channel": "ali",
                    "channelCode": "10078",
                    "owning": "app"
                },
                {
                    "channelId": 12,
                    "channelName": "IOS",
                    "channel": "_default_",
                    "channelCode": "10080",
                    "owning": "app"
                }
            ]
        },
        {
            "id": 2,
            "entryMethod": "信息流",
            "childrenChannel": [
                {
                    "channelId": 13,
                    "channelName": "头条fb",
                    "channel": "toutiaofb",
                    "channelCode": "10062",
                    "owning": "app"
                },
                {
                    "channelId": 14,
                    "channelName": "头条1",
                    "channel": "ttxxl1",
                    "channelCode": "10062",
                    "owning": "app"
                },
                {
                    "channelId": 15,
                    "channelName": "头条2",
                    "channel": "ttxxl2",
                    "channelCode": "10062",
                    "owning": "app"
                },
                {
                    "channelId": 16,
                    "channelName": "头条代理商专用",
                    "channel": "ttdls",
                    "channelCode": "10088",
                    "owning": "app"
                },
                {
                    "channelId": 17,
                    "channelName": "百度fb",
                    "channel": "baidufb",
                    "channelCode": "10066",
                    "owning": "app"
                },
                {
                    "channelId": 18,
                    "channelName": "百度1",
                    "channel": "bdxxl1",
                    "channelCode": "10066",
                    "owning": "app"
                },
                {
                    "channelId": 19,
                    "channelName": "百度2",
                    "channel": "bdxxl2",
                    "channelCode": "10066",
                    "owning": "app"
                },
                {
                    "channelId": 20,
                    "channelName": "百度3",
                    "channel": "bdxxl3",
                    "channelCode": "10066",
                    "owning": "app"
                },
                {
                    "channelId": 21,
                    "channelName": "百度4",
                    "channel": "bdxxl4",
                    "channelCode": "10066",
                    "owning": "app"
                },
                {
                    "channelId": 22,
                    "channelName": "百度5",
                    "channel": "bdxxl5",
                    "channelCode": "10066",
                    "owning": "app"
                },
                {
                    "channelId": 23,
                    "channelName": "微信mp1",
                    "channel": "wxmp1",
                    "channelCode": "10082",
                    "owning": "app"
                },
                {
                    "channelId": 24,
                    "channelName": "微信mp2",
                    "channel": "wxmp2",
                    "channelCode": "10082",
                    "owning": "app"
                },
                {
                    "channelId": 25,
                    "channelName": "广点通",
                    "channel": "gdtfb",
                    "channelCode": "10064",
                    "owning": "app"
                }
            ]
        },
        {
            "id": 3,
            "entryMethod": "官网注册",
            "childrenChannel": [
                {
                    "channelId": 26,
                    "channelName": "官网注册",
                    "channel": "registerForWebsite",
                    "channelCode": "10051",
                    "owning": "pc"
                },
                {
                    "channelId": 27,
                    "channelName": "寻客宝创建（注：自动创建企业）",
                    "channel": "createForXkb",
                    "channelCode": "10103",
                    "owning": "pc"
                }
            ]
        },
        {
            "id": 4,
            "entryMethod": "京东云",
            "childrenChannel": [
                {
                    "channelId": 28,
                    "channelName": "京东云",
                    "channel": "JDCloud",
                    "channelCode": "10099",
                    "owning": "pc"
                }
            ]
        },
        {
            "id": 5,
            "entryMethod": "活动",
            "childrenChannel": [
                {
                    "channelId": 30,
                    "channelName": "邀请裂变",
                    "channel": "invite_fission",
                    "channelCode": "10105",
                    "owning": "pc"
                }
            ]
        },
        {
            "id": 6,
            "entryMethod": "其他",
            "childrenChannel": [
                {
                    "channelId": 29,
                    "channelName": "企业创建/未创建",
                    "channel": "other",
                    "channelCode": "10097",
                    "owning": "pc"
                }
            ]
        },
        {
            "id": 7,
            "entryMethod": "pc端官网cpa表单",
            "childrenChannel": [
                {
                    "channelId": 31,
                    "channelName": "官网cpa表单",
                    "channel": "",
                    "channelCode": "1",
                    "owning": "pc"
                }
            ]
        },
        {
            "id": 8,
            "entryMethod": "h5端官网cpa表单",
            "childrenChannel": [
                {
                    "channelId": 32,
                    "channelName": "官网cpa表单",
                    "channel": "",
                    "channelCode": "2",
                    "owning": "app"
                }
            ]
        },
        {
            "id": 9,
            "entryMethod": "官网数据开放平台表单",
            "childrenChannel": [
                {
                    "channelId": 33,
                    "channelName": "官网数据开放平台表单",
                    "channel": "",
                    "channelCode": "3",
                    "owning": "pc"
                }
            ]
        }
    ],
    }},
    props:[],
    components: {
    },
    created() {
    },
    mounted() {
    },
    methods:{
      onSubmit() {
        console.log('submit!');
        console.log(this.form);
        this.get_entryMethod();
      },
      get_channel(entryMethodId){
        var i = entryMethodId - 1
        this.channelOptions = this.response[i].childrenChannel
        this.form.channel = ''
      },
      get_clue_channel(){
        // 调接口获取clue——channel
      }
    }
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
}
  .bg-purple {
    background: #d3dce6;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>