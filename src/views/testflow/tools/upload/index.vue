<template>
  <div class="div">
    <div class="div_radio">
      <el-radio v-model="business_type" label="har">har(Charles)</el-radio>
      <el-radio disabled v-model="business_type" label>其他</el-radio>
    </div>
    <el-upload
      drag
      :limit="limitNum"
      :auto-upload="false"
      accept=".har"
      :action="UploadUrl()"
      :before-upload="beforeUploadFile"
      :on-change="fileChange"
      :on-exceed="exceedFile"
      :on-success="handleSuccess"
      :on-error="handleError"
      :file-list="fileList"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div class="el-upload__tip" slot="tip">目前只支持上传.har文件</div>
    </el-upload>
    <br />
    <el-button size="small" type="primary" @click="uploadFile">立即上传</el-button>
    <el-button size="small">取消</el-button>
  </div>
</template>


<script>
import axios from "axios";
import { Import } from "@/api/testflow";

export default {
  data() {
    return {
      limitNum: 1, // 上传excell时，同时允许上传的最大数
      fileList: [], // excel文件列表
      //   name: "123",
      business_type: "har",
    };
  },
  methods: {
    // 文件超出个数限制时的钩子
    exceedFile(files, fileList) {
      this.$message.warning(
        `只能选择 ${this.limitNum} 个文件，当前共选择了 ${
          files.length + fileList.length
        } 个`
      );
    },
    // 文件状态改变时的钩子
    fileChange(file, fileList) {
      console.log(file.raw);
      //   this.fileList.push(file.raw);
      this.fileList = fileList;
      console.log("fileList", this.fileList);
      // console.log("fileList",this.fileList[0].name)
    },
    // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
    beforeUploadFile(file) {
      console.log("before upload");
      console.log(file);
      let extension = file.name.substring(file.name.lastIndexOf(".") + 1);
      let size = file.size / 1024 / 1024;
      if (extension !== ".har") {
        this.$message.warning("只能上传后缀是.har的文件");
      }
      // if (size > 10) {
      //   this.$message.warning("文件大小不得超过10M");
      // }
    },
    // 文件上传成功时的钩子
    handleSuccess(res, file, fileList) {
      this.$message.success("文件上传成功");
    },
    // 文件上传失败时的钩子
    handleError(err, file, fileList) {
      this.$message.error("文件上传失败");
    },
    UploadUrl: function () {
      // 因为action参数是必填项，我们使用二次确认进行文件上传时，直接填上传文件的url会因为没有参数导致api报404，所以这里将action设置为一个返回为空的方法就行，避免抛错
      return "";
    },
    async uploadFile() {
      if (this.fileList.length === 0) {
        this.$message.warning("请上传文件");
      } else {
        //   let form = new FormData();
        //   form.append('file', this.fileList);
        //   form.append('name',this.name);
        //   form.append('business_type',this.business_type);
        let param = new FormData();
        this.fileList.forEach((file) => {
          param.append("file", file.raw);
          param.append("name", file.name);
          param.append("business_type", this.business_type);
        });
        let result = await this.axios({
          method: "post",
          // url: "http://172.19.10.50:8000/testflow/TestCase/UploadFile/",
          url: "http://xiaoke-test-iterface.app.qa.internal.xiaoke.cn/testflow/TestCase/UploadFile/",
          headers: {
            "Content-type": "multipart/form-data",
          },
          data: param,
        });
        if (result.data.data.business_type == "har") {
          let params = {
            har_name: result.data.data.file_url,
          };
          let re = await Import(params);
          console.log("录入用例", re);
          this.$message.success(re.data.msg);
        }
      }
    },
  },
};
</script>

<style scoped>
.div {
  display: block;
  /* margin: 0 auto; */
  text-align: center;
  padding: 80px 0 40px;
}
.div_radio{
  padding:10px
}
</style>

