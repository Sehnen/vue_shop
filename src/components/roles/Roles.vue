<template>
  <div>
    <!--  面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
<!--    卡片-->
    <el-card>
      <el-table
      :data="rolesList"
      border
      stripe
      >
        <el-table-column  type="expand">
          <template v-slot:default="scope">
           <el-row v-for="(item1,i1) in scope.row.children" :key="item1.id" :class="['bdbottom',i1===0?'bdtop':'','vcenter']">
             <el-col :span="5">
               <el-tag closable @close="removeRightById(scope.row,item1.id)">{{item1.authName}}</el-tag>
               <i class="el-icon-caret-right"></i>
             </el-col>
             <el-col :span="19">
             <el-row :class="[i2===0?'':'bdtop','vcenter']" v-for="(item2,i2) in item1.children" :key="item2.id">
               <el-col :span="6">
                 <el-tag type="sucess" closable  @close="removeRightById(scope.row,item2.id)">{{item2.authName}}</el-tag>
                 <i class="el-icon-caret-right"></i>
               </el-col>
               <el-col :span="18">
                 <el-tag  @close="removeRightById(scope.row,item3.id)" type="warning" v-for="(item3) in item2.children" :key="item3.id" closable>{{item3.authName}} </el-tag>
               </el-col>
             </el-row>
             </el-col>

           </el-row>

          </template>
        </el-table-column>
        <el-table-column  type="index"></el-table-column>
'        <el-table-column label="roleName" prop="roleName"></el-table-column>
        <el-table-column label="roleDesc" prop="roleDesc"></el-table-column>
        <el-table-column label="operation"  width="300px">
          <template v-slot:default="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
            <el-button type="danger" icon="el-icon-search" size="mini">删除</el-button>
            <el-button type="warning" icon="el-icon-setting" size="mini" @click="showRightDialogVisible(scope.row)">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>

<!--      对话框-->
      <el-dialog
          title="提示"
          :visible.sync="rightDialogVisible"
          width="30%"
          @close="setDialogClosed">
        <el-tree :data="rightsList" :props="defaultProps" :default-checked-keys="selectKeys"  show-checkbox node-key="id" default-expand-all></el-tree>
        <span slot="footer" class="dialog-footer">
    <el-button @click="rightDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="rightDialogVisible= false">确 定</el-button>
  </span>
      </el-dialog>
    </el-card>

  </div>
</template>

<script>
export default {
  name: "Roles",
  data (){
    return{
      rolesList:[],
      rightsList:[],
      rightDialogVisible:false,
      defaultProps:{
        label:'authName',
        children:'children'
      },
      selectKeys:[]
    }
  },
  created() {
    this.getRolesList()
  },
  methods:{
   async  getRolesList(){
    const {data:res}=await this.$http.get("roles")
    if(res.meta.status!==200) this.$message.error("获取角色列表失败")
    this.rolesList=res.data
    },
    async removeRightById(scopeInfo,id){
      this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async  () => {
        const {data:res}=await  this.$http.delete(`roles/${scopeInfo.id}/rights/${id}`)
        if(res.meta.status!==200) this.$message.error("删除失败")
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        scopeInfo.children=res.data
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    async showRightDialogVisible(role){
      const {data:res}=await this.$http.get("rights/tree")
      if(res.meta.status!=200){return this.$message.error("获取权限列表失败")}
      this.rightsList=res.data
      this.getLeafNode(role,this.selectKeys)
      this.rightDialogVisible=true
    },
  //  递归获取三级
    getLeafNode(item,arr){
     if(!item.children){
       return arr.push(item.id)
     }
     item.children.forEach(item1=>{
       this.getLeafNode(item1,arr)
     })
    },
  //  清空分配权限
    setDialogClosed(){
     this.rightsList=[]
    }
  }

}
</script>

<style lang="less" scoped>
.el-tag{
  margin: 7px;

}
.bdtop{
  border-top: 1px solid #eee;
}
.bdbottom{
  border-bottom: 1px solid #eee;
}
.vcenter{
  display: flex;
  align-items: center;
}
</style>