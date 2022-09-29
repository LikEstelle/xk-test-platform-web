<template>
  <div>
    <div>
      <SqlEditor
        ref="sqleditor"
        :value="basicInfoForm.sqlMain"
        @changeTextarea="changeTextarea($event)"
      />
      <el-button
        type="primary"
        size="small"
        class="sql-btn"
        @click="formaterMysql (basicInfoForm.sqlMain)"
      >格式化并提交 mysql</el-button>
      <el-button
        type="primary"
        size="small"
        class="sql-btn"
        @click="formaterHivesql (basicInfoForm.sqlMain)"
      >格式化并提交 hivesql</el-button>
      <el-button type="primary" size="small" class="sql-btn" @click="contrastData ()">对比数据</el-button>
      <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="Mysql_sql">
          <el-input v-model="tableData.mysql"></el-input>
        </el-form-item>
        <el-form-item label="Hive_sql">
          <el-input v-model="tableData.hivesql"></el-input>
        </el-form-item>
      </el-form>
      <!-- <pre>{{ JSON.stringify(contrast, null, 4)  }}</pre> -->
      <json-viewer :value="contrast"></json-viewer>
    </div>
  </div>
</template>
<script>
import sqlFormatter from "sql-formatter";
import SqlEditor from "@/components/SqlEditor";
import { ContrastData } from "@/api/testflow";
import { Loading } from "element-ui";

export default {
  components: {
    SqlEditor,
  },
  data() {
    return {
      basicInfoForm: {
        sqlMain: "",
      },
      sql: "",
      tableData: {
        mysql: "",
        hivesql: "",
      },
      labelPosition: "right",
      formLabelAlign: {
        name: "",
        region: "",
        type: "",
      },
      contrast: "",
      fullscreenLoading: false,
    };
  },
  methods: {
    async getContrastData() {
      var params = {
        hive_sql: this.tableData.hivesql,
        mysql_sql: this.tableData.mysql,
      };
      let result = await ContrastData(params);
      if (result.code == 200) {
        var params = {
          hive_sql: result.hive_sql,
          mysql_sql: result.mysql_sql,
          data: result.data,
        };
        this.contrast = params;
      }
    },
    openFullScreen2() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      setTimeout(() => {
        loading.close();
      }, 3500);
    },
    changeTextarea(val) {
      this.sql = this.$set(this.basicInfoForm, "sqlMain", val);
    },
    formaterMysql(val) {
      let dom = this.$refs.sqleditor;
      const a = dom.editor.setValue(sqlFormatter.format(dom.editor.getValue()));
      this.tableData.mysql = this.sql;
      console.log(1);
      console.log(this.tableData.mysql);
    },
    formaterHivesql(val) {
      let dom = this.$refs.sqleditor;
      const a = dom.editor.setValue(sqlFormatter.format(dom.editor.getValue()));
      this.tableData.hivesql = this.sql;
      console.log(1);
      console.log(this.tableData.hivesql);
    },
    contrastData() {
      this.openFullScreen2();
      this.getContrastData();
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
