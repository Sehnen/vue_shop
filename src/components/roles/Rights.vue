<template>
<div>
<!--  面包屑-->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>权限列表</el-breadcrumb-item>
  </el-breadcrumb>
<!--  表格-->
<el-card>
  <el-table
      :data="rightsList"
      border
      stripe>
    <el-table-column label="id" prop="id"></el-table-column>
    <el-table-column label="authName" prop="authName"></el-table-column>
    <el-table-column label="path" prop="path"></el-table-column>
    <el-table-column label="pid" prop="pid"></el-table-column>
    <el-table-column label="level" prop="level">
      <template v-slot:default="scope">
        <el-tag v-if="scope.row.level==='0'" >等级一</el-tag>
        <el-tag v-else-if="scope.row.level==='1'" type="success">等级二</el-tag>
        <el-tag type="warning"  v-else>等级三</el-tag>
      </template>

    </el-table-column>
  </el-table>
</el-card>
</div>
</template>

<script>
export default {
  name: "rights",
  data(){
    return{
      rightsList:[]

    }
  },
  created() {
    this.getUserList()
  },
  methods:{
   async   getUserList(){
     const {data:res}=await this.$http.get("rights/list")
     if(res.meta.status!=200){return this.$message.error("获取权限列表失败")}
     this.rightsList=res.data

    }
  }
}
</script>

<style scoped>


</style>