<template>
  <div>
    <div>
      <el-form :inline="true" :model="formData" class="demo-form-inline">
        <el-form-item label="Pid">
          <el-input v-model="formData.pid" placeholder="查询企业PID"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="formData.phone" placeholder="查询企业手机号"></el-input>
        </el-form-item>
        <el-form-item label="环境">
          <el-select v-model="formData.env" placeholder="查询企业环境">
            <el-option label="dev" value="dev"></el-option>
            <el-option label="qa" value="qa"></el-option>
            <el-option label="ol" value="ol"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期范围">
          <div class="block">
            <el-date-picker
              v-model="formData.time"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="timestamp"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item
          v-for="(item, index) in errors"
          :key="item.index"
          :title="item.traceId+'---'+item.parentEndpoint"
          :name="item.unit_name"
        >
          >
          <div class="block">
            <el-timeline>
              <el-timeline-item
                v-for="(item,index) in item.error_info"
                :key="item.index"
                :timestamp="item.startTime"
                placement="top"
              >
                <el-card>
                  <h4>端点名称: {{item.parentEndpoint}}</h4>
                  <p>应用名: {{item.service}}</p>
                  <p>接口类型: {{item.type}}</p>
                  <p v-if="item.cache==''"></p>
                  <p v-else>Cache: {{item.cache}}</p>
                  <p v-if="item.sql==''"></p>
                  <p v-else>
                    <el-link slot="reference" :underline="false">Sql: {{item.sql}}</el-link>
                  </p>
                  <p v-if="item.sql_query==''"></p>
                  <p v-else>SqlQuery: {{item.sql_query}}</p>
                  <p v-if="item.url==''"></p>
                  <p v-else>
                    <el-link :href="item.url" target="_blank" type="primary">微盟开发平台</el-link>
                  </p>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-collapse-item>
      </el-collapse>
      <!-- <div>
            <el-drawer title="我是标题" :visible.sync="drawer" :with-header="false"></el-drawer>
            <div>
              <SqlEditor
              ref="sqleditor"
              v-for="(item,index) in item.errors_data"
              :key="item.index"
              :value="item.sql"
              @changeTextarea="changeTextarea($event)"/>
            </div>
      </div>-->
    </div>
  </div>
</template>
<script>
// import SqlEditor from "@/components/SqlEditor.vue";
import sqlFormatter from "sql-formatter";
import { LogList } from "@/api/testflow";
import { Loading } from "element-ui";

