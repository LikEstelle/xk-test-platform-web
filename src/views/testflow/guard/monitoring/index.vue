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
                  <p v-if="item.sqlResult==''"></p>
                  <p v-else>SqlQuery: {{item.sqlResult}}</p>
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
    </div>
  </div>
</template>
<script>
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
      activeName: "1",
      drawer: false,
      errors:[],
      
    };
  },
  methods: {
    async getLogList(pid,phone,start_time,end_time) {
      let result = await LogList(pid,phone,start_time,end_time);
      if (result.code == 200) {
        console.log(result)
        this.errors=result.data.list
        if (result.data.total==0){
          this.openwarning()
        }else{
          this.opensuccess()
        }
      }
    },
    onSubmit() {
      var pid=this.formData.pid;
      var phone=this.formData.phone;
      console.log(this.formData.time[0])
      if (this.formData.time[0]==undefined){
        console.log(123)
        var start_time=''
        var end_time=''

      }else{
        var start_time=this.formData.time[0];
        var end_time=this.formData.time[1];
      }
      this.getLogList(pid,phone,start_time,end_time)
    },
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    formaterMysql(val) {
      let dom = this.$refs.sqleditor;
      const a = dom.editor.setValue(sqlFormatter.format(dom.editor.getValue()));
    },
    openwarning() {
        this.$message({
          showClose: true,
          message: '未匹配到数据!',
          type: 'warning'
        });
    },
    opensuccess() {
        this.$message({
          showClose: true,
          message: '查询成功',
          type: 'success'
        });
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
