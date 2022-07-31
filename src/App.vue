<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss" >

 ::v-deep {.sidebar-logo-container {
    .sidebar-logo {
      width:'10px !important'
   }
}
  .collapse {
    .sidebar-logo {
      width:'20px !important'

   }
 }

 }







 
</style>