export default {
  data() {
    return {
      formData: {
        pid: "",
        phone: "",
        env: "",
        time: "",
      },
      // errors: [
      //   {
      //     globalTicket: "9598-1664849323.394-ops-q1-1325-2990860664",
      //     server: "saas-xiaoke-hera",
      //     type: "http",
      //     time: "2022-10-04 10:08:44.971",
      //     unit_name: "1",
      //     errors_data: [
      //       {
      //         endpoint:
      //           "com.weimob.saas.sc.org.api.service.base.BaseOrgUserService.queryOrgUserInfoByPidAndBcWid()",
      //         server: "saas-xiaoke-hera",
      //         type: "RPCFramework",
      //         cache: "",
      //         sql: "",
      //         sql_query: "",
      //         time: "2022-10-04 10:08:44.970",
      //         url: "http://develop.internal.weimob.com/app/dev-console/astrolabe/apm-detail?operationName=&startTime=1664849324965&traceId=9598-1664849323.394-ops-q1-1325-2990860664&interfaceType=&timeCost=&serviceName=&errorType=&infoDrawerTagKey=9024a47987ccc7079354e781850876a5&_g_envId=2&_g_cluster=k8s-qa",
      //       },
      //       {
      //         endpoint: "Lettuce/EXISTS",
      //         server: "saas.crm-zqscrm-ac-server",
      //         type: "Cache",
      //         cache: "GET key<xiaoke:scrm:corp:detail:4000144903188>...",
      //         sql: "",
      //         sql_query: "",
      //         time: "2022-10-04 10:08:44.972",
      //         url: "",
      //       },
      //       {
      //         endpoint: "UserPermissionMapper.selectList",
      //         server: "saas.crm-zqscrm-ac-server",
      //         type: "Database",
      //         cache: "",
      //         sql: "SELECT id AS id,user_no AS userNo,head_image AS headImage,phone,`zone`,weixin_union_id AS weixinUnionId,`password`,salt_str AS saltStr,create_time AS createTime,update_time AS updateTime,create_user AS `createUser`,update_user AS updateUser,is_del AS isDel,latest_pid AS latestPid,management_latest_pid AS managementLatestPid,`status`,is_paid AS isPaid,is_corp_paid AS isCorpPaid,extend,bc_wid AS bcWid,close_reasons AS closeReasons,is_push_register AS isPushRegister,channel_identification AS channelIdentification,relation_openid AS relationOpenid,device_info AS deviceInfo,register_client_type AS registerClientType,is_pop_wechat_qrcode AS isPopWechatQrcode,province,city,area,remark,register_type AS registerType,first_login_type AS firstLoginType FROM t_user WHERE (bc_wid = 100510017 AND is_del=0)",
      //         sql_query:
      //           "SELECT id AS id,user_no AS userNo,head_image AS headImage,phone,`zone`,weixin_union_id AS weixinUnionId,`password`,salt_str AS saltStr,create_time AS createTime,update_time AS updateTime,create_user AS `createUser`,update_user AS updateUser,is_del AS isDel,latest_pid AS latestPid,management_latest_pid AS managementLatestPid,`status`,is_paid AS isPaid,is_corp_paid AS isCorpPaid,extend,bc_wid AS bcWid,close_reasons AS closeReasons,is_push_register AS isPushRegister,channel_identification AS channelIdentification,relation_openid AS relationOpenid,device_info AS deviceInfo,register_client_type AS registerClientType,is_pop_wechat_qrcode AS isPopWechatQrcode,province,city,area,remark,register_type AS registerType,first_login_type AS firstLoginType FROM t_user WHERE (bc_wid = 100510017 AND is_del=0)",
      //         time: "2022-10-04 10:08:44.976",
      //         url: "http://develop.internal.weimob.com/app/dev-console/astrolabe/apm-detail?operationName=&startTime=1664849324965&traceId=9598-1664849323.394-ops-q1-1325-2990860664&interfaceType=&timeCost=&serviceName=&errorType=&infoDrawerTagKey=9024a47987ccc7079354e781850876a5&_g_envId=2&_g_cluster=k8s-qa",
      //       },
      //       {
      //         endpoint: "UserPermissionMapper.selectList",
      //         server: "saas.crm-zqscrm-ac-server",
      //         type: "Database",
      //         cache: "",
      //         sql: "SELECT id AS id,user_no AS userNo,head_image AS headImage,phone,`zone`,weixin_union_id AS weixinUnionId,`password`,salt_str AS saltStr,create_time AS createTime,update_time AS updateTime,create_user AS `createUser`,update_user AS updateUser,is_del AS isDel,latest_pid AS latestPid,management_latest_pid AS managementLatestPid,`status`,is_paid AS isPaid,is_corp_paid AS isCorpPaid,extend,bc_wid AS bcWid,close_reasons AS closeReasons,is_push_register AS isPushRegister,channel_identification AS channelIdentification,relation_openid AS relationOpenid,device_info AS deviceInfo,register_client_type AS registerClientType,is_pop_wechat_qrcode AS isPopWechatQrcode,province,city,area,remark,register_type AS registerType,first_login_type AS firstLoginType FROM t_user WHERE (bc_wid = 100510017 AND is_del=0)",
      //         sql_query:
      //           "SELECT id AS id,user_no AS userNo,head_image AS headImage,phone,`zone`,weixin_union_id AS weixinUnionId,`password`,salt_str AS saltStr,create_time AS createTime,update_time AS updateTime,create_user AS `createUser`,update_user AS updateUser,is_del AS isDel,latest_pid AS latestPid,management_latest_pid AS managementLatestPid,`status`,is_paid AS isPaid,is_corp_paid AS isCorpPaid,extend,bc_wid AS bcWid,close_reasons AS closeReasons,is_push_register AS isPushRegister,channel_identification AS channelIdentification,relation_openid AS relationOpenid,device_info AS deviceInfo,register_client_type AS registerClientType,is_pop_wechat_qrcode AS isPopWechatQrcode,province,city,area,remark,register_type AS registerType,first_login_type AS firstLoginType FROM t_user WHERE (bc_wid = 100510017 AND is_del=0)",
      //         time: "2022-10-04 10:08:44.976",
      //         url: "",
      //       },
      //       {
      //         endpoint: "UserPermissionMapper.selectList",
      //         server: "saas.crm-zqscrm-ac-server",
      //         type: "Database",
      //         cache: "",
      //         sql: "SELECT id AS id,user_no AS userNo,head_image AS headImage,phone,`zone`,weixin_union_id AS weixinUnionId,`password`,salt_str AS saltStr,create_time AS createTime,update_time AS updateTime,create_user AS `createUser`,update_user AS updateUser,is_del AS isDel,latest_pid AS latestPid,management_latest_pid AS managementLatestPid,`status`,is_paid AS isPaid,is_corp_paid AS isCorpPaid,extend,bc_wid AS bcWid,close_reasons AS closeReasons,is_push_register AS isPushRegister,channel_identification AS channelIdentification,relation_openid AS relationOpenid,device_info AS deviceInfo,register_client_type AS registerClientType,is_pop_wechat_qrcode AS isPopWechatQrcode,province,city,area,remark,register_type AS registerType,first_login_type AS firstLoginType FROM t_user WHERE (bc_wid = 100510017 AND is_del=0)",
      //         sql_query:
      //           "SELECT id AS id,user_no AS userNo,head_image AS headImage,phone,`zone`,weixin_union_id AS weixinUnionId,`password`,salt_str AS saltStr,create_time AS createTime,update_time AS updateTime,create_user AS `createUser`,update_user AS updateUser,is_del AS isDel,latest_pid AS latestPid,management_latest_pid AS managementLatestPid,`status`,is_paid AS isPaid,is_corp_paid AS isCorpPaid,extend,bc_wid AS bcWid,close_reasons AS closeReasons,is_push_register AS isPushRegister,channel_identification AS channelIdentification,relation_openid AS relationOpenid,device_info AS deviceInfo,register_client_type AS registerClientType,is_pop_wechat_qrcode AS isPopWechatQrcode,province,city,area,remark,register_type AS registerType,first_login_type AS firstLoginType FROM t_user WHERE (bc_wid = 100510017 AND is_del=0)",
      //         time: "2022-10-04 10:08:44.9799",
      //         url: "",
      //       },
      //     ],
      //   },
      //   {
      //     globalTicket: "9598-1664849323.394-ops-q1-1325-2990860665",
      //     server: "saas-xiaoke-hera",
      //     type: "http",
      //     time: "2022-10-04 10:08:44.972",
      //     unit_name: "2",
      //     errors_data: [
      //       {
      //         endpoint:
      //           "com.weimob.saas.sc.org.api.service.base.BaseOrgUserService.queryOrgUserInfoByPidAndBcWid()",
      //         server: "saas-xiaoke-hera",
      //         type: "RPCFramework",
      //         cache: "",
      //         sql: "",
      //         sql_query: "",
      //         time: "2022-10-04 10:08:44.971",
      //         url: "",
      //       },
      //       {
      //         endpoint: "Lettuce/EXISTS",
      //         server: "saas.crm-zqscrm-ac-server",
      //         type: "Cache",
      //         cache: "GET key<xiaoke:scrm:corp:detail:4000144903188>...",
      //         sql: "",
      //         sql_query: "",
      //         time: "2022-10-04 10:08:44.972",
      //         url: "http://develop.internal.weimob.com/app/dev-console/astrolabe/apm-detail?operationName=&startTime=1664849324965&traceId=9598-1664849323.394-ops-q1-1325-2990860664&interfaceType=&timeCost=&serviceName=&errorType=&infoDrawerTagKey=9024a47987ccc7079354e781850876a5&_g_envId=2&_g_cluster=k8s-qa",
      //       },
      //       {
      //         endpoint: "UserPermissionMapper.selectList",
      //         server: "saas.crm-zqscrm-ac-server",
      //         type: "Database",
      //         cache: "",
      //         sql: "SELECT id AS id,user_no AS userNo,head_image AS headImage,phone,`zone`,weixin_union_id AS weixinUnionId,`password`,salt_str AS saltStr,create_time AS createTime,update_time AS updateTime,create_user AS `createUser`,update_user AS updateUser,is_del AS isDel,latest_pid AS latestPid,management_latest_pid AS managementLatestPid,`status`,is_paid AS isPaid,is_corp_paid AS isCorpPaid,extend,bc_wid AS bcWid,close_reasons AS closeReasons,is_push_register AS isPushRegister,channel_identification AS channelIdentification,relation_openid AS relationOpenid,device_info AS deviceInfo,register_client_type AS registerClientType,is_pop_wechat_qrcode AS isPopWechatQrcode,province,city,area,remark,register_type AS registerType,first_login_type AS firstLoginType FROM t_user WHERE (bc_wid = 100510017 AND is_del=0)",
      //         sql_query:
      //           "SELECT id AS id,user_no AS userNo,head_image AS headImage,phone,`zone`,weixin_union_id AS weixinUnionId,`password`,salt_str AS saltStr,create_time AS createTime,update_time AS updateTime,create_user AS `createUser`,update_user AS updateUser,is_del AS isDel,latest_pid AS latestPid,management_latest_pid AS managementLatestPid,`status`,is_paid AS isPaid,is_corp_paid AS isCorpPaid,extend,bc_wid AS bcWid,close_reasons AS closeReasons,is_push_register AS isPushRegister,channel_identification AS channelIdentification,relation_openid AS relationOpenid,device_info AS deviceInfo,register_client_type AS registerClientType,is_pop_wechat_qrcode AS isPopWechatQrcode,province,city,area,remark,register_type AS registerType,first_login_type AS firstLoginType FROM t_user WHERE (bc_wid = 100510017 AND is_del=0)",
      //         time: "2022-10-04 10:08:44.971",
      //         url: "",
      //       },
      //       {
      //         endpoint: "UserPermissionMapper.selectList",
      //         server: "saas.crm-zqscrm-ac-server",
      //         type: "Database",
      //         cache: "",
      //         sql: "SELECT id AS id,user_no AS userNo,head_image AS headImage,phone,`zone`,weixin_union_id AS weixinUnionId,`password`,salt_str AS saltStr,create_time AS createTime,update_time AS updateTime,create_user AS `createUser`,update_user AS updateUser,is_del AS isDel,latest_pid AS latestPid,management_latest_pid AS managementLatestPid,`status`,is_paid AS isPaid,is_corp_paid AS isCorpPaid,extend,bc_wid AS bcWid,close_reasons AS closeReasons,is_push_register AS isPushRegister,channel_identification AS channelIdentification,relation_openid AS relationOpenid,device_info AS deviceInfo,register_client_type AS registerClientType,is_pop_wechat_qrcode AS isPopWechatQrcode,province,city,area,remark,register_type AS registerType,first_login_type AS firstLoginType FROM t_user WHERE (bc_wid = 100510017 AND is_del=0)",
      //         sql_query:
      //           "SELECT id AS id,user_no AS userNo,head_image AS headImage,phone,`zone`,weixin_union_id AS weixinUnionId,`password`,salt_str AS saltStr,create_time AS createTime,update_time AS updateTime,create_user AS `createUser`,update_user AS updateUser,is_del AS isDel,latest_pid AS latestPid,management_latest_pid AS managementLatestPid,`status`,is_paid AS isPaid,is_corp_paid AS isCorpPaid,extend,bc_wid AS bcWid,close_reasons AS closeReasons,is_push_register AS isPushRegister,channel_identification AS channelIdentification,relation_openid AS relationOpenid,device_info AS deviceInfo,register_client_type AS registerClientType,is_pop_wechat_qrcode AS isPopWechatQrcode,province,city,area,remark,register_type AS registerType,first_login_type AS firstLoginType FROM t_user WHERE (bc_wid = 100510017 AND is_del=0)",
      //         time: "2022-10-04 10:08:44.971",
      //         url: "",
      //       },
      //       {
      //         endpoint: "UserPermissionMapper.selectList",
      //         server: "saas.crm-zqscrm-ac-server",
      //         type: "Database",
      //         cache: "",
      //         sql: "SELECT id AS id,user_no AS userNo,head_image AS headImage,phone,`zone`,weixin_union_id AS weixinUnionId,`password`,salt_str AS saltStr,create_time AS createTime,update_time AS updateTime,create_user AS `createUser`,update_user AS updateUser,is_del AS isDel,latest_pid AS latestPid,management_latest_pid AS managementLatestPid,`status`,is_paid AS isPaid,is_corp_paid AS isCorpPaid,extend,bc_wid AS bcWid,close_reasons AS closeReasons,is_push_register AS isPushRegister,channel_identification AS channelIdentification,relation_openid AS relationOpenid,device_info AS deviceInfo,register_client_type AS registerClientType,is_pop_wechat_qrcode AS isPopWechatQrcode,province,city,area,remark,register_type AS registerType,first_login_type AS firstLoginType FROM t_user WHERE (bc_wid = 100510017 AND is_del=0)",
      //         sql_query:
      //           "SELECT id AS id,user_no AS userNo,head_image AS headImage,phone,`zone`,weixin_union_id AS weixinUnionId,`password`,salt_str AS saltStr,create_time AS createTime,update_time AS updateTime,create_user AS `createUser`,update_user AS updateUser,is_del AS isDel,latest_pid AS latestPid,management_latest_pid AS managementLatestPid,`status`,is_paid AS isPaid,is_corp_paid AS isCorpPaid,extend,bc_wid AS bcWid,close_reasons AS closeReasons,is_push_register AS isPushRegister,channel_identification AS channelIdentification,relation_openid AS relationOpenid,device_info AS deviceInfo,register_client_type AS registerClientType,is_pop_wechat_qrcode AS isPopWechatQrcode,province,city,area,remark,register_type AS registerType,first_login_type AS firstLoginType FROM t_user WHERE (bc_wid = 100510017 AND is_del=0)",
      //         time: "2022-10-04 10:08:44.971",
      //         url: "",
      //       },
      //     ],
      //   },
      // ],
      activeName: "1",
      drawer: false,
      errors:[],
      
    };
  },
  methods: {
    async getLogList(pid,phone,start_time,end_time) {
      console.log(1)
      let result = await LogList(pid,phone,start_time,end_time);
      if (result.code == 200) {
        console.log(result)
        this.errors=result.data.list
        // console.log(result.list)
        // console.log(this.errors)
      }
    },
    onSubmit() {
      // var params = {
      //   pid: this.formData.pid,
      //   phone: this.formData.phone,
      //   env: this.formData.env,
      //   time: this.formData.time,
      // };
      var pid=this.formData.pid;
      var phone=this.formData.phone;
      var start_time=this.formData.time[0];
      var end_time=this.formData.time[1];
      this.getLogList(pid,phone,start_time,end_time)
      console.log(params);
    },
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    formaterMysql(val) {
      let dom = this.$refs.sqleditor;
      const a = dom.editor.setValue(sqlFormatter.format(dom.editor.getValue()));
      // this.tableData.mysql = this.sql;
      console.log(1);
      console.log(this.errors.errors_data.sql);
    },
  },
};
</script>

<style lang="scss" scoped>
.mintable {
  border: 1px;
  margin: 20px 0 0 10;
}
</style>
