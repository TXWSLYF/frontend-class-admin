<template>
    <div class="authority-manage">
      <div class="authority-manage_title">
      <span>项目权限管理</span>
      <el-button class="authority-manage_button"
      @click="showSetRightDialog"
      type="primary">
      新增管理员
      </el-button>
    </div>
    <div class="authority-manage_search">
      <!-- 搜索姓名 -->
      <div>
        <el-input
          placeholder="姓名"
          class="name_search"
          @change="handleName"
          v-model="inputValue1">
           <i slot="suffix" class="el-input__icon el-icon-search pointer" @click="handleName"></i>
        </el-input>
        <span class="role">管理员角色</span>
        <el-select v-model="value1"
          class="roles_search"
           multiple placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select>
      </div>
        <div>
          <el-button class="authority-manage_button" type="primary">查询</el-button>
          <el-button class="authority-manage_button" type="primary">重置</el-button>
        </div>
    </div>
    <!-- 索引目录 -->
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
            <span style="margin-left: 10px">{{ scope.row.address }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="权限情况"
          width="500">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.city }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
              <el-button
              @click="showEditRightDialog(scope.row)"
              type="text" size="small"
              >编辑</el-button>
                <el-button @click="showDeleteRightDialog" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增管理员对话框 -->
    <div class="ManageDialog">
       <el-dialog
       title="新增管理员"
       center
      :visible.sync="addDialogVisible"
       width="50%"
       @close="setRightDialogClosed">
       <el-form :model="addForm"  ref="addFormRef" label-width="100px">
        <el-form-item label="管理员姓名" prop="username">
          <el-input v-model="addForm.username" placeholder="请输入姓名" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="管理员角色">
          <el-select v-model="addForm.role" style="width:400px"
           multiple placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" >确 定</el-button>
      </span>
    </el-dialog>
    </div>
    <!-- 管理员详情 -->
    <el-dialog title="管理员详情" center
      :visible.sync="ManageDetDialogVisible"
      width="50%"
      @close="setRoleDialogClosed">
      <el-form :model="Detail" ref="editFormRef" label-width="100px">
          <el-form-item label="管理员姓名">
            <el-input v-model="Detail.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="管理员角色">
            <el-input v-model="Detail.address" disabled></el-input>
          </el-form-item>
          <el-form-item label="权限详情">
            <el-input v-model="Detail.city" disabled></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="ManageDetDialogVisible = false" type="primary">确 定</el-button>
        </span>
    </el-dialog>
    <!-- 编辑 -->
    <div class="EditManageDialog">
       <el-dialog
       title="新增管理员"
       center
      :visible.sync="EditDialogVisible"
       width="50%"
       @close="setRightDialogClosed">
       <el-form :model="editDetail"  ref="editFormRef" label-width="100px">
          <el-form-item label="管理员姓名">
            <el-input v-model="editDetail.name" disabled></el-input>
          </el-form-item>
        <el-form-item label="管理员角色">
          <el-select v-model="value2" style="width:400px"
           multiple placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
        </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="EditDialogVisible = false">取 消</el-button>
        <el-button type="primary" >确 定</el-button>
      </span>
    </el-dialog>
    </div>
    <!-- 删除 -->
    <el-dialog
      title="提示"
      :visible.sync="deleteDialogVisible"
      width="30%"
      center>
      <span>确认要删除信息吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteDialogVisible = false">确 定</el-button>
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
      :page-size="10"
    ></el-pagination>
  </div>
</template>

<script>

export default {
  name: 'AuthorityManage',
  data() {
    return {
      inputValue1: '',
      inputValue2: '',
      value1: '',
      value2: '',
      total: 20,
      page: 1,
      addDialogVisible: false,
      ManageDetDialogVisible: false,
      EditDialogVisible: false,
      deleteDialogVisible: false,
      addForm: {
        username: '',
        role: '',
      },
      Detail: {},
      editDetail: {},
      options: [{
        value: '选项1',
        label: '课程运营',
      }, {
        value: '选项2',
        label: '课程管理',
      }, {
        value: '选项3',
        label: '后台管理',
      },
      {
        value: '选项4',
        label: '数据查看',
      },
      ],
      dataList: [
        {
          nickname: 'alex',
          name: 'root',
          remark: '管理员',
          userRoles: ['超级管理员'],
        },
        {
          nickname: 'alex',
          name: 'root',
          remark: '管理员',
          userRoles: ['超级管理员'],
        },
        {
          nickname: 'alex',
          name: 'root',
          remark: '管理员',
          userRoles: ['超级管理员'],
        },
      ],
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333,
      },
      {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333,
      },
      {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333,
      },
      {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333,
      },
      ],
    };
  },
  created() {
    this.getOne();
    console.log('aaa');
  },
  methods: {
    async getOne() {
      console.log('aaa');
      // const roleList = await getRoleList();
      //  console.log(roleList);
    },
    handleName() {
      this.$message(this.inputValue1);
      this.inputValue1 = '';
    },
    async showdetRightDialog(data) {
      this.Detail = data;
      this.ManageDetDialogVisible = true;
    },
    async showEditRightDialog(row) {
      this.editDetail = row;
      this.EditDialogVisible = true;
    },
    async showDeleteRightDialog() {
      this.deleteDialogVisible = true;
    },
    handleClick(row) {
      console.log(row);
      this.showdetRightDialog(row);
    },
    async showSetRightDialog() {
      this.addDialogVisible = true;
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
