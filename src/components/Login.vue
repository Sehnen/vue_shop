<template>
<div class="login_container">

  <div class="login_box">
    <!--  头像区-->
    <div class="avatar_box">
      <img src="../assets/logo.png" alt="">
    </div>
<!--    登录表单区-->
<!--    ref="loginFormRef" 代表表单这个对象-->
    <el-form  ref="loginFormRef" :model="loginForm" :rules="rules" label-width="0px" class="login_form">
<!--      用户名-->
      <el-form-item label="" prop="username">
        <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
<!--        密码-->
      </el-form-item>
      <el-form-item label="" prop="password">
        <el-input v-model="loginForm.password" type="password" prefix-icon="iconfont icon-3702mima"></el-input>
      </el-form-item>
<!--      按钮区域-->
      <el-form-item label="" class="btns">
        <el-button type="primary" @click="login">登录</el-button>
        <el-button type="info" @click="resetLoginForm">重置</el-button>
      </el-form-item>
      </el-form>

  </div>

</div>
</template>

<script>
export default {
  name: "Login",
  data(){
    return {
      //表单数据的绑定对象
      loginForm:{
        username:'admin',
        password:'123456'

      },
      rules:{
        username:[
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }

        ]
      }

    }
  },
  methods:{
    resetLoginForm(){
      //resetFields()重置表单的方法
      this.$refs.loginFormRef.resetFields();
    },
    login(){
      //
      this.$refs.loginFormRef.validate(async  valid=>{
        if(!valid) return;
        const {data:res}=await this.$http.post('login',this.loginForm);
        if(res.meta.status!==200) return this.$message.error("登录失败！");
        this.$message.success("登录成功")
        //保存token值
        window.sessionStorage.setItem("token",res.data.token);
        this.$router.push("/home");

      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container{
  background-color: #2b4b6b;
  height: 100%;

}
.login_box{
  width: 450px;
  height: 300px;
  background-color: #fff;
  //圆角
 border-radius: 3px;
//  绝对定位
  position: absolute;
  left: 50%;
  top: 50%;

  transform: translate(-50%,-50%);
  .avatar_box{

    height: 130px;
    width: 130px;
    border: 1px solid #eee;

    // x偏移量 | y偏移量 | 阴影模糊半径 | 阴影颜色
     box-shadow: 10px 5px 5px black;
    border-radius: 50%;
    padding: 10px;
    //阴影
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    //translate(-50%,-50%) 作用是，往上（x轴）,左（y轴）移动自身长宽的 50%，以使其居于中心位置。
    transform: translate(-50%,-50%);
    background-color: #fff;
    img{
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee ;
    }
  }
}
.login_form{
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;

}
.btns{
  display: flex;
  justify-content: flex-end;


}
</style>