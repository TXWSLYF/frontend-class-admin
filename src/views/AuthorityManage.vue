<template>
    <div class="authority-manage">
      <div class="authority-manage_title">
      <span>项目权限管理</span>
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
          label="管理员昵称"
          width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.nickname }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="管理员账号"
          width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="管理员角色"
          :show-overflow-tooltip='true'
          width="300">
          <template slot-scope="scope">
            <span v-for="(item1, index) in scope.row.userRoles" :key="index">
            <span style="margin-left: 0px">{{ item1.roleInfo.nameZh }} </span>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="权限情况"
          :show-overflow-tooltip='true'
          width="500">
          <template slot-scope="scope">
            <span v-for="(item1, index) in scope.row.userRoles" :key="index">
            <span v-for="(item2, index) in item1.roleInfo.roleAuthorities"
            :key="index">
            <span style="margin-left: 10px">{{ item2.authorityInfo.nameZh }}</span>
            </span>
            </span>
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
    <!-- 管理员详情 -->
    <DetailRightDialog
      :flag.sync="detailRightDialogVisible"
      :value="detail" @close="clearDetail"></DetailRightDialog>
    <!-- 编辑 -->
    <EditManageDialog
      :flag.sync="editDialogVisible"
      v-on:edit="changeMangerRoles"
      :value="detail"
      :changeRoles="changeRoles"
      :options="options"
      @close="clearDetail"
    ></EditManageDialog>
    <!-- 删除 -->
    <DeleteDialog
      :flag.sync="deleteDialogVisible"
      v-on:delete="deleteManager"
      :value="detail"
      @close="clearDetail"></DeleteDialog>
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
import DeleteDialog from '@/components/DeleteDialog.vue';
import DetailRightDialog from '@/components/DetailRightDialog.vue';
import EditManageDialog from '@/components/EditManageDialog.vue';
import {
  getOneAuthorityList, getRoleList, changeAuthorityRole,
} from '@/api/manage';

export default {
  name: 'AuthorityManage',
  components: {
    DeleteDialog,
    DetailRightDialog,
    EditManageDialog,
  },
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
      detailRightDialogVisible: false,
      editDialogVisible: false,
      deleteDialogVisible: false,
      detail: {
        name: '',
        roleZh: '',
        role: [],
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
      this.options = await getRoleList();
    },
    // 根据姓名搜索
    handleName() {
      // 重新获取列表数据
      this.getTableList();
    },
    // 根据角色搜索
    handleRoles() {
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
      let theRight = [];
      const roleZh = [];
      const allRight = [];
      this.detail.name = data.name;
      // 遍历管理员的所有角色
      for (let i = 0; i < data.userRoles.length; i += 1) {
        roleZh[i] = data.userRoles[i].roleInfo.nameZh;
        this.detail.role[i] = data.userRoles[i].roleInfo.name;
        // 遍历每个角色的所有权限
        for (let k = 0; k < data.userRoles[i].roleInfo.roleAuthorities.length; k += 1) {
          theRight[k] = data.userRoles[i].roleInfo.roleAuthorities[k].authorityInfo.nameZh;
        }
        // 将每个角色权限信息存储到二维数组中
        allRight[i] = theRight;
        // 清空每个角色的权限，方便获取下一个角色的权限
        theRight = [];
      }
      this.detail.roleZh = roleZh.toString();
      // 把二维数组转换为一位数组织并去重处理，再转换为字符串 ：v-model的value值应为字符串形式
      this.detail.right = [...new Set(allRight.flat(2))].toString();
    },
    // 清空本条的detail数据
    clearDetail() {
      this.detail.name = '';
      this.detail.roleZh = '';
      this.detail.role = [];
      this.detail.right = '';
    },
    // 详情对话框
    showDetailRightDialog(data1) {
      this.setDetail(data1);
      this.detailRightDialogVisible = true;
    },
    // 编辑对话框
    showEditRightDialog(row) {
      this.setDetail(row);
      this.changeRoles = this.detail.role;
      this.editDialogVisible = true;
    },
    // 删除对话框
    showDeleteRightDialog(val) {
      this.setDetail(val);
      this.deleteDialogVisible = true;
    },
    // 改变管理员角色
    changeMangerRoles(data) {
      this.editDialogVisible = false;
      // 发送修改管理员角色请求
      const userName = this.detail.name;
      const roleNames = data;
      // 更改并重新获取数据
      changeAuthorityRole({ userName, roleNames }).then(() => {
        this.getTableList();
        this.$message.success('编辑成功');
      });
    },
    // 删除管理员
    deleteManager() {
      this.deleteDialogVisible = false;
      const userName = this.detail.name;
      const roleNames = [];
      // 删除管理员所有角色更改并重新获取数据
      changeAuthorityRole({ userName, roleNames }).then(() => {
        this.getTableList();
        this.$message.success('删除成功');
      });
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
      this.total = res.count;
    },
    // 页码改变事件
    handleCurrentChange(val) {
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
