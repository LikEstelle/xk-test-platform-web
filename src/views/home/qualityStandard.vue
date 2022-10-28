<template>
  <el-carousel height="800px" direction="vertical" :autoplay="false">
    <el-carousel-item v-for="item in 1" :key="item">
       <img src='@/assets/guifan.png' class="guifan-logo">
    </el-carousel-item>
  </el-carousel>
</template>

<script>

export default {

}
</script>

<style>
  .el-carousel__item h3 {
    text-align: center;

  }
  
  .el-carousel__item:nth-child(2n) {
    text-align: center;

  }
  
  .el-carousel__item:nth-child(2n+1) {
     text-align: center;

  }
  .guifan-logo{
    max-width: 100%;
		max-height: 100%;
    width: 98%;

 
}
</style>
