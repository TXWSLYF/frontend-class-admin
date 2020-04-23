<template>
    <div class="role-manage">
      <div class="authority-manage_title">
      <span>角色管理页面</span>
      <el-button class="authority-manage_button"
      @click="showAddRoleDialog"
      type="primary">
      新增角色
      </el-button>
    </div>
    <!-- 数据表单 -->
    <div class="authority-manage_item">
      <el-table
        :header-cell-style="{padding:'4px',background:'#E3ECF7'}"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="角色名称"
          width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.nameZh }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="权限情况"
          :show-overflow-tooltip='true'
          width="700">
          <template slot-scope="scope">
            <span v-for="(item1, index) in scope.row.roleAuthorities" :key="index">
            <span style="margin-left: 0px">{{ item1.authorityInfo.nameZh }} </span>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
            @click="showDetailRoleDialog(scope.row)"
            type="text" size="small">详情</el-button>
              <el-button
              @click="showEditRoleDialog(scope.row)"
              type="text" size="small"
              >编辑</el-button>
                <el-button
                @click="showDeleteRightDialog(scope.row)"
                type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加角色 -->
    <AddRoleDialog
    :flag.sync="addRoleDialogVisible"
      v-on:edit="addNewRoles"
      :addForm="addForm"
      :options="options"
      @close="clearDetail"></AddRoleDialog>
    <!-- 角色详情 -->
    <DetailRoleDialog
      :flag.sync="detailRoleDialogVisible"
      :value="detail" @close="clearDetail"></DetailRoleDialog>
    <!-- 编辑角色 -->
    <EditRoleDialog
      :flag.sync="editDialogVisible"
      v-on:edit="changeRolesRight"
      :value="detail"
      :changeRight="changeRight"
      :options="options"
      @close="clearDetail"
    ></EditRoleDialog>
    <!-- 删除 -->
    <DeleteRoleDialog
      :flag.sync="deleteDialogVisible"
      v-on:delete="deleteRole"
      :value="detail"
      @close="clearDetail"></DeleteRoleDialog>
    <!-- 分页  -->
    <!-- 分页器
      total 总条数
      current-page 当前页
      page-size 每页多少条数据
      current-change 页码改变事件
     -->
    <el-pagination
      @current-change="handleCurrentChange"
      background
      class="pagination"
      layout="prev, pager, next"
      :total="total"
      :current-page="page"
      :page-size="pageSize"
    ></el-pagination>
  </div>
</template>

<script>
import DeleteRoleDialog from '@/components/DeleteRoleDialog.vue';
import AddRoleDialog from '@/components/AddRoleDialog.vue';
import DetailRoleDialog from '@/components/DetailRoleDialog.vue';
import EditRoleDialog from '@/components/EditRoleDialog.vue';
import {
  getOneRoleList, changeRoleAuthority, deleteRole, getAuthorityList, addNewRole,
} from '@/api/role';

export default {
  name: 'RoleManage',
  components: {
    DeleteRoleDialog,
    AddRoleDialog,
    DetailRoleDialog,
    EditRoleDialog,
  },
  data() {
    return {
      addForm: {
        name: '',
        nameZh: '',
        desc: '',
        authorities: [],
      },
      inputName: '',
      selectRoles: [],
      changeRight: [],
      managerName: '',
      total: 20,
      page: 1,
      pageSize: 10,
      addRoleDialogVisible: false,
      detailRoleDialogVisible: false,
      editDialogVisible: false,
      deleteDialogVisible: false,
      detail: {
        name: '',
        nameZh: '',
        rightZh: '',
        right: [],
      },
      tableData: [],
      options: [],
    };
  },
  created() {
    this.getAuthorityOptions();
    this.getTableList();
  },
  methods: {
    // 添加角色对话框
    showAddRoleDialog() {
      this.addRoleDialogVisible = true;
    },
    // 新增角色
    addNewRoles(param) {
      console.log('aaa');
      this.addRoleDialogVisible = false;
      const {
        name, nameZh, desc, authorities,
      } = param;
      addNewRole({
        name, nameZh, desc, authorities,
      }).then(() => {
        this.getTableList();
        this.$message.success('添加角色成功');
      });
      console.log();
    },
    // 获得角色列表
    async getAuthorityOptions() {
      console.log('aaa');
      this.options = await getAuthorityList();
      console.log(this.options);
    },
    // 保存单独角色的数据
    setDetail(data) {
      const rightZh = [];
      console.log(data);
      this.detail.nameZh = data.nameZh;
      this.detail.name = data.name;
      // 遍历角色的所有权限
      for (let i = 0; i < data.roleAuthorities.length; i += 1) {
        rightZh[i] = data.roleAuthorities[i].authorityInfo.nameZh;
        this.detail.right[i] = data.roleAuthorities[i].authorityInfo.name;
      }
      this.detail.rightZh = rightZh.toString();
      console.log(this.detail);
    },
    // 清空本条的detail数据
    clearDetail() {
      console.log('aaaaaaaa');
      this.detail.name = '';
      this.detail.nameZh = '';
      this.detail.rightZh = '';
      this.detail.right = [];
    },
    // 详情对话框
    showDetailRoleDialog(data1) {
      console.log(data1);
      this.setDetail(data1);
      this.detailRoleDialogVisible = true;
    },
    // 编辑对话框
    showEditRoleDialog(row) {
      this.setDetail(row);
      this.changeRight = this.detail.right;
      this.editDialogVisible = true;
    },
    // 删除对话框
    showDeleteRightDialog(val) {
      this.setDetail(val);
      this.deleteDialogVisible = true;
    },
    // 改变角色权限
    changeRolesRight(data) {
      console.log(data);
      this.editDialogVisible = false;
      // 发送修改管理员角色请求
      const roleName = this.detail.name;
      console.log(roleName);
      const authorityNames = data;
      // 更改并重新获取数据
      changeRoleAuthority({ roleName, authorityNames }).then(() => {
        this.getTableList();
        this.$message.success('编辑成功');
      });
    },
    // 删除角色
    deleteRole() {
      this.deleteDialogVisible = false;
      const roleName = this.detail.name;
      // 删除角色更改并重新获取数据
      deleteRole({ roleName }).then(() => {
        this.getTableList();
        this.$message.success('删除成功');
      });
    },
    // 获取tabledata
    async getTableList() {
      const param = {
        currentPage: this.page,
        pageSize: this.pageSize,
      };
      const {
        currentPage, pageSize,
      } = param;
      const res = await getOneRoleList({
        currentPage, pageSize,
      });
      console.log(res);
      this.tableData = res.rows;
      this.total = res.count;
      console.log(this.total);
    },
    // 页码改变事件
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      // 保存页码
      this.page = val;
      // 重新获取数据
      this.getTableList();
    },
  },
};
</script>

<style lang="less" scoped>
.authority-manage{
}
.authority-manage_title{
  margin: 5px 20px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.authority-manage_button{
  border-radius: 10px;
  margin: 5px 20px 5px;
}
.authority-manage_search{
  background-color: white;
  margin: 5px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.name_search{
  margin: 5px 20px;
  width: 100px;
}
.role{
  margin: 5px 0 5px 20px;
}
.roles_search{
  margin: 5px;
  width: 600px;
}
.pointer{
  cursor: pointer;
}
.pagination{
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
