<!--  -->
<template>
  <div>
    <el-menu
    default-active= routerNumber
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
      <el-submenu index="1">
          <template slot="title">
          <i class="el-icon-view"></i>
          <span>查看数据</span>
          </template>
          <el-menu-item-group>
          <router-link to="/"><el-menu-item @click="getList()" index="1-1" id="1">综合</el-menu-item></router-link>
          <router-link to="/"><el-menu-item @click="openAll($event,1)" index="1-2" id="2">新闻</el-menu-item></router-link>
          <router-link to="/"><el-menu-item @click="openAll($event,2)" index="1-3" id="3">活动</el-menu-item></router-link>
          <router-link to="/"><el-menu-item @click="openAll($event,3)" index="1-4" id="4">公告</el-menu-item></router-link>
          </el-menu-item-group>
      </el-submenu>
      <router-link to="/upload">
        <el-menu-item index="4">
          <i class="el-icon-upload2"></i>
          <span slot="title">提交数据</span>
        </el-menu-item>
      </router-link>
    </el-menu>
  </div>
</template>

<script>
import { getList } from '@/api/api'
export default {
  data () {
    return {
      routerData: [],
      resData: ''
    }
  },
  methods: {
    // 兄弟传值：传递侧边栏现在的状态值，让主页面判断展示哪个接口的数据
    openAll: function (e, num) {
      console.log(num)
      this.bus.$emit('openAll', num)
    },
    getList: async function () {
      const { data } = await getList()
      this.routerData = data
      this.bus.$emit('getList', this.routerData)
    }
  }
}

</script>
<style lang='less' scoped>
a {
  color: #c0c0c0;
  text-decoration: none;
}
.el-menu {
    border: none;
}
</style>
