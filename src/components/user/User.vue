<template>
<div>
<!--  面包屑-->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home/users' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>

  </el-breadcrumb>
  <el-card class="box-card">
<!--    分隔间栏-->
<!--    输入框-->
    <el-row :gutter="20">
      <el-col :span="7">
        <el-input placeholder="请输入内容"  v-model="queryInfo.query" clearable @clear="getUserList">
          <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="addDialogVisible=true">添加用户</el-button>

      </el-col>

    </el-row>
<!--表格 -->
    <el-table

        border
        stripe
        :data="userlist"
        style="width: 100%">
      <el-table-column type="index">

      </el-table-column>
      <el-table-column
          prop="username"
          label="用户名"
          width="180">
      </el-table-column>
      <el-table-column
          prop="role_name"
          label="角色"
          width="180">
      </el-table-column>
      <el-table-column
          prop="mobile"
          label="电话">
      </el-table-column>
      <el-table-column
          prop="email"
          label="邮箱">
      </el-table-column>
      <el-table-column
          prop="mg_state"
          label="状态">
        <template v-slot:default="scope">
          <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              @change="userStateChanged(scope.row)"
              inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
          width="180px"
           label="操作">
        <template v-slot:default="scope">
<!--        编辑按钮-->
        <el-tooltip class="item" effect="dark" content="编辑角色" placement="top" :enterable="false">
        <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
       </el-tooltip>
<!--        删除按钮-->
        <el-tooltip class="item" effect="dark" content="删除角色" placement="top" :enterable="false">
        <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.id)"></el-button>
        </el-tooltip>
<!--        修改权限-->
        <el-tooltip class="item" effect="dark" content="分配角色" placement="top" :enterable="false">
        <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
          </el-tooltip>
          </template>
      </el-table-column>
    </el-table>
<!--    分页条-->

      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[1, 2, 4, 8]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>

    <!--          添加用户的对话框-->
    <el-dialog
        title="添加用户"
        :visible.sync="addDialogVisible"
        width="30%"
        @close="addDialogClosed"
        center>
<!--      表单-->
      <el-form ref="addFormRef"  label-width="80px" :model="addForm" :rules="addFormRules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="addDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
  </span>
    </el-dialog>
<!--    编辑对话框-->
    <el-dialog
        title="添加用户"
        :visible.sync="editDialogVisible"
        width="30%"
        center>
      <!--  修改表单-->
      <el-form ref="editFormRef"  label-width="80px" :model="editForm" :rules="editFormRules">
        <el-form-item label="用户名" >
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editUser(editForm)">确 定</el-button>
  </span>
    </el-dialog>


  </el-card>
</div>
</template>

<script>
export default {
  name: "User",
  data() {
    //自定义验证规则
    var  checkEmail = (rule, value, callback) => {
     const  regEmail=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if(regEmail.test(value)){
      //  合法的邮箱
        return callback()
      }
      return callback(new Error('请输入合法的邮箱'))
      };
    var  checkMobile = (rule, value, callback) => {
      const  regPhone=/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if(regPhone.test(value)){
        //  合法的邮箱
        return callback()
      }
      return callback(new Error('请输入合法的手机号'))
    }

    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      userlist: [],
      total: 0,
      addDialogVisible:false,

      editDialogVisible:false,
    //  添加用户的表单数据
      addForm:{
        username:'',
        password:'',
        email:'',
        mobile:''
      },
      //修改用户的表单数据
      editForm:{
      },
      //修改用户表单验证
      editFormRules:{
        email:[
          {required:true,message:'请输入邮箱',trigger:'blur'},
          {validator:checkEmail,trigger: 'blur'}

        ],
       mobile:[
          {required:true,message:'请输入手机号',trigger:'blur'},
          {validator:checkMobile,trigger: 'blur'}

        ]

      },
      //添加用户表单验证
      addFormRules:{
        username:[
          {required:true,message:'请输入用户名',trigger:'blur'},
          {min:3,max:10,message: '用户名的长度在3到10个字符之间',trigger: 'blur'}
        ],
       password:[
          {required:true,message:'请输入用户名',trigger:'blur'},
          {min:3,max:15,message: '用户名的长度在3到10个字符之间',trigger: 'blur'}
        ],
       email:[
          {required:true,message:'请输入用户名',trigger:'blur'},
         {validator:checkEmail,trigger: 'blur'}

        ],
       mobile:[
          {required:true,message:'请输入用户名',trigger:'blur'},
         {validator:checkMobile,trigger: 'blur'}

          ],


      }

    }

  },
  created() {
    //刷新用户列表
    this.getUserList()
  },
  methods: {
    async getUserList() {
      const {data: res} = await this.$http.get('users', {params: this.queryInfo})
      if (res.meta.status !== 200) return this.$message.error("获取用户列表失败")
      this.userlist=res.data.users
      this.total=res.data.total
    },
    handleSizeChange(newSize){
      this.queryInfo.pagesize=newSize;
      this.getUserList();
    },
    handleCurrentChange(newSize){
      this.queryInfo.pagenum=newSize;
      this.getUserList();
    },
  // 监听状态的改变
    async  userStateChanged(userInfo){
      const {data:res}= await  this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)
      if(res.meta.status!==200) {
        userInfo.mg_state=!userInfo.mg_state
        return this.$message.error("设置状态失败")
      }
      return this.$message.success("更新状态成功")
    },
  //  监听添加用户对话框的关闭事件
    addDialogClosed(){
      this.$refs.addFormRef.resetFields()
      },
     addUser(){
      this.$refs.addFormRef.validate( async value=>{
        if(!value) return
       const {data: res}=await  this.$http.post("users",this.addForm);
        if(res.meta.status!==201)  this.$message.error("添加用户失败")
        this.$message.success("用户添加成功")
        this.addDialogVisible=false
        this.getUserList()
      })
    },
  // 显示编辑用户对话框
   async  showEditDialog(id){
    const {data:res}  =await  this.$http.get("users/"+id)
     if(res.meta.status!=200) return this.$message.error("查询用户失败")
     this.editForm=res.data

     console.log(this.editForm)
     this.editDialogVisible=true
    },
  //  编辑用户
 editUser(editForm){
      this.$refs.editFormRef.validate(  async value=>{
        if(!value) return
        const {data:res}  =await  this.$http.put("users/"+editForm.id,{
          email:editForm.email,mobile:editForm.mobile
        })
        if(res.meta.status!=200) return this.$message.error("用户更新失败")
        this.getUserList()
        this.editDialogVisible=false;
        this.$message.success("用户更新成功")
      })
    },
    //确认框
     removeUserById(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async  () => {
       const {data:res}=await  this.$http.delete("users/"+id)
        if(res.meta.status!==200) this.$message.error("删除失败")
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.getUserList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }

  }
}
</script>

<style lang="less" scoped>


</style>