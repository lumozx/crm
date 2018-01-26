<template>
<el-container class='all'>
  <el-header style="text-align: right; font-size: 12px"></el-header>

<el-container style="height: 80%; border: 1px solid #eee">
  <el-aside width="225px" style="background-color: rgb(238, 241, 246);height: 100%;">
    <el-menu
      default-active="1-1"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="fa fa-truck" aria-hidden="true"></i>
          <span>货品管理</span>
        </template>
        <router-link :to="{ name: 's_goods'}">
          <el-menu-item  index="1-1">销售订单管理</el-menu-item></router-link>
            <router-link :to="{ name: 'a_goods'}">
          <el-menu-item index="1-2">进货订单管理</el-menu-item></router-link>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">盘点</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="fa fa-users" aria-hidden="true"></i>
        <span slot="title">客户管理</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="fa fa-money" aria-hidden="true"></i>
        <span slot="title">财务管理</span>
      </el-menu-item>
      <el-menu-item index="5">
       <i class="fa fa-cart-arrow-down" aria-hidden="true"></i>
        <span slot="title">库存查询</span>
      </el-menu-item>
      <el-menu-item index="6">
       <i class="fa fa-diamond" aria-hidden="true"></i>
        <span slot="title">产品管理</span>
      </el-menu-item>
      <el-menu-item index="7">
      <i class="fa fa-address-book" aria-hidden="true"></i>
        <span slot="title">供应商查询</span>
      </el-menu-item>
      <el-submenu index="8">
        <template slot="title">
          <i class="fa fa-bookmark-o" aria-hidden="true"></i>
          <span>资料管理</span>
        </template>
          <el-menu-item index="8-1">员工管理</el-menu-item>
          <el-menu-item index="8-2">仓库管理</el-menu-item>
          <el-menu-item index="8-3">用户组管理</el-menu-item>
      </el-submenu>
      <el-submenu index="9">
        <template slot="title">
          <i class="fa fa-cog" aria-hidden="true"></i>
          <span>系统设置</span>
        </template>
         <router-link :to="{ name: 'bei'}">
          <el-menu-item index="9-1">数据库备份</el-menu-item></router-link>
            <router-link :to="{ name: 'repassword'}">
          <el-menu-item index="9-2">密码修改</el-menu-item></router-link>
          <el-menu-item index="9-3">日志</el-menu-item>
      </el-submenu>
      <el-menu-item index="10"  @click="out">
      <i class="fa fa-sign-out" aria-hidden="true"></i>
        <span slot="title" >退出</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
  
  <router-view></router-view>
</el-container>
</el-container>
</template>

<script>
export default {
  name: 'mainobject',
  data () {
    return {
    }
  },
  mounted(){


  },
  methods:{
    out(){
      sessionStorage.removeItem("token");
      this.$router.push({ name: 'login'})
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
    height: 20%;
  }
  
  .el-aside {
    color: #333;
  }
  .all{
    width: 100%;
    height: 100%;
  }
  .el-menu-item,.el-submenu{
    text-align:left;
  }
</style>
