<template>
<div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/users' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>

  </el-breadcrumb>
  <el-card class="box-card">
<!--    分隔间栏-->
    <el-row :gutter="20">
      <el-col :span="7">
        <el-input placeholder="请输入内容" >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary">添加用户</el-button>

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
              inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
          width="180px"
           label="操作">
<!--        编辑-->
        <el-tooltip class="item" effect="dark" content="编辑角色" placement="top" :enterable="false">
        <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
       </el-tooltip>
<!--        删除按钮-->
        <el-tooltip class="item" effect="dark" content="删除角色" placement="top" :enterable="false">
        <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
        </el-tooltip>
<!--        修改权限-->
        <el-tooltip class="item" effect="dark" content="分配角色" placement="top" :enterable="false">
        <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
          </el-tooltip>
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




  </el-card>
</div>
</template>

<script>
export default {
  name: "User",
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      userlist: [],
      total: 0

    }

  },
  created() {
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
    }
  }
}
</script>

<style lang="less" scoped>


</style>