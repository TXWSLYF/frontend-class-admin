<template>
    <div class="authority-manage">
      <div class="authority-manage_title">
      <span>项目权限管理</span>
      <el-button class="authority-manage_button"
      @click="showAddManagerDialog"
      type="primary">
      新增管理员
      </el-button>
    </div>
    <div class="authority-manage_search">
      <!-- 搜索姓名 -->
      <div>
        <el-input
          placeholder="昵称"
          class="name_search"
          @change="handleName"
          v-model="inputName">
           <i slot="suffix" class="el-input__icon el-icon-search pointer" @click="handleName"></i>
        </el-input>
        <span class="role">管理员角色</span>
        <el-select v-model="selectRoles"
          class="roles_search"
          @change="handleRoles"
           multiple placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.nameZh"
              :value="item.name">
            </el-option>
        </el-select>
      </div>
        <div>
          <el-button
            class="authority-manage_button"
            type="primary"
            @click="handleRoles">查询</el-button>
          <el-button
            class="authority-manage_button"
            type="primary"
            @click="resetTableList">重置</el-button>
        </div>
    </div>
    <!-- 数据表单 -->
    <div class="authority-manage_item">
      <el-table
        :header-cell-style="{padding:'4px',background:'#E3ECF7'}"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="管理员姓名"
          width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="管理员角色"
          width="300">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.userRoles[0].roleInfo.nameZh }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="权限情况"
          width="500">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.userRoles[0].roleInfo.desc }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
            @click="showDetailRightDialog(scope.row)"
            type="text" size="small">详情</el-button>
              <el-button
              @click="showEditRightDialog(scope.row)"
              type="text" size="small"
              >编辑</el-button>
                <el-button
                @click="showDeleteRightDialog(scope.row)"
                type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增管理员对话框 -->
    <div class="ManageDialog">
       <el-dialog
       title="新增管理员"
       center
      :visible.sync="addManagerDialogVisible"
       width="50%">
       <el-form :model="addForm"  ref="addFormRef" label-width="100px">
        <el-form-item label="管理员姓名">
          <el-input v-model="addForm.name" placeholder="请输入姓名" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="管理员角色">
          <el-select v-model="addForm.role" style="width:400px"
           multiple placeholder="请选择">
            <el-option
              v-for="item in options"
                :key="item.id"
                :label="item.nameZh"
                :value="item.name">
            </el-option>
        </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addManagerDialogVisible = false">取 消</el-button>
        <el-button @click="addManager" type="primary" >确 定</el-button>
      </span>
    </el-dialog>
    </div>
    <!-- 管理员详情 -->
    <el-dialog title="管理员详情" center
      :visible.sync="DetailRightDialogVisible"
      width="50%">
      <el-form :model="Detail" ref="editFormRef" label-width="100px">
          <el-form-item label="管理员姓名">
            <el-input v-model="Detail.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="管理员角色">
            <el-input v-model="Detail.roleZh" disabled></el-input>
          </el-form-item>
          <el-form-item label="权限详情">
            <el-input v-model="Detail.right" disabled></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="DetailRightDialogVisible = false" type="primary">确 定</el-button>
        </span>
    </el-dialog>
    <!-- 编辑 -->
    <div class="EditManageDialog">
       <el-dialog
       title="编辑管理员"
       center
      :visible.sync="EditDialogVisible"
       width="50%">
       <el-form :model="Detail"  ref="editFormRef" label-width="100px">
          <el-form-item label="管理员姓名">
            <el-input v-model="Detail.name" disabled></el-input>
          </el-form-item>
        <el-form-item label="管理员角色">
          <el-select v-model="changeRoles"
            style="width:400px"
            multiple placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.nameZh"
                :value="item.name">
              </el-option>
        </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="EditDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeMangerRoles(Detail.name)" >确 定</el-button>
      </span>
    </el-dialog>
    </div>
    <!-- 删除 -->
    <el-dialog
      title="提示"
      :visible.sync="deleteDialogVisible"
      width="30%"
      center>
      <span>确认要删除管理员{{ managerName }}的信息吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteManager(managerName)">确 定</el-button>
      </span>
    </el-dialog>
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
import { getOneAuthorityList, getRoleList } from '@/api/manage';

export default {
  name: 'AuthorityManage',
  data() {
    return {
      inputName: '',
      selectRoles: [],
      changeRoles: [],
      managerName: '',
      total: 20,
      page: 1,
      pageSize: 10,
      addManagerDialogVisible: false,
      DetailRightDialogVisible: false,
      EditDialogVisible: false,
      deleteDialogVisible: false,
      addForm: {
        name: '',
        role: '',
      },
      Detail: {
        name: '',
        roleZh: '',
        role: '',
        right: '',
      },
      tableData: [],
      options: [],
    };
  },
  created() {
    this.getRoleOptions();
    this.getTableList();
  },
  methods: {
    // 获得角色列表
    async getRoleOptions() {
      console.log('aaa');
      this.options = await getRoleList();
      console.log(this.options);
    },
    // 根据姓名搜索
    handleName() {
      console.log(this.inputName);
      // 重新获取列表数据
      this.getTableList();
    },
    // 根据角色搜索
    handleRoles() {
      console.log(this.selectRoles);
      // 重新获取列表数据
      this.getTableList();
    },
    // 重置页面
    resetTableList() {
      this.inputName = '';
      this.selectRoles = '';
      this.page = 1;
      this.pageSize = 10;
      // 重新获取列表数据
      this.getTableList();
    },
    // 保存单独管理员的数据
    setDetail(data) {
      this.Detail.name = data.name;
      this.Detail.roleZh = data.userRoles[0].roleInfo.nameZh;
      this.Detail.role = data.userRoles[0].roleInfo.name;
      this.Detail.right = data.userRoles[0].roleInfo.desc;
    },
    // 详情对话框
    showDetailRightDialog(data1) {
      this.setDetail(data1);
      // this.Detail = data;
      console.log(this.Detail);
      this.DetailRightDialogVisible = true;
    },
    // 编辑对话框
    showEditRightDialog(row) {
      this.setDetail(row);
      this.changeRoles = [this.Detail.role];
      this.EditDialogVisible = true;
    },
    // 删除对话框
    showDeleteRightDialog(val) {
      console.log(val);
      this.managerName = val.name;
      this.deleteDialogVisible = true;
    },
    // 添加管理员对话框
    showAddManagerDialog() {
      this.addManagerDialogVisible = true;
    },
    // 改变管理员角色
    changeMangerRoles(name) {
      console.log(name);
      console.log(this.changeRoles);
      this.EditDialogVisible = false;
      // 重新获取列表数据
      this.getTableList();
    },
    // 删除管理员
    deleteManager(name) {
      console.log(name);
      this.deleteDialogVisible = false;
      // 重新获取列表数据
      this.getTableList();
    },
    // 添加管理员
    addManager() {
      console.log(this.addForm);
      this.addManagerDialogVisible = false;
      // 重新获取列表数据
      this.getTableList();
    },
    showRoles() {
      console.log(this.selectRoles);
    },
    // 获取tabledata
    async getTableList() {
      const param = {
        currentPage: this.page,
        pageSize: this.pageSize,
        nickname: this.inputName,
        roleNames: this.selectRoles,
      };
      const {
        currentPage, pageSize, nickname, roleNames,
      } = param;
      const res = await getOneAuthorityList({
        currentPage, pageSize, nickname, roleNames,
      });
      this.tableData = res.rows;
      console.log(res.rows);
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
