<template>
    <div class="role-manage">
      <main>
        <header>
          <h2>角色管理</h2>
          <el-button type="primary" @click="dialogInfo = true">新增角色</el-button>
        </header>
        <!-- 角色管理表格 -->
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="date" label="角色名称"></el-table-column>
          <el-table-column prop="name" label="角色拥有者"></el-table-column>
          <el-table-column prop="address" label="权限情况"></el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="">
              <el-button
                size="mini"
                type="text"
                @click="dialogInfoView = true">详情</el-button>
              <el-button
                size="mini"
                type="text"
                @click="dialogInfoEdit = true">编辑</el-button>
              <el-button
                size="mini"
                type="text"
                @click="deleteItem">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>

        <!-- 新增角色弹窗 -->
        <DialogInfo :flag.sync="dialogInfo" title="新增角色" :authorities="authorities"/>
        <!-- 编辑角色弹窗 -->
        <DialogInfoEdit :flag.sync="dialogInfoEdit" title="编辑角色" :authorities="authorities"/>
        <!-- 查看角色弹窗 -->
        <DialogInfoView :flag.sync="dialogInfoView" title="角色详情"/>
      </main>
    </div>
</template>

<script>
import DialogInfo from '@/components/DialogInfo.vue';
import DialogInfoEdit from '@/components/DialogInfoEdit.vue';
import DialogInfoView from '@/components/DialogInfoView.vue';
import { roleList, authorityList } from '@/api/role';

export default {
  name: 'RoleManage',
  components: {
    DialogInfo,
    DialogInfoEdit,
    DialogInfoView,
  },
  mounted() {
    this.getRoleList();
    this.getAuthorityList();
  },
  data() {
    return {
      // 新增角色数据
      title: '新增角色',
      authorities: [],
      // 角色管理表格数据
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎11111111111111111111111111111111111111111111111111111111111111',
          address: '上海市普陀区金沙江路 1519 弄',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        },
      ],
      dialogInfo: false,
      dialogInfoEdit: false,
      dialogInfoView: false,
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },

    // 获取角色列表
    getRoleList() {
      roleList().then((response) => {
        console.log(response);
      }).catch((err) => err);
    },

    // 获取权限列表
    getAuthorityList() {
      authorityList().then((response) => {
        this.authorities = response;
      }).catch((err) => err);
    },
    deleteItem() {
      this.$confirm('是否确认删除该信息', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info',
        center: true,
      }).then(() => {
        // 删除的方法
        this.$message({
          type: 'success',
          message: '删除成功!',
        });
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除',
        // });
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

// element-ui样式改变
// .el-select {
//   display: block;
// }

.el-pagination {
  float: right;
}
</style>
