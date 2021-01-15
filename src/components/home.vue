<template>


  <el-container class="home_container">
<!--    头部-->
    <el-header>Header<el-button type="info" @click="logout">退出</el-button></el-header>

    <el-container>
<!--      侧边栏-->
      <el-aside width="200px">Aside</el-aside>
<!--      主体-->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "home",
  methods:{
    logout(){
      window.sessionStorage.removeItem('token')
          this.$router.push('login')
    }
  }
}
</script>

<style lang="less" scoped>
.home_container{
  height: 100%;
}
.el-header{
  background-color: #373d41;

}
.el-aside{
  background-color: #333744;
}
.el-main{
  background-color: #eaedf1;

}
</style>