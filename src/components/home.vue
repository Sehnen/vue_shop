<template>


  <el-container class="home_container">
<!--    头部-->
    <el-header>
      <div>

        <img src="../assets/logo.png">
        <span>图书后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button></el-header>

    <el-container>
<!--      侧边栏-->
      <el-aside :width="isCollapse? '64px':'200px'">
        <div class="toggle-button" @click="toggleCollapse">
          |||
        </div>
        <el-menu
            background-color="#333744"
            text-color="#fff"
            active-text-color="#409eff"
            unique-opened
            :collapse="isCollapse"
            :collapse-transition="false"
            :default-active="activePath"
            router
        >

<!--        一级菜单栏，并且可以展开-->
          <el-submenu :index="item.id+''" v-for="item in menuList" :key="item.id">

            <template slot="title">
              <i :class="iconsObj[item.id]"></i>
              <span>{{item.authName }}</span>
            </template>

          <!--二级菜单-->
              <el-menu-item :index="'/'+children.path" v-for="children in item.children" :key="children.id"
               @click="saveNavState('/'+children.path)">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>{{children.authName}}</span>
                </template>
              </el-menu-item>
          </el-submenu>
        </el-menu>

      </el-aside>
<!--      主体-->
      <el-main>
<!--        路由占位符-->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data(){
    return {
      menuList:[],
      iconsObj:{
        '125':'iconfont icon-users',
        '103':'iconfont icon-tijikongjian',
        '101':'iconfont icon-shangpin',
        '102':'iconfont icon-danju',
        '145':'iconfont icon-baobiao',

      },
      isCollapse:false,
      activePath:''
    }
  },
  created() {
    this.getMenuList(),
        this.activePath=window.sessionStorage.getItem("activePath")
  },
  name: "home",
  methods:{
    logout(){
      window.sessionStorage.removeItem('token')
          this.$router.push('login')
    },
    //获取所有菜单
    async getMenuList(){
      const {data:res}=await this.$http.get('menus')
      if(res.meta.status!==200) return this.$message.error(res.meta.msg)
      this.menuList=res.data

    },
    toggleCollapse(){
      this.isCollapse=!this.isCollapse;
    },
    saveNavState(activePath){
      window.sessionStorage.setItem('activePath',activePath)
      this.activePath=activePath

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
  .el-menu{
    border-right: none;
  }
}
.el-main{
  background-color: #eaedf1;

}
.el-header{
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  >div{
    display: flex;
    align-items: center;
  }
  img{
    margin-left: 10px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #eee ;
    align-items: center;

  }
  span{
    margin-left: 15px;
  }
}
.iconfont {
  margin-right: 10px;
}
.toggle-button{
  background-color: #4a5064;
  font-size: 10px;
  color: #fff;
  //按钮的高度
  line-height: 20px;
  //文本居中
  text-align: center;
  letter-spacing: 0.2em;
  //可以变成手的形状
  cursor: pointer;
}

</style>