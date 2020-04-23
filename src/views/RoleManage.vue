<template>
    <div class="role-manage">
      <main>
        <header>
          <h2 class="fontColor">角色管理</h2>
          <el-button type="primary" @click="dialogInfo = true">新增角色</el-button>
        </header>
        <!-- 角色管理表格 -->
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          :default-sort = "{prop: 'nameZh', order: 'descending'}"
          :header-cell-style="{background: '#e3ecf7', color: '#9c9c9c', fontWeight: '550'}">
          <el-table-column prop="nameZh" label="角色名称"
            :resizable="false" align="center" width="180"></el-table-column>
          <el-table-column label="权限情况" :resizable="false" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-for="auth in scope.row.roleAuthorities" :key="auth.id">
                {{auth.authorityInfo.nameZh}}、
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180" :resizable="false">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="roleDetails(scope.row)">详情</el-button>
              <el-button
                size="mini"
                type="text"
                @click="roleEdit(scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="text"
                @click="deleteItem(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
          :page-sizes="[10, 20, 50]"
          layout="total, sizes, prev, pager, next"
          :total="count">
        </el-pagination>

        <!-- 新增角色弹窗 -->
        <DialogNewRole :flag.sync="dialogInfo" title="新增角色" :authorities="authorities"/>
        <!-- 编辑角色弹窗 -->
        <DialogInfoEdit :flag.sync="dialogInfoEdit" title="编辑角色"
          :authoritiy="authorities" :roleData="roleData"/>
        <!-- 查看角色弹窗 -->
        <DialogInfoView :flag.sync="dialogInfoView" title="角色详情" :roleData="roleData"/>
      </main>
    </div>
</template>

<script>
import DialogNewRole from '@/components/DialogNewRole.vue';
import DialogInfoEdit from '@/components/DialogInfoEdit.vue';
import DialogInfoView from '@/components/DialogInfoView.vue';
import { roleList, authorityList, deleteRole } from '@/api/role';

export default {
  name: 'RoleManage',
  components: {
    DialogNewRole,
    DialogInfoEdit,
    DialogInfoView,
  },
  mounted() {
    this.getRoleList();
    this.getAuthorityList();
  },
  data() {
    return {
      // 所有权限
      authorities: [],
      // 角色管理表格数据
      tableData: [],
      roleData: {},
      // 分页
      count: 0,
      pageSize: 10,
      pageNumber: 1,

      // 弹窗控制
      dialogInfo: false,
      dialogInfoEdit: false,
      dialogInfoView: false,
    };
  },
  methods: {
    // 每页显示条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getRoleList();
    },

    // 当前页
    handleCurrentChange(val) {
      this.pageNumber = val;
      this.getRoleList();
    },

    // 获取角色列表
    getRoleList() {
      const data = {
        currentPage: this.pageNumber,
        pageSize: this.pageSize,
      };
      roleList(data).then((response) => {
        // console.log(response);
        this.tableData = response.rows;
        // 绑定页面数据
        this.count = response.count;
      }).catch((err) => err);
    },

    // 获取权限列表
    getAuthorityList() {
      authorityList().then((response) => {
        this.authorities = response;
      }).catch((err) => err);
    },

    // 查看角色详情
    roleDetails(data) {
      this.dialogInfoView = true;
      this.roleData = data;
    },

    // 编辑角色
    roleEdit(data) {
      this.dialogInfoEdit = true;
      this.roleData = data;
    },

    // 删除
    deleteItem(data) {
      console.log(data);
      this.$confirm(`确认要删除角色:${data.name}嘛?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true,
      }).then(() => {
        const name = {
          roleName: data.name,
        };
        // console.log(name);
        deleteRole(name).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
          this.getRoleList();
        }).catch((err) => {
          this.$message({
            type: 'error',
            message: err,
          });
        });
      }).catch(() => {
      });
    },
  },
};
</script>

<style lang="less" scoped>
.role-manage {
    > main {
      padding: 10px;
        > header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 40px;
          padding: 10px 20px 10px 0px;
        }
    }
}

.fontColor {
  color: #7c7d7e;
}

// element-ui样式改变
.el-pagination {
  float: right;
}
</style>
