<template>
  <div>
    <div>
      <el-table
        :data="tableData.filter(data => !search || data.holder.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%"
        align="left"
      >
        <el-table-column type="index" width="50" fixed label="序号"></el-table-column>
        <el-table-column label="手机品牌" prop="brand" fixed></el-table-column>
        <el-table-column
          show-overflow-tooltip="true"
          min-width="125px"
          label="设备名称/型号"
          prop="specs"
          fixed
        ></el-table-column>
        <el-table-column label="系统" prop="system" fixed></el-table-column>
        <el-table-column label="系统版本" prop="system_version" fixed></el-table-column>
        <el-table-column label="手机配置" prop="config" fixed></el-table-column>
        <el-table-column
          show-overflow-tooltip="true"
          label="序列号/IMEI"
          min-width="125px"
          prop="serial_number"
        ></el-table-column>
        <el-table-column min-width="90px" label="资产编号" prop="assets_number"></el-table-column>
        <el-table-column label="申请时间" prop="apply_time"></el-table-column>
        <el-table-column label="颜色" prop="colour"></el-table-column>
        <el-table-column label="持有人" prop="holder"></el-table-column>
        <el-table-column min-width="100px" label="所属业务线" prop="belonging"></el-table-column>
        <el-table-column label="状态" prop="status"></el-table-column>
        <el-table-column label="被借用" prop="is_borrow"></el-table-column>
        <el-table-column show-overflow-tooltip="true" label="借用人" prop="borrower"></el-table-column>
        <el-table-column label="核对" prop="check"></el-table-column>
        <el-table-column align="right" min-width="125px">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-dialog :visible.sync="dialogFormVisible" center>
        <el-form :model="form" style="width:500px">
          <el-form-item label="手机品牌" :label-width="formLabelWidth">
            <el-input v-model="form.brand" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="设备名称/型号" :label-width="formLabelWidth">
            <el-input v-model="form.specs" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="系统" :label-width="formLabelWidth">
            <el-input v-model="form.system" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="系统版本" :label-width="formLabelWidth">
            <el-input v-model="form.system_version" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机配置" :label-width="formLabelWidth">
            <el-input v-model="form.config" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="序列号/IMEI" :label-width="formLabelWidth">
            <el-input v-model="form.serial_number" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="资产编号" :label-width="formLabelWidth">
            <el-input v-model="form.assets_number" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="申请时间" :label-width="formLabelWidth">
            <el-input v-model="form.apply_time" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="颜色" :label-width="formLabelWidth">
            <el-input v-model="form.colour" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="持有人" :label-width="formLabelWidth">
            <el-input v-model="form.holder" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="所属业务线" :label-width="formLabelWidth">
            <el-input v-model="form.belonging" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="状态" :label-width="formLabelWidth">
            <el-input v-model="form.status" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="是否被借用" :label-width="formLabelWidth">
            <el-input v-model="form.is_borrow" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="借用人" :label-width="formLabelWidth">
            <el-input v-model="form.borrower" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="是否核对" :label-width="formLabelWidth">
            <el-input v-model="form.borrower" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <!-- <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button> -->
          <el-button
              type="primary"
              @click="
                patchhandleEdit(), (dialogFormVisible = false)"
            >确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { SourceManagementAll, SourceManagementID,PSourceManagementID } from "@/api/testflow";
export default {
  data() {
    return {
      // tableData: [
      //   {
      //     id: 1,
      //     brand: "Apple",
      //     specs: "iPhone 11 Pro MAX",
      //     system: "IOS",
      //     system_version: "13.6",
      //     config: "64G",
      //     serial_number: "FK1ZD2WAN701",
      //     assets_number: "GDZC1049",
      //     apply_time: "2021/2/1",
      //     colour: "石墨色",
      //     holder: "张 冠",
      //     belonging: "销氪-寻客宝",
      //     status: "已在用",
      //     is_borrow: "否",
      //     borrower: "",
      //     check: "已核对",
      //   },
      //   {
      //     id: 2,
      //     brand: "OPPO",
      //     specs: "OPPO Reno6 5G",
      //     system: "Android",
      //     system_version: "11",
      //     config: "8GB+128GB",
      //     serial_number: "861271046090317,861271046090309",
      //     assets_number: "GDZC1360",
      //     apply_time: "2020/3/1",
      //     colour: "夜海",
      //     holder: "王锁柱",
      //     belonging: "销氪-寻客宝2",
      //     status: "共用手机",
      //     is_borrow: "是",
      //     borrower:
      //       "汪绍云-微盟集团-研发中心/增长创新技术部/前端 -借用时间不确定",
      //     check: "未核对",
      //   },
      // ],
      tableData: [],
      search: "",
      dialogFormVisible: false,
      formLabelWidth: "100px",
      // form: {
      //   id: 1,
      //   brand: "Apple",
      //   specs: "iPhone 11 Pro MAX",
      //   system: "IOS",
      //   system_version: "13.6",
      //   config: "64G",
      //   serial_number: "FK1ZD2WAN701",
      //   assets_number: "GDZC1049",
      //   apply_time: "2021/2/1",
      //   colour: "石墨色",
      //   holder: "张 冠",
      //   belonging: "销氪-寻客宝",
      //   status: "已在用",
      //   is_borrow: "否",
      //   borrower: "",
      //   check: "已核对",
      // },
      form:{}
    };
  },
  mounted() {
    this.getSourceManagementAll();
  },
  methods: {
    handleEdit(index, row) {
      this.editGetform();
      this.dialogFormVisible = true;
      this.getSourceManagementID(row.id)
      
    },
    async patchhandleEdit(){
      var id=this.form.id
      var data=this.form
      this.patchPSourceManagementID(id,data);
      this.getSourceManagementAll();
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    editGetform() {
      console.log(1);
    },
    async getSourceManagementAll() {
      var page_size = 100;
      let result = await SourceManagementAll(page_size);
      if (result.code == 200) {
        this.tableData = result.data.list;
      }
    },
    async getSourceManagementID(id) {
      let result = await SourceManagementID(id);
      if (result.code == 200) {
        this.form=result.data
      }
    },
    async patchPSourceManagementID(id,data) {
      let result = await PSourceManagementID(id,data);
      if (result.code == 200) {
        console.log("Success")
        this.$message({
          message:result.msg,
          type:'success'
        })
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
