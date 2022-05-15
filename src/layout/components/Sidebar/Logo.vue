<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="test" src='@/assets/weimob-logo.png' class="sidebar-logo">
        <!-- <img v-if="test" src='@/assets/weimob-logo.png'> -->
        <!-- <img class="logo-img" src="@/assets/weimob-logo.png"> -->

        <h1 v-else class="sidebar-title">{{ title }} </h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="test" src='@/assets/weimob-logo.png' class="sidebar-logo">
        <h1 class="sidebar-title">{{ title }} </h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      test:11,
      title: '测试脚本平台',
      // logo: '@/assets/weimob-logo.png'

      // logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'

    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 58px;
  margin-top: -10px;
  line-height: 70px;
  background: #fff;
  text-align: center;
  overflow: hidden;
  // margin-left: -20px;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 100px;
      height: 60px;
      vertical-align: middle;
      margin-right: 5px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 10;
      color: #000;
      font-weight: 600;
      line-height: 50px;
      font-size: 10px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
      margin-top:10px;
      // margin-left: 5px;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
