<template>
  <div>
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <el-button type="primary" @click=handleLogin>主要按钮</el-button>


  </div>
</template>


<script>
import { getTest } from '@/api/table'

export default {
    name:'test',
    data() {
    return {
      input: ''
    }
  },
  methods:{
    handleLogin(){
      re=getTest(this.input)
      console.log(re)

    }
  }

}

</script>
<style scoped>
</style>