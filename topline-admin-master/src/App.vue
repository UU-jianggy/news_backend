<template>
  <div id="app">
    <el-container>
      <!-- 头部 -->
      <el-header style="height:10vh; padding:0;"><Header/></el-header>
      <el-container style="height:90vh">
        <!-- 侧边栏 -->
        <el-aside width="200px" style="background-color:#545c64;"><leftNav/></el-aside>
        <!-- 展示模块 -->
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from './components/header'
import leftNav from './components/leftnav'

export default {
  name: 'App',
  data () {
    return {}
  },
  components: {
    Header,
    leftNav
  },
  methods: {
    open: function () {
      console.log(this.routerNumber)
    }
  }
}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
  html,body {
    margin: 0;
    padding: 0;
  }
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  body > .el-container {
    margin-bottom: 40px;
  }
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
